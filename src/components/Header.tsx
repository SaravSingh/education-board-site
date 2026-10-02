import React, { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import logoEmblem from "@/assets/logo_emblem.svg";
import digitalIndia from "@/assets/digital_india.svg";

interface HeaderProps {
  onOpenAdminLogin: () => void;
  onOpenResult: () => void;
  onOpenVerification: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenAdminLogin,
  onOpenResult,
  onOpenVerification,
}) => {
  const [formattedTime, setFormattedTime] = useState("");
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const day = String(now.getDate()).padStart(2, "0");
      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const month = monthNames[now.getMonth()];
      const year = now.getFullYear();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");

      setFormattedTime(`${day}-${month}-${year},${hours}:${minutes}:${seconds}`);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleDropdown = (menu: string) => {
    setActiveDropdown((prev) => (prev === menu ? null : menu));
  };

  return (
    <header className="w-full font-sans select-none bg-white">
      {/* 1. Top Black Header Bar — 100% Full Width */}
      <div className="w-full bg-black text-white px-3 py-1 text-[11px] sm:text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex flex-wrap items-center gap-1.5 text-gray-200">
            <span>List of Boards of School Education</span>
            <span className="hidden sm:inline">|</span>
            <span>Document Verification mail :-</span>
            <a
              href="mailto:coe.verification@bhsed.co.in"
              className="font-mono text-yellow-300 font-semibold hover:underline"
            >
              coe.verification@bhsed.co.in
            </a>
            <span>|</span>
          </div>

          <div>
            <button
              onClick={onOpenAdminLogin}
              className="text-amber-400 font-bold hover:text-amber-300 hover:underline cursor-pointer"
            >
              Admin Login
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Tricolor Header Banner — 100% Full Width Background, Centered Content */}
      <div className="w-full relative bg-gradient-to-r from-[#ff9933]/25 via-white to-[#138808]/25 border-b border-gray-300 py-3 px-3">
        {/* Decorative Tricolor Top Accent Strip */}
        <div className="absolute top-0 left-0 right-0 h-1 flex">
          <div className="w-1/3 bg-[#ff9933]"></div>
          <div className="w-1/3 bg-white"></div>
          <div className="w-1/3 bg-[#138808]"></div>
        </div>

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 py-1">
          {/* Left Block: Approved by NCERT Stamp + Official Emblem Seal (Clickable to Home) */}
          <Link to="/" className="flex flex-col items-center shrink-0 group cursor-pointer">
            <div className="text-red-700 font-extrabold text-xs tracking-tight mb-1 font-serif uppercase group-hover:underline text-center">
              Approved by NCERT
            </div>
            <img
              src={logoEmblem}
              alt="Board Emblem Seal"
              className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 object-contain group-hover:scale-105 transition transform drop-shadow-xs"
            />
            <div className="text-slate-800 font-bold text-xs tracking-wide mt-1 text-center">
              Estd.- 1964
            </div>
          </Link>

          {/* Center Block: Official Hindi & English Titles (Clickable to Home) */}
          <Link to="/" className="text-center flex-1 px-2 py-1 cursor-pointer group">
            <div className="text-xs sm:text-sm font-bold text-slate-800 leading-tight">
              भारत सरकार{" "}
              <span className="font-mono text-xs text-red-700 ml-1">टी एम-1, नं० 1791977</span>
            </div>
            <div className="text-[11px] font-bold text-slate-700 uppercase tracking-tight leading-tight">
              (Government Recognised)
            </div>
            <div className="text-[11px] font-bold text-slate-900 leading-tight">
              Govt. of Delhi Regd. No. 275 (India)
            </div>

            {/* Main Hindi Heading */}
            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#1d359c] font-serif leading-tight my-1 group-hover:text-blue-700">
              बोर्ड ऑफ हायर सेकण्डरी एजुकेशन, दिल्ली
            </h1>

            {/* Main English Heading */}
            <h2 className="text-lg sm:text-xl md:text-2xl font-black text-[#b30000] font-serif leading-tight tracking-tight mb-1">
              Board of Higher Secondary Education, Delhi
            </h2>

            {/* Subtitles & Recognitions */}
            <div className="text-[11px] font-bold text-slate-800 leading-snug">
              An Autonomous Organisation under Deptt. of School Education and Literacy
            </div>
            <div className="text-[10px] sm:text-[11px] font-semibold text-slate-700 leading-tight">
              मान्यता परिपत्र सं०- F-46-A/66-S.U.
            </div>
            <div className="text-[10px] sm:text-[11px] font-medium text-slate-700 leading-tight">
              भारत सरकार शिक्षा मंत्रालय (शिक्षा विभाग) नई दिल्ली द्वारा पारित
            </div>
            <div className="text-[10px] sm:text-[11px] font-medium text-slate-700 leading-tight">
              स्वीकृत रजिस्टर्ड नं०- 54/NCTSL-2012,राष्ट्रीय सिंधी भाषा विकास परिषद्, नई दिल्ली
            </div>
            <div className="text-[10px] sm:text-[11px] font-medium text-slate-700 leading-tight">
              माध्यमिक शिक्षा परिषद उत्तर प्रदेश की परीक्षाओं के समकक्ष मान्यता !
            </div>
            <div className="text-[10px] sm:text-[11px] font-semibold text-slate-800 leading-tight">
              मानव संसाधन विकास मंत्रालय उच्च शिक्षा विभाग (भारत सरकार) के द्वारा अनुमोदित
            </div>
          </Link>

          {/* Right Block: URL, Email, Digital India Logo & Dynamic Live Clock */}
          <div className="flex flex-col items-center md:items-end text-center md:text-right shrink-0 gap-0.5">
            <div className="text-xs sm:text-sm font-bold text-[#09327e] font-mono">
              www.bhsed.co.in
            </div>
            <div className="text-[11px] text-slate-700 font-mono">E-mail: info@bhsed.co.in</div>

            <img
              src={digitalIndia}
              alt="Digital India"
              className="w-24 sm:w-28 h-10 object-contain my-1"
            />

            {/* Real-time Ticking Counter */}
            <div className="text-red-600 font-extrabold font-mono text-xs sm:text-sm tracking-wider px-2 py-0.5 bg-red-50 border border-red-200 rounded shadow-2xs">
              {formattedTime || "22-Sep-2026,11:44:35"}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Latest Updates Marquee Ticker Bar — 100% Full Width */}
      <div className="w-full bg-[#00bfff] text-black flex items-center text-xs overflow-hidden border-b border-cyan-500">
        <div className="bg-[#00a2e8] text-black font-extrabold px-3 py-1.5 shrink-0 flex items-center gap-1 shadow-xs uppercase tracking-wide border-r border-cyan-400 text-xs">
          Latest Updates
        </div>
        <div className="overflow-hidden whitespace-nowrap w-full py-1.5 font-bold text-black text-xs">
          <div className="inline-block animate-marquee">
            <span className="inline-flex items-center gap-1 bg-red-600 text-white font-extrabold text-[10px] px-1.5 py-0.5 rounded-sm mr-2 animate-pulse">
              NEW
            </span>
            <span className="mr-8 uppercase">
              TO WHOM IT MAY CONCERN BOARD OF HIGHER SECONDARY EDUCATION DELHI — EXAMINATION DATE
              SHEET FOR CLASS X &amp; XII ANNOUNCED.
            </span>

            <span className="inline-flex items-center gap-1 bg-red-600 text-white font-extrabold text-[10px] px-1.5 py-0.5 rounded-sm mr-2 animate-pulse">
              NEW
            </span>
            <span className="mr-8 uppercase">
              ONLINE VERIFICATION OF MARK SHEETS AND CERTIFICATES AVAILABLE NOW AT CONTROLLER OF
              EXAMINATIONS CELL.
            </span>

            <span className="inline-flex items-center gap-1 bg-red-600 text-white font-extrabold text-[10px] px-1.5 py-0.5 rounded-sm mr-2 animate-pulse">
              NEW
            </span>
            <span className="mr-8 uppercase">
              APPLICATIONS INVITED FOR NEW SCHOOL AFFILIATION FOR ACADEMIC SESSION 2026-27.
            </span>
          </div>
        </div>
      </div>

      {/* 4. Main Royal Blue Navigation Bar — 100% Full Width & Clean Single-Row Alignment */}
      <nav className="w-full bg-[#002b7f] text-white text-[11px] lg:text-xs font-bold shadow-md relative z-50 whitespace-nowrap">
        <div className="max-w-7xl mx-auto flex items-center justify-start w-full min-w-max">
          {/* HOME BUTTON — Directs to Main Homepage '/' */}
          <Link
            to="/"
            onClick={() => setActiveDropdown(null)}
            className="px-3.5 sm:px-4 py-2.5 hover:bg-blue-900 uppercase tracking-wide transition border-r border-blue-800/40 cursor-pointer inline-flex items-center text-white hover:text-yellow-300"
          >
            HOME
          </Link>

          {/* ABOUT US Dropdown */}
          <div className="relative">
            <Link
              to="/about"
              onClick={() => setActiveDropdown(null)}
              className="px-2.5 sm:px-3 lg:px-3.5 py-2.5 hover:bg-blue-900 uppercase tracking-wide flex items-center gap-1 border-r border-blue-800/40 cursor-pointer inline-flex text-white hover:text-yellow-300"
            >
              ▾ ABOUT US
            </Link>
            {activeDropdown === "about" && (
              <div className="absolute left-0 top-full bg-white text-gray-800 shadow-xl border border-gray-200 rounded-b w-56 py-1 z-30 font-normal">
                <Link
                  to="/about"
                  onClick={() => setActiveDropdown(null)}
                  className="block px-4 py-2 hover:bg-blue-50 text-xs font-semibold"
                >
                  Overview &amp; Recognition
                </Link>
                <Link
                  to="/about"
                  onClick={() => setActiveDropdown(null)}
                  className="block px-4 py-2 hover:bg-blue-50 text-xs font-semibold"
                >
                  Governing Body
                </Link>
                <Link
                  to="/about"
                  onClick={() => setActiveDropdown(null)}
                  className="block px-4 py-2 hover:bg-blue-50 text-xs font-semibold"
                >
                  Chairman Message
                </Link>
              </div>
            )}
          </div>

          {/* ADMISSION Dropdown */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown("admission")}
              className="px-2.5 sm:px-3 lg:px-3.5 py-2.5 hover:bg-blue-900 uppercase tracking-wide flex items-center gap-1 border-r border-blue-800/40 cursor-pointer"
            >
              ▾ ADMISSION
            </button>
            {activeDropdown === "admission" && (
              <div className="absolute left-0 top-full bg-white text-gray-800 shadow-xl border border-gray-200 rounded-b w-56 py-1 z-30 font-normal">
                <a
                  href="#"
                  onClick={() => setActiveDropdown(null)}
                  className="block px-4 py-2 hover:bg-blue-50 text-xs"
                >
                  Admission Rules Class X &amp; XII
                </a>
                <a
                  href="#"
                  onClick={() => setActiveDropdown(null)}
                  className="block px-4 py-2 hover:bg-blue-50 text-xs"
                >
                  Direct Student Registration
                </a>
                <a
                  href="#"
                  onClick={() => setActiveDropdown(null)}
                  className="block px-4 py-2 hover:bg-blue-50 text-xs"
                >
                  Prospectus &amp; Forms
                </a>
              </div>
            )}
          </div>

          {/* ACADEMIC Dropdown (Matching Screenshot with Black Dropdown) */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown("academic")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              onClick={() => toggleDropdown("academic")}
              className={`px-2.5 sm:px-3 lg:px-3.5 py-2.5 hover:bg-blue-900 uppercase tracking-wide flex items-center gap-1 border-r border-blue-800/40 cursor-pointer transition ${
                activeDropdown === "academic"
                  ? "text-yellow-400 bg-blue-900 font-extrabold"
                  : "text-white hover:text-yellow-300"
              }`}
            >
              ▾ ACADEMIC
            </button>
            {activeDropdown === "academic" && (
              <div className="absolute left-0 top-full bg-black text-white shadow-2xl border border-gray-800 w-52 py-1.5 z-30 font-semibold rounded-b text-xs divide-y divide-gray-800">
                <Link
                  to="/holiday-list"
                  onClick={() => setActiveDropdown(null)}
                  className="block px-4 py-2 hover:bg-gray-800 hover:text-yellow-300 transition-colors cursor-pointer"
                >
                  List of Holidays
                </Link>
                <Link
                  to="/subject-code"
                  onClick={() => setActiveDropdown(null)}
                  className="block px-4 py-2 hover:bg-gray-800 hover:text-yellow-300 transition-colors cursor-pointer"
                >
                  Subject Code
                </Link>
                <Link
                  to="/regional-centre"
                  onClick={() => setActiveDropdown(null)}
                  className="block px-4 py-2 hover:bg-gray-800 hover:text-yellow-300 transition-colors cursor-pointer"
                >
                  Regional Centre
                </Link>
              </div>
            )}
          </div>

          <Link
            to="/examination"
            className="px-2.5 sm:px-3 lg:px-3.5 py-2.5 hover:bg-blue-900 uppercase tracking-wide border-r border-blue-800/40 cursor-pointer inline-flex text-white hover:text-yellow-300"
          >
            EXAMINATION
          </Link>

          <Link
            to="/affiliated-school"
            className="px-2.5 sm:px-3 lg:px-3.5 py-2.5 hover:bg-blue-900 uppercase tracking-wide border-r border-blue-800/40 cursor-pointer inline-flex text-white hover:text-yellow-300"
          >
            AFFILIATED SCHOOL
          </Link>

          {/* DOWNLOAD Dropdown */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown("download")}
              className="px-2.5 sm:px-3 lg:px-3.5 py-2.5 hover:bg-blue-900 uppercase tracking-wide flex items-center gap-1 border-r border-blue-800/40 cursor-pointer"
            >
              ▾ DOWNLOAD
            </button>
            {activeDropdown === "download" && (
              <div className="absolute left-0 top-full bg-white text-gray-800 shadow-xl border border-gray-200 rounded-b w-56 py-1 z-30 font-normal">
                <a
                  href="#"
                  onClick={() => setActiveDropdown(null)}
                  className="block px-4 py-2 hover:bg-blue-50 text-xs"
                >
                  Date Sheet 2026
                </a>
                <a
                  href="#"
                  onClick={() => setActiveDropdown(null)}
                  className="block px-4 py-2 hover:bg-blue-50 text-xs"
                >
                  Sample Question Papers
                </a>
                <a
                  href="#"
                  onClick={() => setActiveDropdown(null)}
                  className="block px-4 py-2 hover:bg-blue-50 text-xs"
                >
                  Affiliation Form PDF
                </a>
              </div>
            )}
          </div>

          <Link
            to="/result"
            onClick={() => {
              setActiveDropdown(null);
              if (onOpenResult) onOpenResult();
            }}
            className="px-2.5 sm:px-3 lg:px-3.5 py-2.5 hover:bg-blue-900 uppercase tracking-wide border-r border-blue-800/40 cursor-pointer inline-flex text-white hover:text-yellow-300 transition"
          >
            RESULT
          </Link>

          {/* RTI Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown("rti")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <Link
              to="/rti"
              onClick={() => setActiveDropdown(null)}
              className={`px-2.5 sm:px-3 lg:px-3.5 py-2.5 hover:bg-blue-900 uppercase tracking-wide flex items-center gap-1 border-r border-blue-800/40 cursor-pointer transition ${
                activeDropdown === "rti"
                  ? "text-yellow-400 bg-blue-900 font-extrabold"
                  : "text-white hover:text-yellow-300"
              }`}
            >
              ▾ RTI
            </Link>
            {activeDropdown === "rti" && (
              <div className="absolute left-0 top-full bg-black text-white shadow-2xl border border-gray-800 w-56 py-1.5 z-30 font-semibold rounded-b text-xs divide-y divide-gray-800">
                <Link
                  to="/rti"
                  onClick={() => setActiveDropdown(null)}
                  className="block px-4 py-2 hover:bg-gray-800 hover:text-yellow-300 transition-colors cursor-pointer"
                >
                  RTI Disclosure (Section 4)
                </Link>
                <Link
                  to="/rti"
                  onClick={() => setActiveDropdown(null)}
                  className="block px-4 py-2 hover:bg-gray-800 hover:text-yellow-300 transition-colors cursor-pointer"
                >
                  Public Information Officers
                </Link>
              </div>
            )}
          </div>

          <Link
            to="/contact"
            className="px-2.5 sm:px-3 lg:px-3.5 py-2.5 hover:bg-blue-900 uppercase tracking-wide border-r border-blue-800/40 cursor-pointer inline-block text-white hover:text-yellow-300"
          >
            CONTACT US
          </Link>

          <Link
            to="/digilocker"
            target="_blank"
            className="px-2.5 sm:px-3 lg:px-3.5 py-2.5 hover:bg-blue-900 uppercase tracking-wide border-r border-blue-800/40 cursor-pointer inline-block text-cyan-300"
          >
            DIGI LOCKER
          </Link>

          <button
            onClick={() =>
              alert("Online Fee Payment Portal — Select Fee Type & Candidate Roll Number.")
            }
            className="px-2.5 sm:px-3 lg:px-3.5 py-2.5 hover:bg-blue-900 uppercase tracking-wide cursor-pointer text-yellow-300"
          >
            ONLINE PAYMENT
          </button>
        </div>
      </nav>
    </header>
  );
};
