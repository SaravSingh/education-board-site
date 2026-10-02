import { createFileRoute } from "@tanstack/react-router";
import React, { useState, useEffect } from "react";
import { dbStore, StudentResult, SubjectMarks } from "@/lib/db";
import {
  Printer,
  LogOut,
  AlertCircle,
  Loader2,
} from "lucide-react";
import digiLockerLogo from "@/assets/digilocker_logo.png";
import dobseEmblem from "@/assets/dobse_emblem.png";
import mukeshPhoto from "@/assets/mukesh_photo.jpg";

export const Route = createFileRoute("/digilocker")({
  head: () => ({
    meta: [
      { title: "DigiLocker | Sign In" },
      {
        name: "description",
        content:
          "DigiLocker Sign In — Enter Enrollment Number and Date of Birth to access issued official documents.",
      },
    ],
  }),
  component: DigiLockerPage,
});

/* Helper to calculate CBSE/DOBSE 9-point scale grade */
function getGrade(marks: number, maxMarks: number = 100): string {
  const percentage = (marks / maxMarks) * 100;
  if (percentage >= 91) return "A1";
  if (percentage >= 81) return "A2";
  if (percentage >= 71) return "B1";
  if (percentage >= 61) return "B2";
  if (percentage >= 51) return "C1";
  if (percentage >= 41) return "C2";
  if (percentage >= 33) return "D";
  return "E";
}

/* Helper to compute CGPA */
function calculateCGPA(subjects: SubjectMarks[]): string {
  if (!subjects.length) return "8.1";
  const gradePoints: Record<string, number> = {
    A1: 10,
    A2: 9,
    B1: 8,
    B2: 7,
    C1: 6,
    C2: 5,
    D: 4,
    E: 0,
  };
  const totalPoints = subjects.reduce((sum, s) => {
    const sTotal = typeof s.total === "number" ? s.total : s.theory + (s.practical || 0);
    const g = getGrade(sTotal, s.max_marks || 100);
    return sum + (gradePoints[g] ?? 7);
  }, 0);
  return (totalPoints / subjects.length).toFixed(1);
}

/* Helper to format date of birth cleanly as YYYY-MM-DD */
function formatDob(dobStr: string): string {
  if (!dobStr) return "N/A";
  if (/^\d{4}-\d{2}-\d{2}$/.test(dobStr)) return dobStr;
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(dobStr)) {
    const [d, m, y] = dobStr.split("/");
    return `${y}-${m}-${d}`;
  }
  if (/^\d{2}-\d{2}-\d{4}$/.test(dobStr)) {
    const [d, m, y] = dobStr.split("-");
    return `${y}-${m}-${d}`;
  }
  return dobStr;
}

/* Robust DOB comparator supporting DDMMYYYY, YYYYMMDD, DD/MM/YYYY, and YYYY-MM-DD */
function matchesDob(input: string, record: string): boolean {
  const cleanInput = input.replace(/[^0-9]/g, "");
  const cleanRecord = record.replace(/[^0-9]/g, "");

  if (cleanInput === cleanRecord) return true;

  if (cleanInput.length === 8 && cleanRecord.length === 8) {
    // If input is DDMMYYYY (e.g. 02052001) and record is YYYYMMDD (20010502)
    const ddmmyyyy_to_yyyymmdd =
      cleanInput.slice(4, 8) + cleanInput.slice(2, 4) + cleanInput.slice(0, 2);
    if (ddmmyyyy_to_yyyymmdd === cleanRecord) return true;

    // If input is YYYYMMDD (e.g. 20010502) and record is DDMMYYYY (02052001)
    const yyyymmdd_to_ddmmyyyy =
      cleanInput.slice(6, 8) + cleanInput.slice(4, 6) + cleanInput.slice(0, 4);
    if (yyyymmdd_to_ddmmyyyy === cleanRecord) return true;
  }

  return false;
}

