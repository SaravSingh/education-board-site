import React, { useState } from "react";
import { StudentResult, SubjectMarks, numberToIndividualDigitWords } from "@/lib/db";
import { Printer, ArrowLeft, Award, FileText, CheckCircle2 } from "lucide-react";

interface CoseMarksheetDegreeProps {
  student: StudentResult;
  onBack?: () => void;
  defaultDocType?: "MARKSHEET" | "DEGREE";
}

export const CoseMarksheetDegree: React.FC<CoseMarksheetDegreeProps> = ({
  student,
  onBack,
  defaultDocType = "MARKSHEET",
}) => {
  const [docType, setDocType] = useState<"MARKSHEET" | "DEGREE">(defaultDocType);

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

  return (
    <div className="w-full flex flex-col items-center">
      {/* Top Action & Switching Bar (Hidden in Print) */}
      <div className="w-full max-w-[800px] mb-4 bg-white/95 backdrop-blur-xs p-3 rounded-xl border border-slate-300 shadow-md flex flex-wrap items-center justify-between gap-3 print:hidden">
        {onBack && (
          <button
            onClick={onBack}
            className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </button>
        )}

        {/* Doc Type Selector */}
        <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-300">
          <button
            onClick={() => setDocType("MARKSHEET")}
            className={`px-3.5 py-1 text-xs font-bold rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
              docType === "MARKSHEET"
                ? "bg-[#1b3f8b] text-white shadow-xs"
                : "text-slate-700 hover:text-slate-900"
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>अंक विवरणिका (Marks Statement)</span>
          </button>

          {/* प्रमाण पत्र (Degree Certificate) button hidden for now — will be worked on in the future */}
          {/*
          <button
            onClick={() => setDocType("DEGREE")}
            className={`px-3.5 py-1 text-xs font-bold rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
              docType === "DEGREE"
                ? "bg-[#1b3f8b] text-white shadow-xs"
                : "text-slate-700 hover:text-slate-900"
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>प्रमाण पत्र (Degree Certificate)</span>
          </button>
          */}
        </div>

        {/* Print / Save PDF Button */}
        <button
          onClick={() => window.print()}
          className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-lg transition-all shadow-md cursor-pointer flex items-center gap-1.5 active:scale-95"
        >
          <Printer className="w-4 h-4 text-yellow-300" />
          <span>Print / Save PDF (A4 100%)</span>
        </button>
      </div>

      {/* 100% FAITHFUL OFFICIAL A4 DOCUMENT CONTAINER */}
      <div
        id="cose-official-document"
        className="cose-certificate-document relative w-full max-w-[794px] aspect-[210/297] min-h-[1123px] bg-[#fffdf6] text-slate-900 rounded-sm shadow-2xl overflow-hidden print:shadow-none print:m-0 print:w-[210mm] print:h-[296.5mm] print:max-w-[210mm] print:max-h-[296.5mm] print:min-h-[296.5mm] print:rounded-none flex flex-col justify-start select-none"
        style={{
          boxSizing: "border-box",
        }}
      >
        {/* Authentic Repeating Security Micro-Pattern Watermark */}
        <div
          className="absolute inset-0 pointer-events-none z-0 opacity-100"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='240' height='36' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='120' y='24' font-family='Arial, sans-serif' font-size='8.5' font-weight='700' fill='%23d97706' fill-opacity='0.075' text-anchor='middle'%3ECOSE • COUNCIL OF OPEN SCHOOL EDUCATION%3C/text%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
          }}
        />

        {/* Center Circular Council Emblem Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 opacity-[0.085]">
          <img
            src="/cose_emblem_clean.png"
            alt="COSE Watermark"
            className="w-[360px] h-[360px] object-contain"
          />
        </div>

        {/* Authentic High-Resolution Greek-Key Decorative Frame Overlay */}
        <div className="absolute top-[2.0%] bottom-[3.6%] left-[2.8%] right-[2.8%] pointer-events-none z-30 select-none">
          <img
            src="/cose_border_frame.png"
            alt="Authentic Certificate Border"
            className="w-full h-full object-fill block"
          />
        </div>

        {/* DOCUMENT INTERIOR CONTENT (Padded carefully inside the Greek-key border lines) */}
        <div className="relative z-20 px-[9.5%] pt-[4.2%] pb-[4.0%] flex flex-col justify-start h-full min-h-0 text-slate-900 font-serif">
          {/* TOP SECTION: SERIAL NO & EMBLEM HEADERS */}
          <div>
            {/* Top Serial Number */}
            <div className="flex justify-between items-baseline mb-0.5 px-0.5">
              <div className="text-xs sm:text-[13px] print:text-[11px] font-bold text-slate-900 font-sans tracking-wide">
                <span>क्रमांक (S.No.)</span>{" "}
                <span className="font-mono font-extrabold text-sm print:text-xs ml-1.5 text-black">
                  {student.serial_no || "401879"}
                </span>
              </div>
              <div className="text-[10px] print:text-[8.5px] text-slate-700 font-sans font-extrabold uppercase tracking-wider">
                COSE RAJASTHAN
              </div>
            </div>

            {/* Dual Arched Header over Emblem (SVG Curved Text matching original PDF) */}
            <div className="w-full flex flex-col items-center justify-center -mt-0.5 relative">
              <svg
                viewBox="0 0 680 115"
                className="w-full max-w-[620px] h-[62px] sm:h-[70px] print:h-[64px] overflow-visible"
              >
                <defs>
                  <path id="hindiCurve" d="M 45,100 Q 340,10 635,100" fill="none" />
                  <path id="englishCurve" d="M 65,110 Q 340,38 615,110" fill="none" />
                </defs>
                <text
                  className="font-serif font-black"
                  fontSize="22"
                  fontWeight="900"
                  fill="#133b70"
                  textAnchor="middle"
                >
                  <textPath href="#hindiCurve" startOffset="50%">
                    मुक्त विद्यालय शिक्षा परिषद्, राजस्थान
                  </textPath>
                </text>
                <text
                  className="font-sans font-black"
                  fontSize="14"
                  fontWeight="900"
                  fill="#133b70"
                  textAnchor="middle"
                  letterSpacing="1.2"
                >
                  <textPath href="#englishCurve" startOffset="50%">
                    COUNCIL OF OPEN SCHOOL EDUCATION, RAJASTHAN
                  </textPath>
                </text>
              </svg>

              {/* Center Circular Colorful Council Emblem */}
              <div className="-mt-6 sm:-mt-7 print:-mt-6 mb-0.5 z-10">
                <img
                  src="/cose_emblem_clean.png"
                  alt="Council of Open School Education Emblem"
                  className="w-15 h-15 sm:w-16 sm:h-16 print:w-14 print:h-14 object-contain drop-shadow-xs"
                />
              </div>

              {/* 3 Subtitle Registration Lines */}
              <div className="text-center text-[9.5px] sm:text-[10px] print:text-[8.5px] font-sans font-bold text-slate-800 leading-tight space-y-0.5 mb-1">
                <p>[Registered Under Government of Rajasthan]</p>
                <p>Regd. Under NCT &amp; Ministry of Labour, Govt. of India</p>
                <p>An Autonomous Institution under Copyright MHRD</p>
              </div>

              {/* Exam Session Title */}
              <div className="w-full flex items-center justify-between font-sans font-bold text-xs sm:text-[12.5px] print:text-[11px] text-slate-900 px-1 mb-1">
                <span>
                  {courseTitleHindi} ({courseTitleEnglish}-
                </span>
                <span className="font-extrabold uppercase font-mono tracking-wider">
                  {examSession} )
                </span>
              </div>

              {/* Navy Blue Title Banner - SVG Rendered so background fill ALWAYS prints */}
              <svg
                viewBox="0 0 680 28"
                className="w-full h-[25px] sm:h-[28px] print:h-[25px] mb-1.5 select-none overflow-hidden rounded-xs"
              >
                <rect width="680" height="28" fill="#1b3f8b" rx="2" stroke="#103070" />
                <text
                  x="340"
                  y="19"
                  fill="#ffffff"
                  fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
                  fontSize="13.5"
                  fontWeight="900"
                  textAnchor="middle"
                  letterSpacing="1.5"
                >
                  {docType === "MARKSHEET"
                    ? "अंक विवरणिका / MARKS STATEMENT"
                    : "प्रमाण पत्र / PASSING CERTIFICATE (DEGREE)"}
                </text>
              </svg>
            </div>

            {/* 4-Box Top Metadata Table */}
            <div className="mb-2">
              <table className="w-full border-collapse border border-[#3b82f6] text-center font-sans">
                <thead>
                  <tr
                    className="text-slate-900 font-bold text-[10px] sm:text-[11px] print:text-[9.5px] border-b border-[#3b82f6]"
                    style={{
                      backgroundColor: "#e4effa",
                      WebkitPrintColorAdjust: "exact",
                      printColorAdjust: "exact",
                    }}
                  >
                    <th className="py-1 px-1 border-r border-[#3b82f6] w-1/4">
                      नामांकन / Enrollment
                    </th>
                    <th className="py-1 px-1 border-r border-[#3b82f6] w-1/4">
                      अनुक्रमांक / Roll No.
                    </th>
                    <th className="py-1 px-1 border-r border-[#3b82f6] w-1/4">
                      केंद्र कोड / Centre Code
                    </th>
                    <th className="py-1 px-1 border-[#3b82f6] w-1/4">
                      परीक्षा प्रवर्ग / Exam Type
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="font-mono text-xs sm:text-[12.5px] print:text-[11px] font-bold text-slate-900 bg-white/80">
                    <td className="py-1 px-1 border-r border-[#3b82f6]">{student.enrollment_no}</td>
                    <td className="py-1 px-1 border-r border-[#3b82f6]">{student.roll_no}</td>
                    <td className="py-1 px-1 border-r border-[#3b82f6]">
                      {student.centre_code || student.school_code}
                    </td>
                    <td className="py-1 px-1 border-[#3b82f6] uppercase">
                      {student.exam_type || student.status_mode || "ON DEMAND"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Candidate Bio Information Card + Photo */}
            <div className="border border-[#3b82f6] bg-white/80 p-2 sm:p-2.5 print:p-2 mb-2 flex items-center justify-between gap-4 text-xs font-sans">
              <div className="flex-1 space-y-1.5 print:space-y-1 text-slate-900 text-xs sm:text-[12px] print:text-[11px] font-semibold">
                <div className="grid grid-cols-12 items-baseline">
                  <span className="col-span-5 sm:col-span-4 text-slate-800">
                    नाम <strong className="text-[#133b70] font-bold">Name</strong>
                  </span>
                  <span className="col-span-7 sm:col-span-8 font-black uppercase text-slate-950 font-serif">
                    : {student.student_name}
                  </span>
                </div>

                <div className="grid grid-cols-12 items-baseline">
                  <span className="col-span-5 sm:col-span-4 text-slate-800">
                    माता का नाम <strong className="text-[#133b70] font-bold">Mother's Name</strong>
                  </span>
                  <span className="col-span-7 sm:col-span-8 font-bold uppercase text-slate-900">
                    : {student.mother_name}
                  </span>
                </div>

                <div className="grid grid-cols-12 items-baseline">
                  <span className="col-span-5 sm:col-span-4 text-slate-800">
                    पिता का नाम <strong className="text-[#133b70] font-bold">Father's Name</strong>
                  </span>
                  <span className="col-span-7 sm:col-span-8 font-bold uppercase text-slate-900">
                    : {student.father_name}
                  </span>
                </div>

                <div className="grid grid-cols-12 items-baseline">
                  <span className="col-span-5 sm:col-span-4 text-slate-800">
                    जन्म तिथि <strong className="text-[#133b70] font-bold">Date of Birth</strong>
                  </span>
                  <span className="col-span-7 sm:col-span-8 font-mono font-bold text-slate-900">
                    : {student.dob}
                  </span>
                </div>
              </div>

              {/* Passport Photo Frame */}
              <div className="shrink-0 flex items-center justify-center">
                <div className="border border-slate-700 p-0.5 bg-white shadow-xs rounded-2xs">
                  <img
                    src={student.photo_url || "/satish_kumar_hd.png"}
                    alt={student.student_name}
                    className="w-[78px] h-[100px] sm:w-[86px] sm:h-[108px] print:w-[78px] print:h-[100px] object-cover block"
                  />
                </div>
              </div>
            </div>

            {/* DOCUMENT VIEW 1: OFFICIAL MARKS TABLE */}
            {docType === "MARKSHEET" && (
              <div className="mb-2">
                <table className="w-full border-collapse border border-[#3b82f6] text-center font-sans text-xs print:text-[10px]">
                  <thead>
                    <tr
                      className="text-slate-900 font-bold text-[9.5px] sm:text-[10.5px] print:text-[9.5px] border-b border-[#3b82f6]"
                      style={{
                        backgroundColor: "#e4effa",
                        WebkitPrintColorAdjust: "exact",
                        printColorAdjust: "exact",
                      }}
                    >
                      <th className="py-1 px-1 border-r border-[#3b82f6] w-[10%]">
                        कोड
                        <br />
                        CODE
                      </th>
                      <th className="py-1 px-1.5 border-r border-[#3b82f6] text-left w-[25%]">
                        विषय
                        <br />
                        SUBJECT
                      </th>
                      <th className="py-1 px-1 border-r border-[#3b82f6] w-[13%]">
                        अधिकतम अंक
                        <br />
                        MAX MARKS
                      </th>
                      <th className="py-0.5 px-0.5 border-r border-[#3b82f6] w-[27%]" colSpan={3}>
                        प्राप्तांक MARKS OBTAINED
                        <div className="grid grid-cols-3 border-t border-[#3b82f6] mt-0.5 pt-0.5 text-[8.5px] sm:text-[9.5px] print:text-[8.5px]">
                          <span>
                            सैद्धांतिक
                            <br />
                            Theory
                          </span>
                          <span className="border-l border-[#3b82f6]">
                            प्रायोगिक
                            <br />
                            Practical
                          </span>
                          <span className="border-l border-[#3b82f6]">
                            कुल
                            <br />
                            Total
                          </span>
                        </div>
                      </th>
                      <th className="py-1 px-1 border-r border-[#3b82f6] w-[19%]">
                        कुल अंक शब्दों में /<br />
                        TOTAL MARKS IN WORDS
                      </th>
                      <th className="py-1 px-1 border-[#3b82f6] w-[6%]">
                        ग्रेड
                        <br />
                        GRADE
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {subjects.map((sub: SubjectMarks, idx: number) => {
                      const hasPractical = sub.practical && sub.practical > 0;
                      return (
                        <tr
                          key={idx}
                          className="border-b border-[#3b82f6] bg-white/70 font-mono text-xs sm:text-[12px] print:text-[10.5px] text-slate-900"
                        >
                          <td className="py-1.5 px-1 border-r border-[#3b82f6] font-bold">
                            {sub.code || `20${idx + 1}`}
                          </td>
                          <td className="py-1.5 px-1.5 border-r border-[#3b82f6] text-left font-sans font-bold">
                            {sub.name}
                          </td>
                          <td className="py-1.5 px-1 border-r border-[#3b82f6]">
                            {sub.max_marks || 100}
                          </td>
                          <td className="py-1.5 px-1 border-r border-[#3b82f6]">{sub.theory}</td>
                          <td className="py-1.5 px-1 border-r border-[#3b82f6]">
                            {hasPractical ? sub.practical : "XX"}
                          </td>
                          <td className="py-1.5 px-1 border-r border-[#3b82f6] font-bold">
                            {sub.total}
                          </td>
                          <td className="py-1.5 px-1 border-r border-[#3b82f6] font-sans font-bold uppercase text-[10px] sm:text-[11px] print:text-[9.5px] text-center">
                            {sub.words || numberToIndividualDigitWords(sub.total)}
                          </td>
                          <td className="py-1.5 px-1 border-[#3b82f6]"></td>
                        </tr>
                      );
                    })}

                    {/* Result & Grand Total Row */}
                    <tr className="bg-white/95 font-sans font-bold text-xs sm:text-[12px] print:text-[10.5px] border-t-2 border-[#3b82f6]">
                      <td colSpan={3} className="py-1.5 print:py-1 px-2 border-r border-[#3b82f6]">
                        <div className="flex items-center justify-between">
                          <span className="font-extrabold text-slate-800">परिणाम RESULT</span>
                          <span className="font-black uppercase text-emerald-900 text-xs sm:text-sm print:text-xs">
                            {student.status || "PASS FIRST DIVISION"}
                          </span>
                        </div>
                      </td>
                      <td colSpan={5} className="py-1.5 print:py-1 px-2 border-[#3b82f6]">
                        <div className="flex items-center justify-between">
                          <span className="font-extrabold text-slate-800">कुल योग GRAND TOTAL</span>
                          <div className="flex items-center gap-2 font-mono">
                            <span className="font-black text-xs sm:text-sm print:text-xs">
                              {student.total_marks}/{student.max_marks}
                            </span>
                            <span className="font-sans font-bold uppercase text-xs print:text-[10px] text-slate-800">
                              {student.total_words ||
                                numberToIndividualDigitWords(student.total_marks)}
                            </span>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {/* DOCUMENT VIEW 2: PASSING CERTIFICATE / DEGREE */}
            {docType === "DEGREE" && (
              <div className="border-2 border-[#1b3f8b] bg-white/90 p-4 sm:p-5 print:p-3 rounded-sm space-y-2.5 print:space-y-1.5 text-center my-2 shadow-xs">
                <div className="flex justify-center">
                  <div className="inline-flex items-center gap-1.5 px-3 py-0.5 bg-amber-100 border border-amber-500 text-amber-950 font-bold text-xs print:text-[10px] rounded-full uppercase tracking-wider">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                    <span>Official Council Certification</span>
                  </div>
                </div>

                <div className="text-xs sm:text-sm print:text-[11px] font-serif font-extrabold text-[#133b70] leading-relaxed">
                  प्रमाणित किया जाता है कि / This is to certify that
                </div>

                <div className="text-lg sm:text-xl print:text-base font-black uppercase text-slate-950 font-serif tracking-wide border-b-2 border-dashed border-[#1b3f8b] pb-0.5 px-4 inline-block">
                  {student.student_name}
                </div>

                <p className="text-xs sm:text-[12px] print:text-[10.5px] text-slate-800 leading-relaxed font-sans">
                  सुपुत्र / सुपुत्री श्रीमती (Son/Daughter of Smt.){" "}
                  <strong className="uppercase text-slate-950">{student.mother_name}</strong> एवं
                  श्री (and Sh.){" "}
                  <strong className="uppercase text-slate-950">{student.father_name}</strong>
                  <br />
                  अनुक्रमांक (Roll No.){" "}
                  <strong className="font-mono text-blue-900 font-bold">{student.roll_no}</strong> |
                  नामांकन (Enrollment No.){" "}
                  <strong className="font-mono text-blue-900 font-bold">
                    {student.enrollment_no}
                  </strong>
                </p>

                <div className="p-2 print:p-1.5 bg-slate-50 border border-slate-200 rounded max-w-xl mx-auto font-sans text-xs sm:text-[12px] print:text-[10.5px] leading-relaxed text-slate-900">
                  ने परिषद् द्वारा आयोजित {courseTitleHindi} ({courseTitleEnglish}) सत्र{" "}
                  <strong>{examSession}</strong> में सम्मिलित होकर{" "}
                  <strong className="text-emerald-800 uppercase underline decoration-2">
                    {student.status || "PASS FIRST DIVISION"}
                  </strong>{" "}
                  में उत्तीर्ण की है।
                </div>

                <div className="text-[10px] print:text-[9.5px] text-slate-600 font-sans italic">
                  Having satisfied all academic requirements, this official Passing Certificate
                  &amp; Degree is conferred by the Council of Open School Education, Rajasthan.
                </div>
              </div>
            )}
          </div>

          {/* BOTTOM SECTION: PLACE, DATE, SEAL, SIGNATURE */}
          <div className="mt-6 print:mt-5">
            <div className="grid grid-cols-12 items-end text-xs sm:text-[12px] print:text-[10.5px] font-sans">
              {/* Left Column: Place & Date */}
              <div className="col-span-4 text-left space-y-1 text-slate-900">
                <div className="flex items-baseline gap-1">
                  <span className="font-bold">स्थान Place</span>
                  <span>:</span>
                  <span className="font-bold uppercase font-mono">
                    {student.place || "SURATGARH(RAJ.)"}
                  </span>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="font-bold">दिनांक Date</span>
                  <span>:</span>
                  <span className="font-mono font-bold">
                    {student.result_declaration_date || "15/07/2009"}
                  </span>
                </div>

                <div className="text-[9.5px] sm:text-[10px] print:text-[8.5px] text-slate-700 italic pt-1 leading-tight font-serif font-medium">
                  Note : For Important Instructions see overleaf.
                </div>
              </div>

              {/* Center Column: Round Official Council Stamp */}
              <div className="col-span-4 flex justify-center items-center">
                <img
                  src="/cose_stamp_clean.png"
                  alt="Official COSE Seal"
                  className="w-22 h-22 sm:w-24 sm:h-24 print:w-20 print:h-20 object-contain opacity-95 hover:rotate-2 transition-transform select-none"
                />
              </div>

              {/* Right Column: Controller Signature & Designation */}
              <div className="col-span-4 text-right flex flex-col items-end">
                <div className="mb-0.5">
                  <img
                    src="/cose_signature_clean.png"
                    alt="Controller Signature"
                    className="h-10 sm:h-12 print:h-10 object-contain select-none"
                  />
                </div>
                <div className="font-serif font-black text-xs sm:text-[12.5px] print:text-[11px] text-slate-900 leading-tight">
                  परीक्षा नियंत्रक
                </div>
                <div className="font-serif font-bold text-[11px] sm:text-[11.5px] print:text-[10px] text-slate-800 leading-tight">
                  Controller of Examinations
                </div>
                <div className="text-[9.5px] sm:text-[10px] print:text-[8.5px] text-slate-700 font-sans leading-tight">
                  Council of Open School Education, Rajasthan
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footnote Line Below Border */}
        <div className="absolute bottom-[0.8%] left-0 right-0 text-center text-[10px] print:text-[8px] font-sans font-medium text-slate-700 z-40 select-none">
          To verify your mark sheet please send details on:{" "}
          <a
            href="mailto:info@cose.co.in"
            className="font-mono font-bold text-blue-900 hover:underline"
          >
            info@cose.co.in
          </a>{" "}
          Visit{" "}
          <a
            href="http://www.cose.co.in"
            target="_blank"
            rel="noreferrer"
            className="font-mono font-bold text-blue-900 hover:underline"
          >
            www.cose.co.in
          </a>
        </div>
      </div>
    </div>
  );
};
