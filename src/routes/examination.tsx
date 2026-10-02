import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import React, { useState } from "react";
import { Header } from "@/components/Header";
import { AdminLoginModal } from "@/components/AdminLoginModal";
import azadiMahotsav from "@/assets/azadi_mahotsav.svg";
import swachhBharat from "@/assets/swachh_bharat.svg";
import { Home as HomeIcon, ChevronRight, Bell, FileText, ExternalLink } from "lucide-react";

export const Route = createFileRoute("/examination")({
  head: () => ({
    meta: [
      { title: "Examination & Latest News — Board of Higher Secondary Education, Delhi (BHSE)" },
      {
        name: "description",
        content:
          "Latest examination notifications, revised date sheets, student support information, and result announcement notices for Secondary (10th) and Senior Secondary (12th) examinations.",
      },
    ],
  }),
  component: ExaminationPage,
});

function ExaminationPage() {
  const navigate = useNavigate();
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const newsItems = [
    {
      id: 1,
      text: "TO WHOM IT MAY CONCERN: BOARD OF HIGHER SECONDARY EDUCATION, DELHI (BHSE) OFFICIAL NOTICE - Official assistance is provided to students, candidates, and institutions through our designated email portals.",
      isHighlight: true,
    },
    {
      id: 2,
      text: "Official Verification & Student Support: Contact Hours 10:30 AM to 6:30 PM (Mon to Sat) via coe.verification@bhsed.co.in",
      isHighlight: true,
    },
    {
      id: 3,
      text: "Revised Date Sheet For Secondary (Class-X) And Senior Secondary (Class-XII) Examinations, May- 2026 Declared",
      isHighlight: true,
      link: "/result",
    },
    {
      id: 4,
      text: "The Result of Secondary (10th) and Senior Secondary (12th) Examination 2025 will be declared on 25th September 2025.",
      isHighlight: false,
    },
    {
      id: 5,
      text: "Admission open for the Session of 2025-2026, for Secondary (10th) & Senior Secondary (12th) School Examinations- 2026 (Annual Mode)",
      isHighlight: false,
    },
    {
      id: 6,
      text: "Revised Date Sheet for Secondary (Class-X) And Senior Secondary (Class-XII) Examinations May-2025, Examinations Has Been Released Click Here . . .",
      isHighlight: false,
      link: "/result",
    },
    {
      id: 7,
      text: "Revised Date Sheet for Secondary (Class-X) And Senior Secondary (Class-XII) Examinations May-2024, Examinations Has Been Released Click Here . . .",
      isHighlight: false,
      link: "/result",
    },
    {
      id: 8,
      text: "Result of Secondary (10th) & Sr. Secondary (12th) Examination Mar/Apr 2024, Declared,",
      isHighlight: false,
      link: "/result",
    },
    {
      id: 9,
      text: "Admision notification 2025/Apr/May",
      isHighlight: false,
    },
    {
      id: 10,
      text: "Admission open for the session of 2023-24, for secondary(10th) & senior secondary(12th) school examination APR- 2024, CLOSED",
      isHighlight: false,
    },
    {
      id: 11,
      text: "Result Of Secondary (10th) & Sr.Secondary (12th) Examination July 2023, (Annual) will be declared on 12/09/2023 by 3:00 PM.",
      isHighlight: false,
    },
    {
      id: 12,
      text: "Result Of Secondary (10th) & Sr.Secondary (12th) Examination July 2023, (Annual) will be declared on 12/09/2023 by 3:00 PM.",
      isHighlight: false,
    },
    {
      id: 13,
      text: "Regarding information for BHSE Delhi board, domain & data updating news.",
      isHighlight: false,
    },
    {
      id: 14,
      text: "Revised date sheet for Secondary (class-X) Sr. Secondary (class-XII) Exam July- 2023.",
      isHighlight: false,
    },
    {
      id: 15,
      text: "Domain Update News",
      isHighlight: false,
    },
    {
      id: 16,
      text: "Welcome to Board of Higher Secondary Education Delhi",
      isHighlight: false,
    },
  ];

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
          <span className="text-slate-900 font-bold uppercase">Examination</span>
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
                    className="hover:text-amber-600 transition flex items-center gap-1.5 font-bold text-amber-700"
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

          {/* Right Column: Latest News Section (Matching Screenshot) */}
          <div className="md:col-span-8 lg:col-span-9 bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-gray-200 space-y-6">
            <div className="border-b-2 border-slate-900 pb-2">
              <h1 className="font-serif italic text-2xl sm:text-3xl font-bold text-gray-800">
                Latest News
              </h1>
            </div>

            {/* 16 News Bullet Items */}
            <div className="space-y-3.5 font-sans text-xs sm:text-sm text-gray-800">
              {newsItems.map((item) => (
                <div key={item.id} className="flex items-start gap-2.5 leading-relaxed group">
                  <span className="text-amber-600 text-base shrink-0 leading-tight">👉</span>
                  <div className="flex-1">
                    {item.link ? (
                      <Link
                        to={item.link}
                        className={`hover:text-blue-900 hover:underline transition ${
                          item.isHighlight
                            ? "font-bold text-slate-900"
                            : "font-medium text-gray-800"
                        }`}
                      >
                        {item.text}
                      </Link>
                    ) : (
                      <span
                        className={
                          item.isHighlight
                            ? "font-bold text-slate-900"
                            : "font-medium text-gray-800"
                        }
                      >
                        {item.text}
                      </span>
                    )}
                  </div>
                </div>
              ))}
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
