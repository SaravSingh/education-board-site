import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import React, { useState } from "react";
import { Header } from "@/components/Header";
import { AdminLoginModal } from "@/components/AdminLoginModal";
import { Home as HomeIcon, ChevronRight, Send, CheckCircle2, RefreshCw } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Board of Higher Secondary Education, Delhi (BHSE)" },
      {
        name: "description",
        content:
          "Official contact details, head office address, and email directory for Board of Higher Secondary Education, Delhi (BHSE).",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const navigate = useNavigate();
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && email.trim()) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setName("");
        setEmail("");
        setMessage("");
      }, 5000);
    }
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setMessage("");
    setIsSubmitted(false);
  };

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
          <span className="text-slate-900 font-bold uppercase">Contact Us</span>
        </div>
      </div>

      {/* MAIN BODY CONTENT AREA (Matching Screenshot Pixel-Perfectly) */}
      <main className="w-full max-w-7xl mx-auto px-4 py-8 flex-1 space-y-8">
        {/* TOP ROW: HEAD OFFICE ADDRESS (LEFT) & GOOGLE MAPS IFRAME (RIGHT) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* TOP LEFT: ADDRESS & CORRESPONDENCE DETAILS */}
          <div className="lg:col-span-6 bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6 text-xs sm:text-sm text-gray-800">
            {/* HEAD OFFICE ADDRESS */}
            <div className="space-y-3">
              <h2 className="font-extrabold text-sm sm:text-base text-slate-900 uppercase border-b-2 border-slate-900 pb-1 flex items-center gap-1.5">
                <span>👉</span> BHSE DELHI BOARD HEAD OFFICE ADDRESS COMMUNICATION :
              </h2>
              <div className="pl-2 space-y-2">
                <div className="font-bold text-gray-900 text-sm">
                  Board Of Higher Secondary Education, Delhi (BHSE )
                </div>
                <div className="text-gray-700 font-medium">Karkardooma, Delhi 110092 India</div>
                <div className="pt-2 space-y-2 font-mono text-xs">
                  <div>
                    <span className="font-bold text-gray-700 font-sans">
                      Verification Mail Id :
                    </span>{" "}
                    <a
                      href="mailto:coe.verification@bhsed.co.in"
                      className="text-blue-800 font-bold hover:underline"
                    >
                      coe.verification@bhsed.co.in
                    </a>
                  </div>
                  <div>
                    <span className="font-bold text-gray-700 font-sans">
                      Admin / General Enquiry Mail Id :
                    </span>{" "}
                    <a
                      href="mailto:info@bhsed.co.in"
                      className="text-blue-800 font-bold hover:underline"
                    >
                      info@bhsed.co.in
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* TOP RIGHT: GOOGLE MAPS IFRAME */}
          <div className="lg:col-span-6 bg-white p-3 rounded-xl border border-gray-200 shadow-sm">
            <div className="w-full h-[380px] rounded-lg overflow-hidden relative bg-slate-200 border border-gray-300">
              <iframe
                title="Board of Higher Secondary Education Delhi Location Map"
                src="https://maps.google.com/maps?q=Karkardooma+Community+Complex+Anand+Vihar+Delhi+110092&t=&z=14&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>

        {/* BOTTOM ROW: EMAIL DIRECTORY TABLE (LEFT) & CONTACT FORM (RIGHT) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* BOTTOM LEFT: EMAIL CONTACT DIRECTORY TABLE */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-xl shadow-md border border-gray-300 overflow-hidden">
              {/* Header Banner */}
              <div className="bg-[#0d6efd] text-white p-4 text-center">
                <h3 className="font-bold text-base sm:text-lg">
                  Board Of Higher Secondary Education, Delhi
                </h3>
                <div className="text-xs text-blue-100 font-medium">Email Contact Directory</div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#5c6f55] text-white uppercase text-[11px] font-bold">
                      <th className="p-3.5 border-r border-gray-400 w-2/5 text-center">
                        Department
                      </th>
                      <th className="p-3.5 text-center">Email ID</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 font-semibold">
                    {/* Verification */}
                    <tr className="hover:bg-slate-50">
                      <td className="p-4 border-r border-gray-200 text-center">
                        <span className="inline-block px-3 py-1 bg-sky-100 text-sky-800 rounded-full text-xs font-bold border border-sky-300">
                          Verification
                        </span>
                      </td>
                      <td className="p-4 font-mono text-xs sm:text-sm text-blue-900">
                        <a
                          href="mailto:coe.verification@bhsed.co.in"
                          className="hover:underline font-bold text-blue-800"
                        >
                          coe.verification@bhsed.co.in
                        </a>
                      </td>
                    </tr>

                    {/* Admin */}
                    <tr className="hover:bg-slate-50">
                      <td className="p-4 border-r border-gray-200 text-center">
                        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold border border-blue-300">
                          Admin
                        </span>
                      </td>
                      <td className="p-4 font-mono text-xs sm:text-sm text-blue-900">
                        <a
                          href="mailto:info@bhsed.co.in"
                          className="hover:underline font-bold text-blue-800"
                        >
                          info@bhsed.co.in
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* BOTTOM RIGHT: CONTACT US FORM */}
          <div className="lg:col-span-6 bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <h2 className="font-serif italic text-2xl sm:text-3xl font-bold text-gray-800 border-b border-gray-200 pb-2">
              CONTACT US
            </h2>

            {isSubmitted ? (
              <div className="bg-emerald-50 border-2 border-emerald-500 text-emerald-900 p-4 rounded-lg text-xs font-semibold flex items-start gap-2 shadow-sm animate-fade-in">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-sm block text-emerald-950">
                    Message Sent Successfully!
                  </strong>
                  Thank you, {name}. Your inquiry has been dispatched to{" "}
                  <code className="bg-emerald-100 px-1 py-0.5 rounded text-emerald-950 font-bold font-mono">
                    coe.verification@bhsed.co.in
                  </code>
                  . Our official representative will respond shortly.
                </div>
              </div>
            ) : null}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-semibold text-gray-700">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* NAME INPUT */}
                <div className="space-y-1">
                  <label className="text-gray-700 font-bold">Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your Full Name"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-xs text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                  />
                </div>

                {/* EMAIL INPUT */}
                <div className="space-y-1">
                  <label className="text-gray-700 font-bold">Email *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@domain.com"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-xs text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                  />
                </div>
              </div>

              {/* MESSAGE TEXTAREA */}
              <div className="space-y-1">
                <label className="text-gray-700 font-bold">Message</label>
                <textarea
                  rows={6}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Enter your message or inquiry regarding admission, examination, or verification..."
                  className="w-full border border-gray-300 rounded px-3 py-2 text-xs text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white resize-none"
                ></textarea>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="submit"
                  className="bg-white border border-gray-400 hover:bg-gray-100 text-gray-800 font-bold px-6 py-1.5 rounded text-xs transition shadow-2xs cursor-pointer active:scale-95"
                >
                  Submit
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  className="bg-white border border-gray-400 hover:bg-gray-100 text-gray-800 font-bold px-6 py-1.5 rounded text-xs transition shadow-2xs cursor-pointer active:scale-95"
                >
                  Reset
                </button>
              </div>
            </form>
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
