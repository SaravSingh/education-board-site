import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import React, { useState } from "react";
import { Header } from "@/components/Header";
import { AdminLoginModal } from "@/components/AdminLoginModal";
import azadiMahotsav from "@/assets/azadi_mahotsav.svg";
import swachhBharat from "@/assets/swachh_bharat.svg";
import { Home as HomeIcon, ChevronRight, BookOpen, Search } from "lucide-react";

export const Route = createFileRoute("/subject-code")({
  head: () => ({
    meta: [
      { title: "Subject Codes 2026 — Board of Higher Secondary Education, Delhi (BHSE)" },
      {
        name: "description",
        content:
          "Official Subject Codes for Class X (Secondary) and Class XII (Senior Secondary) examinations under Board of Higher Secondary Education, Delhi.",
      },
    ],
  }),
  component: SubjectCodePage,
});

function SubjectCodePage() {
  const navigate = useNavigate();
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const subjectCodes = [
    {
      code: "101",
      subject: "ENGLISH LANGUAGE & LITERATURE",
      stream: "Secondary (Class X)",
      theoryMarks: "80",
      practicalMarks: "20",
    },
    {
      code: "102",
      subject: "HINDI COURSE-A",
      stream: "Secondary (Class X)",
      theoryMarks: "80",
      practicalMarks: "20",
    },
    {
      code: "103",
      subject: "SANSKRIT",
      stream: "Secondary (Class X)",
      theoryMarks: "80",
      practicalMarks: "20",
    },
    {
      code: "201",
      subject: "MATHEMATICS (STANDARD / BASIC)",
      stream: "Secondary (Class X)",
      theoryMarks: "80",
      practicalMarks: "20",
    },
    {
      code: "202",
      subject: "SCIENCE (PHYSICS, CHEMISTRY, BIOLOGY)",
      stream: "Secondary (Class X)",
      theoryMarks: "80",
      practicalMarks: "20",
    },
    {
      code: "203",
      subject: "SOCIAL SCIENCE (HIST, CIV, GEO, ECO)",
      stream: "Secondary (Class X)",
      theoryMarks: "80",
      practicalMarks: "20",
    },
    {
      code: "204",
      subject: "COMPUTER APPLICATIONS / IT",
      stream: "Secondary (Class X)",
      theoryMarks: "50",
      practicalMarks: "50",
    },
    {
      code: "301",
      subject: "ENGLISH CORE / ELECTIVE",
      stream: "Senior Secondary (Class XII)",
      theoryMarks: "80",
      practicalMarks: "20",
    },
    {
      code: "302",
      subject: "HINDI CORE / ELECTIVE",
      stream: "Senior Secondary (Class XII)",
      theoryMarks: "80",
      practicalMarks: "20",
    },
    {
      code: "401",
      subject: "PHYSICS",
      stream: "Senior Secondary (Science)",
      theoryMarks: "70",
      practicalMarks: "30",
    },
    {
      code: "402",
      subject: "CHEMISTRY",
      stream: "Senior Secondary (Science)",
      theoryMarks: "70",
      practicalMarks: "30",
    },
    {
      code: "403",
      subject: "BIOLOGY",
      stream: "Senior Secondary (Science)",
      theoryMarks: "70",
      practicalMarks: "30",
    },
    {
      code: "404",
      subject: "MATHEMATICS",
      stream: "Senior Secondary (Science/Arts)",
      theoryMarks: "80",
      practicalMarks: "20",
    },
    {
      code: "405",
      subject: "COMPUTER SCIENCE / INFORMATICS PRACTICES",
      stream: "Senior Secondary (Science/Commerce)",
      theoryMarks: "70",
      practicalMarks: "30",
    },
    {
      code: "501",
      subject: "ACCOUNTANCY",
      stream: "Senior Secondary (Commerce)",
      theoryMarks: "80",
      practicalMarks: "20",
    },
    {
      code: "502",
      subject: "BUSINESS STUDIES",
      stream: "Senior Secondary (Commerce)",
      theoryMarks: "80",
      practicalMarks: "20",
    },
    {
      code: "503",
      subject: "ECONOMICS",
      stream: "Senior Secondary (Commerce/Arts)",
      theoryMarks: "80",
      practicalMarks: "20",
    },
    {
      code: "601",
      subject: "POLITICAL SCIENCE",
      stream: "Senior Secondary (Arts)",
      theoryMarks: "80",
      practicalMarks: "20",
    },
    {
      code: "602",
      subject: "HISTORY",
      stream: "Senior Secondary (Arts)",
      theoryMarks: "80",
      practicalMarks: "20",
    },
    {
      code: "603",
      subject: "GEOGRAPHY",
      stream: "Senior Secondary (Arts)",
      theoryMarks: "70",
      practicalMarks: "30",
    },
    {
      code: "604",
      subject: "SOCIOLOGY",
      stream: "Senior Secondary (Arts)",
      theoryMarks: "80",
      practicalMarks: "20",
    },
    {
      code: "605",
      subject: "PSYCHOLOGY",
      stream: "Senior Secondary (Arts)",
      theoryMarks: "70",
      practicalMarks: "30",
    },
  ];

  const filteredSubjects = subjectCodes.filter(
    (s) =>
      s.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.stream.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans w-full overflow-x-hidden">
      <Header
        onOpenAdminLogin={() => setIsAdminOpen(true)}
        onOpenResult={() => navigate({ to: "/result" })}
        onOpenVerification={() => navigate({ to: "/result" })}
      />

      <div className="bg-slate-200 border-b border-gray-300 py-2.5 px-4 text-xs font-semibold text-slate-700">
        <div className="max-w-7xl mx-auto flex items-center gap-2">
          <Link to="/" className="text-blue-800 hover:underline flex items-center gap-1">
            <HomeIcon className="w-3.5 h-3.5" /> Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-600">Academic</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-bold uppercase">Subject Code</span>
        </div>
      </div>

      <main className="w-full max-w-7xl mx-auto px-4 py-8 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-4 lg:col-span-3 space-y-8">
            <div>
              <h3 className="font-serif italic text-xl font-bold text-gray-700 border-b-2 border-gray-300 pb-1 mb-3">
                Quick Link
              </h3>
              <ul className="text-xs font-medium text-gray-700 divide-y divide-dashed divide-gray-300 border-t border-dashed border-gray-300">
                <li className="py-2.5">
                  <Link to="/about" className="hover:text-amber-600 flex items-center gap-1.5">
                    <span className="text-amber-500 font-bold">▸</span> About us
                  </Link>
                </li>
                <li className="py-2.5">
                  <Link
                    to="/examination"
                    className="hover:text-amber-600 flex items-center gap-1.5"
                  >
                    <span className="text-amber-500 font-bold">▸</span> Examination
                  </Link>
                </li>
                <li className="py-2.5">
                  <Link
                    to="/holiday-list"
                    className="hover:text-amber-600 flex items-center gap-1.5"
                  >
                    <span className="text-amber-500 font-bold">▸</span> List of Holidays 2026
                  </Link>
                </li>
                <li className="py-2.5">
                  <Link
                    to="/subject-code"
                    className="hover:text-amber-600 flex items-center gap-1.5 font-bold text-blue-900"
                  >
                    <span className="text-amber-500 font-bold">▸</span> Subject Code
                  </Link>
                </li>
                <li className="py-2.5">
                  <Link
                    to="/regional-centre"
                    className="hover:text-amber-600 flex items-center gap-1.5"
                  >
                    <span className="text-amber-500 font-bold">▸</span> Regional Centre
                  </Link>
                </li>
                <li className="py-2.5">
                  <Link
                    to="/result"
                    className="hover:text-amber-600 flex items-center gap-1.5 font-bold text-blue-900"
                  >
                    <span className="text-amber-500 font-bold">▸</span> Result Portal
                  </Link>
                </li>
              </ul>
            </div>

            <div className="pt-4 flex flex-col items-center gap-6">
              <img
                src={azadiMahotsav}
                alt="75 Azadi Ka Amrit Mahotsav"
                className="w-40 h-auto object-contain"
              />
              <img src={swachhBharat} alt="Swachh Bharat" className="w-44 h-auto object-contain" />
            </div>
          </div>

          <div className="md:col-span-8 lg:col-span-9 bg-white rounded-xl p-4 sm:p-8 shadow-sm border border-gray-200 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-200 pb-4">
              <div>
                <h1 className="font-serif italic text-2xl sm:text-3xl font-bold text-gray-800 flex items-center gap-2">
                  <BookOpen className="w-7 h-7 text-blue-800" />
                  SUBJECT CODES (CLASS X &amp; XII)
                </h1>
                <p className="text-xs text-gray-600 mt-1">
                  Official Subject Codes &amp; Examination Mark Distribution Scheme 2026
                </p>
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Filter by code or subject..."
                  className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="overflow-x-auto border-2 border-gray-400 rounded-lg">
              <table className="w-full text-left text-xs border-collapse font-sans min-w-[600px]">
                <thead>
                  <tr className="bg-[#5a5a5a] text-white font-bold text-[11px] sm:text-xs uppercase tracking-wide">
                    <th className="p-3 border-r-2 border-white w-24 text-center">CODE</th>
                    <th className="p-3 border-r-2 border-white text-left pl-4">SUBJECT NAME</th>
                    <th className="p-3 border-r-2 border-white text-center">
                      ACADEMIC STREAM / CLASS
                    </th>
                    <th className="p-3 border-r-2 border-white w-20 text-center">THEORY</th>
                    <th className="p-3 w-20 text-center">PRACTICAL</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-300 font-semibold text-gray-800">
                  {filteredSubjects.map((item, idx) => (
                    <tr
                      key={item.code}
                      className={
                        idx % 2 === 0
                          ? "bg-white hover:bg-slate-100"
                          : "bg-slate-50/70 hover:bg-slate-100"
                      }
                    >
                      <td className="p-2.5 border-r-2 border-gray-300 text-center font-mono font-bold text-blue-900">
                        {item.code}
                      </td>
                      <td className="p-2.5 border-r-2 border-gray-300 pl-4 font-bold text-slate-900">
                        {item.subject}
                      </td>
                      <td className="p-2.5 border-r-2 border-gray-300 text-center text-slate-700">
                        {item.stream}
                      </td>
                      <td className="p-2.5 border-r-2 border-gray-300 text-center font-mono text-emerald-800 font-bold">
                        {item.theoryMarks}
                      </td>
                      <td className="p-2.5 text-center font-mono text-purple-800 font-bold">
                        {item.practicalMarks}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      <footer className="w-full bg-[#002b7f] text-white py-6 text-xs text-center border-t-2 border-yellow-400">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <p className="font-semibold">
            © {new Date().getFullYear()} Board of Higher Secondary Education, Delhi. All Rights
            Reserved.
          </p>
        </div>
      </footer>

      <AdminLoginModal isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
    </div>
  );
}
