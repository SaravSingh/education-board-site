import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import React, { useState } from "react";
import { Header } from "@/components/Header";
import { AdminLoginModal } from "@/components/AdminLoginModal";
import { StudentIdCard } from "@/components/StudentIdCard";
import { dbStore, StudentResult } from "@/lib/db";
import { Home as HomeIcon, ChevronRight, AlertCircle, Sparkles } from "lucide-react";

export const Route = createFileRoute("/enrollment-verification")({
  head: () => ({
    meta: [
      {
        title:
          "Enrollment Verification & Student I-Card — Board of Higher Secondary Education, Delhi (BHSE)",
      },
      {
        name: "description",
        content:
          "Official online student enrollment verification and digital Identity Card (I-Card) search portal under Board of Higher Secondary Education, Delhi.",
      },
    ],
  }),
  component: EnrollmentVerificationPage,
});

function EnrollmentVerificationPage() {
  const navigate = useNavigate();
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Form search state
  const [candidateName, setCandidateName] = useState("");
  const [enrollmentNo, setEnrollmentNo] = useState("");
  const [dob, setDob] = useState("2026-10-19");

  // Search results state
  const [searched, setSearched] = useState(false);
  const [foundStudent, setFoundStudent] = useState<StudentResult | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSearched(true);

    if (!enrollmentNo.trim()) {
      setErrorMessage("Please enter the Enrollment Number.");
      return;
    }

    const student = dbStore.getStudentForVerification(candidateName, enrollmentNo, dob);

    if (student) {
      setFoundStudent(student);
      setErrorMessage("");
    } else {
      setFoundStudent(null);
      setErrorMessage(
        `No enrollment record found for Candidate Name '${candidateName}' and Enrollment No. '${enrollmentNo}'. Please check your details and try again.`,
      );
    }
  };

  const handleCancel = () => {
    setCandidateName("");
    setEnrollmentNo("");
    setDob("2026-10-19");
    setSearched(false);
    setFoundStudent(null);
    setErrorMessage("");
  };

  const handleQuickFill = (name: string, enr: string, birthDate: string) => {
    setCandidateName(name);
    setEnrollmentNo(enr);
    setDob(birthDate);
    setErrorMessage("");

    const student = dbStore.getStudentForVerification(name, enr, birthDate);
    if (student) {
      setFoundStudent(student);
      setSearched(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col font-sans w-full overflow-x-hidden">
      {/* Top Header & Navbar */}
      <div className="print:hidden">
        <Header
          onAdminClick={() => setIsAdminOpen(true)}
          onResultClick={() => navigate({ to: "/result" })}
          onVerificationClick={() => navigate({ to: "/enrollment-verification" })}
        />
      </div>

      {/* Breadcrumb banner */}
      <div className="w-full bg-slate-200 border-b border-gray-300 py-2.5 px-4 text-xs font-semibold text-slate-600 print:hidden">
        <div className="max-w-7xl mx-auto flex items-center gap-2">
          <Link to="/" className="text-blue-800 hover:underline flex items-center gap-1">
            <HomeIcon className="w-3.5 h-3.5" /> Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-600">Admission</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-bold uppercase">Enrollment Verification</span>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="w-full max-w-7xl mx-auto px-4 py-8 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Left Column: Quick Link Sidebar */}
          <div className="md:col-span-4 lg:col-span-3 space-y-8 print:hidden">
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-xs">
              <h3 className="font-serif italic text-xl font-bold text-gray-700 border-b-2 border-gray-300 pb-1 mb-3">
                Quick Link
              </h3>

              <ul className="text-xs font-medium text-gray-700 divide-y divide-dashed divide-gray-300 border-t border-dashed border-gray-300">
                <li className="py-2.5">
                  <Link
                    to="/about"
                    className="hover:text-amber-600 transition flex items-center gap-1.5"
                  >
                    <span className="text-amber-500 font-bold">▸</span> About us
                  </Link>
                </li>
                <li className="py-2.5">
                  <Link
                    to="/examination"
                    className="hover:text-amber-600 transition flex items-center gap-1.5"
                  >
                    <span className="text-amber-500 font-bold">▸</span> Examination
                  </Link>
                </li>
                <li className="py-2.5">
                  <Link
                    to="/examination"
                    className="hover:text-amber-600 transition flex items-center gap-1.5"
                  >
                    <span className="text-amber-500 font-bold">▸</span> Notice
                  </Link>
                </li>
                <li className="py-2.5">
                  <Link
                    to="/holiday-list"
                    className="hover:text-amber-600 transition flex items-center gap-1.5"
                  >
                    <span className="text-amber-500 font-bold">▸</span> List of Holidays 2026
                  </Link>
                </li>
                <li className="py-2.5">
                  <Link
                    to="/subject-code"
                    className="hover:text-amber-600 transition flex items-center gap-1.5"
                  >
                    <span className="text-amber-500 font-bold">▸</span> Subject Code
                  </Link>
                </li>
                <li className="py-2.5">
                  <Link
                    to="/enrollment-verification"
                    className="hover:text-amber-600 transition flex items-center gap-1.5 font-bold text-blue-900"
                  >
                    <span className="text-amber-500 font-bold">▸</span> Enrollment Verification
                  </Link>
                </li>
                <li className="py-2.5">
                  <Link
                    to="/result"
                    className="hover:text-amber-600 transition flex items-center gap-1.5 font-bold text-blue-900"
                  >
                    <span className="text-amber-500 font-bold">▸</span> Result Portal
                  </Link>
                </li>
                <li className="py-2.5">
                  <Link
                    to="/contact"
                    className="hover:text-amber-600 transition flex items-center gap-1.5"
                  >
                    <span className="text-amber-500 font-bold">▸</span> Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Search Form and I-Card Display */}
          <div className="md:col-span-8 lg:col-span-9 space-y-6 print:col-span-12 print:w-full print:m-0 print:p-0">
            <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-700 uppercase tracking-wide print:hidden">
              ENROLLMENT VERIFICATION
            </h2>

            {/* Verification Form Card (Exact visual match to user screenshot) */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 sm:p-8 print:hidden">
              <form onSubmit={handleSearch} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                  {/* CANDIDATE NAME */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                      CANDIDATE NAME <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      value={candidateName}
                      onChange={(e) => setCandidateName(e.target.value)}
                      placeholder="Enter Candidate Name"
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white"
                    />
                  </div>

                  {/* Enrollment No. */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Enrollment No. <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={enrollmentNo}
                      onChange={(e) => setEnrollmentNo(e.target.value)}
                      placeholder="Enter Enrollment No."
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white font-mono"
                    />
                  </div>

                  {/* DATE OF BIRTH */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                      DATE OF BIRTH <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="date"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white"
                    />
                  </div>
                </div>

                {/* Form Action Buttons */}
                <div className="flex items-center gap-3 pt-1">
                  <button
                    type="submit"
                    className="bg-[#007bff] hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded text-sm transition shadow-xs cursor-pointer active:scale-95"
                  >
                    Search
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="bg-[#dc3545] hover:bg-red-700 text-white font-semibold px-6 py-2 rounded text-sm transition shadow-xs cursor-pointer active:scale-95"
                  >
                    Cancel
                  </button>
                </div>
              </form>

              {/* Quick Sample Fill Pill Buttons */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Sample Student Records for Testing:</span>
                </div>
                <div className="flex flex-wrap gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() =>
                      handleQuickFill("MUKESH UPADHAYAYA", "1028112518013", "2001-05-02")
                    }
                    className="px-2.5 py-1 bg-slate-100 hover:bg-blue-100 text-blue-900 rounded border border-gray-300 font-mono text-[11px] transition cursor-pointer"
                  >
                    Mukesh Upadhayaya (1028112518013)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickFill("SAMRIDDHI SAHA", "20241832", "2006-05-21")}
                    className="px-2.5 py-1 bg-slate-100 hover:bg-blue-100 text-blue-900 rounded border border-gray-300 font-mono text-[11px] transition cursor-pointer"
                  >
                    Samriddhi Saha (20241832)
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      handleQuickFill("SATISH KUMAR", "A-08-COSE-221311", "1992-01-21")
                    }
                    className="px-2.5 py-1 bg-slate-100 hover:bg-blue-100 text-blue-900 rounded border border-gray-300 font-mono text-[11px] transition cursor-pointer"
                  >
                    Satish Kumar (A-08-COSE-221311)
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      handleQuickFill("DHIRODUTTA SAHA", "20264034", "2010-01-14")
                    }
                    className="px-2.5 py-1 bg-slate-100 hover:bg-blue-100 text-blue-900 rounded border border-gray-300 font-mono text-[11px] transition cursor-pointer"
                  >
                    Dhirodutta Saha (20264034)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickFill("KRITI SAHA", "20262455", "2008-07-05")}
                    className="px-2.5 py-1 bg-slate-100 hover:bg-blue-100 text-blue-900 rounded border border-gray-300 font-mono text-[11px] transition cursor-pointer"
                  >
                    Kriti Saha (20262455)
                  </button>
                </div>
              </div>
            </div>

            {/* Error / Not Found Alert */}
            {searched && errorMessage && (
              <div className="bg-amber-50 border-2 border-amber-400 text-amber-950 p-4 rounded-lg text-xs space-y-1 flex items-start gap-3 shadow-xs animate-fade-in print:hidden">
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-sm font-bold block">No Record Found</strong>
                  <p>{errorMessage}</p>
                </div>
              </div>
            )}

            {/* Student I-Card Output */}
            {foundStudent && (
              <div className="space-y-4 animate-fade-in print:m-0 print:p-0">
                <div className="text-center font-bold text-gray-700 text-sm print:hidden">
                  Verified Student Identity Card
                </div>
                <StudentIdCard student={foundStudent} onBack={handleCancel} />
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-[#002b7f] text-white py-6 text-xs text-center border-t-2 border-yellow-400 mt-auto print:hidden">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <p className="font-semibold">
            © {new Date().getFullYear()} Board of Higher Secondary Education, Delhi. All Rights
            Reserved.
          </p>
          <p className="text-gray-300 text-[11px]">
            Govt. of Delhi Regd. No. 275 (India) | An Autonomous Organisation under Deptt. of School
            Education &amp; Literacy
          </p>
        </div>
      </footer>

      {/* Admin Login Modal */}
      <AdminLoginModal isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
    </div>
  );
}
