import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import React, { useState } from "react";
import { Header } from "@/components/Header";
import { AdminLoginModal } from "@/components/AdminLoginModal";
import azadiMahotsav from "@/assets/azadi_mahotsav.svg";
import swachhBharat from "@/assets/swachh_bharat.svg";
import { Home as HomeIcon, ChevronRight, School, Search } from "lucide-react";

export const Route = createFileRoute("/affiliated-school")({
  head: () => ({
    meta: [
      { title: "Affiliated Schools — Board of Higher Secondary Education, Delhi (BHSE)" },
      {
        name: "description",
        content:
          "Official directory of recognized affiliated schools and institutional codes under Board of Higher Secondary Education, Delhi (BHSE).",
      },
    ],
  }),
  component: AffiliatedSchoolPage,
});

function AffiliatedSchoolPage() {
  const navigate = useNavigate();
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const schools = [
    { slNo: 1, name: "ADITYA SR. SECONDARY SCHOOL, ELLENABAD (HARYANA)", code: "301" },
    { slNo: 2, name: "ANKIT SR. SEC. SCHOOL ALIGARH - UP", code: "128" },
    { slNo: 3, name: "ASIAN COLLEGE NEW DELHI", code: "1138" },
    { slNo: 4, name: "BRILLIANT EDUCATION ACADEMY SINDHANUR, KARNATAKA", code: "BHSE/KAR/1456" },
    { slNo: 5, name: "CHETNA SR. SEC. SCHOOL KATIHAR (BIHAR)", code: "370" },
    { slNo: 6, name: "DELHI PUBLIC SR. SEC. SCHOOL, KANKARBAGH PATNA", code: "BHSE/0491/2005" },
    { slNo: 7, name: "DR. B.R.A SR. SEC. SCHOOL MERUT - UP", code: "107" },
    { slNo: 8, name: "G S M SR. SEC. SCHOOL KATIHAR (BIHAR)", code: "0292" },
    { slNo: 9, name: "GURUKUL SHIKSHA MANDIR SANSTHAN, KATIHAR", code: "0292-A" },
    { slNo: 10, name: "GURUKUL VIDYA MANDIR SR. SEC. SCHOOL RANCHI BANGAR, MATHURA", code: "0151" },
    { slNo: 11, name: "HANUMANT H S SCHOOL, TIKAMGARH (M.P.)", code: "BHSE/MP/2311" },
    { slNo: 12, name: "MAHARANA PRATAP SR. SEC. SCHOOL - HR", code: "144" },
    { slNo: 13, name: "MOTILAL SR. SEC. SCHOOL BHAVAPUR TEEKARI ALIGARH - UP", code: "108" },
    { slNo: 14, name: "RAJMATI S.S. SCHOOL BAUDHGHAR RAIPUR, DIST- GHAZIPUR", code: "3049" },
    { slNo: 15, name: "SANT KABIR SR. SEC. SCHOOL KRISHNAPURI, MADHEPURA (BIHAR)", code: "256" },
    { slNo: 16, name: "SATYA SAI SR. SEC. SCHOOL, PATNA", code: "183" },
    { slNo: 17, name: "SHRI M.B.D. INTER COLLEGE DOORA AGRA (U.P)", code: "145" },
    { slNo: 18, name: "ST. MARY SEN. SEC. SCHOOL PANJGRAIN, GURDASPUR (PUNJAB)", code: "367" },
    { slNo: 19, name: "SUCCESS SENIOR SECONDARY COLLEGE BANGALORE, KARNATAKA", code: "1068" },
    { slNo: 20, name: "VINOBA BHAVE SR. SEC. SCHOOL , ELLENABAD", code: "105" },
  ];

  const filteredSchools = schools.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.code.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans w-full overflow-x-hidden">
      {/* 100% Full Width Dynamic Header */}
      <Header
        onOpenAdminLogin={() => setIsAdminOpen(true)}
        onOpenResult={() => navigate({ to: "/result" })}
        onOpenVerification={() => navigate({ to: "/result" })}
      />

      {/* BREADCRUMB STRIP */}
      <div className="bg-slate-200 border-b border-gray-300 py-2.5 px-4 text-xs font-semibold text-slate-700">
        <div className="max-w-7xl mx-auto flex items-center gap-2">
          <Link to="/" className="text-blue-800 hover:underline flex items-center gap-1">
            <HomeIcon className="w-3.5 h-3.5" /> Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-bold uppercase">Affiliated School</span>
        </div>
      </div>

      {/* MAIN BODY CONTENT AREA (Matching Screenshot Pixel-Perfectly) */}
      <main className="w-full max-w-7xl mx-auto px-4 py-10 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Left Column: Quick Link List & Logos */}
          <div className="md:col-span-4 lg:col-span-3 space-y-8">
            <div>
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
                  <button
                    onClick={() => alert("Date Sheet 2026 available for Class X & XII")}
                    className="hover:text-amber-600 transition flex items-center gap-1.5 cursor-pointer text-left"
                  >
                    <span className="text-amber-500 font-bold">▸</span> Date Sheet
                  </button>
                </li>
                <li className="py-2.5">
                  <Link
                    to="/result"
                    className="hover:text-amber-600 transition flex items-center gap-1.5 font-bold text-blue-900"
                  >
                    <span className="text-amber-500 font-bold">▸</span> Result
                  </Link>
                </li>
                <li className="py-2.5">
                  <Link
                    to="/result"
                    className="hover:text-amber-600 transition flex items-center gap-1.5"
                  >
                    <span className="text-amber-500 font-bold">▸</span> Admit Card
                  </Link>
                </li>
                <li className="py-2.5">
                  <Link
                    to="/result"
                    className="hover:text-amber-600 transition flex items-center gap-1.5 font-bold text-emerald-800"
                  >
                    <span className="text-amber-500 font-bold">▸</span> Enrollment Verification
                  </Link>
                </li>
                <li className="py-2.5">
                  <Link
                    to="/admin"
                    className="text-red-700 font-bold hover:text-red-900 flex items-center gap-1.5"
                  >
                    <span className="text-red-600 font-bold">▸</span> Admin Dashboard Portal
                  </Link>
                </li>
              </ul>
            </div>

            {/* Logos Box: Azadi Ka Amrit Mahotsav & Swachh Bharat */}
            <div className="pt-4 flex flex-col items-center gap-6">
              <img
                src={azadiMahotsav}
                alt="75 Azadi Ka Amrit Mahotsav"
                className="w-40 h-auto object-contain hover:scale-105 transition"
              />
              <img
                src={swachhBharat}
                alt="Swachh Bharat Ek Kadam Swachhata Ki Ore"
                className="w-44 h-auto object-contain hover:scale-105 transition"
              />
            </div>
          </div>

          {/* Right Column: Affiliated Schools Table (Matching Screenshot) */}
          <div className="md:col-span-8 lg:col-span-9 bg-white rounded-xl p-4 sm:p-8 shadow-sm border border-gray-200 space-y-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-gray-200 pb-3">
              <h1 className="font-serif italic text-2xl sm:text-3xl font-bold text-gray-800">
                AFFILIATED SCHOOL
              </h1>

              {/* Search filter */}
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Filter by school name or code..."
                  className="w-full pl-8 pr-3 py-1.5 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Table Matching Screenshot Pixel-Perfectly */}
            <div className="overflow-x-auto border-2 border-gray-400 rounded-lg">
              <table className="w-full text-left text-xs border-collapse font-sans min-w-[600px]">
                <thead>
                  <tr className="bg-[#5a5a5a] text-white font-bold text-[11px] sm:text-xs uppercase tracking-wide">
                    <th className="p-3 border-r-2 border-white w-16 text-center">SL NO.</th>
                    <th className="p-3 border-r-2 border-white text-center">SCHOOL DETAILS</th>
                    <th className="p-3 w-44 text-center">SCHOOL CODE</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-300 font-semibold text-gray-800">
                  {filteredSchools.length > 0 ? (
                    filteredSchools.map((item) => (
                      <tr key={item.slNo} className="hover:bg-slate-100 transition">
                        <td className="p-2.5 border-r-2 border-gray-300 text-center font-mono">
                          {item.slNo}
                        </td>
                        <td className="p-2.5 border-r-2 border-gray-300 uppercase font-bold text-slate-900">
                          {item.name}
                        </td>
                        <td className="p-2.5 text-center font-mono font-bold text-blue-900">
                          {item.code}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3} className="p-6 text-center text-gray-500 font-medium">
                        No affiliated schools found matching "{searchTerm}".
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="text-[11px] text-gray-500 font-mono text-right">
              Total Affiliated Institutions Displayed: {filteredSchools.length}
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="w-full bg-[#002b7f] text-white py-6 text-xs text-center border-t-2 border-yellow-400">
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
