import { CoseMarksheetDegree } from "@/components/CoseMarksheetDegree";
import React, { useState, useEffect } from "react";
import {
  X,
  Search,
  Printer,
  AlertCircle,
  RefreshCw,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  Award,
  FileText,
  ExternalLink,
} from "lucide-react";
import {
  dbStore,
  StudentResult,
  SubjectMarks,
  numberToWords,
  numberToIndividualDigitWords,
} from "@/lib/db";
import logoEmblem from "@/assets/logo_emblem.svg";
import digitalIndia from "@/assets/digital_india.svg";

interface ResultModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResultModal: React.FC<ResultModalProps> = ({ isOpen, onClose }) => {
  // Step 1: Search, Step 2: Preview, Step 3: Full Marksheet
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Live Clock State for Result Header
  const [formattedTime, setFormattedTime] = useState("");

  // Form search state
  const [selectYear, setSelectYear] = useState("2008");
  const [selectClass, setSelectClass] = useState("10th");
  const [rollNoInput, setRollNoInput] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaCode, setCaptchaCode] = useState("GVZW7t");

  // Found student result state
  const [selectedResult, setSelectedResult] = useState<StudentResult | null>(null);
  const [parsedSubjects, setParsedSubjects] = useState<SubjectMarks[]>([]);
  const [errorMsg, setErrorMsg] = useState("");

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

  const generateCaptcha = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789abcdefghijkmnpqrstuvwxyz";
    let code = "";
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(code);
  };

  useEffect(() => {
    generateCaptcha();
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!rollNoInput.trim()) {
      setErrorMsg("Please enter Roll Number.");
      return;
    }

    if (captchaInput.trim() && captchaInput.trim().toLowerCase() !== captchaCode.toLowerCase()) {
      setErrorMsg("ReCAPTCHA verification failed. Please try again.");
      generateCaptcha();
      return;
    }

    const found = dbStore.getResultByRoll(rollNoInput.trim());

    if (found) {
      setSelectedResult(found);
      try {
        setParsedSubjects(JSON.parse(found.subjects_json));
      } catch (err) {
        setParsedSubjects([]);
      }
      setStep(2); // Move to Step 2: Student Details preview card
    } else {
      setErrorMsg(
        `No Result found for Roll No. '${rollNoInput}'. Please verify your Examination Hall Ticket and try again.`,
      );
    }
  };

  const resetModal = () => {
    setStep(1);
    setSelectedResult(null);
    setCaptchaInput("");
    generateCaptcha();
  };

  const getTodayFormattedDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = String(today.getFullYear()).slice(-2);
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-slate-900/80 backdrop-blur-md p-1 sm:p-4 overflow-y-auto font-sans">
      <div className="w-full max-w-6xl my-2 sm:my-6 bg-white rounded-xl shadow-2xl border border-gray-300 overflow-hidden relative transition-all duration-300">
        {/* Floating Close Modal Button */}
        <button
          onClick={() => {
            resetModal();
            onClose();
          }}
          className="absolute right-3 top-3 z-50 bg-black/80 hover:bg-red-600 text-white p-2 rounded-full transition-colors shadow-lg cursor-pointer flex items-center justify-center border border-white/20 print:hidden"
          title="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* 1. TOP OFFICIAL DASHBOARD HEADER BAR (Identical to Main Site Header) */}
        <div className="w-full bg-black text-white px-3 py-1.5 text-[11px] sm:text-xs">
          <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2 pr-10">
            <div className="flex flex-wrap items-center gap-1.5 text-gray-200">
              <span className="font-semibold text-yellow-400">
                List of Boards of School Education
              </span>
              <span className="hidden sm:inline">|</span>
              <span className="hidden md:inline">Document Verification mail :-</span>
              <span className="font-mono text-cyan-300 font-semibold text-[10px] sm:text-xs">
                coe.verification@bhsed.co.in
              </span>
            </div>
            <div className="text-[10px] text-gray-400 font-mono hidden lg:block">
              Regd. No. 275 (India)
            </div>
          </div>
        </div>

        {/* 2. MAIN TRICOLOR HEADER BANNER (100% Responsive & Professional) */}
        <div className="w-full relative bg-gradient-to-r from-[#ff9933]/20 via-white to-[#138808]/20 border-b border-gray-300 py-3 px-3 sm:px-6">
          {/* Decorative Tricolor Top Accent Strip */}
          <div className="absolute top-0 left-0 right-0 h-1 flex">
            <div className="w-1/3 bg-[#ff9933]"></div>
            <div className="w-1/3 bg-white"></div>
            <div className="w-1/3 bg-[#138808]"></div>
          </div>

          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 py-1">
            {/* Left Emblem */}
            <div className="flex flex-col items-center md:items-start shrink-0">
              <div className="text-red-700 font-extrabold text-[10px] sm:text-xs tracking-tight mb-0.5 font-serif uppercase">
                Approved by NCERT
              </div>
              <img
                src={logoEmblem}
                alt="Board Emblem Seal"
                className="w-16 h-16 sm:w-20 sm:h-20 md:w-22 md:h-22 object-contain"
              />
            </div>

            {/* Center Header Typography */}
            <div className="text-center flex-1 px-2">
              <div className="text-[11px] sm:text-xs font-bold text-slate-800 leading-tight">
                भारत सरकार <span className="font-mono text-red-700">टी एम-1, नं० 1791977</span>{" "}
                (Government Recognised)
              </div>
              <div className="text-[11px] font-bold text-slate-900 leading-tight">
                Govt. of Delhi Regd. No. 275 (India)
              </div>

              <h1 className="text-lg sm:text-2xl font-extrabold text-[#1d359c] font-serif leading-tight my-0.5">
                बोर्ड ऑफ हायर सेकण्डरी एजुकेशन, दिल्ली
              </h1>
              <h2 className="text-base sm:text-xl font-black text-[#b30000] font-serif leading-tight tracking-tight mb-0.5">
                Board of Higher Secondary Education, Delhi
              </h2>
              <div className="text-[10px] sm:text-[11px] font-bold text-slate-800 leading-snug">
                An Autonomous Organisation under Deptt. of School Education and Literacy
              </div>
            </div>

            {/* Right Information & Dynamic Live Clock */}
            <div className="flex flex-col items-center md:items-end text-center md:text-right shrink-0 gap-0.5">
              <div className="text-xs sm:text-sm font-bold text-[#09327e] font-mono">
                www.bhsed.co.in
              </div>
              <img
                src={digitalIndia}
                alt="Digital India"
                className="w-20 sm:w-24 h-8 object-contain my-0.5"
              />
              <div className="text-red-600 font-extrabold font-mono text-xs px-2.5 py-0.5 bg-red-50 border border-red-200 rounded shadow-2xs">
                {formattedTime || "22-Sep-2026,12:35:50"}
              </div>
            </div>
          </div>
        </div>

        {/* 3. LATEST UPDATES MARQUEE TICKER BAR */}
        <div className="w-full bg-[#00bfff] text-black flex items-center text-xs overflow-hidden border-b border-cyan-500">
          <div className="bg-[#00a2e8] text-black font-extrabold px-3 py-1.5 shrink-0 flex items-center gap-1 shadow-xs uppercase tracking-wide border-r border-cyan-400 text-[11px]">
            Latest Updates
          </div>
          <div className="overflow-hidden whitespace-nowrap w-full py-1 font-bold text-black text-[11px]">
            <div className="inline-block animate-marquee">
              <span className="inline-flex items-center gap-1 bg-red-600 text-white font-extrabold text-[9px] px-1.5 py-0.5 rounded-sm mr-2 animate-pulse">
                NEW
              </span>
              <span className="mr-8 uppercase">
                TO WHOM IT MAY CONCERN BOARD OF HIGHER SECONDARY EDUCATION DELHI — ONLINE RESULT
                SEARCH PORTAL ACTIVE.
              </span>
              <span className="inline-flex items-center gap-1 bg-red-600 text-white font-extrabold text-[9px] px-1.5 py-0.5 rounded-sm mr-2 animate-pulse">
                NEW
              </span>
              <span className="mr-8 uppercase">
                VERIFY MARK SHEETS AND PASSING CERTIFICATES WITH OFFICIAL EMBLEM SEAL.
              </span>
            </div>
          </div>
        </div>

        {/* 4. ROYAL BLUE NAVIGATION BAR & TAB BUTTONS (Single-Row Horizontal Scrollable) */}
        <nav className="w-full bg-[#002b7f] text-white text-[11px] font-bold shadow-md relative z-20 overflow-x-auto whitespace-nowrap scrollbar-none border-b border-blue-900">
          <div className="flex items-center justify-start w-full min-w-max px-2">
            <button
              onClick={() => {
                resetModal();
                onClose();
              }}
              className="px-3 py-2 hover:bg-blue-900 uppercase tracking-wide transition border-r border-blue-800/40 cursor-pointer text-gray-200 hover:text-white"
            >
              HOME
            </button>
            <button className="px-3 py-2 hover:bg-blue-900 uppercase tracking-wide transition border-r border-blue-800/40 cursor-pointer text-gray-200">
              • ABOUT US
            </button>
            <button className="px-3 py-2 hover:bg-blue-900 uppercase tracking-wide transition border-r border-blue-800/40 cursor-pointer text-gray-200">
              • ADMISSION
            </button>
            <button className="px-3 py-2 hover:bg-blue-900 uppercase tracking-wide transition border-r border-blue-800/40 cursor-pointer text-gray-200">
              • ACADEMIC
            </button>
            <button className="px-3 py-2 hover:bg-blue-900 uppercase tracking-wide transition border-r border-blue-800/40 cursor-pointer text-gray-200">
              EXAMINATION
            </button>
            <button className="px-3 py-2 hover:bg-blue-900 uppercase tracking-wide transition border-r border-blue-800/40 cursor-pointer text-gray-200">
              AFFILIATED SCHOOL
            </button>
            <button className="px-3 py-2 hover:bg-blue-900 uppercase tracking-wide transition border-r border-blue-800/40 cursor-pointer text-gray-200">
              • DOWNLOAD
            </button>
            {/* ACTIVE RESULT TAB BUTTON */}
            <button
              onClick={() => setStep(1)}
              className="px-4 py-2 bg-[#00a2e8] text-white uppercase tracking-wider font-extrabold transition border-r border-cyan-400 cursor-pointer shadow-inner flex items-center gap-1.5"
            >
              <Search className="w-3.5 h-3.5 text-yellow-300" />
              <span>RESULT</span>
            </button>
            <button className="px-3 py-2 hover:bg-blue-900 uppercase tracking-wide transition border-r border-blue-800/40 cursor-pointer text-gray-200">
              • RTI
            </button>
            <button className="px-3 py-2 hover:bg-blue-900 uppercase tracking-wide transition border-r border-blue-800/40 cursor-pointer text-gray-200">
              CONTACT US
            </button>
            <button className="px-3 py-2 hover:bg-blue-900 uppercase tracking-wide transition border-r border-blue-800/40 cursor-pointer text-gray-200">
              DIGI LOCKER
            </button>
            <button className="px-3 py-2 hover:bg-blue-900 uppercase tracking-wide transition cursor-pointer text-gray-200">
              ONLINE PAYMENT
            </button>
          </div>
        </nav>

        {/* 5. ONLINE RESULT BADGE BAR */}
        <div className="bg-[#e2f0d9] py-2 text-center border-b border-gray-300 shadow-xs">
          <span className="inline-block px-6 py-1 bg-[#43a047] text-white font-extrabold text-xs sm:text-sm rounded uppercase tracking-wider shadow-sm border border-emerald-700">
            ONLINE RESULT SEARCH &amp; VERIFICATION PORTAL
          </span>
        </div>

        {/* 6. MAIN BODY CONTENT AREA (Cyan Portal Canvas) */}
        <div className="bg-[#00a2e8] p-3 sm:p-6 min-h-[520px]">
          {/* STEP 1 & 2: SEARCH FORM AND VERIFICATION INSTRUCTIONS DUAL GRID */}
          {step !== 3 && (
            <div className="max-w-5xl mx-auto space-y-6">
              {/* Error Notification */}
              {errorMsg && (
                <div className="w-full bg-red-100 border-2 border-red-500 text-red-800 px-4 py-3 rounded-lg text-xs font-bold flex items-center gap-2 shadow-md animate-shake">
                  <AlertCircle className="w-5 h-5 shrink-0 text-red-600" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Grid Layout: Search Form (Left) & Verification Info (Right) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* LEFT COLUMN: SEARCH RESULT FORM CARD */}
                <div className="lg:col-span-7 bg-white rounded-lg shadow-xl border border-gray-300 overflow-hidden">
                  <div className="bg-[#5c6f55] text-white font-extrabold text-xs sm:text-sm px-4 py-2.5 uppercase tracking-wide text-center flex items-center justify-center gap-2">
                    <Search className="w-4 h-4 text-yellow-300" />
                    <span>SEARCH RESULT</span>
                  </div>

                  <form
                    onSubmit={handleSearchSubmit}
                    className="p-4 sm:p-6 space-y-4 text-xs font-semibold text-gray-700"
                  >
                    {/* SELECT YEAR */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                      <label className="sm:w-1/3 text-gray-700 font-bold uppercase text-[11px] sm:text-xs">
                        SELECT YEAR
                      </label>
                      <select
                        value={selectYear}
                        onChange={(e) => setSelectYear(e.target.value)}
                        className="sm:w-2/3 border border-gray-300 rounded-md px-3 py-2 bg-white text-xs text-gray-900 font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-2xs cursor-pointer"
                      >
                        {Array.from({ length: 2026 - 1990 + 1 }, (_, i) => 2026 - i).map((yr) => {
                          const yrStr = String(yr);
                          let label = yrStr;
                          if (yr === 2026) label = `${yrStr} (Current Academic Session)`;
                          if (yr === 2008) label = `${yrStr} (High School / Intermediate)`;
                          return (
                            <option key={yrStr} value={yrStr}>
                              {label}
                            </option>
                          );
                        })}
                      </select>
                    </div>

                    {/* SELECT CLASS */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                      <label className="sm:w-1/3 text-gray-700 font-bold uppercase text-[11px] sm:text-xs">
                        SELECT CLASS
                      </label>
                      <select
                        value={selectClass}
                        onChange={(e) => setSelectClass(e.target.value)}
                        className="sm:w-2/3 border border-gray-300 rounded-md px-3 py-2 bg-white text-xs text-gray-900 font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-2xs"
                      >
                        <option value="10th">10th (Secondary Examination)</option>
                        <option value="12th">12th (Senior Secondary Examination)</option>
                      </select>
                    </div>

                    {/* ROLL NO */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                      <label className="sm:w-1/3 text-gray-700 font-bold uppercase text-[11px] sm:text-xs">
                        ROLL No.
                      </label>
                      <input
                        type="text"
                        required
                        value={rollNoInput}
                        onChange={(e) => setRollNoInput(e.target.value)}
                        placeholder="e.g. 500109 or 26019482"
                        className="sm:w-2/3 border border-gray-300 rounded-md px-3 py-2 font-mono text-xs text-gray-900 font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-2xs"
                      />
                    </div>

                    {/* ReCAPTCHA */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                      <label className="sm:w-1/3 text-gray-700 font-bold uppercase text-[11px] sm:text-xs">
                        ReCAPTCHA
                      </label>
                      <div className="sm:w-2/3 flex items-center gap-2">
                        <input
                          type="text"
                          value={captchaInput}
                          onChange={(e) => setCaptchaInput(e.target.value)}
                          placeholder="Code"
                          className="w-1/2 border border-gray-300 rounded-md px-3 py-2 font-mono text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        <div className="w-1/2 flex items-center justify-between bg-slate-100 border border-gray-300 px-3 py-1.5 rounded-md font-mono font-bold tracking-widest text-slate-800 text-xs select-none shadow-inner">
                          <span>{captchaCode}</span>
                          <button
                            type="button"
                            onClick={generateCaptcha}
                            className="text-gray-500 hover:text-blue-700 transition cursor-pointer"
                            title="Generate New Code"
                          >
                            <RefreshCw className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* SEARCH BUTTON */}
                    <div className="pt-3">
                      <button
                        type="submit"
                        className="w-full sm:w-auto bg-[#007bff] hover:bg-blue-700 text-white font-extrabold px-8 py-2.5 rounded-md text-xs uppercase tracking-wider transition shadow-md cursor-pointer flex items-center justify-center gap-2 active:scale-95"
                      >
                        <Search className="w-4 h-4 text-white" />
                        <span>SEARCH RESULT</span>
                      </button>
                    </div>
                  </form>
                </div>

                {/* RIGHT COLUMN: PORTAL INSTRUCTIONS & STUDENT DETAILS PREVIEW */}
                <div className="lg:col-span-5 space-y-6">
                  {/* STEP 2: STUDENT DETAILS PREVIEW CARD (When student is found) */}
                  {step === 2 && selectedResult ? (
                    <div className="bg-white rounded-lg shadow-xl border-2 border-emerald-500 overflow-hidden animate-fade-in">
                      <div className="bg-[#43a047] text-white font-extrabold text-xs sm:text-sm px-4 py-2.5 uppercase tracking-wide text-center flex items-center justify-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-yellow-300" />
                        <span>STUDENT RECORD FOUND</span>
                      </div>

                      <div className="p-4 sm:p-5 text-xs text-gray-800 space-y-4">
                        <div className="flex gap-4 items-start">
                          <img
                            src={
                              selectedResult.photo_url ||
                              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
                            }
                            alt="Candidate"
                            className="w-24 h-28 object-cover border-2 border-slate-700 p-0.5 rounded shadow-md shrink-0 bg-white"
                          />

                          <div className="space-y-1.5 font-medium leading-snug">
                            <div>
                              <span className="text-gray-500 font-bold">Candidate Name :</span>{" "}
                              <strong className="text-slate-900 uppercase font-extrabold">
                                {selectedResult.student_name}
                              </strong>
                            </div>
                            <div>
                              <span className="text-gray-500 font-bold">Enrollment No :</span>{" "}
                              <span className="font-mono text-slate-800 font-bold">
                                {selectedResult.enrollment_no}
                              </span>
                            </div>
                            <div>
                              <span className="text-gray-500 font-bold">Roll No :</span>{" "}
                              <span className="font-mono text-blue-700 font-extrabold">
                                {selectedResult.roll_no}
                              </span>
                            </div>
                            <div>
                              <span className="text-gray-500 font-bold">DOB :</span>{" "}
                              {selectedResult.dob}
                            </div>
                            <div>
                              <span className="text-gray-500 font-bold">Batch / Session :</span>{" "}
                              {selectedResult.batch}
                            </div>
                            <div>
                              <span className="text-gray-500 font-bold">Status : </span>
                              <span className="inline-block px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded text-[10px] font-extrabold border border-emerald-300 uppercase">
                                {selectedResult.status || "PASSED"}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="pt-2 flex flex-col sm:flex-row items-center gap-2">
                          <button
                            onClick={() => setStep(3)}
                            className="w-full bg-[#1b3f8b] hover:bg-[#102d68] text-white font-extrabold px-5 py-3 rounded text-sm uppercase transition shadow-md cursor-pointer flex items-center justify-center gap-2"
                          >
                            <FileText className="w-5 h-5 text-yellow-300" />
                            <span>अंक विवरणिका (Marks Statement)</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* PORTAL INSTRUCTIONS CARD (Default view before search) */
                    <div className="bg-white rounded-lg shadow-xl border border-gray-300 overflow-hidden">
                      <div className="bg-[#09327e] text-white font-extrabold text-xs sm:text-sm px-4 py-2.5 uppercase tracking-wide text-center flex items-center justify-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-yellow-300" />
                        <span>IMPORTANT INSTRUCTIONS</span>
                      </div>

                      <div className="p-4 sm:p-5 text-xs text-slate-700 space-y-3 font-medium">
                        <div className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0"></div>
                          <span>
                            Enter valid 6-digit Roll Number as issued on your official Board
                            Examination Hall Ticket.
                          </span>
                        </div>

                        <div className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0"></div>
                          <span>
                            Select the exact Academic Examination Year (e.g., 2008 or 2026) and
                            Class level.
                          </span>
                        </div>

                        <div className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0"></div>
                          <span>
                            Online digital marksheets bear official NCERT &amp; Govt. of Delhi
                            registration security signatures.
                          </span>
                        </div>

                        <div className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0"></div>
                          <span>
                            Click <strong>"Show Marksheet &amp; Degree"</strong> to preview,
                            download, or print official documents for university admissions.
                          </span>
                        </div>

                        <div className="pt-2 border-t border-gray-200">
                          <div className="bg-amber-50 border border-amber-200 rounded p-2.5 text-[11px] text-amber-900 font-semibold flex items-center gap-2">
                            <Award className="w-4 h-4 text-amber-600 shrink-0" />
                            <span>Authorized Verification Cell: coe.verification@bhsed.co.in</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: OFFICIAL MARKSHEET VIEW (100% Faithful BHSE Delhi Format) */}
          {step === 3 && selectedResult && (
            <CoseMarksheetDegree student={selectedResult} onBack={() => setStep(2)} />
          )}
        </div>
      </div>
    </div>
  );
};
