import { createFileRoute, useNavigate } from "@tanstack/react-router";
import React, { useState, useEffect } from "react";
import {
  Search,
  Printer,
  AlertCircle,
  RefreshCw,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  Award,
  FileText,
  Home,
  Download,
} from "lucide-react";
import logoEmblem from "@/assets/logo_emblem.svg";
import digitalIndia from "@/assets/digital_india.svg";
import {
  dbStore,
  StudentResult,
  SubjectMarks,
  numberToWords,
  numberToIndividualDigitWords,
} from "@/lib/db";
import { Header } from "@/components/Header";
import { AdminLoginModal } from "@/components/AdminLoginModal";
import { CoseMarksheetDegree } from "@/components/CoseMarksheetDegree";

export const Route = createFileRoute("/result")({
  head: () => ({
    meta: [
      { title: "Online Result Search Portal — Board of Higher Secondary Education, Delhi" },
      {
        name: "description",
        content:
          "Search and verify Class 10th and 12th Board Examination results, marksheets, and passing certificates.",
      },
    ],
  }),
  component: ResultPage,
});

function ResultPage() {
  const navigate = useNavigate();
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Step 1: Search, Step 2: Preview, Step 3: Full Marksheet
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Live Clock State for Result Header
  const [formattedTime, setFormattedTime] = useState("");

  // Form search state
  const [selectYear, setSelectYear] = useState("2024");
  const [selectClass, setSelectClass] = useState("12th");
  const [rollNoInput, setRollNoInput] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaCode, setCaptchaCode] = useState("GVZW7t");

  // Found student result state
  const [selectedResult, setSelectedResult] = useState<StudentResult | null>(null);
  const [parsedSubjects, setParsedSubjects] = useState<SubjectMarks[]>([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [templateFormat, setTemplateFormat] = useState<"COSE" | "BHSE">("COSE");
  const [autoDownloadMarksheet, setAutoDownloadMarksheet] = useState(false);

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

  const [docTypeParam, setDocTypeParam] = useState<"MARKSHEET" | "DEGREE">("MARKSHEET");

  useEffect(() => {
    generateCaptcha();
    try {
      const params = new URLSearchParams(window.location.search);
      const rollParam = params.get("roll");
      const stepParam = params.get("step");
      const typeParam = params.get("type");
      if (typeParam?.toLowerCase() === "degree") {
        setDocTypeParam("DEGREE");
      }
      if (rollParam) {
        const found = dbStore.getResultByRoll(rollParam.trim());
        if (found) {
          setSelectedResult(found);
          setRollNoInput(found.roll_no);
          setTemplateFormat("COSE");
          try {
            setParsedSubjects(JSON.parse(found.subjects_json));
          } catch (e) {
            setParsedSubjects([]);
          }
          setStep(stepParam === "3" ? 3 : 2);
        }
      }
    } catch (e) {
      // ignore
    }
  }, []);

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
      if (
        found.format === "COSE" ||
        found.roll_no === "10203527" ||
        found.school_name?.includes("COUNCIL")
      ) {
        setTemplateFormat("COSE");
      } else {
        setTemplateFormat("COSE");
      }
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

  const getTodayFormattedDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = String(today.getFullYear()).slice(-2);
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col font-sans w-full overflow-x-hidden print:bg-white print:overflow-visible print:min-h-0 print:h-auto">
      {/* 100% Full Width Dynamic Header */}
      <div className="print:hidden">
        <Header
          onOpenAdminLogin={() => setIsAdminOpen(true)}
          onOpenResult={() => setStep(1)}
          onOpenVerification={() => setStep(1)}
        />
      </div>

      {/* ONLINE RESULT PORTAL BANNER STRIP */}
      <div className="bg-[#e2f0d9] py-2.5 text-center border-b border-gray-300 shadow-xs print:hidden">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <button
            onClick={() => navigate({ to: "/" })}
            className="text-xs font-bold text-slate-700 hover:text-blue-900 flex items-center gap-1.5 cursor-pointer bg-white px-3.5 py-1.5 rounded-md border border-gray-300 shadow-2xs transition hover:bg-slate-50"
          >
            <Home className="w-4 h-4 text-blue-800" />
            <span>Back to Main Site</span>
          </button>

          <span className="inline-block px-6 py-1 bg-[#43a047] text-white font-extrabold text-xs sm:text-sm rounded uppercase tracking-wider shadow-sm border border-emerald-700">
            ONLINE RESULT SEARCH &amp; VERIFICATION PORTAL
          </span>

          <div className="hidden sm:block text-xs font-mono font-bold text-slate-700">
            OFFICIAL BOARD PORTAL
          </div>
        </div>
      </div>

      {/* MAIN BODY CONTENT AREA (Cyan Portal Canvas) */}
      <main className="flex-1 bg-[#00a2e8] py-8 px-3 sm:px-6 print:bg-white print:p-0 print:m-0 print:block">
        {/* STEP 1 & 2: SEARCH FORM AND VERIFICATION INSTRUCTIONS DUAL GRID */}
        {step !== 3 && (
          <div className="max-w-6xl mx-auto space-y-6">
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
              <div className="lg:col-span-7 bg-white rounded-xl shadow-2xl border border-gray-300 overflow-hidden">
                <div className="bg-[#5c6f55] text-white font-extrabold text-sm px-5 py-3 uppercase tracking-wide text-center flex items-center justify-center gap-2">
                  <Search className="w-4 h-4 text-yellow-300" />
                  <span>SEARCH RESULT</span>
                </div>

                <form
                  onSubmit={handleSearchSubmit}
                  className="p-5 sm:p-7 space-y-5 text-xs font-semibold text-gray-700"
                >
                  {/* SELECT YEAR */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <label className="sm:w-1/3 text-gray-700 font-bold uppercase text-xs">
                      SELECT YEAR
                    </label>
                    <select
                      value={selectYear}
                      onChange={(e) => setSelectYear(e.target.value)}
                      className="sm:w-2/3 border border-gray-300 rounded-md px-3.5 py-2 bg-white text-xs text-gray-900 font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-2xs cursor-pointer"
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
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <label className="sm:w-1/3 text-gray-700 font-bold uppercase text-xs">
                      SELECT CLASS
                    </label>
                    <select
                      value={selectClass}
                      onChange={(e) => setSelectClass(e.target.value)}
                      className="sm:w-2/3 border border-gray-300 rounded-md px-3.5 py-2 bg-white text-xs text-gray-900 font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-2xs"
                    >
                      <option value="10th">10th (Secondary Examination)</option>
                      <option value="12th">12th (Senior Secondary Examination)</option>
                    </select>
                  </div>

                  {/* ROLL NO */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <label className="sm:w-1/3 text-gray-700 font-bold uppercase text-xs">
                      ROLL No.
                    </label>
                    <input
                      type="text"
                      required
                      value={rollNoInput}
                      onChange={(e) => setRollNoInput(e.target.value)}
                      placeholder="e.g. 500109 or 26019482"
                      className="sm:w-2/3 border border-gray-300 rounded-md px-3.5 py-2 font-mono text-xs text-gray-900 font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-2xs"
                    />
                  </div>

                  {/* ReCAPTCHA */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <label className="sm:w-1/3 text-gray-700 font-bold uppercase text-xs">
                      ReCAPTCHA
                    </label>
                    <div className="sm:w-2/3 flex items-center gap-2">
                      <input
                        type="text"
                        value={captchaInput}
                        onChange={(e) => setCaptchaInput(e.target.value)}
                        placeholder="Code"
                        className="w-1/2 border border-gray-300 rounded-md px-3.5 py-2 font-mono text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                      <div className="w-1/2 flex items-center justify-between bg-slate-100 border border-gray-300 px-3.5 py-2 rounded-md font-mono font-bold tracking-widest text-slate-800 text-xs select-none shadow-inner">
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
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full sm:w-auto bg-[#007bff] hover:bg-blue-700 text-white font-extrabold px-8 py-2.5 rounded-md text-xs uppercase tracking-wider transition shadow-md cursor-pointer flex items-center justify-center gap-2 active:scale-95"
                    >
                      <Search className="w-4 h-4 text-white" />
                      <span>SEARCH RESULT</span>
                    </button>
                  </div>

                  {/* Quick Verification Chips (Hidden as requested) */}
                  {/*
                  <div className="pt-3 border-t border-gray-200 space-y-1.5">
                    <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                      <span>Quick Test Verification Records:</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectYear("2009");
                          setSelectClass("10th");
                          setRollNoInput("10203527");
                          setCaptchaInput(captchaCode);
                        }}
                        className="px-2.5 py-1 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 rounded text-[11px] font-extrabold cursor-pointer transition flex items-center gap-1 shadow-2xs"
                      >
                        <span>⭐ Satish Kumar (Roll: 10203527 - COSE Rajasthan)</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectYear("2024");
                          setSelectClass("12th");
                          setRollNoInput("20243664");
                          setCaptchaInput(captchaCode);
                        }}
                        className="px-2.5 py-1 bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-300 rounded text-[11px] font-bold cursor-pointer transition"
                      >
                        <span>Samriddhi Saha (Roll: 20243664)</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectYear("2026");
                          setSelectClass("12th");
                          setRollNoInput("20268068");
                          setCaptchaInput(captchaCode);
                        }}
                        className="px-2.5 py-1 bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-300 rounded text-[11px] font-bold cursor-pointer transition"
                      >
                        <span>Dhirodutta Saha (Roll: 20268068)</span>
                      </button>
                    </div>
                  </div>
                  */}
                </form>
              </div>

              {/* RIGHT COLUMN: PORTAL INSTRUCTIONS & STUDENT DETAILS PREVIEW */}
              <div className="lg:col-span-5 space-y-6">
                {/* STEP 2: STUDENT DETAILS PREVIEW CARD (When student is found) */}
                {step === 2 && selectedResult ? (
                  <div className="bg-white rounded-xl shadow-2xl border-2 border-emerald-500 overflow-hidden animate-fade-in">
                    <div className="bg-[#43a047] text-white font-extrabold text-sm px-5 py-3 uppercase tracking-wide text-center flex items-center justify-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-yellow-300" />
                      <span>STUDENT RECORD FOUND</span>
                    </div>

                    <div className="p-5 sm:p-6 text-xs text-gray-800 space-y-4">
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
                            <span className="text-gray-500 font-bold">Class :</span>{" "}
                            <strong className="text-slate-900 font-bold">
                              {selectedResult.course || "12TH (Senior Secondary)"}
                            </strong>
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

                      <div className="pt-2">
                        <button
                          onClick={() => {
                            setStep(3);
                          }}
                          className="w-full bg-[#1b3f8b] hover:bg-[#102d68] text-white font-extrabold px-6 py-3 rounded text-sm uppercase transition shadow-md cursor-pointer flex items-center justify-center gap-2"
                        >
                          <FileText className="w-5 h-5 text-yellow-300" />
                          <span>अंक विवरणिका (Marks Statement)</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* PORTAL INSTRUCTIONS CARD (Default view before search) */
                  <div className="bg-white rounded-xl shadow-2xl border border-gray-300 overflow-hidden">
                    <div className="bg-[#09327e] text-white font-extrabold text-sm px-5 py-3 uppercase tracking-wide text-center flex items-center justify-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-yellow-300" />
                      <span>IMPORTANT INSTRUCTIONS</span>
                    </div>

                    <div className="p-5 text-xs text-slate-700 space-y-3 font-medium">
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-600 mt-1.5 shrink-0"></div>
                        <span>
                          Enter valid 6-digit Roll Number as issued on your official Board
                          Examination Hall Ticket.
                        </span>
                      </div>

                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-600 mt-1.5 shrink-0"></div>
                        <span>
                          Select the exact Academic Examination Year (e.g., 2008 or 2026) and Class
                          level.
                        </span>
                      </div>

                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-600 mt-1.5 shrink-0"></div>
                        <span>
                          Online digital marksheets bear official NCERT &amp; Govt. of Delhi
                          registration security signatures.
                        </span>
                      </div>

                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-600 mt-1.5 shrink-0"></div>
                        <span>
                          Click <strong>"Show Marksheet"</strong> to preview, download, or print
                          official documents for university admissions.
                        </span>
                      </div>

                      <div className="pt-2 border-t border-gray-200">
                        <div className="bg-amber-50 border border-amber-200 rounded p-3 text-xs text-amber-900 font-semibold flex items-center gap-2">
                          <Award className="w-5 h-5 text-amber-600 shrink-0" />
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

        {/* STEP 3: OFFICIAL MARKSHEET VIEW */}
        {step === 3 && selectedResult && (
          <div className="max-w-5xl mx-auto space-y-4">
            {/* Template Format Switcher Bar hidden as requested — only single official format shown */}
            {/*
            <div className="bg-white p-3 rounded-xl border border-slate-300 shadow-md flex flex-wrap items-center justify-between gap-3 print:hidden">
              <div className="text-xs font-bold text-slate-700 flex items-center gap-2">
                <span className="font-extrabold text-blue-900">Certificate Format:</span>
                <span className="text-slate-500">Choose design layout to view &amp; print</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setTemplateFormat("COSE")}
                  className={`px-3.5 py-1.5 text-xs font-extrabold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                    templateFormat === "COSE"
                      ? "bg-[#1b3f8b] text-white shadow-xs"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  <span>🏛️ COSE Rajasthan Format (100% Original)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setTemplateFormat("BHSE")}
                  className={`px-3.5 py-1.5 text-xs font-extrabold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                    templateFormat === "BHSE"
                      ? "bg-[#1b3f8b] text-white shadow-xs"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  <span>📜 BHSE Delhi Standard Format</span>
                </button>
              </div>
            </div>
            */}

            {/* RENDER OFFICIAL MARKSHEET (100% FAITHFUL BHSE DELHI FORMAT) */}
            <CoseMarksheetDegree
              student={selectedResult}
              onBack={() => setStep(2)}
              isInternetCopy={true}
            />
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="w-full bg-[#002b7f] text-white py-6 text-xs text-center border-t-2 border-yellow-400 print:hidden">
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

      {/* Admin Login Modal if opened */}
      <AdminLoginModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        onLoginSuccess={() => {
          setIsAdminOpen(false);
          navigate({ to: "/admin" });
        }}
      />
    </div>
  );
}
