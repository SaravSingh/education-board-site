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

      {docType === "DEGREE" ? (
        /* ========================================================================= */
        /* 100% FAITHFUL OFFICIAL BHSE DELHI DEGREE / CERTIFICATE-CUM-MARK SHEET    */
        /* ========================================================================= */
        <div
          id="bhse-degree-document"
          className="bhse-certificate-document relative w-full max-w-[794px] aspect-[210/297] min-h-[1123px] bg-white text-slate-900 rounded-xs shadow-2xl overflow-hidden print:shadow-none print:m-0 print:w-[210mm] print:h-[296.5mm] print:max-w-[210mm] print:max-h-[296.5mm] print:min-h-[296.5mm] print:rounded-none flex flex-col justify-between select-none p-3.5 sm:p-5"
          style={{ boxSizing: "border-box" }}
        >
          {/* Authentic Repeating Security Micro-Pattern Watermark */}
          <div
            className="absolute inset-0 pointer-events-none z-0 opacity-80"
            style={{
              backgroundImage: 'url("/bhse_degree_bg_pattern.svg")',
              backgroundRepeat: "repeat",
              backgroundSize: "340px 12px",
            }}
          />

          {/* Large Central Board Emblem Watermark */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden select-none">
            <img
              src="/bhse_emblem_blue.png"
              alt="Watermark"
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
      ) : (
        /* 100% FAITHFUL OFFICIAL A4 DOCUMENT CONTAINER (COSE MARKSHEET) */
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
              <div className="flex justify-start items-baseline mb-0.5 px-0.5">
                <div className="text-xs sm:text-[13px] print:text-[11px] font-bold text-slate-900 font-sans tracking-wide">
                  <span>क्रमांक (S.No.)</span>{" "}
                  <span className="font-mono font-extrabold text-sm print:text-xs ml-1.5 text-black">
                    {student.serial_no || "401879"}
                  </span>
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
                      <td className="py-1 px-1 border-r border-[#3b82f6]">
                        {student.enrollment_no}
                      </td>
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
                      माता का नाम{" "}
                      <strong className="text-[#133b70] font-bold">Mother's Name</strong>
                    </span>
                    <span className="col-span-7 sm:col-span-8 font-bold uppercase text-slate-900">
                      : {student.mother_name}
                    </span>
                  </div>

                  <div className="grid grid-cols-12 items-baseline">
                    <span className="col-span-5 sm:col-span-4 text-slate-800">
                      पिता का नाम{" "}
                      <strong className="text-[#133b70] font-bold">Father's Name</strong>
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
      )}
    </div>
  );
};
