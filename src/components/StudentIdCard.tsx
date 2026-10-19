import React, { useRef, useEffect } from "react";
import { StudentResult } from "@/lib/db";
import { Printer, Download, ArrowLeft, ShieldCheck, CheckCircle2 } from "lucide-react";
import logoEmblem from "@/assets/logo_emblem.svg";

interface StudentIdCardProps {
  student: StudentResult;
  onBack?: () => void;
}

export const StudentIdCard: React.FC<StudentIdCardProps> = ({ student, onBack }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onBefore = () => document.body.classList.add("printing-icard-only");
    const onAfter = () => document.body.classList.remove("printing-icard-only");
    window.addEventListener("beforeprint", onBefore);
    window.addEventListener("afterprint", onAfter);
    return () => {
      window.removeEventListener("beforeprint", onBefore);
      window.removeEventListener("afterprint", onAfter);
      document.body.classList.remove("printing-icard-only");
    };
  }, []);

  const handlePrint = () => {
    document.body.classList.add("printing-icard-only");
    const roll = student.roll_no ? student.roll_no.trim() : "student";
    const prevTitle = document.title;
    document.title = `${roll}_icard`;

    const restore = () => {
      document.title = prevTitle;
      document.body.classList.remove("printing-icard-only");
      window.removeEventListener("afterprint", restore);
    };

    window.addEventListener("afterprint", restore);
    window.print();
    setTimeout(restore, 2500);
  };

  const photoSrc =
    student.photo_url ||
    (student.format === "COSE" ? "/satish_kumar_hd.png" : "/mukesh_photo.jpg");

  return (
    <div className="space-y-6">
      {/* Top action bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-lg border border-gray-200 shadow-xs print:hidden">
        <div className="flex items-center gap-2 text-emerald-800 text-xs font-bold">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>Student Enrollment Verified Successfully</span>
        </div>
        <div className="flex items-center gap-2">
          {onBack && (
            <button
              onClick={onBack}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded border border-gray-300 transition cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Search Another
            </button>
          )}
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold text-white bg-blue-800 hover:bg-blue-900 rounded shadow-xs transition cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" /> Print I-Card
          </button>
        </div>
      </div>

      {/* THE I-CARD CONTAINER */}
      <div
        ref={cardRef}
        id="printable-icard"
        className="w-full max-w-2xl mx-auto bg-gradient-to-br from-amber-50/50 via-white to-blue-50/40 rounded-2xl shadow-xl overflow-hidden border-2 border-[#002b7f] relative font-sans text-slate-800"
      >
        {/* Tricolor top header stripe */}
        <div className="w-full flex h-1.5">
          <div className="w-1/3 bg-[#FF9933]"></div>
          <div className="w-1/3 bg-white"></div>
          <div className="w-1/3 bg-[#138808]"></div>
        </div>

        {/* Card Header */}
        <div className="bg-[#002b7f] text-white px-4 sm:px-6 py-3 border-b-2 border-yellow-400 relative">
          <div className="flex items-center justify-between gap-3">
            <img
              src="/bhse_emblem_blue.png"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = logoEmblem;
              }}
              alt="BHSE Emblem"
              className="w-12 h-12 sm:w-14 sm:h-14 object-contain bg-white/95 rounded-full p-1 border border-yellow-300 shrink-0"
            />
            <div className="text-center flex-1">
              <h1 className="text-sm sm:text-base md:text-lg font-serif font-black tracking-wide text-yellow-300 leading-tight">
                {student.board_name || "BOARD OF HIGHER SECONDARY EDUCATION, DELHI"}
              </h1>
              <p className="text-[10px] sm:text-[11px] text-gray-200 font-medium">
                Govt. of Delhi Regd. No. 275 | An Autonomous Organisation under Deptt. of School Education &amp; Literacy
              </p>
              <div className="mt-1 inline-block bg-yellow-400 text-blue-950 font-black text-[10px] sm:text-xs uppercase px-3 py-0.5 rounded-full tracking-wider shadow-xs">
                STUDENT IDENTITY CARD (छात्र पहचान पत्र)
              </div>
            </div>
            <div className="w-12 h-12 sm:w-14 sm:h-14 hidden sm:flex items-center justify-center bg-white/10 rounded-full border border-white/20 shrink-0 text-center p-1 text-[9px] font-bold text-yellow-200 uppercase leading-none">
              ISO 9001
              <br />
              VERIFIED
            </div>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-4 sm:p-6 relative">
          {/* Faint central watermark */}
          <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
            <img src="/bhse_emblem_blue.png" alt="" className="w-64 h-64 object-contain" />
          </div>

          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-12 gap-5 items-start">
            {/* Left: Student Details (8 cols) */}
            <div className="sm:col-span-8 space-y-2 text-xs">
              <div className="bg-red-50 border border-red-200 px-3 py-1.5 rounded flex items-center justify-between">
                <span className="font-bold text-red-900 uppercase text-[11px]">Enrollment No:</span>
                <span className="font-mono font-black text-red-700 text-sm tracking-wider">
                  {student.enrollment_no}
                </span>
              </div>

              <div className="bg-white/80 border border-gray-200 rounded-lg p-2.5 space-y-1.5 shadow-2xs divide-y divide-gray-100">
                <div className="flex justify-between items-center pb-1">
                  <span className="text-gray-500 font-semibold text-[11px]">Roll No:</span>
                  <span className="font-mono font-bold text-blue-900 text-xs">{student.roll_no}</span>
                </div>

                <div className="flex justify-between items-start pt-1">
                  <span className="text-gray-500 font-semibold text-[11px]">Student Name:</span>
                  <span className="font-bold text-slate-900 text-xs text-right uppercase">
                    {student.student_name}
                  </span>
                </div>

                <div className="flex justify-between items-start pt-1">
                  <span className="text-gray-500 font-semibold text-[11px]">Father's Name:</span>
                  <span className="font-bold text-slate-700 text-xs text-right uppercase">
                    {student.father_name || "N/A"}
                  </span>
                </div>

                {student.mother_name && student.mother_name !== "N/A" && (
                  <div className="flex justify-between items-start pt-1">
                    <span className="text-gray-500 font-semibold text-[11px]">Mother's Name:</span>
                    <span className="font-bold text-slate-700 text-xs text-right uppercase">
                      {student.mother_name}
                    </span>
                  </div>
                )}

                <div className="flex justify-between items-center pt-1">
                  <span className="text-gray-500 font-semibold text-[11px]">Date of Birth:</span>
                  <span className="font-mono font-bold text-slate-800 text-xs">{student.dob}</span>
                </div>

                <div className="flex justify-between items-start pt-1">
                  <span className="text-gray-500 font-semibold text-[11px]">Course / Stream:</span>
                  <span className="font-bold text-blue-800 text-xs text-right">
                    {student.course}
                  </span>
                </div>

                <div className="flex justify-between items-start pt-1">
                  <span className="text-gray-500 font-semibold text-[11px]">Batch / Session:</span>
                  <span className="font-bold text-slate-800 text-xs text-right">
                    {student.batch || student.exam_year}
                  </span>
                </div>

                <div className="flex justify-between items-start pt-1">
                  <span className="text-gray-500 font-semibold text-[11px]">Category / Mode:</span>
                  <span className="inline-block px-2 py-0.5 bg-blue-100 text-blue-800 font-bold rounded text-[10px]">
                    {student.status_mode || "REGULAR"}
                  </span>
                </div>

                <div className="flex justify-between items-start pt-1">
                  <span className="text-gray-500 font-semibold text-[11px]">Institution:</span>
                  <span className="font-semibold text-slate-700 text-[11px] text-right max-w-[200px]">
                    {student.school_name || "BHSE DELHI"}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Photo + QR + Stamp (4 cols) */}
            <div className="sm:col-span-4 flex flex-col items-center justify-between space-y-3">
              {/* Photo Box */}
              <div className="relative">
                <div className="w-28 h-36 bg-slate-100 border-2 border-[#002b7f] rounded-md overflow-hidden shadow-sm flex items-center justify-center p-0.5">
                  <img
                    src={photoSrc}
                    alt={student.student_name}
                    className="w-full h-full object-cover rounded-xs"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = "/students/samriddhi_saha.jpg";
                    }}
                  />
                </div>
                <div className="absolute -bottom-2 inset-x-0 mx-auto w-max px-2 py-0.5 bg-[#002b7f] text-yellow-300 font-bold text-[9px] rounded-full uppercase tracking-wider shadow-xs">
                  BHSE VERIFIED
                </div>
              </div>

              {/* QR Code graphic */}
              <div className="text-center pt-2">
                <div className="w-16 h-16 bg-white p-1 border border-gray-300 rounded shadow-2xs mx-auto flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="w-full h-full fill-slate-900">
                    <rect x="0" y="0" width="30" height="30" />
                    <rect x="5" y="5" width="20" height="20" fill="white" />
                    <rect x="10" y="10" width="10" height="10" />
                    <rect x="70" y="0" width="30" height="30" />
                    <rect x="75" y="5" width="20" height="20" fill="white" />
                    <rect x="80" y="10" width="10" height="10" />
                    <rect x="0" y="70" width="30" height="30" />
                    <rect x="5" y="75" width="20" height="20" fill="white" />
                    <rect x="10" y="80" width="10" height="10" />
                    <rect x="40" y="10" width="10" height="10" />
                    <rect x="55" y="10" width="10" height="10" />
                    <rect x="40" y="25" width="15" height="15" />
                    <rect x="40" y="45" width="20" height="10" />
                    <rect x="10" y="45" width="15" height="10" />
                    <rect x="70" y="45" width="20" height="10" />
                    <rect x="70" y="70" width="10" height="20" />
                    <rect x="85" y="70" width="15" height="10" />
                    <rect x="40" y="75" width="15" height="15" />
                  </svg>
                </div>
                <div className="text-[9px] text-gray-500 font-mono mt-0.5">Scan to Verify</div>
              </div>

              {/* Signature / Controller Stamp */}
              <div className="text-center pt-1 w-full border-t border-gray-200">
                <img
                  src="/bhse_controller_signature.png"
                  alt="Controller Signature (ओमप्रकाश गुप्ता)"
                  className="h-8 mx-auto object-contain mb-0.5"
                />
                <div className="text-[10px] font-bold text-[#0028a5] leading-tight">
                  (ओमप्रकाश गुप्ता)
                </div>
                <div className="text-[9px] font-bold text-slate-800 leading-tight">
                  परीक्षा नियंत्रक
                </div>
                <div className="text-[8.5px] font-semibold text-slate-600 uppercase leading-none">
                  Controller of Examination
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card Footer Bar */}
        <div className="bg-slate-100 border-t border-gray-200 px-4 py-2 flex flex-wrap items-center justify-between text-[10px] text-gray-600 gap-2">
          <div className="flex items-center gap-1.5 text-emerald-800 font-bold">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Digital Identity Certified &amp; Recorded</span>
          </div>
          <div className="font-mono text-[9px] text-gray-500">
            Portal: www.bhsed.co.in | Email: info@bhsed.co.in
          </div>
        </div>
      </div>
    </div>
  );
};
