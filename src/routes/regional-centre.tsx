import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import React, { useState } from "react";
import { Header } from "@/components/Header";
import { AdminLoginModal } from "@/components/AdminLoginModal";
import azadiMahotsav from "@/assets/azadi_mahotsav.svg";
import swachhBharat from "@/assets/swachh_bharat.svg";
import { Home as HomeIcon, ChevronRight, Building2, MapPin, Mail, Phone } from "lucide-react";

export const Route = createFileRoute("/regional-centre")({
  head: () => ({
    meta: [
      { title: "Regional Centres — Board of Higher Secondary Education, Delhi (BHSE)" },
      {
        name: "description",
        content:
          "Official directory of Regional Centres and Administrative Zonal Offices under Board of Higher Secondary Education, Delhi.",
      },
    ],
  }),
  component: RegionalCentrePage,
});

function RegionalCentrePage() {
  const navigate = useNavigate();
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const regionalCentres = [
    {
      id: 1,
      zone: "HEAD OFFICE & REGIONAL CENTRE - NORTH DELHI",
      address:
        "207, Main Mall Road, Near Vishwavidyalaya Metro Station, North Delhi, Delhi — 110054",
      phone: "+91 11 2765 8901 / 8902",
      email: "delhi.regional@bhsed.co.in",
      jurisdiction: "Delhi NCR, Haryana, Punjab, Himachal Pradesh, Jammu & Kashmir",
    },
    {
      id: 2,
      zone: "REGIONAL CENTRE - UTTAR PRADESH (AGRA & ALIGARH)",
      address: "14/A, MG Road, Near Civil Lines, Agra, Uttar Pradesh — 282002",
      phone: "+91 562 252 4110",
      email: "up.regional@bhsed.co.in",
      jurisdiction: "Uttar Pradesh (Western & Central Districts)",
    },
    {
      id: 3,
      zone: "REGIONAL CENTRE - BIHAR & EASTERN REGION (PATNA & KATIHAR)",
      address: "42, Exhibition Road, Near Gandhi Maidan, Patna, Bihar — 800001",
      phone: "+91 612 220 1890",
      email: "bihar.regional@bhsed.co.in",
      jurisdiction: "Bihar, Jharkhand, West Bengal, Odisha",
    },
    {
      id: 4,
      zone: "REGIONAL CENTRE - KARNATAKA & SOUTH INDIA (BANGALORE)",
      address: "88, Brigade Road, Ashok Nagar, Bengaluru, Karnataka — 560025",
      phone: "+91 80 4112 7654",
      email: "south.regional@bhsed.co.in",
      jurisdiction: "Karnataka, Tamil Nadu, Telangana, Andhra Pradesh, Kerala",
    },
    {
      id: 5,
      zone: "REGIONAL CENTRE - MADHYA PRADESH (TIKAMGARH & BHOPAL)",
      address: "19, Maharana Pratap Nagar Zone-1, Bhopal, Madhya Pradesh — 462011",
      phone: "+91 755 255 3421",
      email: "mp.regional@bhsed.co.in",
      jurisdiction: "Madhya Pradesh, Chhattisgarh, Rajasthan",
    },
  ];

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
          <span className="text-slate-900 font-bold uppercase">Regional Centre</span>
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
                    to="/holiday-list"
                    className="hover:text-amber-600 flex items-center gap-1.5"
                  >
                    <span className="text-amber-500 font-bold">▸</span> List of Holidays 2026
                  </Link>
                </li>
                <li className="py-2.5">
                  <Link
                    to="/subject-code"
                    className="hover:text-amber-600 flex items-center gap-1.5"
                  >
                    <span className="text-amber-500 font-bold">▸</span> Subject Code
                  </Link>
                </li>
                <li className="py-2.5">
                  <Link
                    to="/regional-centre"
                    className="hover:text-amber-600 flex items-center gap-1.5 font-bold text-blue-900"
                  >
                    <span className="text-amber-500 font-bold">▸</span> Regional Centre
                  </Link>
                </li>
                <li className="py-2.5">
                  <Link
                    to="/affiliated-school"
                    className="hover:text-amber-600 flex items-center gap-1.5"
                  >
                    <span className="text-amber-500 font-bold">▸</span> Affiliated Schools
                  </Link>
                </li>
                <li className="py-2.5">
                  <Link to="/contact" className="hover:text-amber-600 flex items-center gap-1.5">
                    <span className="text-amber-500 font-bold">▸</span> Contact Us
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
            <div className="border-b border-gray-200 pb-4">
              <h1 className="font-serif italic text-2xl sm:text-3xl font-bold text-gray-800 flex items-center gap-2">
                <Building2 className="w-7 h-7 text-blue-800" />
                REGIONAL CENTRES &amp; ZONAL OFFICES
              </h1>
              <p className="text-xs text-gray-600 mt-1">
                Official Directory of BHSE Regional Administration Offices &amp; Student Help Desks
              </p>
            </div>

            <div className="space-y-4">
              {regionalCentres.map((centre) => (
                <div
                  key={centre.id}
                  className="p-5 border border-gray-300 rounded-lg bg-slate-50/60 hover:border-blue-400 transition shadow-xs"
                >
                  <h3 className="text-sm sm:text-base font-bold text-[#002b7f] font-serif border-b border-gray-200 pb-2 mb-3">
                    {centre.zone}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div className="flex items-start gap-2 text-slate-700">
                      <MapPin className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                      <span>
                        <strong>Address:</strong> {centre.address}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-700">
                      <Phone className="w-4 h-4 text-blue-600 shrink-0" />
                      <span>
                        <strong>Phone:</strong> {centre.phone}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-700">
                      <Mail className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>
                        <strong>Email:</strong>{" "}
                        <span className="font-mono text-blue-900">{centre.email}</span>
                      </span>
                    </div>
                    <div className="text-slate-700">
                      <strong>Jurisdiction:</strong> {centre.jurisdiction}
                    </div>
                  </div>
                </div>
              ))}
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