/* DigiLocker Official Logo Component using authentic PNG */
function DigiLockerLogo({ className = "w-[200px] h-auto" }: { className?: string }) {
  return (
    <div className="flex items-center justify-center select-none">
      <img
        src={digiLockerLogo}
        alt="DigiLocker - Your documents anytime, anywhere"
        className={`${className} object-contain`}
        draggable={false}
      />
    </div>
  );
}

/* DigiLocker Slanted Verified Watermark Stamp */
function DigiLockerWatermark() {
  return (
    <div className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 -rotate-[16deg] pointer-events-none select-none z-0">
      <div className="bg-[#6366f1]/15 border-2 border-[#6366f1]/30 rounded-full px-5 py-2 sm:px-6 sm:py-2.5 flex items-center gap-2.5 backdrop-blur-[0.5px]">
        {/* DigiLocker Cloud & Shield Stamp */}
        <div className="relative w-7 h-7 flex items-center justify-center shrink-0">
          <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7">
            <path
              d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"
              fill="rgba(255,255,255,0.75)"
            />
            <circle cx="12" cy="12" r="1.5" fill="#4f46e5" />
            <path d="M12 13.5V16" stroke="#4f46e5" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full flex items-center justify-center">
            <svg viewBox="0 0 12 12" fill="none" className="w-2 h-2">
              <path
                d="M2.5 6L5 8.5L9.5 3.5"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
        <div className="text-left leading-none space-y-0.5">
          <div className="text-white font-black text-[13px] sm:text-[14px] tracking-wider drop-shadow-xs">
            DIGILOCKER
          </div>
          <div className="text-white font-black text-[11px] sm:text-[12px] tracking-[0.2em] drop-shadow-xs">
            VERIFIED
          </div>
        </div>
      </div>
    </div>
  );
}

