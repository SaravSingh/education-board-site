import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import React, { useState } from "react";
import { Header } from "@/components/Header";
import { AdminLoginModal } from "@/components/AdminLoginModal";
import azadiMahotsav from "@/assets/azadi_mahotsav.svg";
import swachhBharat from "@/assets/swachh_bharat.svg";
import {
  Home as HomeIcon,
  ChevronRight,
  ShieldCheck,
  UserCheck,
  FileText,
  Download,
  HelpCircle,
  Mail,
  Phone,
  MapPin,
  Printer,
} from "lucide-react";

export const Route = createFileRoute("/rti")({
  head: () => ({
    meta: [
      {
        title:
          "RTI Disclosure & Officers Directory — Board of Higher Secondary Education, Delhi (BHSE)",
      },
      {
        name: "description",
        content:
          "Official Right to Information (RTI) mandatory disclosures, Public Information Officers (CPIO/FAA) contact directory, and RTI application procedure for Board of Higher Secondary Education, Delhi.",
      },
    ],
  }),
  component: RtiPage,
});

function RtiPage() {
  const navigate = useNavigate();
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"DISCLOSURE" | "OFFICERS" | "PROCEDURE" | "APPEAL">(
    "DISCLOSURE",
  );

  const pioOfficers = [
    {
      designation: "First Appellate Authority (FAA)",
      name: "Dr. A.K. Sharma",
      officialRole: "Secretary & Controller of Examinations",
      address: "Room No. 102, BHSE Secretariat, Karkardooma, Delhi — 110092",
      phone: "+91 11 2765 8901",
      email: "faa.rti@bhsed.co.in",
      jurisdiction: "All first appeals against CPIO decisions under RTI Act Section 19(1)",
    },
    {
      designation: "Central Public Information Officer (CPIO)",
      name: "Shri R.P. Verma",
      officialRole: "Joint Controller of Examinations",
      address: "RTI Cell, Board Building, North Delhi Office, Delhi — 110054",
      phone: "+91 11 2765 8902",
      email: "cpio.rti@bhsed.co.in",
      jurisdiction:
        "All RTI information queries, document verification, examination & affiliation records",
    },
    {
      designation: "Assistant Public Information Officer (APIO)",
      name: "Smt. Meena Gupta",
      officialRole: "Deputy Registrar (RTI & Legal Cell)",
      address: "RTI Counter, Ground Floor, BHSE Building, Delhi — 110092",
      phone: "+91 11 2765 8903",
      email: "apio.rti@bhsed.co.in",
      jurisdiction:
        "Receipt of physical RTI application forms, postal orders, and initial processing",
    },
  ];

  const mandatoryDisclosures = [
    {
      slNo: "4(1)(b)(i)",
      title: "Particulars of Organization, Functions & Duties",
      detail:
        "BHSE is an autonomous educational board established in 1956 to conduct Secondary & Senior Secondary exams, regulate school affiliations, and publish curriculum.",
    },
    {
      slNo: "4(1)(b)(ii)",
      title: "Powers & Duties of Officers and Employees",
      detail:
        "Powers exercised as delegated by the Governing Board and Executive Committee per BHSE Delhi Regulations & Bylaws.",
    },
    {
      slNo: "4(1)(b)(iii)",
      title: "Procedure followed in Decision Making Process",
      detail:
        "Decisions made through Executive Committee recommendations, Board approvals, and Departmental Circulars.",
    },
    {
      slNo: "4(1)(b)(iv)",
      title: "Norms Set for Discharge of Functions",
      detail:
        "Examination results declared within 45 days; document verification processed within 7 working days; RTI responses dispatched within 30 days.",
    },
    {
      slNo: "4(1)(b)(v)",
      title: "Rules, Regulations, Manuals & Records Held",
      detail:
        "BHSE Affiliation Bylaws, Examination Bye-Laws 2026, Scheme of Evaluation, and Employee Service Rules.",
    },
    {
      slNo: "4(1)(b)(vi)",
      title: "Categories of Documents held by BHSE",
      detail:
        "Candidate Tabulation Registers (TR), Examination Marksheets, Affiliation Certificates, Financial Audits, and Minutes of Meetings.",
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
          <span className="text-slate-600">RTI Portal</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-bold uppercase">Right to Information Act 2005</span>
        </div>
      </div>

      {/* MAIN BODY CONTENT AREA */}
      <main className="w-full max-w-7xl mx-auto px-4 py-8 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Left Column: Quick Link Sidebar */}
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
                    to="/holiday-list"
                    className="hover:text-amber-600 transition flex items-center gap-1.5"
                  >
                    <span className="text-amber-500 font-bold">▸</span> List of Holidays 2026
                  </Link>
                </li>
                <li className="py-2.5">
                  <Link
                    to="/rti"
                    className="hover:text-amber-600 transition flex items-center gap-1.5 font-bold text-blue-900"
                  >
                    <span className="text-amber-500 font-bold">▸</span> RTI Disclosures
                  </Link>
                </li>
                <li className="py-2.5">
                  <Link
                    to="/affiliated-school"
                    className="hover:text-amber-600 transition flex items-center gap-1.5"
                  >
                    <span className="text-amber-500 font-bold">▸</span> Affiliated Schools
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

            {/* Logos Box */}
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

          {/* Right Column: Main RTI Content Area */}
          <div className="md:col-span-8 lg:col-span-9 bg-white rounded-xl p-4 sm:p-8 shadow-sm border border-gray-200 space-y-6">
            {/* Header Title Banner */}
            <div className="border-b border-gray-200 pb-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h1 className="font-serif italic text-2xl sm:text-3xl font-bold text-gray-800 flex items-center gap-2">
                    <ShieldCheck className="w-7 h-7 text-blue-800" />
                    RIGHT TO INFORMATION (RTI) ACT, 2005
                  </h1>
                  <p className="text-xs text-gray-600 mt-1">
                    Board of Higher Secondary Education, Delhi — Statutory Section 4(1)(b)
                    Disclosure &amp; Public Information Officers
                  </p>
                </div>

                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded border border-gray-300 transition cursor-pointer shrink-0"
                >
                  <Printer className="w-3.5 h-3.5" /> Print RTI Details
                </button>
              </div>
            </div>

            {/* Interactive Section Navigation Tabs */}
            <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-2">
              <button
                onClick={() => setActiveTab("DISCLOSURE")}
                className={`px-4 py-2 text-xs font-bold rounded-t-md transition cursor-pointer flex items-center gap-1.5 ${
                  activeTab === "DISCLOSURE"
                    ? "bg-[#002b7f] text-white border-b-2 border-yellow-400 shadow-xs"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                <FileText className="w-4 h-4" /> Section 4 Disclosures
              </button>

              <button
                onClick={() => setActiveTab("OFFICERS")}
                className={`px-4 py-2 text-xs font-bold rounded-t-md transition cursor-pointer flex items-center gap-1.5 ${
                  activeTab === "OFFICERS"
                    ? "bg-[#002b7f] text-white border-b-2 border-yellow-400 shadow-xs"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                <UserCheck className="w-4 h-4" /> Public Information Officers
              </button>

              <button
                onClick={() => setActiveTab("PROCEDURE")}
                className={`px-4 py-2 text-xs font-bold rounded-t-md transition cursor-pointer flex items-center gap-1.5 ${
                  activeTab === "PROCEDURE"
                    ? "bg-[#002b7f] text-white border-b-2 border-yellow-400 shadow-xs"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                <HelpCircle className="w-4 h-4" /> Application &amp; Fee Guidelines
              </button>

              <button
                onClick={() => setActiveTab("APPEAL")}
                className={`px-4 py-2 text-xs font-bold rounded-t-md transition cursor-pointer flex items-center gap-1.5 ${
                  activeTab === "APPEAL"
                    ? "bg-[#002b7f] text-white border-b-2 border-yellow-400 shadow-xs"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                <ShieldCheck className="w-4 h-4" /> Appeals &amp; Grievances
              </button>
            </div>

            {/* TAB 1: MANDATORY DISCLOSURE TABLE */}
            {activeTab === "DISCLOSURE" && (
              <div className="space-y-4 animate-fade-in">
                <div className="bg-blue-50 border-l-4 border-blue-600 p-3.5 rounded-r text-xs text-blue-950 font-medium">
                  <strong>Statutory Notice:</strong> Under Section 4(1)(b) of the Right to
                  Information Act, 2005, public authorities are required to publish basic
                  information regarding organizational structure, functions, rules, and officers for
                  transparency.
                </div>

                <div className="overflow-x-auto border-2 border-gray-400 rounded-lg">
                  <table className="w-full text-left text-xs border-collapse font-sans min-w-[620px]">
                    <thead>
                      <tr className="bg-[#5a5a5a] text-white font-bold text-[11px] sm:text-xs uppercase tracking-wide">
                        <th className="p-3 border-r-2 border-white w-28 text-center">RTI CLAUSE</th>
                        <th className="p-3 border-r-2 border-white text-left pl-4 w-64">
                          SUBJECT TITLE
                        </th>
                        <th className="p-3 text-left pl-4">BHSE OFFICIAL DISCLOSURE DETAILS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-300 font-medium text-gray-800">
                      {mandatoryDisclosures.map((item, idx) => (
                        <tr
                          key={item.slNo}
                          className={
                            idx % 2 === 0
                              ? "bg-white hover:bg-slate-100"
                              : "bg-slate-50/70 hover:bg-slate-100"
                          }
                        >
                          <td className="p-3 border-r-2 border-gray-300 text-center font-mono font-bold text-blue-900">
                            {item.slNo}
                          </td>
                          <td className="p-3 border-r-2 border-gray-300 pl-4 font-bold text-slate-900">
                            {item.title}
                          </td>
                          <td className="p-3 pl-4 text-slate-700 leading-relaxed">{item.detail}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs bg-slate-100 p-3 rounded-lg border border-gray-200">
                  <span className="font-semibold text-gray-700">
                    Download Complete Section 4(1)(b) RTI Disclosure Report (PDF):
                  </span>
                  <button
                    onClick={() =>
                      alert("Downloading Official RTI Section 4 Mandatory Disclosure PDF...")
                    }
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#007bff] hover:bg-blue-700 text-white font-bold rounded text-xs transition cursor-pointer shadow-xs"
                  >
                    <Download className="w-3.5 h-3.5" /> Download PDF Manual
                  </button>
                </div>
              </div>
            )}

            {/* TAB 2: PUBLIC INFORMATION OFFICERS (PIO DIRECTORY) */}
            {activeTab === "OFFICERS" && (
              <div className="space-y-4 animate-fade-in">
                <div className="bg-amber-50 border-l-4 border-amber-500 p-3.5 rounded-r text-xs text-amber-950 font-medium">
                  <strong>RTI Officers Directory:</strong> Citizens seeking information under RTI
                  Act 2005 may contact the designated Central Public Information Officer (CPIO) or
                  submit a First Appeal to the First Appellate Authority (FAA).
                </div>

                <div className="space-y-4">
                  {pioOfficers.map((off, idx) => (
                    <div
                      key={idx}
                      className="p-5 border-2 border-gray-300 rounded-xl bg-white hover:border-blue-500 transition shadow-xs space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-gray-200 pb-2">
                        <div>
                          <span className="inline-block px-2.5 py-0.5 bg-blue-100 text-blue-900 text-[10px] font-extrabold uppercase rounded border border-blue-300 mb-1">
                            {off.designation}
                          </span>
                          <h3 className="text-base font-bold text-slate-900 font-serif">
                            {off.name}
                          </h3>
                          <p className="text-xs text-gray-600 font-semibold">{off.officialRole}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-700">
                        <div className="flex items-start gap-2">
                          <MapPin className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                          <span>
                            <strong>Office Address:</strong> {off.address}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-blue-600 shrink-0" />
                          <span>
                            <strong>Direct Helpline:</strong> {off.phone}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>
                            <strong>Email ID:</strong>{" "}
                            <span className="font-mono text-blue-900 font-bold">{off.email}</span>
                          </span>
                        </div>
                        <div>
                          <strong>Scope &amp; Jurisdiction:</strong> {off.jurisdiction}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: APPLICATION & FEE GUIDELINES */}
            {activeTab === "PROCEDURE" && (
              <div className="space-y-5 animate-fade-in text-xs text-slate-700 leading-relaxed font-medium">
                <div className="bg-slate-100 p-4 rounded-lg border border-gray-300 space-y-2">
                  <h3 className="text-sm font-bold text-slate-900 font-serif flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-blue-800" /> How to Apply for Information
                    under RTI Act, 2005:
                  </h3>
                  <ol className="list-decimal pl-5 space-y-1.5 text-gray-800">
                    <li>
                      <strong>Application Format:</strong> Applications can be submitted in plain
                      English or Hindi specifying clear details of information required, candidate
                      roll number, and exam year.
                    </li>
                    <li>
                      <strong>Application Fee:</strong> ₹10/- (Rupees Ten Only) payable via Demand
                      Draft, Indian Postal Order (IPO), or Bank Cheque in favor of{" "}
                      <strong>"Board of Higher Secondary Education, Delhi"</strong>.
                    </li>
                    <li>
                      <strong>Mode of Submission:</strong> Send application via Speed Post /
                      Registered Post or hand over at the Ground Floor RTI Counter, BHSE Head
                      Office, Karkardooma, Delhi.
                    </li>
                    <li>
                      <strong>Response Timeline:</strong> Information will be dispatched within{" "}
                      <strong>30 working days</strong> from the receipt of valid application fee.
                    </li>
                  </ol>
                </div>

                {/* Additional Fee Details */}
                <div className="overflow-x-auto border-2 border-gray-400 rounded-lg">
                  <table className="w-full text-left text-xs border-collapse font-sans min-w-[550px]">
                    <thead>
                      <tr className="bg-[#5a5a5a] text-white font-bold text-[11px] sm:text-xs uppercase tracking-wide">
                        <th className="p-3 border-r-2 border-white">SERVICE / RECORD TYPE</th>
                        <th className="p-3 border-r-2 border-white text-center">
                          PRESCRIBED RTI FEE
                        </th>
                        <th className="p-3 text-center">TIMELINE</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-300 font-semibold text-gray-800">
                      <tr className="bg-white">
                        <td className="p-2.5 border-r-2 border-gray-300">
                          Initial RTI Application Fee
                        </td>
                        <td className="p-2.5 border-r-2 border-gray-300 text-center font-mono font-bold text-emerald-800">
                          ₹10/-
                        </td>
                        <td className="p-2.5 text-center font-mono">30 Days</td>
                      </tr>
                      <tr className="bg-slate-50">
                        <td className="p-2.5 border-r-2 border-gray-300">
                          Photocopies of Answer Scripts / Documents (A4 Size)
                        </td>
                        <td className="p-2.5 border-r-2 border-gray-300 text-center font-mono font-bold text-emerald-800">
                          ₹2/- per page
                        </td>
                        <td className="p-2.5 text-center font-mono">15 Days post fee deposit</td>
                      </tr>
                      <tr className="bg-white">
                        <td className="p-2.5 border-r-2 border-gray-300">
                          Inspection of Examination Records / Files
                        </td>
                        <td className="p-2.5 border-r-2 border-gray-300 text-center font-mono font-bold text-emerald-800">
                          No fee for 1st hour; ₹5/- per hour thereafter
                        </td>
                        <td className="p-2.5 text-center font-mono">By Appointment</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="text-center pt-2">
                  <button
                    onClick={() => alert("Downloading Official RTI Application Form 1 PDF...")}
                    className="inline-flex items-center gap-2 px-6 py-2 bg-blue-900 hover:bg-blue-950 text-white font-extrabold rounded text-xs uppercase tracking-wider transition shadow-md cursor-pointer"
                  >
                    <Download className="w-4 h-4 text-yellow-300" /> Download Blank RTI Application
                    Form 1
                  </button>
                </div>
              </div>
            )}

            {/* TAB 4: APPEALS & GRIEVANCES */}
            {activeTab === "APPEAL" && (
              <div className="space-y-4 animate-fade-in text-xs text-slate-700 leading-relaxed font-medium">
                <div className="bg-red-50 border-l-4 border-red-600 p-4 rounded-r text-xs text-red-950 space-y-2">
                  <h3 className="font-bold text-sm text-red-900 font-serif flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-red-700" /> First Appeal under Section
                    19(1) of RTI Act:
                  </h3>
                  <p>
                    If an applicant does not receive a response within 30 days or is aggrieved by
                    the decision of the Central Public Information Officer (CPIO), a First Appeal
                    may be filed within <strong>30 days</strong> to the{" "}
                    <strong>First Appellate Authority (FAA)</strong>.
                  </p>
                </div>

                <div className="p-4 bg-slate-100 rounded-lg border border-gray-300 space-y-2">
                  <h4 className="font-bold text-slate-900">Address for First Appeal Submission:</h4>
                  <p className="font-semibold text-slate-800">
                    To,
                    <br />
                    The First Appellate Authority (FAA),
                    <br />
                    Board of Higher Secondary Education, Delhi (BHSE),
                    <br />
                    Room No. 102, Secretarial Cell, Karkardooma, Delhi — 110092
                    <br />
                    Email: <span className="font-mono text-blue-900">faa.rti@bhsed.co.in</span>
                  </p>
                </div>
              </div>
            )}
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
