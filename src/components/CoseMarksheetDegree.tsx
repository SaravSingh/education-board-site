import React, { useState, useEffect, useCallback } from "react";
import { StudentResult, SubjectMarks, numberToIndividualDigitWords } from "@/lib/db";
import {
  Printer,
  ArrowLeft,
  Award,
  FileText,
  Download,
  Loader2,
  Image as ImageIcon,
} from "lucide-react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

interface CoseMarksheetDegreeProps {
  student: StudentResult;
  onBack?: () => void;
  defaultDocType?: "MARKSHEET" | "DEGREE";
  autoDownload?: boolean;
}

// Convert any image URL to an inline base64 Data URL to guarantee zero canvas tainting
const fetchAsDataUrl = async (url: string): Promise<string> => {
  try {
    const res = await fetch(url);
    const blob = await res.blob();
    return await new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = () => resolve(url);
      reader.readAsDataURL(blob);
    });
  } catch (e) {
    return url;
  }
};

export const CoseMarksheetDegree: React.FC<CoseMarksheetDegreeProps> = ({
  student,
  onBack,
  defaultDocType = "MARKSHEET",
  autoDownload = false,
}) => {
  const [docType, setDocType] = useState<"MARKSHEET" | "DEGREE">(defaultDocType);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [isGeneratingImg, setIsGeneratingImg] = useState(false);

  let subjects: SubjectMarks[] = [];
  try {
    subjects = JSON.parse(student.subjects_json || "[]");
  } catch (e) {
    subjects = [];
  }

  const isClass12 =
    student.course.toLowerCase().includes("12") || student.course.toLowerCase().includes("senior");

  const courseTitleHindi = isClass12 ? "उच्च माध्यमिक परीक्षा" : "माध्यमिक परीक्षा";
  const courseTitleEnglish = isClass12
    ? "Senior Secondary School Examination"
    : "Secondary School Examination";
  const examSession = student.batch || `MAY ${student.exam_year || "2009"}`;

  // Direct High-Resolution A4 Sheet Fit PDF Download
  const handleDownloadPdf = useCallback(async () => {
    const docElement = document.getElementById("bhse-degree-document");
    if (!docElement || isGeneratingPdf) return;

    setIsGeneratingPdf(true);
    try {
      // Ensure all images are fully loaded before capturing
      const images = docElement.getElementsByTagName("img");
      const imgPromises = Array.from(images).map((img) => {
        if (img.complete) return Promise.resolve();
        return new Promise((resolve) => {
          img.onload = resolve;
          img.onerror = resolve;
        });
      });
      await Promise.all(imgPromises);

      if (document.fonts) {
        await document.fonts.ready;
      }

      // Render at 2x scale (~192 DPI) for crisp vector sharpness
      const canvas = await html2canvas(docElement, {
        scale: 2,
        useCORS: true,
        allowTaint: false,
        logging: false,
        backgroundColor: "#ffffff",
        scrollX: 0,
        scrollY: 0,
        windowWidth: 1200,
        onclone: async (clonedDoc) => {
          const clonedEl = clonedDoc.getElementById("bhse-degree-document");
          if (clonedEl) {
            clonedEl.style.width = "794px";
            clonedEl.style.maxWidth = "794px";
            clonedEl.style.margin = "0 auto";
            clonedEl.style.boxSizing = "border-box";
            clonedEl.style.transform = "none";
          }
          // Convert all images inside the clone to inline base64 so canvas is 100% untainted
          const clonedImgs = clonedDoc.querySelectorAll<HTMLImageElement>(
            "#bhse-degree-document img",
          );
          await Promise.all(
            Array.from(clonedImgs).map(async (img) => {
              if (img.src && !img.src.startsWith("data:")) {
                const dataUrl = await fetchAsDataUrl(img.src);
                if (dataUrl) img.src = dataUrl;
              }
            }),
          );
        },
      });

      const imgData = canvas.toDataURL("image/jpeg", 0.95);
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
        compress: true,
      });

      // Standard A4 dimensions in mm: 210mm x 297mm (100% exact fit)
      pdf.addImage(imgData, "JPEG", 0, 0, 210, 297, undefined, "FAST");

      const cleanName = student.student_name
        ? student.student_name.trim().replace(/\s+/g, "_")
        : "Student";
      const rollNo = student.roll_no || "Result";
      const fileName = `${cleanName}_Roll_${rollNo}_Marksheet.pdf`;

      // Multi-method download trigger to guarantee download works across all browsers
      try {
        pdf.save(fileName);
      } catch (saveErr) {
        const blob = pdf.output("blob");
        const blobUrl = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(() => URL.revokeObjectURL(blobUrl), 15000);
      }
    } catch (err) {
      console.error("PDF generation error:", err);
      // Fallback to native print dialog
      window.print();
    } finally {
      setIsGeneratingPdf(false);
    }
  }, [student, isGeneratingPdf]);

  // Direct High-Resolution HD Image Download (JPG)
  const handleDownloadImage = useCallback(async () => {
    const docElement = document.getElementById("bhse-degree-document");
    if (!docElement || isGeneratingImg) return;

    setIsGeneratingImg(true);
    try {
      const images = docElement.getElementsByTagName("img");
      await Promise.all(
        Array.from(images).map((img) =>
          img.complete
            ? Promise.resolve()
            : new Promise((r) => {
                img.onload = r;
                img.onerror = r;
              }),
        ),
      );
      if (document.fonts) await document.fonts.ready;

      const canvas = await html2canvas(docElement, {
        scale: 2,
        useCORS: true,
        allowTaint: false,
        logging: false,
        backgroundColor: "#ffffff",
        scrollX: 0,
        scrollY: 0,
        windowWidth: 1200,
        onclone: async (clonedDoc) => {
          const clonedEl = clonedDoc.getElementById("bhse-degree-document");
          if (clonedEl) {
            clonedEl.style.width = "794px";
            clonedEl.style.maxWidth = "794px";
            clonedEl.style.margin = "0 auto";
            clonedEl.style.boxSizing = "border-box";
            clonedEl.style.transform = "none";
          }
          const clonedImgs = clonedDoc.querySelectorAll<HTMLImageElement>(
            "#bhse-degree-document img",
          );
          await Promise.all(
            Array.from(clonedImgs).map(async (img) => {
              if (img.src && !img.src.startsWith("data:")) {
                const dataUrl = await fetchAsDataUrl(img.src);
                if (dataUrl) img.src = dataUrl;
              }
            }),
          );
        },
      });

      const cleanName = student.student_name
        ? student.student_name.trim().replace(/\s+/g, "_")
        : "Student";
      const rollNo = student.roll_no || "Result";
      const fileName = `${cleanName}_Roll_${rollNo}_Marksheet.jpg`;

      const imgBlob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, "image/jpeg", 0.95),
      );
      if (imgBlob) {
        const imgUrl = URL.createObjectURL(imgBlob);
        const link = document.createElement("a");
        link.href = imgUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(() => URL.revokeObjectURL(imgUrl), 15000);
      }
    } catch (e) {
      console.error("Image generation error:", e);
    } finally {
      setIsGeneratingImg(false);
    }
  }, [student, isGeneratingImg]);

  useEffect(() => {
    if (autoDownload) {
      const timer = setTimeout(() => {
        handleDownloadPdf();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [autoDownload, handleDownloadPdf]);

  return (
    <div className="w-full flex flex-col items-center">
      {/* Top Action Bar (Hidden in Print) */}
      <div className="w-full max-w-[800px] mb-4 bg-white/95 backdrop-blur-xs p-3 rounded-xl border border-slate-300 shadow-md flex flex-wrap items-center justify-between gap-3 print:hidden">
        {onBack && (
          <button
            onClick={onBack}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </button>
        )}

        {/* Marks Statement Button (Active) */}
        <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-300">
          <button
            type="button"
            className="px-4 py-1.5 bg-[#1b3f8b] text-white font-bold text-xs rounded-md shadow-xs flex items-center gap-2 cursor-default"
          >
            <FileText className="w-3.5 h-3.5 text-yellow-300" />
            <span>अंक विवरणिका (Marks Statement)</span>
          </button>
        </div>

        {/* Print / Save PDF Button */}
        <button
          onClick={() => window.print()}
          className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-lg transition-all shadow-md cursor-pointer flex items-center gap-2 active:scale-95 ml-auto sm:ml-0"
        >
          <Printer className="w-4 h-4 text-yellow-300" />
          <span>Print / Save PDF (A4 100%)</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* 100% FAITHFUL OFFICIAL BHSE DELHI MARKSHEET (CERTIFICATE-CUM-MARK SHEET)  */}
      {/* ========================================================================= */}
      <div
        id="bhse-degree-document"
        className="bhse-certificate-document relative w-full max-w-[794px] aspect-[210/297] min-h-[1123px] bg-white text-slate-900 rounded-xs shadow-2xl overflow-hidden print:shadow-none print:m-0 print:w-[210mm] print:h-[296.5mm] print:max-w-[210mm] print:max-h-[296.5mm] print:min-h-[296.5mm] print:rounded-none flex flex-col justify-between select-none p-3.5 sm:p-5"
        style={{ boxSizing: "border-box" }}
      >
        {/* Authentic Continuous Security Micro-Pattern Watermark (Zero Gaps) */}
        <div
          className="bhse-bg-watermark absolute inset-0 pointer-events-none z-0 opacity-80"
          style={{
            backgroundImage:
              'url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQwIiBoZWlnaHQ9IjEzIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogIDx0ZXh0IHg9IjAiIHk9IjEwLjIiIGZvbnQtZmFtaWx5PSInQXJpYWwnLCAnaGVsdmV0aWNhIE5ldWUnLCBIZWx2ZXRpY2EsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iOC4yIiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjYTI5Y2Q2IiB0ZXh0TGVuZ3RoPSIyNDAiIGxlbmd0aEFkanVzdD0ic3BhY2luZyI+Qk9BUkQgT0YgSElHSEVSIFNFQ09OREFSWSBFRFVDQVRJT04gREVMSEkmIzE2MDs8L3RleHQ+Cjwvc3ZnPg==")',
            backgroundRepeat: "repeat",
            backgroundSize: "240px 13px",
            WebkitPrintColorAdjust: "exact",
            printColorAdjust: "exact",
          }}
        />

        {/* Large Central Board Emblem Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden select-none">
          <img
            src="/bhse_emblem_blue.png"
            alt="Watermark"
            crossOrigin="anonymous"
            className="w-[480px] h-[430px] object-contain opacity-15 transform translate-y-8"
          />
        </div>

        {/* Outer Dark Blue Border Frame Container */}
        <div className="relative z-10 w-full h-full border-2 border-[#0028a5] p-3 sm:p-4 flex flex-col justify-between">
          {/* TOP HEADER SECTION */}
          <div>
            {/* Top Reference Numbers */}
            <div className="flex justify-between items-center text-[9.5px] sm:text-[10.5px] font-bold text-[#0028a5] mb-0.5 px-1">
              <div className="w-1/3" />
              <div className="text-center font-bold">Government of India (TM-1, No. 1791977)</div>
              <div className="w-1/3 text-right font-bold">Govt. of Delhi Regd. No. 275 (India)</div>
            </div>

            {/* Main Board Heading in Hindi */}
            <h1 className="text-center font-bold text-[#0028a5] text-[18px] sm:text-[23px] leading-tight font-serif tracking-normal whitespace-nowrap">
              बोर्ड ऑफ हायर सेकण्डरी एज्यूकेशन, दिल्ली
            </h1>

            {/* Main Board Heading in English */}
            <h2 className="text-center font-black text-[#0028a5] text-[15px] sm:text-[19.5px] leading-tight font-serif tracking-tight whitespace-nowrap mt-0.5 mb-1">
              BOARD OF HIGHER SECONDARY EDUCATION, DELHI
            </h2>

            {/* Row: Enrollment No (Left) | Emblem Seal (Center) | Roll No (Right) */}
            <div className="grid grid-cols-12 items-center my-0.5 px-1">
              {/* Left: Enrollment No */}
              <div className="col-span-4 text-left text-[11px] sm:text-[12.5px] text-[#0028a5] font-bold leading-tight">
                <div>रजि. क्रमांक :</div>
                <div className="flex items-baseline">
                  <span>Enrollment No. :&nbsp;</span>
                  <span className="font-mono text-black font-bold text-xs sm:text-[13px]">
                    {student.enrollment_no}
                  </span>
                </div>
              </div>

              {/* Center: Blue Emblem Seal */}
              <div className="col-span-4 flex justify-center items-center">
                <img
                  src="/bhse_emblem_blue.png"
                  alt="BHSE Emblem Seal"
                  crossOrigin="anonymous"
                  className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
                />
              </div>

              {/* Right: Roll No */}
              <div className="col-span-4 text-left pl-6 sm:pl-12 text-[11px] sm:text-[12.5px] text-[#0028a5] font-bold leading-tight">
                <div>रोल नं. :</div>
                <div className="flex items-baseline">
                  <span>Roll No. :&nbsp;</span>
                  <span className="font-mono text-black font-bold text-xs sm:text-[13px]">
                    {student.roll_no}
                  </span>
                </div>
              </div>
            </div>

            {/* Ministry Recognition Text */}
            <div className="text-center text-[9px] sm:text-[9.5px] text-[#0028a5] font-bold leading-tight my-1">
              <div>
                मान्यता – परिपत्र संख्या : एफ 46-1/68एस. यू / Recognition No. F-46-1/68 S.U.
              </div>
              <div>भारत सरकार / Government of India</div>
              <div>(शिक्षा विभाग / Department of Education)</div>
            </div>

            {/* Examination Title Header */}
            <div className="text-center my-1">
              <div className="text-[#0028a5] font-bold text-[13px] sm:text-[15px] leading-tight">
                {isClass12
                  ? "हायर सेकण्डरी सर्टिफिकेट परीक्षा (इण्टरमीडिएट)"
                  : "सेकण्डरी स्कूल सर्टिफिकेट परीक्षा (हाई स्कूल)"}
              </div>
              <div className="text-[#0028a5] font-black text-[13px] sm:text-[15px] leading-tight mt-0.5">
                {isClass12
                  ? "Senior Secondary School Certificate Examination (Intermediate)"
                  : "Secondary School Certificate Examination (High School)"}{" "}
                <span className="font-mono font-bold text-black ml-1.5 text-xs sm:text-[14px]">
                  {student.exam_year || "2026"}
                </span>
              </div>
              <div className="text-[#0028a5] font-bold text-[11px] sm:text-[12.5px] mt-0.5">
                प्रमाणपत्र-सह-अंकपत्र / Certificate-cum-Mark Sheet
              </div>
            </div>
          </div>

          {/* STUDENT PARTICULARS & PASSPORT PHOTO */}
          <div className="flex justify-between items-start gap-2 my-1 px-1 text-[11.5px] sm:text-[12.5px] text-[#0028a5] font-semibold leading-relaxed">
            {/* Particulars Stack */}
            <div className="flex-1 space-y-1">
              <div>
                <div className="leading-tight">यह प्रमाणित किया जाता है कि</div>
                <div className="leading-tight flex items-baseline">
                  <span className="w-32 sm:w-36 shrink-0 font-medium">This is to certify that</span>
                  <span className="font-mono font-bold text-black text-xs sm:text-[13px] tracking-wider uppercase whitespace-nowrap">
                    {student.student_name}
                  </span>
                </div>
              </div>

              <div>
                <div className="leading-tight">आत्मज/आत्मजा श्री</div>
                <div className="leading-tight flex items-baseline">
                  <span className="w-32 sm:w-36 shrink-0 font-medium">Son/Daughter of Shri</span>
                  <span className="font-mono font-bold text-black text-xs sm:text-[13px] tracking-wider uppercase whitespace-nowrap">
                    {student.father_name}
                  </span>
                </div>
              </div>

              <div>
                <div className="leading-tight">एवम् श्रीमति</div>
                <div className="leading-tight flex items-baseline">
                  <span className="w-32 sm:w-36 shrink-0 font-medium">and Smt.</span>
                  <span className="font-mono font-bold text-black text-xs sm:text-[13px] tracking-wider uppercase whitespace-nowrap">
                    {student.mother_name}
                  </span>
                </div>
              </div>

              <div>
                <div className="leading-tight">जिनकी जन्मतिथि</div>
                <div className="leading-tight flex items-baseline">
                  <span className="w-32 sm:w-36 shrink-0 font-medium">born on</span>
                  <span className="font-mono font-bold text-black text-[11px] sm:text-[12.5px] tracking-wider uppercase whitespace-nowrap">
                    {student.dob_words} ({student.dob})
                  </span>
                </div>
              </div>

              <div>
                <div className="leading-tight">
                  ने बोर्ड द्वारा अप्रैल/मई में आयोजित {isClass12 ? "हायर सेकण्डरी" : "सेकण्डरी"}{" "}
                  परीक्षा,
                </div>
                <div className="leading-tight flex items-baseline">
                  <span>
                    passed the {isClass12 ? "Senior Secondary" : "Secondary"} School Certificate
                    Examination,
                  </span>
                  <span className="font-mono font-bold text-black ml-2 text-xs sm:text-[13px]">
                    {student.exam_year || "2026"}
                  </span>
                </div>
              </div>

              <div className="flex items-baseline pt-0.5">
                <span className="w-32 sm:w-36 shrink-0" />
                <span className="font-mono font-bold text-black text-xs sm:text-[13px] tracking-wide uppercase whitespace-nowrap">
                  {student.school_name || "CERNRE CODE - 105-G NASIK (MS)"}
                </span>
              </div>

              <div>
                <div className="leading-tight">School from with following marks detail:</div>
                <div className="leading-tight">विद्यालय से निम्न विवरणानुसार उत्तीर्ण की :-</div>
              </div>
            </div>

            {/* Passport Photo */}
            <div className="shrink-0 flex flex-col items-center pt-0.5">
              <div className="border border-black p-[2px] bg-white">
                <img
                  src={student.photo_url || "/students/dhirodutta_saha.jpg"}
                  alt={student.student_name}
                  crossOrigin="anonymous"
                  className="w-[105px] h-[132px] sm:w-[115px] sm:h-[144px] object-cover block grayscale contrast-105"
                />
              </div>
            </div>
          </div>

          {/* MARKS TABLE */}
          <div className="w-full my-1">
            <table className="w-full border-collapse border border-[#0028a5] text-center text-xs sm:text-[12px] text-[#0028a5]">
              <thead>
                <tr className="font-bold border-b border-[#0028a5] text-[10px] sm:text-[10.5px]">
                  <th className="py-1 px-1 border-r border-[#0028a5] w-[7%]">
                    संख्या
                    <br />
                    Sr. No.
                  </th>
                  <th className="py-1 px-2 border-r border-[#0028a5] text-left w-[33%]">
                    विषय
                    <br />
                    Subjects
                  </th>
                  <th className="py-1 px-1 border-r border-[#0028a5] w-[14%]">
                    अधिकतम अंक
                    <br />
                    Maximum Marks
                  </th>
                  <th className="py-0.5 px-0.5 border-r border-[#0028a5] w-[28%]" colSpan={3}>
                    प्राप्तांक Marks Obtained
                    <div className="grid grid-cols-3 border-t border-[#0028a5] mt-0.5 pt-0.5 text-[9.5px] sm:text-[10px]">
                      <span>लि. Theory</span>
                      <span className="border-l border-[#0028a5]">प्रै. Practical</span>
                      <span className="border-l border-[#0028a5]">कुल Total</span>
                    </div>
                  </th>
                  <th className="py-1 px-1 border-[#0028a5] w-[18%]">
                    संस्थागत/व्यक्तिगत
                    <br />
                    Regular/Private
                  </th>
                </tr>
              </thead>
              <tbody>
                {subjects.map((sub, idx) => {
                  const hasPractical = sub.practical && sub.practical > 0;
                  return (
                    <tr
                      key={idx}
                      className="border-b border-[#0028a5] font-mono font-bold text-black text-xs sm:text-[12px] h-[25px]"
                    >
                      <td className="border-r border-[#0028a5] text-center text-[#0028a5] font-sans">
                        {idx + 1}.
                      </td>
                      <td className="border-r border-[#0028a5] text-left px-2 font-mono tracking-wider">
                        {sub.name}
                      </td>
                      <td className="border-r border-[#0028a5] text-center font-mono">
                        {sub.max_marks || 100}
                      </td>
                      <td className="border-r border-[#0028a5] text-center w-[9.3%]">
                        {sub.theory}
                      </td>
                      <td className="border-r border-[#0028a5] text-center w-[9.3%]">
                        {hasPractical ? sub.practical : "XX"}
                      </td>
                      <td className="border-r border-[#0028a5] text-center w-[9.3%]">
                        {sub.total}
                      </td>

                      {/* Rightmost Column for Regular/Private & Positional Grade */}
                      {idx === 0 && (
                        <td
                          rowSpan={3}
                          className="border-b border-[#0028a5] text-center font-mono font-bold text-black text-xs sm:text-sm tracking-widest uppercase align-middle"
                        >
                          {student.status_mode || "PRIVATE"}
                        </td>
                      )}
                      {idx === 3 && (
                        <td
                          rowSpan={1}
                          className="border-b border-[#0028a5] text-center font-sans font-bold text-[#0028a5] text-[9.5px] sm:text-[10px] leading-tight align-middle"
                        >
                          <div>स्थितीय ग्रेड</div>
                          <div>Positional Grade</div>
                        </td>
                      )}
                      {idx === 4 && (
                        <td
                          rowSpan={Math.max(1, subjects.length - 4)}
                          className="text-center font-mono font-bold text-black text-xs sm:text-[12.5px] leading-tight align-middle"
                        >
                          <div>I.D</div>
                          <div>FIRST</div>
                          <div>DIV.</div>
                        </td>
                      )}
                    </tr>
                  );
                })}

                {/* Total Row */}
                <tr className="border-b border-[#0028a5] font-bold text-xs sm:text-[12px]">
                  <td
                    colSpan={5}
                    className="border-r border-[#0028a5] text-right pr-4 py-1 text-[#0028a5] font-sans"
                  >
                    कुल प्राप्तांक / Total Obtained Marks
                  </td>
                  <td className="border-r border-[#0028a5] text-center font-mono font-bold text-black py-1">
                    {student.total_marks}
                  </td>
                  <td className="p-0 border-[#0028a5]">
                    <div className="grid grid-cols-2 text-center items-center h-full">
                      <span className="text-[9.5px] sm:text-[10.5px] font-bold text-[#0028a5] border-r border-[#0028a5] py-1 leading-tight font-sans">
                        परिणाम
                        <br />
                        Result
                      </span>
                      <span className="font-mono font-bold text-black text-xs sm:text-sm py-1">
                        PASS
                      </span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* FOOTER & SIGNATURE SECTION */}
          <div>
            <div className="flex justify-between items-end my-1 px-1 text-xs sm:text-[12px] text-[#0028a5]">
              {/* Left: Meanings & Date */}
              <div className="space-y-1">
                <div className="text-[9.5px] sm:text-[10.5px] font-bold leading-tight">
                  <div>आद्यक्षरों का अर्थ</div>
                  <div>कोड का अर्थ एवं विश्लेषणात्मक विवरण पीछे दिया गया है।</div>
                  <div className="italic text-[9px] sm:text-[9.5px]">
                    Meanings of codes and its' explanations are given overleaf.
                  </div>
                </div>

                <div className="pt-2 text-xs sm:text-[12px] font-bold leading-tight">
                  <div>दिल्ली</div>
                  <div>Delhi</div>
                  <div className="mt-1">दिनांक :</div>
                  <div className="flex items-baseline">
                    <span>Dated :</span>
                    <span className="font-mono font-bold text-black ml-2 text-xs sm:text-[13px]">
                      {student.result_declaration_date
                        ? student.result_declaration_date.replace(/-/g, "/")
                        : "22/06/2026"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right: Controller Signature */}
              <div className="flex flex-col items-center text-center">
                <img
                  src="/bhse_controller_signature.png"
                  alt="Controller Signature"
                  crossOrigin="anonymous"
                  className="h-8 sm:h-9 object-contain mb-0.5"
                />
                <div className="font-bold text-xs sm:text-[12.5px] text-[#0028a5] leading-tight">
                  (ओमप्रकाश गुप्ता)
                </div>
                <div className="font-bold text-[10.5px] sm:text-[11.5px] text-[#0028a5] leading-tight">
                  परीक्षा नियंत्रक
                </div>
                <div className="font-bold text-[10.5px] sm:text-[11.5px] text-[#0028a5] leading-tight">
                  Controller of Examination
                </div>
              </div>
            </div>

            {/* Bottom Legal Notice */}
            <div className="text-center text-[8.5px] sm:text-[9.5px] font-bold text-[#0028a5] leading-tight pt-1">
              <div>
                भारत सरकार एवं राज्य सरकारों द्वारा मान्यता प्राप्त / Recognised by the Government
                of India and State Governments.
              </div>
              <div className="my-0.5">मान्यता परिपत्र सं. एफ-४६-१/६८-एस यू / No. F-46-1/68-SU</div>
              <div>
                *का चिन्ह जिस विषय के आगे लगा है, वह विषय पूरक परीक्षा में उत्तीर्ण किया जाता है।
              </div>
              <div>
                *against a subject that the candidate passed in the subjet at the Compartment
                Examination.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