function DigiLockerPage() {
  const [enrollmentNo, setEnrollmentNo] = useState("");
  const [dob, setDob] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loggedInStudent, setLoggedInStudent] = useState<StudentResult | null>(null);

  useEffect(() => {
    document.title = loggedInStudent
      ? `DigiLocker | Mark Statement - ${loggedInStudent.student_name}`
      : "DigiLocker | Sign In";
  }, [loggedInStudent]);

  // Helper to normalize search strings for comparison
  const normalizeText = (str: string) =>
    str.trim().toUpperCase().replace(/[\s\-_/]/g, "");

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!enrollmentNo.trim() || !dob.trim()) {
      setError("Please enter your Enrollment Number and Date of Birth.");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const cleanEnroll = normalizeText(enrollmentNo);
      const allResults = dbStore.getResults();

      const student = allResults.find((r) => {
        const matchEnroll =
          normalizeText(r.enrollment_no) === cleanEnroll ||
          normalizeText(r.roll_no) === cleanEnroll ||
          normalizeText(r.serial_no) === cleanEnroll;

        const matchDob = matchesDob(dob, r.dob);
        return matchEnroll && matchDob;
      });

      setIsLoading(false);

      if (student) {
        setLoggedInStudent(student);
        setError("");
      } else {
        setError(
          "Unable to fetch documents. No issued record found matching this Enrollment Number and Date of Birth. Please check your credentials.",
        );
      }
    }, 450);
  };

  const handleSignOut = () => {
    setLoggedInStudent(null);
    setEnrollmentNo("");
    setDob("");
    setError("");
  };

  /* -------------------------------------------------------------
     VIEW 1: AUTHENTICATED MARKS STATEMENT (Matches Reference Screenshot)
  ------------------------------------------------------------- */
  if (loggedInStudent) {
    let parsedSubjects: SubjectMarks[] = [];
    try {
      parsedSubjects = JSON.parse(loggedInStudent.subjects_json || "[]");
    } catch {
      parsedSubjects = [];
    }

    const calculatedTotal = parsedSubjects.reduce(
      (sum, s) =>
        sum + (typeof s.total === "number" ? s.total : Number(s.theory || 0) + Number(s.practical || 0)),
      0,
    );
    const totalMarks = loggedInStudent.total_marks || calculatedTotal;
    const maxMarks =
      loggedInStudent.max_marks ||
      (parsedSubjects.length > 0
        ? parsedSubjects.reduce((sum, s) => sum + (s.max_marks || 100), 0)
        : 600);

    const cgpa = loggedInStudent.percentage
      ? (parseFloat(loggedInStudent.percentage.replace("%", "").trim()) / 9.5).toFixed(1)
      : calculateCGPA(parsedSubjects);

    const isPass = loggedInStudent.status
      ? loggedInStudent.status.toUpperCase().includes("PASS")
      : true;

    const classLabel = (function getDynamicClassLabel(course?: string): string {
      if (!course) return "CLASS 10";
      const c = course.toUpperCase();
      if (c.includes("12TH") || c.includes("12") || c.includes("XII") || c.includes("SENIOR SECONDARY")) {
        return "CLASS 12";
      }
      if (c.includes("10TH") || c.includes("10") || c.includes("X") || c.includes("SECONDARY")) {
        return "CLASS 10";
      }
      return course.toUpperCase();
    })(loggedInStudent.course);

    const boardTitle =
      loggedInStudent.board_name ||
      (loggedInStudent.school_name && loggedInStudent.school_name.includes("BOARD")
        ? loggedInStudent.school_name
        : "DELHI OPEN BOARD OF SCHOOL EDUCATION");

    const portalName = boardTitle.includes("COSE") ? "COSE Portal" : "DOBSE Portal";

    const studentPhotoSrc = loggedInStudent.photo_url || mukeshPhoto;

    return (
      <div className="min-h-screen bg-[#eaeff2] py-6 px-3 sm:px-4 font-sans text-slate-800">
        <style>{`
          @media print {
            @page {
              size: A4 portrait;
              margin: 10mm;
            }
            body {
              background-color: #ffffff !important;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
          }
        `}</style>

        {/* TOP ACTION BAR (Matches User Screenshot) */}
        <div className="w-full max-w-[760px] mx-auto flex items-center justify-between pb-3 print:hidden">
          {/* Logout Button */}
          <button
            type="button"
            onClick={handleSignOut}
            className="bg-[#dc2626] hover:bg-[#b91c1c] text-white px-4 py-1.5 sm:py-2 rounded-md font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-xs transition cursor-pointer active:scale-95"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>

          {/* Print Marksheet Button */}
          <button
            type="button"
            onClick={() => window.print()}
            className="bg-[#0066ff] hover:bg-[#0055d4] text-white px-4 py-1.5 sm:py-2 rounded-md font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-xs transition cursor-pointer active:scale-95"
          >
            <Printer className="w-4 h-4" />
            <span>Print Marksheet</span>
          </button>
        </div>

        {/* MARKSHEET DOCUMENT CONTAINER (White Paper Card) */}
        <div className="w-full max-w-[760px] mx-auto bg-white rounded-xl shadow-md border border-gray-100 p-6 sm:p-10 relative">
          {/* 1. DOCUMENT HEADER */}
          <div className="flex items-center justify-between gap-3 sm:gap-6">
            {/* Left: DigiLocker Authentic Logo */}
            <div className="w-[130px] sm:w-[170px] shrink-0 flex items-center">
              <img
                src={digiLockerLogo}
                alt="DigiLocker"
                className="w-full h-auto object-contain"
              />
            </div>

            {/* Center: Board Title & Mark Statement */}
            <div className="text-center flex-1 space-y-1">
              <h1 className="text-sm sm:text-base md:text-[17px] font-extrabold text-[#111827] tracking-tight leading-snug uppercase">
                {boardTitle}
              </h1>
              <div className="text-xs sm:text-sm md:text-[15px] font-extrabold text-[#0066ff] tracking-tight uppercase">
                MARK STATEMENT - {classLabel}
              </div>
            </div>

            {/* Right: DOBSE Official Emblem */}
            <div className="w-[65px] sm:w-[85px] shrink-0 flex items-center justify-end">
              <img
                src={dobseEmblem}
                alt="DOBSE"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>

          {/* Blue Horizontal Rule */}
          <div className="h-[2.5px] w-full bg-[#0066ff] my-4 sm:my-5" />

          {/* 2. STUDENT DETAILS & PHOTO SECTION */}
          <div className="border border-gray-100/90 rounded-xl p-4 sm:p-5 relative overflow-hidden bg-white mb-6">
            {/* Slanted DigiLocker Verified Watermark Stamp */}
            <DigiLockerWatermark />

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-8 relative z-10">
              {/* Student Photo with Frame */}
              <div className="shrink-0">
                <div className="border border-red-500/80 p-0.5 bg-white shadow-2xs rounded-xs">
                  <div className="border-t-2 border-red-600">
                    <img
                      src={studentPhotoSrc}
                      alt={loggedInStudent.student_name}
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = mukeshPhoto;
                      }}
                      className="w-[110px] sm:w-[125px] h-[135px] sm:h-[150px] object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Key-Value Details */}
              <div className="flex-1 space-y-1.5 text-xs sm:text-sm text-left w-full">
                <div className="flex items-center">
                  <span className="font-bold text-[#1f2937] w-32 sm:w-36 shrink-0">
                    Serial Number:
                  </span>
                  <span className="font-bold text-[#0066ff]">
                    {loggedInStudent.serial_no && loggedInStudent.serial_no.trim() !== ""
                      ? loggedInStudent.serial_no
                      : "N/A"}
                  </span>
                </div>

                <div className="flex items-center">
                  <span className="font-bold text-[#1f2937] w-32 sm:w-36 shrink-0">
                    Enrollment No:
                  </span>
                  <span className="font-bold text-[#111827]">
                    {loggedInStudent.enrollment_no || "N/A"}
                  </span>
                </div>

                <div className="flex items-center">
                  <span className="font-bold text-[#1f2937] w-32 sm:w-36 shrink-0">
                    Roll Number:
                  </span>
                  <span className="font-bold text-[#111827]">
                    {loggedInStudent.roll_no || "N/A"}
                  </span>
                </div>

                <div className="flex items-center">
                  <span className="font-bold text-[#1f2937] w-32 sm:w-36 shrink-0">
                    Student Name:
                  </span>
                  <span className="font-bold text-[#111827] uppercase">
                    {loggedInStudent.student_name || "N/A"}
                  </span>
                </div>

                <div className="flex items-center">
                  <span className="font-bold text-[#1f2937] w-32 sm:w-36 shrink-0">
                    Father's Name:
                  </span>
                  <span className="font-bold text-[#111827] uppercase">
                    {loggedInStudent.father_name || "N/A"}
                  </span>
                </div>

                <div className="flex items-center">
                  <span className="font-bold text-[#1f2937] w-32 sm:w-36 shrink-0">
                    Date of Birth:
                  </span>
                  <span className="font-bold text-[#111827]">
                    {formatDob(loggedInStudent.dob)}
                  </span>
                </div>

                <div className="flex items-center">
                  <span className="font-bold text-[#1f2937] w-32 sm:w-36 shrink-0">
                    Aadhaar No:
                  </span>
                  <span className="font-bold text-[#111827]">
                    {loggedInStudent.aadhaar_no && loggedInStudent.aadhaar_no.trim() !== ""
                      ? loggedInStudent.aadhaar_no
                      : "N/A"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 3. MARKS TABLE */}
          <div className="w-full overflow-x-auto">
            <table className="w-full border-collapse border border-[#d1d5db] text-xs sm:text-[13px]">
              <thead>
                <tr className="bg-white">
                  <th className="border border-[#d1d5db] px-3.5 py-2.5 text-left font-bold text-gray-900 uppercase">
                    SUBJECT DESCRIPTION
                  </th>
                  <th className="border border-[#d1d5db] px-3.5 py-2.5 text-center font-bold text-gray-900 uppercase w-20">
                    THEORY
                  </th>
                  <th className="border border-[#d1d5db] px-3.5 py-2.5 text-center font-bold text-gray-900 uppercase w-24">
                    PRACTICAL
                  </th>
                  <th className="border border-[#d1d5db] px-3.5 py-2.5 text-center font-bold text-gray-900 uppercase w-20">
                    TOTAL
                  </th>
                  <th className="border border-[#d1d5db] px-3.5 py-2.5 text-center font-bold text-gray-900 uppercase w-20">
                    GRADE
                  </th>
                </tr>
              </thead>
              <tbody>
                {parsedSubjects.map((sub, idx) => {
                  const subTotal =
                    typeof sub.total === "number"
                      ? sub.total
                      : (Number(sub.theory) || 0) + (Number(sub.practical) || 0);
                  const grade = getGrade(subTotal, sub.max_marks || 100);
                  return (
                    <tr key={idx} className="bg-white">
                      <td className="border border-[#d1d5db] px-3.5 py-2.5 font-bold text-gray-900 text-left uppercase">
                        {sub.name}
                      </td>
                      <td className="border border-[#d1d5db] px-3.5 py-2.5 font-bold text-gray-900 text-center">
                        {sub.theory}
                      </td>
                      <td className="border border-[#d1d5db] px-3.5 py-2.5 font-bold text-gray-900 text-center">
                        {sub.practical ?? 0}
                      </td>
                      <td className="border border-[#d1d5db] px-3.5 py-2.5 font-bold text-gray-900 text-center">
                        {subTotal}
                      </td>
                      <td className="border border-[#d1d5db] px-3.5 py-2.5 font-bold text-[#0066ff] text-center">
                        {grade}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr className="bg-white">
                  <td
                    colSpan={4}
                    className="border border-[#d1d5db] px-4 py-3 font-bold text-gray-900 text-right uppercase tracking-wide text-xs sm:text-sm"
                  >
                    GRAND TOTAL: {totalMarks} / {maxMarks}
                  </td>
                  <td className="border border-[#d1d5db] px-2 py-2 text-center font-bold text-gray-900 leading-tight text-xs sm:text-[13px]">
                    <div>
                      RESULT:{" "}
                      <span className="text-[#16a34a] font-bold">
                        {isPass ? "PASS" : loggedInStudent.status || "FAIL"}
                      </span>
                    </div>
                    <div className="text-gray-900 font-bold">(CGPA: {cgpa})</div>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* 4. DIGITAL VERIFICATION BADGE BOX */}
          <div className="border-[1.5px] border-[#22c55e] rounded-xl p-3.5 sm:p-4 bg-white flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
            {/* Left: Shield & Signature Details */}
            <div className="flex items-center gap-3.5">
              {/* Glossy 3D Blue Shield Icon */}
              <div className="w-10 h-10 sm:w-11 sm:h-11 shrink-0 relative flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" className="w-full h-full drop-shadow-xs">
                  <path
                    d="M12 2L4 5V11C4 16.55 7.4 21.74 12 23C16.6 21.74 20 16.55 20 11V5L12 2Z"
                    fill="url(#blueShieldGrad)"
                    stroke="#0284c7"
                    strokeWidth="1"
                  />
                  <path
                    d="M9 12L11 14L15 10"
                    stroke="white"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <defs>
                    <linearGradient id="blueShieldGrad" x1="4" y1="2" x2="20" y2="23" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#38bdf8" />
                      <stop offset="0.5" stopColor="#0284c7" />
                      <stop offset="1" stopColor="#0369a1" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              <div className="space-y-0.5 text-left">
                <h3 className="font-bold text-[#14532d] text-sm sm:text-[15px] leading-tight">
                  Digitally Signed by DigiLocker {portalName}
                </h3>
                <p className="text-xs text-gray-600">
                  This digital document is legally valid as per IT Act 2000.
                </p>
                <p className="text-xs text-gray-600 font-medium">
                  Verified on: {new Date().toLocaleDateString("en-GB")} 07:04:11 IST
                </p>
              </div>
            </div>

            {/* Right: QR Code & Verification Label */}
            <div className="flex flex-col items-center shrink-0">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&margin=0&data=${encodeURIComponent(
                  `https://dobse.org/verify?roll=${encodeURIComponent(
                    loggedInStudent.roll_no,
                  )}&enroll=${encodeURIComponent(loggedInStudent.enrollment_no)}&name=${encodeURIComponent(
                    loggedInStudent.student_name,
                  )}&status=${encodeURIComponent(isPass ? "PASS" : loggedInStudent.status || "FAIL")}`,
                )}`}
                alt="QR Code"
                className="w-16 h-16 sm:w-[70px] sm:h-[70px] object-contain"
              />
              <span className="text-[10px] font-extrabold text-gray-800 tracking-wider uppercase mt-1">
                SCAN TO VERIFY
              </span>
            </div>
          </div>

          {/* 5. DISCLAIMER */}
          <p className="text-center text-xs text-gray-500 mt-4 font-normal">
            Disclaimer: This is a computer generated document. For official verification, visit dobse.org.
          </p>
        </div>
      </div>
    );
  }

  /* -------------------------------------------------------------
     VIEW 2: PIXEL-PERFECT DIGILOCKER SIGN IN (Exact to Screenshot)
  ------------------------------------------------------------- */
  return (
    <div className="min-h-screen bg-[#f4f7f9] flex items-center justify-center p-4 font-sans select-none">
      {/* CENTER SIGN IN CARD (Exact pixel-perfect design) */}
      <div className="w-full max-w-[390px] bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-gray-100 overflow-hidden animate-fade-in relative">
        {/* Top Blue Stripe */}
        <div className="h-[3.5px] w-full bg-[#0066ff]" />

        <div className="p-7 sm:p-8 space-y-5">
          {/* DigiLocker Official Logo */}
          <DigiLockerLogo className="w-[190px] sm:w-[210px]" />

          {/* Heading & Subtitle */}
          <div className="text-center space-y-1 pt-1">
            <h1 className="text-xl sm:text-[21px] font-bold text-[#1f2937] tracking-tight">
              Sign In to your account
            </h1>
            <p className="text-xs sm:text-[13px] text-[#6b7280]">
              Enter your details to fetch documents
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSignIn} className="space-y-4 text-left pt-1">
            {/* ENROLLMENT NUMBER INPUT */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-[#374151]">
                Enrollment Number
              </label>
              <input
                type="text"
                required
                value={enrollmentNo}
                onChange={(e) => setEnrollmentNo(e.target.value)}
                placeholder="Enter Enrollment No."
                className="w-full px-3.5 py-2.5 border border-[#d1d5db] rounded-lg text-sm text-[#111827] placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#0066ff] focus:border-transparent bg-[#fbfbfb] shadow-2xs transition"
              />
            </div>

            {/* PASSWORD (DATE OF BIRTH) INPUT */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-[#374151]">
                Password (Date of Birth)
              </label>
              <input
                type="text"
                required
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                placeholder="DDMMYYYY"
                className="w-full px-3.5 py-2.5 border border-[#d1d5db] rounded-lg text-sm text-[#111827] placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#0066ff] focus:border-transparent bg-[#fbfbfb] shadow-2xs transition"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 font-medium animate-fade-in flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <div>{error}</div>
              </div>
            )}

            {/* SIGN IN BUTTON */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#0066ff] hover:bg-[#0055d4] text-white font-semibold py-2.5 px-4 rounded-lg text-sm transition shadow-sm cursor-pointer active:scale-[0.99] disabled:opacity-50 flex items-center justify-center gap-2 mt-4"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Signing In...</span>
                </>
              ) : (
                <span>Sign In</span>
              )}
            </button>
          </form>

          {/* POWERED BY NEGD & DIGILOCKER */}
          <div className="pt-3 text-center">
            <span className="text-[10px] font-bold text-[#a0aec0] tracking-[0.14em] uppercase">
              POWERED BY NEGD &amp; DIGILOCKER
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
