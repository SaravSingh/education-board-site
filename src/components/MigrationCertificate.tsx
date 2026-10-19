import React, { useRef, useState, useEffect } from "react";
import { StudentResult } from "@/lib/db";
import { DocumentWatermarkBg } from "@/components/DocumentWatermarkBg";
import { Printer, Download, ArrowLeft, Award, FileText } from "lucide-react";

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
          className="bhse-certificate-document bg-white border-2 border-slate-300 relative flex flex-col justify-between origin-top transition-transform duration-200 shadow-xl print:shadow-none print:transform-none! print:w-[210mm] print:h-[296.5mm] print:m-0"
          style={{
            transform: scale < 1 ? `scale(${scale})` : "none",
            width: "794px",
            minWidth: "794px",
            maxWidth: "794px",
            height: "1123px",
            minHeight: "1123px",
            padding: "48px 56px",
            boxSizing: "border-box",
          }}
        >
          {/* Authentic Security Background Pattern */}
          <DocumentWatermarkBg opacity={0.88} emblemOpacity={0.08} showEmblem={true} />

          {/* Foreground Document Layer */}
          <div className="relative z-10 h-full flex flex-col justify-between text-slate-900">
            {/* Top Recognised Header Strip */}
            <div>
              <div className="flex justify-between items-center text-xs font-semibold text-slate-800 border-b border-transparent pb-1">
                <span>Government Recognised</span>
                <span>Govt. of Delhi Regd. No. 275 (India)</span>
              </div>

              {/* Board Header & Emblem */}
              <div className="text-center mt-3 space-y-1">
                <h1 className="text-2xl sm:text-[26px] font-black text-[#1a2e7b] tracking-wide font-serif leading-tight">
                  उच्चतर माध्यमिक शिक्षा परिषद्, दिल्ली
                </h1>
                <h2 className="text-xl sm:text-[22px] font-bold text-[#1a2e7b] tracking-normal font-serif leading-tight">
                  Board of Higher Secondary Education, Delhi
                </h2>

                {/* Central Round Emblem */}
                <div className="pt-2 pb-1 flex justify-center">
                  <div className="w-20 h-20 bg-white/90 rounded-full p-1 border border-slate-300 shadow-2xs flex items-center justify-center">
                    <img
                      src="/bhse_emblem_blue.png"
                      alt="BHSE Emblem"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              </div>

              {/* Serial Number & Roll Number Row */}
              <div className="flex justify-between items-end mt-4 text-xs font-semibold px-2">
                <div>
                  <span className="text-slate-800">क्रमांक संख्या :</span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="text-slate-700">S. No. Mig:</span>
                    <span className="font-mono font-black text-sm text-slate-950 border-b border-dotted border-slate-800 px-3 tracking-widest">
                      {student.serial_no || "240926"}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-slate-800">अनुक्रमांक</span>
                  <div className="flex items-baseline justify-end gap-1 mt-0.5">
                    <span className="text-slate-700">Roll No.</span>
                    <span className="font-mono font-black text-sm sm:text-base text-slate-950 border-b border-dotted border-slate-800 px-3 tracking-widest">
                      {student.roll_no}
                    </span>
                  </div>
                </div>
              </div>

              {/* Certificate Title Banner */}
              <div className="text-center mt-6 mb-8">
                <div className="text-base font-bold text-slate-900 tracking-wide font-serif">
                  स्थानान्तरण प्रमाण - पत्र
                </div>
                <div className="text-xl font-black text-slate-950 tracking-wider font-serif uppercase mt-0.5 border-b-2 border-slate-900 inline-block px-4 pb-0.5">
                  MIGRATION CERTIFICATE
                </div>
              </div>
            </div>

            {/* Certificate Body Paragraphs with Dotted Blanks (Exact Image 1 layout) */}
            <div className="space-y-6 text-[13px] leading-loose text-slate-900 px-2 font-serif">
              {/* Clause 1: Student Name */}
              <div>
                <div className="text-slate-800 font-medium">यह प्रमाणित किया जाता है कि</div>
                <div className="flex flex-wrap items-baseline gap-1 mt-0.5">
                  <span className="font-medium">This is to certify that</span>
                  <span className="flex-1 font-mono font-black text-sm text-slate-950 uppercase border-b border-dotted border-slate-800 px-2 tracking-wide">
                    {student.student_name}
                  </span>
                </div>
              </div>

              {/* Clause 2: Father's Name */}
              <div>
                <div className="text-slate-800 font-medium">आत्मज पुत्र/पुत्री श्री</div>
                <div className="flex flex-wrap items-baseline gap-1 mt-0.5">
                  <span className="font-medium">Son/daughter of Sh.</span>
                  <span className="flex-1 font-mono font-black text-sm text-slate-950 uppercase border-b border-dotted border-slate-800 px-2 tracking-wide">
                    {student.father_name || "N/A"}
                  </span>
                </div>
              </div>

              {/* Clause 3: Institution Name */}
              <div>
                <div className="text-slate-800 font-medium">छात्र</div>
                <div className="flex flex-wrap items-baseline gap-1 mt-0.5">
                  <span className="font-medium">Student of</span>
                  <span className="flex-1 font-mono font-bold text-[12.5px] text-slate-950 uppercase border-b border-dotted border-slate-800 px-2">
                    {schoolDisplayName}
                  </span>
                </div>
              </div>

              {/* Clause 4: Affiliated & Appeared Session */}
              <div>
                <div className="text-slate-800 font-medium">जो कि परिषद् द्वारा मान्यता प्राप्त हैं ने परिषद् की</div>
                <div className="flex flex-wrap items-baseline gap-1 mt-0.5">
                  <span className="font-medium">an institution affiliated with the board had appeared in the</span>
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
                <div className="text-slate-700 text-xs border-b border-dotted border-slate-400 mt-1">
                  ............................................................................................................................................ of the Parishad
                </div>
              </div>

              {/* Clause 6: Official No-Objection Statement */}
              <div className="pt-2 space-y-1.5 text-xs sm:text-[12.5px] text-slate-800 leading-relaxed font-sans">
                <p>
                  उसके द्वारा किसी भी मान्यता प्राप्त महाविद्यालय / संस्था में प्रवेश प्राप्त करने अथवा विधि द्वारा मान्य किसी भी विद्यालय या अन्य परिषद् / बोर्ड की परीक्षा देने की कोई आपत्ति नहीं है।
                </p>
                <p className="font-medium text-slate-900">
                  This Board has no objection in his/her joining by recognized College/Institue for taking examination of any University or Board established by law.
                </p>
              </div>
            </div>

            {/* Bottom Signature & Date Block */}
            <div className="flex justify-between items-end pt-8 px-2 mt-4 font-serif">
              {/* Left: Date & City */}
              <div className="space-y-0.5 text-xs text-slate-800 font-semibold">
                <div>दिल्ली</div>
                <div className="font-mono text-xs">Delhi</div>
                <div className="pt-1">दिनांक</div>
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
                  className="h-10 sm:h-11 mx-auto object-contain mb-1"
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
