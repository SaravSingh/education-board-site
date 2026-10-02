import { createFileRoute } from "@tanstack/react-router";
import React, { useState } from "react";
import {
  dbStore,
  StudentResult,
  SubjectMarks,
} from "@/lib/db";
import {
  ShieldCheck,
  CheckCircle2,
  FileText,
  Printer,
  LogOut,
  AlertCircle,
  Loader2,
  Award,
  QrCode,
} from "lucide-react";
import digiLockerLogo from "@/assets/digilocker_logo.png";

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

function DigiLockerPage() {
  const [enrollmentNo, setEnrollmentNo] = useState("");
  const [dob, setDob] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loggedInStudent, setLoggedInStudent] = useState<StudentResult | null>(null);
  const [viewingDocType, setViewingDocType] = useState<"marksheet" | "certificate" | null>(null);

  React.useEffect(() => {
    document.title = loggedInStudent
      ? `DigiLocker | Issued Documents - ${loggedInStudent.student_name}`
      : "DigiLocker | Sign In";
  }, [loggedInStudent]);

  // Helper to normalize strings for comparison
  const normalizeText = (str: string) =>
    str.trim().toUpperCase().replace(/[\s\-_/]/g, "");

  const normalizeDob = (str: string) => str.replace(/[^0-9]/g, "");

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
      const cleanInputDob = normalizeDob(dob);

      const allResults = dbStore.getResults();

      const student = allResults.find((r) => {
        const matchEnroll =
          normalizeText(r.enrollment_no) === cleanEnroll ||
          normalizeText(r.roll_no) === cleanEnroll ||
          normalizeText(r.serial_no) === cleanEnroll;

        const matchDob = normalizeDob(r.dob) === cleanInputDob;
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
    }, 500);
  };

  const handleSignOut = () => {
    setLoggedInStudent(null);
    setViewingDocType(null);
    setEnrollmentNo("");
    setDob("");
    setError("");
  };

  // Parse subjects safely if student found
  let parsedSubjects: SubjectMarks[] = [];
  if (loggedInStudent) {
    try {
      parsedSubjects = JSON.parse(loggedInStudent.subjects_json || "[]");
    } catch {
      parsedSubjects = [];
    }
  }

  /* -------------------------------------------------------------
     VIEW 1: AUTHENTICATED DIGILOCKER ISSUED DOCUMENTS DASHBOARD
  ------------------------------------------------------------- */
  if (loggedInStudent) {
    return (
      <div className="min-h-screen bg-[#f1f5f9] text-slate-800 font-sans flex flex-col">
        {/* DigiLocker Official Government Top Bar */}
        <header className="bg-white border-b border-gray-200 shadow-xs sticky top-0 z-30">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <DigiLockerLogo className="h-10 sm:h-12" />
              <div className="hidden sm:block border-l border-gray-300 pl-4">
                <span className="text-[11px] font-bold text-slate-700 block uppercase tracking-wider">
                  National e-Governance Division (NeGD)
                </span>
                <span className="text-[10px] text-slate-500 block font-medium">
                  Ministry of Electronics &amp; Information Technology, Govt. of India
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-2 bg-emerald-50 text-emerald-800 border border-emerald-300 px-3 py-1 rounded-full text-xs font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>DigiLocker Verified Citizen</span>
              </div>

              <button
                onClick={handleSignOut}
                className="flex items-center gap-1.5 px-3.5 py-1.5 border border-gray-300 hover:bg-gray-100 text-gray-700 rounded-lg text-xs font-bold transition cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </header>

        {/* MAIN BODY: ISSUED DOCUMENTS AREA */}
        <main className="max-w-6xl w-full mx-auto px-4 py-8 flex-1 space-y-6">
          {/* Welcome User Banner */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 border border-slate-300 shrink-0 shadow-xs">
                {loggedInStudent.photo_url ? (
                  <img
                    src={loggedInStudent.photo_url}
                    alt={loggedInStudent.student_name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center font-bold text-slate-400 text-xl">
                    {loggedInStudent.student_name.charAt(0)}
                  </div>
                )}
              </div>
              <div>
                <div className="text-[11px] font-bold text-blue-700 uppercase tracking-wider">
                  DigiLocker Account Holder
                </div>
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-serif">
                  {loggedInStudent.student_name}
                </h1>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 mt-1">
                  <span>
                    <strong className="text-slate-800">Enrollment No:</strong>{" "}
                    <code className="bg-slate-100 px-1 py-0.5 rounded font-mono font-bold text-slate-900">
                      {loggedInStudent.enrollment_no}
                    </code>
                  </span>
                  <span>•</span>
                  <span>
                    <strong className="text-slate-800">Roll No:</strong>{" "}
                    <code className="bg-slate-100 px-1 py-0.5 rounded font-mono font-bold text-slate-900">
                      {loggedInStudent.roll_no}
                    </code>
                  </span>
                  <span>•</span>
                  <span>
                    <strong className="text-slate-800">DOB:</strong> {loggedInStudent.dob}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 px-4 py-2.5 rounded-xl text-xs space-y-0.5 self-stretch sm:self-auto text-left sm:text-right">
              <div className="text-blue-900 font-bold">Issued Authority</div>
              <div className="text-[11px] text-blue-700">
                Board of Higher Secondary Education, Delhi
              </div>
              <div className="text-[10px] text-blue-600 font-mono">
                Academic Batch: {loggedInStudent.batch}
              </div>
            </div>
          </div>

          {/* Section Heading */}
          <div className="flex items-center justify-between border-b border-gray-300 pb-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              Issued Documents in DigiLocker (2)
            </h2>
            <span className="text-xs text-slate-500 font-medium">
              Legally Valid Under IT Act 2000
            </span>
          </div>

          {/* DOCUMENT CARDS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* DOCUMENT 1: MARKSHEET */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-xs hover:shadow-md transition space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-[10px] font-bold">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" /> DigiLocker Verified
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 text-base">
                    {loggedInStudent.course} — Official Mark Sheet
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Issued by Board of Higher Secondary Education, Delhi (BHSE)
                  </p>
                </div>

                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs space-y-1 font-mono">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Doc URI:</span>
                    <span className="text-slate-800 font-bold">
                      in.gov.digitallocker:BHSE-{loggedInStudent.roll_no}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Issue Date:</span>
                    <span className="text-slate-800">
                      {loggedInStudent.result_declaration_date || "15/07/2009"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Result Status:</span>
                    <span className="text-emerald-700 font-bold">
                      {loggedInStudent.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  onClick={() => setViewingDocType("marksheet")}
                  className="flex-1 bg-[#0066ff] hover:bg-[#0052cc] text-white font-bold py-2 px-3 rounded-lg text-xs transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>View Official Mark Sheet</span>
                </button>
              </div>
            </div>

            {/* DOCUMENT 2: CERTIFICATE / VERIFICATION RECORD */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-xs hover:shadow-md transition space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-[10px] font-bold">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" /> DigiLocker Verified
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 text-base">
                    Certificate of Passing &amp; Migration
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Issued by Board of Higher Secondary Education, Delhi (BHSE)
                  </p>
                </div>

                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs space-y-1 font-mono">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Cert No:</span>
                    <span className="text-slate-800 font-bold">
                      BHSE-CERT-{loggedInStudent.serial_no}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Academic Session:</span>
                    <span className="text-slate-800">{loggedInStudent.batch}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Institution:</span>
                    <span className="text-slate-800 truncate max-w-[200px]">
                      {loggedInStudent.school_name}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  onClick={() => setViewingDocType("certificate")}
                  className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-bold py-2 px-3 rounded-lg text-xs transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>View Certificate</span>
                </button>
              </div>
            </div>
          </div>
        </main>

        {/* FOOTER */}
        <footer className="w-full bg-white border-t border-gray-200 py-4 text-center text-xs text-gray-500">
          <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
            <div>© {new Date().getFullYear()} DigiLocker. All rights reserved.</div>
            <div className="text-[11px] text-gray-400">
              National e-Governance Division (NeGD) | Government of India
            </div>
          </div>
        </footer>

        {/* DOCUMENT PREVIEW MODAL */}
        {viewingDocType && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-2 sm:p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full border border-gray-200 overflow-hidden my-auto animate-fade-in text-slate-900">
              {/* Modal Top Strip */}
              <div className="bg-[#0066ff] text-white px-5 py-3.5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-white" />
                  <span className="font-bold text-sm">
                    {viewingDocType === "marksheet"
                      ? "Official DigiLocker Digital Mark Sheet Copy"
                      : "Official DigiLocker Certificate of Passing"}
                  </span>
                </div>
                <button
                  onClick={() => setViewingDocType(null)}
                  className="text-white/80 hover:text-white font-bold text-xs bg-white/20 hover:bg-white/30 px-3 py-1 rounded transition cursor-pointer"
                >
                  Close [×]
                </button>
              </div>

              {/* Printable Document Container */}
              <div className="p-6 sm:p-8 space-y-6">
                {/* DigiLocker Digital Verification Seal Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b-2 border-dashed border-gray-300 pb-4">
                  <div className="flex items-center gap-3">
                    <DigiLockerLogo className="h-12" />
                  </div>
                  <div className="bg-emerald-50 border border-emerald-400 p-2.5 rounded-lg text-right flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <div className="text-left font-sans text-xs">
                      <div className="font-bold text-emerald-950">
                        Digitally Verified Document
                      </div>
                      <div className="text-[10px] text-emerald-800 font-mono">
                        URI: in.gov.digitallocker:BHSE-{loggedInStudent.roll_no}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Document Body */}
                <div className="border border-gray-300 rounded-xl p-6 bg-slate-50/50 space-y-6 relative overflow-hidden">
                  {/* DigiLocker Vector Watermark in Background */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none select-none">
                    <span className="text-9xl font-extrabold uppercase -rotate-12">
                      DIGILOCKER
                    </span>
                  </div>

                  {/* Board Title */}
                  <div className="text-center space-y-1 relative z-10">
                    <h3 className="text-lg sm:text-xl font-extrabold text-blue-900 uppercase font-serif tracking-wide">
                      {loggedInStudent.board_name || "BOARD OF HIGHER SECONDARY EDUCATION, DELHI"}
                    </h3>
                    <p className="text-xs text-gray-600 font-medium">
                      (An Autonomous Institution Registered under Govt. of NCT of Delhi)
                    </p>
                    <div className="inline-block px-4 py-1 bg-blue-900 text-white font-bold text-xs rounded-full uppercase tracking-wider mt-1">
                      {viewingDocType === "marksheet"
                        ? `${loggedInStudent.course} — MARKS STATEMENT`
                        : "PROVISIONAL PASSING & MIGRATION CERTIFICATE"}
                    </div>
                  </div>

                  {/* Student Details Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-white p-4 rounded-lg border border-gray-200 relative z-10">
                    <div>
                      <span className="text-gray-500 block">Candidate Name:</span>
                      <strong className="text-gray-900">{loggedInStudent.student_name}</strong>
                    </div>
                    <div>
                      <span className="text-gray-500 block">Roll Number:</span>
                      <strong className="text-gray-900 font-mono">{loggedInStudent.roll_no}</strong>
                    </div>
                    <div>
                      <span className="text-gray-500 block">Enrollment No:</span>
                      <strong className="text-gray-900 font-mono">
                        {loggedInStudent.enrollment_no}
                      </strong>
                    </div>
                    <div>
                      <span className="text-gray-500 block">Date of Birth:</span>
                      <strong className="text-gray-900">{loggedInStudent.dob}</strong>
                    </div>
                    <div>
                      <span className="text-gray-500 block">Father's Name:</span>
                      <strong className="text-gray-900">{loggedInStudent.father_name}</strong>
                    </div>
                    <div>
                      <span className="text-gray-500 block">Mother's Name:</span>
                      <strong className="text-gray-900">{loggedInStudent.mother_name}</strong>
                    </div>
                    <div className="sm:col-span-2">
                      <span className="text-gray-500 block">Institution / Exam Centre:</span>
                      <strong className="text-gray-900 truncate block">
                        {loggedInStudent.school_name || loggedInStudent.exam_center}
                      </strong>
                    </div>
                  </div>

                  {/* Subjects Table (if marksheet) */}
                  {viewingDocType === "marksheet" && parsedSubjects.length > 0 && (
                    <div className="overflow-x-auto relative z-10 border border-gray-300 rounded-lg bg-white">
                      <table className="w-full text-xs text-left border-collapse">
                        <thead>
                          <tr className="bg-slate-100 text-slate-800 font-bold border-b border-gray-300">
                            <th className="p-2 border-r border-gray-300 text-center">Sub Code</th>
                            <th className="p-2 border-r border-gray-300">Subject Name</th>
                            <th className="p-2 border-r border-gray-300 text-center">Max</th>
                            <th className="p-2 border-r border-gray-300 text-center">Theory</th>
                            <th className="p-2 border-r border-gray-300 text-center">Prac</th>
                            <th className="p-2 border-r border-gray-300 text-center font-bold">Total</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {parsedSubjects.map((sub, idx) => (
                            <tr key={idx} className="hover:bg-slate-50">
                              <td className="p-2 border-r border-gray-200 text-center font-mono">
                                {sub.code}
                              </td>
                              <td className="p-2 border-r border-gray-200 font-semibold">
                                {sub.name}
                              </td>
                              <td className="p-2 border-r border-gray-200 text-center font-mono">
                                {sub.max_marks}
                              </td>
                              <td className="p-2 border-r border-gray-200 text-center font-mono">
                                {sub.theory}
                              </td>
                              <td className="p-2 border-r border-gray-200 text-center font-mono">
                                {sub.practical}
                              </td>
                              <td className="p-2 border-r border-gray-200 text-center font-bold font-mono text-blue-900">
                                {sub.total}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr className="bg-slate-100 font-bold border-t border-gray-300">
                            <td colSpan={2} className="p-2 text-right">
                              Total Marks / Result:
                            </td>
                            <td className="p-2 text-center font-mono">
                              {loggedInStudent.max_marks}
                            </td>
                            <td colSpan={2}></td>
                            <td className="p-2 text-center font-mono text-emerald-800 font-extrabold text-sm">
                              {loggedInStudent.total_marks} ({loggedInStudent.status})
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  )}

                  {/* Digital Signature & QR Verification Bar */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-200 relative z-10 text-xs text-gray-600">
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-16 bg-white border border-gray-300 rounded p-1 flex items-center justify-center">
                        <QrCode className="w-12 h-12 text-slate-800" />
                      </div>
                      <div className="space-y-0.5 text-[11px]">
                        <div className="font-bold text-gray-900">Digitally Signed By:</div>
                        <div>Controller of Examinations, BHSE</div>
                        <div className="text-gray-400 font-mono">
                          Date: {loggedInStudent.result_declaration_date}
                        </div>
                      </div>
                    </div>

                    <div className="text-center sm:text-right space-y-1">
                      <div className="inline-block px-3 py-1 bg-emerald-100 text-emerald-900 font-bold rounded border border-emerald-300 text-[11px]">
                        ✓ IT Act 2000 Recognized
                      </div>
                      <div className="text-[10px] text-gray-500">
                        This digital copy is legally valid for all official purposes.
                      </div>
                    </div>
                  </div>
                </div>

                {/* Modal Actions */}
                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    onClick={() => window.print()}
                    className="bg-[#0066ff] hover:bg-[#0052cc] text-white font-bold py-2.5 px-5 rounded-lg text-xs transition flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
                  >
                    <Printer className="w-4 h-4" /> Print / Save PDF
                  </button>
                  <button
                    onClick={() => setViewingDocType(null)}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2.5 px-5 rounded-lg text-xs transition cursor-pointer active:scale-95"
                  >
                    Close Preview
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
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
