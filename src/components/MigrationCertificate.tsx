import React, { useRef, useState, useEffect } from "react";
import { StudentResult } from "@/lib/db";
import { DocumentWatermarkBg } from "@/components/DocumentWatermarkBg";
import { Printer, Download, ArrowLeft, Award, FileText, Loader2 } from "lucide-react";

interface MigrationCertificateProps {
  student: StudentResult;
  onBack?: (() => void) | undefined;
  autoPrint?: boolean | undefined;
  hideToolbar?: boolean | undefined;
}

export const MigrationCertificate: React.FC<MigrationCertificateProps> = ({
  student,
  onBack,
  autoPrint = false,
  hideToolbar = false,
}) => {
  const certRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      if (typeof window === "undefined") return;
      const screenWidth = window.innerWidth;
      if (screenWidth < 820) {
        const containerWidth = Math.min(screenWidth - 24, 794);
        setScale(Math.max(0.35, Math.min(containerWidth / 794, 1)));
      } else {
        setScale(1);
      }
    };
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  useEffect(() => {
    if (autoPrint) {
      setTimeout(() => window.print(), 500);
    }
  }, [autoPrint]);

  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadPdf = async () => {
    if (isDownloading) return;
    setIsDownloading(true);
    try {
      const docElement = certRef.current || document.getElementById("bhse-migration-document");
      if (!docElement) {
        window.print();
        return;
      }

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

      const { default: html2canvas } = await import("html2canvas");
      const { jsPDF } = await import("jspdf");

      const canvas = await html2canvas(docElement, {
        scale: 2,
        useCORS: true,
        allowTaint: false,
        logging: false,
        backgroundColor: "#ffffff",
        scrollX: 0,
        scrollY: 0,
        windowWidth: 1200,
        onclone: (clonedDoc) => {
          const target = clonedDoc.getElementById("bhse-migration-document");
          if (target) {
            target.style.width = "794px";
            target.style.maxWidth = "794px";
            target.style.margin = "0 auto";
            target.style.transform = "none";
          }
        },
      });

      const imgData = canvas.toDataURL("image/jpeg", 0.96);
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
        compress: true,
      });

      pdf.addImage(imgData, "JPEG", 0, 0, 210, 297, undefined, "FAST");

      const cleanName = student.student_name ? student.student_name.trim().replace(/\s+/g, "_") : "Student";
      const fileName = `${cleanName}_${student.roll_no}_Migration_Certificate.pdf`;

      try {
        pdf.save(fileName);
      } catch (err) {
        const blob = pdf.output("blob");
        const blobUrl = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(blobUrl);
      }
    } catch (err) {
      console.error("PDF download failed, falling back to print:", err);
      window.print();
    } finally {
      setIsDownloading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const isClass12 =
    student.course.toLowerCase().includes("12") || student.course.toLowerCase().includes("senior");

  const courseDisplayName = isClass12 ? "SENIOR - SECONDARY" : "SECONDARY";

  const examSessionName =
    student.exam_year && student.exam_year !== "N/A"
      ? `APRIL - ${student.exam_year}`
      : "APRIL - 2012";

  const schoolDisplayName =
    student.school_name && student.school_name.trim().length > 0
      ? student.school_name.toUpperCase().replace("CENTRE CODE - ", "OM INSTITUTE NASIK ")
      : "OM INSTITUTE NASIK (105)-G (MS)";

  const issueDate =
    student.result_declaration_date && student.result_declaration_date !== "N/A"
      ? student.result_declaration_date.replace(/-/g, "/")
      : "19/06/2012";

  return (
    <div className="w-full flex flex-col items-center">
      {/* Top Action Bar */}
      {!hideToolbar && (
        <div className="w-full max-w-[800px] mb-3 bg-white/95 backdrop-blur-xs p-2.5 sm:p-3 rounded-xl border border-slate-300 shadow-md flex flex-wrap items-center justify-between gap-2.5 print:hidden">
          {onBack && (
            <button
              onClick={onBack}
              className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          )}

          <div className="flex items-center gap-2">
            <div className="flex items-center bg-purple-50 text-purple-900 border border-purple-200 px-3 py-1.5 rounded-lg text-xs font-bold gap-1.5">
              <Award className="w-4 h-4 text-purple-700" />
              <span>स्थानान्तरण प्रमाण - पत्र (Migration Certificate)</span>
            </div>

            {/* Direct High-Resolution PDF Download */}
            <button
              type="button"
              onClick={handleDownloadPdf}
              disabled={isDownloading}
              className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-600 active:scale-95 text-white font-bold text-xs rounded-lg shadow-sm flex items-center gap-1.5 cursor-pointer transition border border-emerald-600 disabled:opacity-60"
              title="Download High-Resolution PDF Certificate"
            >
              {isDownloading ? (
                <>
                  <Loader2 className="w-4 h-4 text-white animate-spin" />
                  <span>Generating PDF...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 text-emerald-200" />
                  <span>Download PDF</span>
                </>
              )}
            </button>

            {/* Print Certificate Button */}
            <button
              type="button"
              onClick={handlePrint}
              className="px-4 py-2 bg-[#1b3f8b] hover:bg-[#122e6e] text-white font-bold text-xs rounded-lg shadow-sm flex items-center gap-2 cursor-pointer transition border border-[#1b3f8b] active:scale-95"
              title="Print Migration Certificate on A4 Sheet"
            >
              <Printer className="w-4 h-4 text-yellow-300" />
              <span>Print Certificate (A4)</span>
            </button>
          </div>
        </div>
      )}

      {/* Responsive Scaling Wrapper */}
      <div
        className="w-full flex justify-center items-start print:block print:p-0 print:m-0 print:overflow-visible overflow-hidden"
        style={{
          height: scale < 1 ? `${Math.round(1123 * scale) + 10}px` : "auto",
        }}
      >
        <div
          ref={certRef}
          id="bhse-migration-document"
          className="bhse-certificate-document relative w-[794px] min-w-[794px] max-w-[794px] h-[1123px] min-h-[1123px] max-h-[1123px] bg-white text-slate-900 rounded-xs shadow-2xl overflow-hidden print:shadow-none print:m-0 print:w-[210mm] print:h-[290mm] print:max-w-[210mm] print:max-h-[290mm] print:min-h-0 print:rounded-none flex flex-col justify-between select-none p-3.5 sm:p-5"
          style={{
            transform: scale < 1 ? `scale(${scale})` : "none",
            boxSizing: "border-box",
          }}
        >
          {/* Authentic Continuous Security Micro-Pattern Watermark (Vector SVG DOM element - always renders in Print & PDF download) */}
          <svg
            className="bhse-bg-watermark absolute inset-0 w-full h-full pointer-events-none z-0"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            style={{
              opacity: 0.85,
              WebkitPrintColorAdjust: "exact",
              printColorAdjust: "exact",
            }}
          >
            <defs>
              <pattern
                id="bhse-watermark-pattern-mig"
                width="208"
                height="9"
                patternUnits="userSpaceOnUse"
              >
                <text
                  x="0"
                  y="7.4"
                  fontFamily="'Arial', 'Helvetica Neue', Helvetica, sans-serif"
                  fontSize="8"
                  fontWeight="700"
                  fill="#9bb2dd"
                  textLength="208"
                  lengthAdjust="spacingAndGlyphs"
                >
                  BOARD OF HIGHER SECONDARY EDUCATION DELHI&#160;
                </text>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#bhse-watermark-pattern-mig)" />
          </svg>

          {/* CSS Pattern Fallback for html2canvas */}
          <div
            className="bhse-bg-watermark-bg absolute inset-0 pointer-events-none z-0 opacity-80"
            style={{
              backgroundImage:
                'url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjA4IiBoZWlnaHQ9IjkiIHZpZXdCb3g9IjAgMCAyMDggOSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGV4dCB4PSIwIiB5PSI3LjQiIGZvbnQtZmFtaWx5PSInQXJpYWwnLCAnaGVsdmV0aWNhIE5ldWUnLCBIZWx2ZXRpY2EsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iOCIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iIzliYjJkZCIgdGV4dExlbmd0aD0iMjA4IiBsZW5ndGhBZGp1c3Q9InNwYWNpbmdBbmRHbHlwaHMiPkJPQVJEIE9GIEhJR0hFUiBTRUNPTkRBUlkgRURVQ0FUSU9OIERFTEhJJiMxNjA7PC90ZXh0Pjwvc3ZnPg==")',
              backgroundRepeat: "repeat",
              backgroundSize: "208px 9px",
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

          {/* Outer Dark Blue Border Frame Container (Exact same single blue border line as CoseMarksheetDegree) */}
          <div className="relative z-10 w-full h-full border-2 border-[#0028a5] p-4 sm:p-6 print:p-5 flex flex-col justify-between">
              {/* Top Recognised Header Strip */}
              <div>
                <div className="flex justify-between items-center text-xs font-bold text-slate-800 tracking-wider border-b border-slate-300 pb-1 px-1 font-serif">
                  <span className="uppercase tracking-widest text-[#0c2356]">Government Recognised</span>
                  <span className="font-mono text-slate-700">Govt. of Delhi Regd. No. 275 (India)</span>
                </div>

                {/* Board Header & Emblem */}
                <div className="text-center mt-2 space-y-0.5">
                  <h1 className="text-2xl sm:text-[27px] font-black text-[#0c2356] tracking-wide font-serif leading-tight">
                    उच्चतर माध्यमिक शिक्षा परिषद्, दिल्ली
                  </h1>
                  <h2 className="text-xl sm:text-[22px] font-extrabold text-[#0c2356] tracking-normal font-serif leading-tight">
                    Board of Higher Secondary Education, Delhi
                  </h2>

                  {/* Central Round Emblem */}
                  <div className="pt-1.5 pb-0.5 flex justify-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full p-1 border-2 border-[#b8860b] shadow-xs flex items-center justify-center ring-2 ring-[#0c2356]/15">
                      <img
                        src="/bhse_emblem_blue.png"
                        alt="BHSE Emblem"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                </div>

                {/* Serial Number & Roll Number Row */}
                <div className="flex justify-between items-end mt-3 text-xs font-semibold px-2">
                  <div>
                    <span className="text-slate-800 font-bold">क्रमांक संख्या :</span>
                    <div className="flex items-baseline gap-1 mt-0.5">
                      <span className="text-slate-700 font-bold">S. No. Mig:</span>
                      <span className="font-mono font-black text-sm text-slate-950 border-b border-dotted border-slate-900 px-3 tracking-widest">
                        {student.serial_no && student.serial_no !== "N/A"
                          ? student.serial_no
                          : student.roll_no
                          ? student.roll_no.slice(-6)
                          : "240926"}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-slate-800 font-bold">अनुक्रमांक</span>
                    <div className="flex items-baseline justify-end gap-1 mt-0.5">
                      <span className="text-slate-700 font-bold">Roll No.</span>
                      <span className="font-mono font-black text-sm sm:text-base text-slate-950 border-b border-dotted border-slate-900 px-3 tracking-widest">
                        {student.roll_no}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Certificate Title Banner */}
                <div className="text-center mt-3 mb-4 sm:mt-4 sm:mb-5 print:mt-2 print:mb-3">
                  <div className="text-base font-bold text-slate-900 tracking-wide font-serif">
                    स्थानान्तरण प्रमाण - पत्र
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-[#0c2356] tracking-widest font-serif uppercase mt-0.5 border-b-2 border-[#0c2356] inline-block px-6 pb-1">
                    MIGRATION CERTIFICATE
                  </div>
                </div>
              </div>

              {/* Certificate Body Paragraphs with Dotted Blanks (Exact Image 1 layout) */}
              <div className="space-y-3.5 sm:space-y-4 print:space-y-3 text-[13px] sm:text-[13.5px] leading-relaxed text-slate-950 px-2 font-serif">
                {/* Clause 1: Student Name */}
                <div>
                  <div className="text-slate-800 font-medium">यह प्रमाणित किया जाता है कि</div>
                  <div className="flex flex-wrap items-baseline gap-1 mt-0.5">
                    <span className="font-medium">This is to certify that</span>
                    <span className="flex-1 font-mono font-black text-sm sm:text-[15px] text-slate-950 uppercase border-b border-dotted border-slate-800 px-2 tracking-wide">
                      {student.student_name}
                    </span>
                  </div>
                </div>

                {/* Clause 2: Father's Name */}
                <div>
                  <div className="text-slate-800 font-medium">आत्मज पुत्र/पुत्री श्री</div>
                  <div className="flex flex-wrap items-baseline gap-1 mt-0.5">
                    <span className="font-medium">Son/daughter of Sh.</span>
                    <span className="flex-1 font-mono font-black text-sm sm:text-[15px] text-slate-950 uppercase border-b border-dotted border-slate-800 px-2 tracking-wide">
                      {student.father_name && student.father_name !== "N/A"
                        ? student.father_name
                        : "MARUF SAHEB"}
                    </span>
                  </div>
                </div>

                {/* Clause 3: Institution Name */}
                <div>
                  <div className="text-slate-800 font-medium">छात्र</div>
                  <div className="flex flex-wrap items-baseline gap-1 mt-0.5">
                    <span className="font-medium">Student of</span>
                    <span className="flex-1 font-mono font-bold text-[13px] text-slate-950 uppercase border-b border-dotted border-slate-800 px-2">
                      {schoolDisplayName}
                    </span>
                  </div>
                </div>

                {/* Clause 4: Affiliated & Appeared Session */}
                <div>
                  <div className="text-slate-800 font-medium">
                    जो कि परिषद् द्वारा मान्यता प्राप्त हैं ने परिषद् की
                  </div>
                  <div className="flex flex-wrap items-baseline gap-1 mt-0.5">
                    <span className="font-medium">
                      an institution affiliated with the board had appeared in the
                    </span>
                    <span className="flex-1 font-mono font-black text-sm text-slate-950 uppercase border-b border-dotted border-slate-800 px-3 tracking-widest text-center">
                      {examSessionName}
                    </span>
                  </div>
                </div>

                {/* Clause 5: Course Exam Name */}
                <div>
                  <div className="flex flex-wrap items-baseline gap-2">
                    <span className="font-mono font-black text-sm sm:text-base text-slate-950 uppercase border-b border-dotted border-slate-800 px-4 tracking-wider">
                      {courseDisplayName}
                    </span>
                    <span className="font-medium">परीक्षा में भाग लिया गया है।</span>
                  </div>
                  <div className="text-slate-600 text-xs border-b border-dotted border-slate-400 mt-1 flex justify-end">
                    <span className="font-serif">of the Parishad</span>
                  </div>
                </div>

                {/* Clause 6: Official No-Objection Statement */}
                <div className="pt-2 p-3 bg-slate-50/70 rounded border border-slate-200/80 space-y-1.5 text-xs sm:text-[12.5px] text-slate-800 leading-relaxed font-sans">
                  <p className="font-serif font-medium text-slate-900">
                    उसके द्वारा किसी भी मान्यता प्राप्त महाविद्यालय / संस्था में प्रवेश प्राप्त करने
                    अथवा विधि द्वारा मान्य किसी भी विद्यालय या अन्य परिषद् / बोर्ड की परीक्षा देने की
                    कोई आपत्ति नहीं है।
                  </p>
                  <p className="font-sans font-medium text-slate-800">
                    This Board has no objection in his/her joining by recognized College/Institute for
                    taking examination of any University or Board established by law.
                  </p>
                </div>
              </div>

              {/* Bottom Signature & Date Block */}
              <div className="flex justify-between items-end pt-3 sm:pt-4 px-2 mt-2 font-serif">
                {/* Left: Date & City */}
                <div className="space-y-0.5 text-xs text-slate-800 font-semibold">
                  <div>दिल्ली</div>
                  <div className="font-mono text-xs text-slate-600">Delhi</div>
                  <div className="pt-1.5">दिनांक</div>
                  <div className="flex items-baseline gap-1">
                    <span>Dated</span>
                    <span className="font-mono font-black text-slate-950 border-b border-dotted border-slate-800 px-2">
                      {issueDate}
                    </span>
                  </div>
                </div>

                {/* Right: Controller Signature */}
                <div className="text-center space-y-0.5">
                  <img
                    src="/bhse_controller_signature.png"
                    alt="Controller Signature (ओमप्रकाश गुप्ता)"
                    className="h-10 sm:h-12 mx-auto object-contain mb-1"
                  />
                  <div className="font-bold text-xs sm:text-sm text-[#0028a5] leading-tight">
                    (ओमप्रकाश गुप्ता)
                  </div>
                  <div className="font-bold text-xs text-[#0028a5] leading-tight">
                    परीक्षा नियंत्रक
                  </div>
                  <div className="font-bold text-[11px] text-[#0028a5] leading-tight uppercase font-sans">
                    Controller of Examination
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};
