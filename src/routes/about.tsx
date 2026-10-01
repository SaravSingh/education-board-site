import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import React, { useState } from "react";
import { Header } from "@/components/Header";
import { AdminLoginModal } from "@/components/AdminLoginModal";
import logoEmblem from "@/assets/logo_emblem.svg";
import azadiMahotsav from "@/assets/azadi_mahotsav.svg";
import swachhBharat from "@/assets/swachh_bharat.svg";
import welcomeExecutive from "@/assets/welcome_executive.jpg";
import { ChevronRight, Home as HomeIcon, Mail, Globe, Award, Calendar } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Board of Higher Secondary Education, Delhi (BHSE)" },
      {
        name: "description",
        content:
          "Learn about the history, vision, autonomous recognition, and academic framework of the Board of Higher Secondary Education, Delhi (BHSE), established in 1956.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const navigate = useNavigate();
  const [isAdminOpen, setIsAdminOpen] = useState(false);

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
          <span className="text-slate-900 font-bold uppercase">About Us</span>
        </div>
      </div>

      {/* MAIN BODY CONTENT AREA */}
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
                    className="hover:text-amber-600 transition flex items-center gap-1.5 font-bold text-amber-700"
                  >
                    <span className="text-amber-500 font-bold">▸</span> About us
                  </Link>
                </li>
                <li className="py-2.5">
                  <Link
                    to="/result"
                    className="hover:text-amber-600 transition flex items-center gap-1.5"
                  >
                    <span className="text-amber-500 font-bold">▸</span> Examination
                  </Link>
                </li>
                <li className="py-2.5">
                  <Link
                    to="/"
                    className="hover:text-amber-600 transition flex items-center gap-1.5"
                  >
                    <span className="text-amber-500 font-bold">▸</span> Notice &amp; Announcements
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

          {/* Right Column: Complete Official About Us Text */}
          <div className="md:col-span-8 lg:col-span-9 bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-gray-200 space-y-6 font-sans text-gray-700 text-xs sm:text-sm leading-relaxed">
            {/* Header Title + Businessman Presentation Photo */}
            <div className="border-b border-gray-200 pb-6">
              <div className="flex flex-col md:flex-row items-start justify-between gap-6">
                {/* Text Title & Intro */}
                <div className="flex-1 space-y-4">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 font-serif leading-tight border-b-2 border-amber-500 pb-2 inline-block">
                    Welcome to Board of Higher Secondary Education, Delhi (BHSE)
                  </h1>

                  <p className="text-gray-700 leading-relaxed text-justify">
                    Board of Higher Secondary Education, Delhi (BHSE) was established in 1956 with
                    the objective of promoting and supporting school and higher secondary education
                    through an organized, flexible and accessible educational system.
                  </p>

                  <p className="text-gray-700 leading-relaxed text-justify">
                    BHSE is an autonomous educational board working towards providing opportunities
                    for students who may not always be able to pursue education through the
                    conventional daily classroom system. The Board aims to facilitate education
                    through flexible learning, academic support, examinations and certification,
                    subject to its applicable rules and regulations. The Board is committed to the
                    development and improvement of school and higher secondary education by
                    providing a structured academic framework and promoting quality, discipline and
                    educational excellence.
                  </p>
                </div>

                {/* Executive Advisor Image */}
                <div className="w-full md:w-56 shrink-0 flex justify-center md:justify-end">
                  <div className="bg-gradient-to-b from-blue-50 to-amber-50 p-2 rounded-xl border border-gray-200 shadow-sm">
                    <img
                      src={welcomeExecutive}
                      alt="Welcome Executive Education Advisor"
                      className="w-48 sm:w-56 h-auto object-contain rounded-lg shadow-inner"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Feature Sections */}
            <div className="space-y-5 text-justify text-gray-700 text-xs sm:text-sm leading-relaxed">
              <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-blue-800">
                <h3 className="font-bold text-gray-900 text-sm sm:text-base mb-1">
                  Flexible &amp; Accessible Education
                </h3>
                <p>
                  The Board of Higher Secondary Education, Delhi (BHSE) provides a flexible approach
                  to education, enabling eligible students to continue their studies without the
                  limitations of attending regular daily classes. Its educational system is designed
                  to provide learning opportunities to students from different backgrounds and
                  locations. Through appropriate academic and instructional support, BHSE seeks to
                  make education more accessible to students who require an alternative and flexible
                  mode of learning.
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-emerald-700">
                <h3 className="font-bold text-gray-900 text-sm sm:text-base mb-1">
                  Online Admission &amp; Student Support
                </h3>
                <p>
                  BHSE aims to provide convenient educational services through digital facilities.
                  Students can avail themselves of online admission-related services, enrollment
                  facilities and academic information, as applicable under the Board's rules. The
                  Board also works towards providing study resources and academic support to help
                  students continue their education in a convenient and systematic manner.
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-amber-600">
                <h3 className="font-bold text-gray-900 text-sm sm:text-base mb-1">
                  Examinations &amp; Certification
                </h3>
                <p>
                  The Board conducts examinations at the applicable Secondary and Higher Secondary
                  levels in accordance with its academic framework and prescribed rules. Successful
                  candidates are awarded certificates/documentation as applicable under the Board's
                  regulations. The Board also provides facilities for verification of academic
                  records and examination-related documents through its designated channels.
                  Autonomous Educational System As an autonomous educational board, BHSE seeks to
                  develop and administer its academic and examination framework in accordance with
                  its governing provisions, rules and objectives. The autonomous approach enables
                  the Board to focus on developing suitable academic programmes, examination
                  procedures and educational services for learners who require flexible and
                  accessible educational opportunities. BHSE's objective is to contribute towards
                  the expansion of educational opportunities while maintaining academic discipline,
                  transparency, quality and systematic examination processes.
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-purple-800">
                <h3 className="font-bold text-gray-900 text-sm sm:text-base mb-1">Our Vision</h3>
                <p>
                  The vision of the Board of Higher Secondary Education, Delhi (BHSE) is to promote
                  accessible, flexible and quality education for students across India and to
                  support learners who wish to continue their education through alternative learning
                  pathways. The Board strives to use modern educational and digital facilities to
                  make academic information, student services, learning support and
                  examination-related services more convenient and accessible. Our commitment is to
                  promote education, academic discipline and quality learning opportunities for
                  students while supporting the continuing development of the education system.
                </p>
              </div>
            </div>

            {/* Official Board Information Box */}
            <div className="bg-[#fffde7] border-2 border-[#f7c232] rounded-xl p-5 shadow-sm space-y-2 font-sans text-xs sm:text-sm text-gray-900 mt-6">
              <div className="font-extrabold text-slate-900 font-serif text-base uppercase tracking-wide border-b border-amber-300 pb-1">
                BOARD OF HIGHER SECONDARY EDUCATION, DELHI (BHSE)
              </div>
              <div className="flex items-center gap-2 pt-1">
                <Calendar className="w-4 h-4 text-amber-700 shrink-0" />
                <span>
                  <strong>Established:</strong> 1956
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-700 shrink-0" />
                <span>
                  <strong>E-mail:</strong>{" "}
                  <code className="font-mono font-bold text-blue-900">info@bhsed.co.in</code> /{" "}
                  <code className="font-mono font-bold text-blue-900">
                    coe.verification@bhsed.co.in
                  </code>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-amber-700 shrink-0" />
                <span>
                  <strong>Visit Us:</strong>{" "}
                  <code className="font-mono font-bold text-emerald-800">www.bhsed.co.in</code>
                </span>
              </div>
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
