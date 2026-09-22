import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import React, { useState } from "react";
import { Header } from "@/components/Header";
import { AdminLoginModal } from "@/components/AdminLoginModal";
import azadiMahotsav from "@/assets/azadi_mahotsav.svg";
import swachhBharat from "@/assets/swachh_bharat.svg";
import {
  Home as HomeIcon,
  ChevronRight,
  Calendar,
  Search,
  Printer,
  Download,
  Sparkles,
} from "lucide-react";

export const Route = createFileRoute("/holiday-list")({
  head: () => ({
    meta: [
      { title: "List of Holidays 2026 — Board of Higher Secondary Education, Delhi (BHSE)" },
      {
        name: "description",
        content:
          "Official academic calendar and list of gazetted, restricted, and school holidays for the year 2026 under Board of Higher Secondary Education, Delhi.",
      },
    ],
  }),
  component: HolidayListPage,
});

function HolidayListPage() {
  const navigate = useNavigate();
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  const holidays2026 = [
    { slNo: 1, date: "26 January 2026", day: "Monday", name: "Republic Day", category: "Gazetted" },
    {
      slNo: 2,
      date: "15 February 2026",
      day: "Sunday",
      name: "Maha Shivratri",
      category: "Gazetted",
    },
    { slNo: 3, date: "04 March 2026", day: "Wednesday", name: "Holi", category: "Gazetted" },
    {
      slNo: 4,
      date: "20 March 2026",
      day: "Friday",
      name: "Id-ul-Fitr (Ramzan Eid)",
      category: "Gazetted",
    },
    {
      slNo: 5,
      date: "31 March 2026",
      day: "Tuesday",
      name: "Mahavir Jayanti",
      category: "Gazetted",
    },
    { slNo: 6, date: "03 April 2026", day: "Friday", name: "Good Friday", category: "Gazetted" },
    {
      slNo: 7,
      date: "14 April 2026",
      day: "Tuesday",
      name: "Dr. B.R. Ambedkar Jayanti",
      category: "Gazetted",
    },
    {
      slNo: 8,
      date: "01 May 2026",
      day: "Friday",
      name: "May Day / Labor Day",
      category: "Restricted",
    },
    {
      slNo: 9,
      date: "27 May 2026",
      day: "Wednesday",
      name: "Id-ul-Zuha (Bakrid)",
      category: "Gazetted",
    },
    { slNo: 10, date: "31 May 2026", day: "Sunday", name: "Buddha Purnima", category: "Gazetted" },
    { slNo: 11, date: "25 June 2026", day: "Thursday", name: "Muharram", category: "Gazetted" },
    {
      slNo: 12,
      date: "15 August 2026",
      day: "Saturday",
      name: "Independence Day",
      category: "Gazetted",
    },
    {
      slNo: 13,
      date: "25 August 2026",
      day: "Tuesday",
      name: "Milad-un-Nabi (Eid-e-Milad)",
      category: "Gazetted",
    },
    {
      slNo: 14,
      date: "04 September 2026",
      day: "Friday",
      name: "Janmashtami",
      category: "Restricted",
    },
    {
      slNo: 15,
      date: "02 October 2026",
      day: "Friday",
      name: "Mahatma Gandhi's Birthday",
      category: "Gazetted",
    },
    {
      slNo: 16,
      date: "20 October 2026",
      day: "Tuesday",
      name: "Dussehra (Vijay Dashami)",
      category: "Gazetted",
    },
    {
      slNo: 17,
      date: "26 October 2026",
      day: "Monday",
      name: "Maharishi Valmiki's Birthday",
      category: "Restricted",
    },
    {
      slNo: 18,
      date: "08 November 2026",
      day: "Sunday",
      name: "Diwali (Deepavali)",
      category: "Gazetted",
    },
    {
      slNo: 19,
      date: "09 November 2026",
      day: "Monday",
      name: "Goverdhan Puja / Bhai Dooj",
      category: "Gazetted",
    },
    {
      slNo: 20,
      date: "24 November 2026",
      day: "Tuesday",
      name: "Guru Nanak's Birthday",
      category: "Gazetted",
    },
    {
      slNo: 21,
      date: "25 December 2026",
      day: "Friday",
      name: "Christmas Day",
      category: "Gazetted",
    },
    {
      slNo: 22,
      date: "15 May 2026 - 30 June 2026",
      day: "Fri - Tue",
      name: "Summer Vacation (Schools)",
      category: "Vacation",
    },
    {
      slNo: 23,
      date: "31 Dec 2026 - 10 Jan 2027",
      day: "Thu - Sun",
      name: "Winter Break (Schools)",
      category: "Vacation",
    },
  ];

  const filteredHolidays = holidays2026.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.day.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "ALL" || item.category.toUpperCase() === selectedCategory.toUpperCase();

    return matchesSearch && matchesCategory;
  });

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
          <span className="text-slate-600">Academic</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-bold uppercase">List of Holidays 2026</span>
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
                    to="/examination"
                    className="hover:text-amber-600 transition flex items-center gap-1.5"
                  >
                    <span className="text-amber-500 font-bold">▸</span> Notice
                  </Link>
                </li>
                <li className="py-2.5">
                  <Link
                    to="/holiday-list"
                    className="hover:text-amber-600 transition flex items-center gap-1.5 font-bold text-blue-900"
                  >
                    <span className="text-amber-500 font-bold">▸</span> List of Holidays 2026
                  </Link>
                </li>
                <li className="py-2.5">
                  <button
                    onClick={() => alert("Date Sheet 2026 available for Class X & XII")}
                    className="hover:text-amber-600 transition flex items-center gap-1.5 cursor-pointer text-left w-full"
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
                    to="/affiliated-school"
                    className="hover:text-amber-600 transition flex items-center gap-1.5"
                  >
                    <span className="text-amber-500 font-bold">▸</span> Affiliated Schools
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

          {/* Right Column: List of Holidays 2026 Content Area */}
          <div className="md:col-span-8 lg:col-span-9 bg-white rounded-xl p-4 sm:p-8 shadow-sm border border-gray-200 space-y-6">
            {/* Header Banner */}
            <div className="border-b border-gray-200 pb-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h1 className="font-serif italic text-2xl sm:text-3xl font-bold text-gray-800 flex items-center gap-2">
                    <Calendar className="w-7 h-7 text-blue-800" />
                    LIST OF HOLIDAYS - 2026
                  </h1>
                  <p className="text-xs text-gray-600 mt-1">
                    Board of Higher Secondary Education, Delhi — Official Academic & Administrative
                    Calendar 2026
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => window.print()}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded border border-gray-300 transition cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" /> Print Calendar
                  </button>
                </div>
              </div>
            </div>

            {/* Summary Statistics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
                <div className="text-gray-600 font-semibold uppercase text-[10px]">
                  Gazetted Holidays
                </div>
                <div className="text-2xl font-black text-blue-900 font-mono mt-0.5">17</div>
                <div className="text-[10px] text-blue-700">Mandatory Offices & Schools Closed</div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-center">
                <div className="text-gray-600 font-semibold uppercase text-[10px]">
                  Restricted Holidays
                </div>
                <div className="text-2xl font-black text-amber-800 font-mono mt-0.5">03</div>
                <div className="text-[10px] text-amber-700">Optional Leave for Staff</div>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-center">
                <div className="text-gray-600 font-semibold uppercase text-[10px]">
                  School Vacations
                </div>
                <div className="text-2xl font-black text-emerald-900 font-mono mt-0.5">02</div>
                <div className="text-[10px] text-emerald-700">Summer & Winter Breaks</div>
              </div>
            </div>

            {/* Filters Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-100 p-3 rounded-lg border border-gray-200">
              {/* Category Filter Buttons */}
              <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
                {["ALL", "GAZETTED", "RESTRICTED", "VACATION"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 rounded text-xs font-bold transition cursor-pointer ${
                      selectedCategory === cat
                        ? "bg-[#002b7f] text-white shadow-xs"
                        : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Search Box */}
              <div className="relative w-full sm:w-64">
                <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search holiday or date..."
                  className="w-full pl-8 pr-3 py-1 text-xs bg-white border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Official Holiday Table matching BHSE official styling */}
            <div className="overflow-x-auto border-2 border-gray-400 rounded-lg">
              <table className="w-full text-left text-xs border-collapse font-sans min-w-[620px]">
                <thead>
                  <tr className="bg-[#5a5a5a] text-white font-bold text-[11px] sm:text-xs uppercase tracking-wide">
                    <th className="p-3 border-r-2 border-white w-14 text-center">SL NO.</th>
                    <th className="p-3 border-r-2 border-white w-48 text-center">DATE</th>
                    <th className="p-3 border-r-2 border-white w-28 text-center">DAY</th>
                    <th className="p-3 border-r-2 border-white text-left pl-4">NAME OF HOLIDAY</th>
                    <th className="p-3 w-32 text-center">TYPE</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-300 font-semibold text-gray-800">
                  {filteredHolidays.length > 0 ? (
                    filteredHolidays.map((item, idx) => (
                      <tr
                        key={item.slNo}
                        className={
                          idx % 2 === 0
                            ? "bg-white hover:bg-amber-50/60"
                            : "bg-slate-50/70 hover:bg-amber-50/60"
                        }
                      >
                        <td className="p-2.5 border-r-2 border-gray-300 text-center font-mono">
                          {item.slNo}
                        </td>
                        <td className="p-2.5 border-r-2 border-gray-300 text-center font-mono font-bold text-slate-900">
                          {item.date}
                        </td>
                        <td className="p-2.5 border-r-2 border-gray-300 text-center font-semibold text-slate-700">
                          {item.day}
                        </td>
                        <td className="p-2.5 border-r-2 border-gray-300 pl-4 font-bold text-slate-900">
                          {item.name}
                        </td>
                        <td className="p-2.5 text-center">
                          <span
                            className={`inline-block px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                              item.category === "Gazetted"
                                ? "bg-red-100 text-red-800 border border-red-300"
                                : item.category === "Restricted"
                                  ? "bg-amber-100 text-amber-800 border border-amber-300"
                                  : "bg-emerald-100 text-emerald-800 border border-emerald-300"
                            }`}
                          >
                            {item.category}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-gray-500 font-medium">
                        No holidays found matching "{searchTerm}".
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Note Box */}
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg text-xs space-y-1 text-amber-950">
              <div className="font-bold flex items-center gap-1 text-amber-900">
                <Sparkles className="w-4 h-4 text-amber-600" /> Note Regarding Official Holidays:
              </div>
              <p>
                1. Holidays listed as <strong>Gazetted</strong> are compulsory holidays for all
                offices, evaluated exam centers, and affiliated schools under BHSE Delhi.
              </p>
              <p>
                2. Muslim festival dates (such as Id-ul-Fitr, Id-ul-Zuha, Muharram, and
                Milad-un-Nabi) are subject to the sighting of the moon and local government
                announcements.
              </p>
              <p>
                3. Examination schedules for Secondary (Class X) &amp; Senior Secondary (Class XII)
                take precedence over general restricted holidays.
              </p>
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
