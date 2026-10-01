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

interface CoseMarksheetDegreeProps {
  student: StudentResult;
  onBack?: () => void;
  defaultDocType?: "MARKSHEET" | "DEGREE";
  autoDownload?: boolean;
}

// Authentic 240x13 PNG base64 tile of BHSE Delhi continuous security pattern
const BHSE_PATTERN_PNG_DATA_URL =
  "data:image/png;base64,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";

// Helper to pre-inline all images in an element directly to base64 Data URLs
// This guarantees ZERO canvas tainting and ZERO network requests during html2canvas capture
const inlineAllImages = async (container: HTMLElement): Promise<() => void> => {
  const images = Array.from(container.querySelectorAll<HTMLImageElement>("img"));
  const originals = new Map<HTMLImageElement, string>();

  await Promise.all(
    images.map(async (img) => {
      // Ensure image is loaded
      if (!img.complete) {
        await new Promise((resolve) => {
          img.onload = resolve;
          img.onerror = resolve;
        });
      }

      const currentSrc = img.src;
      if (currentSrc && !currentSrc.startsWith("data:")) {
        originals.set(img, currentSrc);

        // Attempt 1: draw image directly to canvas (instant, zero network)
        let converted = false;
        try {
          if (img.naturalWidth > 0 && img.naturalHeight > 0) {
            const tempCanvas = document.createElement("canvas");
            tempCanvas.width = img.naturalWidth;
            tempCanvas.height = img.naturalHeight;
            const ctx = tempCanvas.getContext("2d");
            if (ctx) {
              ctx.drawImage(img, 0, 0);
              const dataUrl = tempCanvas.toDataURL("image/png");
              if (dataUrl && dataUrl.length > 200) {
                img.src = dataUrl;
                converted = true;
              }
            }
          }
        } catch (e) {
          // Canvas tainted or cross-origin, fall back to fetch
        }

        // Attempt 2: Fetch and read as Data URL
        if (!converted) {
          try {
            const res = await fetch(currentSrc);
            const blob = await res.blob();
            const dataUrl = await new Promise<string>((resolve, reject) => {
              const reader = new FileReader();
              reader.onloadend = () => resolve(reader.result as string);
              reader.onerror = reject;
              reader.readAsDataURL(blob);
            });
            if (dataUrl && dataUrl.startsWith("data:")) {
              img.src = dataUrl;
            }
          } catch (e) {
            console.warn("Could not inline image:", currentSrc, e);
          }
        }
      }
    }),
  );

  return () => {
    originals.forEach((origSrc, img) => {
      img.src = origSrc;
    });
  };
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

  // Shared high-resolution rasterizer ensuring 100% single-page A4 canvas
  const captureMarksheetCanvas = async (docElement: HTMLElement) => {
    const revertImages = await inlineAllImages(docElement);
    try {
      if (document.fonts) {
        await document.fonts.ready;
      }

      const { default: html2canvas } = await import("html2canvas");

      const canvas = await html2canvas(docElement, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
        backgroundColor: "#ffffff",
        scrollX: 0,
        scrollY: 0,
        windowWidth: 1200,
        onclone: (clonedDoc) => {
          const clonedEl = clonedDoc.getElementById("bhse-degree-document");
          if (clonedEl) {
            clonedEl.style.width = "794px";
            clonedEl.style.minWidth = "794px";
            clonedEl.style.maxWidth = "794px";
            clonedEl.style.height = "1123px";
            clonedEl.style.minHeight = "1123px";
            clonedEl.style.maxHeight = "1123px";
            clonedEl.style.transform = "none";
            clonedEl.style.margin = "0 auto";
            clonedEl.style.boxSizing = "border-box";
          }
        },
      });

      return canvas;
    } finally {
      revertImages();
    }
  };

  // Direct High-Resolution A4 Sheet Fit PDF Download (Single Page Guaranteed)
  const handleDownloadPdf = useCallback(async () => {
    const docElement = document.getElementById("bhse-degree-document");
    if (!docElement || isGeneratingPdf) return;

    setIsGeneratingPdf(true);
    try {
      const [{ jsPDF }] = await Promise.all([import("jspdf")]);

      const canvas = await captureMarksheetCanvas(docElement);
      const imgData = canvas.toDataURL("image/jpeg", 0.98);

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
        compress: true,
      });

      // Standard A4 dimensions in mm: 210mm x 297mm (100% exact single-page fit)
      pdf.addImage(imgData, "JPEG", 0, 0, 210, 297, undefined, "FAST");

      const cleanName = student.student_name
        ? student.student_name.trim().replace(/\s+/g, "_")
        : "Student";
      const rollNo = student.roll_no || "Result";
      const fileName = `${cleanName}_Roll_${rollNo}_Marksheet.pdf`;

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
      alert("Failed to generate PDF. Please try again or use the Print button.");
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
      const canvas = await captureMarksheetCanvas(docElement);

      const cleanName = student.student_name
        ? student.student_name.trim().replace(/\s+/g, "_")
        : "Student";
      const rollNo = student.roll_no || "Result";
      const fileName = `${cleanName}_Roll_${rollNo}_Marksheet.jpg`;

      // Direct high-res JPG download
      const dataUrl = canvas.toDataURL("image/jpeg", 0.98);
      const link = document.createElement("a");
      link.download = fileName;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      console.error("Image generation error:", e);
      alert("Failed to generate JPG image. Please try again.");
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

        {/* Action Buttons: Download PDF, Download JPG, Print */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Download PDF (A4 Fit) */}
          <button
            type="button"
            onClick={handleDownloadPdf}
            disabled={isGeneratingPdf}
            className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-xs rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow-xs disabled:opacity-50"
            title="Download authentic Marksheet as A4 PDF (100% Fit)"
          >
            {isGeneratingPdf ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Generating PDF...</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF (A4)</span>
              </>
            )}
          </button>

          {/* Download JPG (High-Res Image) */}
          <button
            type="button"
            onClick={handleDownloadImage}
            disabled={isGeneratingImg}
            className="px-3.5 py-2 bg-amber-600 hover:bg-amber-700 active:scale-95 text-white font-bold text-xs rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow-xs disabled:opacity-50"
            title="Download authentic Marksheet as High-Res JPG"
          >
            {isGeneratingImg ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Generating JPG...</span>
              </>
            ) : (
              <>
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Download JPG</span>
              </>
            )}
          </button>

          {/* Print */}
          <button
            type="button"
            onClick={() => window.print()}
            className="px-3.5 py-2 bg-[#1b3f8b] hover:bg-[#15326f] active:scale-95 text-white font-bold text-xs rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
            title="Print Marksheet"
          >
            <Printer className="w-3.5 h-3.5 text-yellow-300" />
            <span>Print</span>
          </button>

          {/* Marks Statement Title Badge */}
          <div className="hidden sm:flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-300">
            <span className="px-3 py-1.5 bg-slate-200 text-slate-800 font-bold text-xs rounded-md flex items-center gap-1.5 cursor-default">
              <FileText className="w-3.5 h-3.5 text-[#1b3f8b]" />
              <span>अंक विवरणिका</span>
            </span>
          </div>
        </div>
      </div>

      {/* Mobile scroll hint */}
      <div className="sm:hidden text-center text-[11px] text-slate-500 font-medium mb-1.5 flex items-center justify-center gap-1 print:hidden">
        <span>👉 Scroll horizontally to view full A4 marksheet</span>
      </div>

      {/* ========================================================================= */}
      {/* 100% FAITHFUL OFFICIAL BHSE DELHI MARKSHEET (CERTIFICATE-CUM-MARK SHEET)  */}
      {/* ========================================================================= */}
      <div className="w-full overflow-x-auto flex justify-center py-1 px-1 sm:px-4">
        <div
          id="bhse-degree-document"
          className="bhse-certificate-document relative w-[794px] min-w-[794px] max-w-[794px] h-[1123px] min-h-[1123px] max-h-[1123px] bg-white text-slate-900 rounded-xs shadow-2xl overflow-hidden print:shadow-none print:m-0 print:w-[210mm] print:h-[296mm] print:max-w-[210mm] print:max-h-[296mm] print:min-h-[296mm] print:rounded-none flex flex-col justify-between select-none p-3.5 sm:p-5"
          style={{ boxSizing: "border-box" }}
        >
          {/* Authentic Continuous Security Micro-Pattern Watermark (Zero Gaps) */}
          <div
            className="bhse-bg-watermark absolute inset-0 pointer-events-none z-0 opacity-80"
            style={{
              backgroundImage: `url("${BHSE_PATTERN_PNG_DATA_URL}")`,
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
                <div className="w-1/3 text-right font-bold">
                  Govt. of Delhi Regd. No. 275 (India)
                </div>
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
                    ? "सीनीयर सेकण्डरी स्कूल सर्टिफिकेट परीक्षा (10+2)"
                    : "सेकण्डरी स्कूल सर्टिफिकेट परीक्षा (हाई स्कूल)"}
                </div>
                <div className="text-[#0028a5] font-black text-[13px] sm:text-[15px] leading-tight mt-0.5">
                  {isClass12
                    ? "Senior Secondary School Certificate Examination (10+2)"
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
                    <span className="w-32 sm:w-36 shrink-0 font-medium">
                      This is to certify that
                    </span>
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
                    ने बोर्ड द्वारा अप्रैल/मई में आयोजित{" "}
                    {isClass12 ? "सीनीयर सेकण्डरी" : "सेकण्डरी"} परीक्षा,
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
                    {student.school_name || "CENTRE CODE - 105-G NASIK (MS)"}
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
                <div className="my-0.5">
                  मान्यता परिपत्र सं. एफ-४६-१/६८-एस यू / No. F-46-1/68-SU
                </div>
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
    </div>
  );
};
