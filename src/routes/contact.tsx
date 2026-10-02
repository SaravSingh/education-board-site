import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import React, { useState } from "react";
import { Header } from "@/components/Header";
import { AdminLoginModal } from "@/components/AdminLoginModal";
import { dbStore } from "@/lib/db";
import {
  Home as HomeIcon,
  ChevronRight,
  Send,
  CheckCircle2,
  RefreshCw,
  Loader2,
  Mail,
  AlertCircle,
  ExternalLink,
} from "lucide-react";

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<
    "idle" | "success" | "activation_needed" | "error"
  >("idle");
  const [lastSubmission, setLastSubmission] = useState<{
    name: string;
    email: string;
    message: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setIsSubmitting(true);
    setSubmissionStatus("idle");

    const payload = {
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
    };
    setLastSubmission(payload);

    // Persist inquiry in local storage store so it is safely archived
    try {
      dbStore.saveInquiry({
        id: "inq_" + Date.now(),
        name: payload.name,
        email: payload.email,
        message: payload.message || "(No message entered)",
        submitted_at: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
        status: "PENDING_ACTIVATION",
      });
    } catch (err) {
      console.warn("Could not save inquiry in local database:", err);
    }

    try {
      // Direct form submission to Ashokarora.enb@gmail.com
      const res = await fetch("https://formsubmit.co/ajax/Ashokarora.enb@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: payload.name,
          email: payload.email,
          message: payload.message || "(No message entered)",
          _subject: `New BHSE Delhi Website Inquiry from ${payload.name}`,
          _template: "table",
          _captcha: "false",
        }),
      });

      const data = await res.json().catch(() => null);

      if (data && (data.success === "true" || data.success === true)) {
        setSubmissionStatus("success");
        setName("");
        setEmail("");
        setMessage("");
      } else if (
        data &&
        typeof data.message === "string" &&
        data.message.toLowerCase().includes("activation")
      ) {
        // FormSubmit requires a 1-time email confirmation by Ashokarora.enb@gmail.com
        setSubmissionStatus("activation_needed");
      } else {
        setSubmissionStatus("error");
      }
    } catch (err) {
      console.error("Form submit error:", err);
      setSubmissionStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setMessage("");
    setSubmissionStatus("idle");
    setLastSubmission(null);
  };

  const recipientEmail = "Ashokarora.enb@gmail.com";
  const inquirySubject = encodeURIComponent(
    `New BHSE Delhi Inquiry from ${lastSubmission?.name || name || "Website Visitor"}`
  );
  const inquiryBody = encodeURIComponent(
    `Name: ${lastSubmission?.name || name}\nEmail: ${lastSubmission?.email || email}\n\nMessage / Inquiry Details:\n${lastSubmission?.message || message}`
  );
  const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${recipientEmail}&su=${inquirySubject}&body=${inquiryBody}`;
  const mailtoUrl = `mailto:${recipientEmail}?subject=${inquirySubject}&body=${inquiryBody}`;

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

      {/* MAIN BODY CONTENT AREA */}
      <main className="w-full max-w-7xl mx-auto px-4 py-8 flex-1 space-y-8">
        {/* ROW 1: HEAD OFFICE DETAILS & EMAIL DIRECTORY (LEFT) + GOOGLE MAP (RIGHT) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* LEFT COLUMN: HEAD OFFICE ADDRESS + EMAIL CONTACT DIRECTORY */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-6">
            {/* 1. HEAD OFFICE ADDRESS CARD */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4 text-xs sm:text-sm text-gray-800">
              <h2 className="font-extrabold text-sm sm:text-base text-slate-900 uppercase border-b-2 border-slate-900 pb-1 flex items-center gap-1.5">
                <span>👉</span> BHSE DELHI BOARD HEAD OFFICE ADDRESS :
              </h2>
              <div className="pl-2 space-y-2.5">
                <div className="font-bold text-gray-900 text-sm sm:text-base">
                  Board Of Higher Secondary Education, Delhi (BHSE )
                </div>
                <div className="text-gray-700 font-medium">
                  Karkardooma, Delhi 110092 India
                </div>
                <div className="pt-1 text-xs sm:text-sm">
                  <div>
                    <span className="font-bold text-gray-800">Contact Time: </span>
                    <span className="text-slate-800 font-semibold">10:30 AM to 6:30 PM (Mon – Sat)</span>
                  </div>
                </div>
                <div className="pt-2 border-t border-gray-100 space-y-1.5 font-mono text-xs">
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

            {/* 2. CORRESPONDENCE COMMUNICATION ADDRESS CARD */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-3 text-xs sm:text-sm text-gray-800">
              <h2 className="font-extrabold text-sm sm:text-base text-slate-900 uppercase border-b-2 border-slate-900 pb-1 flex items-center gap-1.5">
                <span>👉</span> ADDRESS FOR CORRESPONDENCE COMMUNICATION :
              </h2>
              <div className="pl-2 space-y-2">
                <div className="text-xs text-slate-700 font-bold underline">
                  If Undelivered Please Return To, :-
                </div>
                <div className="font-bold text-gray-900 text-sm sm:text-base">
                  Board Of Higher Secondary Education, Delhi (BHSE )
                </div>
                <div className="text-slate-800 font-semibold text-xs sm:text-sm">
                  Mr. Sudhir Kumar (Letters Assistant Dept.)
                </div>
                <div className="text-gray-700 font-medium leading-relaxed text-xs sm:text-sm">
                  794, Krishan Ganj , In Front Hindu Kanya –<br />
                  Inter College, Pilkhuwa Hapur<br />
                  District. Hapur (GZB) Pin - 245304
                </div>
                <div className="pt-2 border-t border-gray-100 font-mono text-xs">
                  <span className="font-bold text-gray-700 font-sans">E-mail. </span>
                  <a
                    href="mailto:info@bhsed.co.in"
                    className="text-blue-800 font-bold hover:underline"
                  >
                    info@bhsed.co.in
                  </a>
                </div>
              </div>
            </div>

            {/* 3. EMAIL CONTACT DIRECTORY TABLE */}
            <div className="bg-white rounded-xl shadow-md border border-gray-300 overflow-hidden">
              {/* Header Banner */}
              <div className="bg-[#0d6efd] text-white p-3.5 text-center">
                <h3 className="font-bold text-sm sm:text-base">
                  Board Of Higher Secondary Education, Delhi
                </h3>
                <div className="text-[11px] text-blue-100 font-medium">Email Contact Directory</div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#5c6f55] text-white uppercase text-[11px] font-bold">
                      <th className="p-3 border-r border-gray-400 w-2/5 text-center">Department</th>
                      <th className="p-3 text-center">Email ID</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 font-semibold">
                    {/* Verification */}
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 border-r border-gray-200 text-center">
                        <span className="inline-block px-3 py-0.5 bg-sky-100 text-sky-800 rounded-full text-xs font-bold border border-sky-300">
                          Verification
                        </span>
                      </td>
                      <td className="p-3.5 font-mono text-xs sm:text-sm text-blue-900">
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
                      <td className="p-3.5 border-r border-gray-200 text-center">
                        <span className="inline-block px-3 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs font-bold border border-blue-300">
                          Admin
                        </span>
                      </td>
                      <td className="p-3.5 font-mono text-xs sm:text-sm text-blue-900">
                        <a
                          href="mailto:info@bhsed.co.in"
                          className="hover:underline font-bold text-blue-800"
                        >
                          info@bhsed.co.in
                        </a>
                      </td>
                    </tr>

                    {/* Direct Inquiry Desk */}
                    <tr className="hover:bg-slate-50">
                      <td className="p-3.5 border-r border-gray-200 text-center">
                        <span className="inline-block px-3 py-0.5 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold border border-emerald-300">
                          Inquiry Desk
                        </span>
                      </td>
                      <td className="p-3.5 font-mono text-xs sm:text-sm text-blue-900">
                        <a
                          href="mailto:Ashokarora.enb@gmail.com"
                          className="hover:underline font-bold text-blue-800"
                        >
                          Ashokarora.enb@gmail.com
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: GOOGLE MAPS IFRAME (Full Height matching left column) */}
          <div className="lg:col-span-6 bg-white p-3 rounded-xl border border-gray-200 shadow-sm flex flex-col">
            <div className="w-full flex-1 min-h-[380px] rounded-lg overflow-hidden relative bg-slate-200 border border-gray-300">
              <iframe
                title="Board of Higher Secondary Education Delhi Location Map"
                src="https://maps.google.com/maps?q=Karkardooma+Delhi+110092+India&t=&z=14&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full min-h-[380px]"
              ></iframe>
            </div>
          </div>
        </div>

        {/* ROW 2: PUBLIC FACILITATION / HELPLINE NOTICE (LEFT) + CONTACT FORM (RIGHT) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: STUDENT HELPDESK & VERIFICATION COUNTER */}
          <div className="lg:col-span-5 bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4 text-xs text-slate-700">
            <h3 className="font-extrabold text-sm sm:text-base text-slate-900 uppercase border-b-2 border-slate-900 pb-1 flex items-center gap-1.5">
              <span>🏛️</span> Public Facilitation &amp; Verification Desk
            </h3>
            <p className="leading-relaxed text-slate-600">
              Students, institutions, and employers seeking mark sheet verification, migration
              certificates, or enrollment confirmation may reach out via official communication
              channels:
            </p>
            <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 space-y-2">
              <div className="font-bold text-slate-800">Direct Verification Cell:</div>
              <div className="font-mono text-blue-900 font-semibold">
                <a href="mailto:coe.verification@bhsed.co.in" className="hover:underline">
                  coe.verification@bhsed.co.in
                </a>
              </div>
              <div className="text-[11px] text-slate-700 pt-1.5 border-t border-slate-200">
                <div>
                  <strong className="text-slate-800">Contact Time:</strong> 10:30 AM to 6:30 PM (Mon to Sat)
                </div>
              </div>
            </div>
            <div className="bg-emerald-50 p-3.5 rounded-lg border border-emerald-200 space-y-2">
              <div className="font-bold text-emerald-950">Direct Board Inquiry Mail:</div>
              <div className="font-mono text-emerald-900 font-semibold">
                <a href="mailto:Ashokarora.enb@gmail.com" className="hover:underline font-bold">
                  Ashokarora.enb@gmail.com
                </a>
              </div>
              <div className="text-[11px] text-emerald-800 pt-1 border-t border-emerald-200">
                Official contact inbox for student inquiries, admission, examination, and verification questions.
              </div>
            </div>
            <div className="bg-blue-50 p-3.5 rounded-lg border border-blue-200 space-y-2">
              <div className="font-bold text-blue-950">Administrative &amp; General Inquiries:</div>
              <div className="font-mono text-blue-900 font-semibold">
                <a href="mailto:info@bhsed.co.in" className="hover:underline">
                  info@bhsed.co.in
                </a>
              </div>
              <div className="text-[11px] text-blue-800 pt-1 border-t border-blue-200">
                Contact Board Secretariat for administrative, curriculum, and institutional queries.
              </div>
            </div>
          </div>

          {/* RIGHT: CONTACT US FORM */}
          <div className="lg:col-span-7 bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <h2 className="font-serif italic text-2xl sm:text-3xl font-bold text-gray-800 border-b border-gray-200 pb-2">
              CONTACT US
            </h2>

            {/* STATUS: SUCCESS */}
            {submissionStatus === "success" && (
              <div className="bg-emerald-50 border-2 border-emerald-500 text-emerald-950 p-4 rounded-lg text-xs font-semibold flex items-start gap-3 shadow-sm animate-fade-in">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <strong className="text-sm block text-emerald-950 font-bold">
                    Inquiry Sent Successfully!
                  </strong>
                  <div>
                    Thank you! Your inquiry details have been forwarded directly to{" "}
                    <code className="bg-emerald-100 px-1.5 py-0.5 rounded text-emerald-950 font-bold font-mono">
                      Ashokarora.enb@gmail.com
                    </code>
                    . Our administration will review and respond to your email shortly.
                  </div>
                </div>
              </div>
            )}

            {/* STATUS: ACTIVATION NEEDED */}
            {submissionStatus === "activation_needed" && (
              <div className="bg-amber-50 border-2 border-amber-500 text-amber-950 p-4 rounded-lg text-xs space-y-3 shadow-sm animate-fade-in">
                <div className="flex items-start gap-2.5">
                  <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div className="space-y-1.5 flex-1">
                    <strong className="text-sm block text-amber-950 font-bold">
                      One-Time Activation Email Sent to Ashokarora.enb@gmail.com
                    </strong>
                    <p className="text-amber-900 leading-relaxed font-medium">
                      The mail delivery service has dispatched a one-time confirmation email to{" "}
                      <strong className="font-mono text-amber-950 font-bold bg-amber-100 px-1 py-0.5 rounded">
                        Ashokarora.enb@gmail.com
                      </strong>
                      . Please open your Gmail inbox (or Spam/Promotions folder) and click{" "}
                      <strong>"Activate Form"</strong> once. After that single confirmation, all
                      future inquiries will land in your inbox automatically!
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-amber-200 space-y-2">
                  <p className="font-bold text-amber-950">
                    ⚡ Send this inquiry to Ashokarora.enb@gmail.com right now:
                  </p>
                  <div className="flex flex-wrap gap-2.5">
                    <a
                      href={gmailComposeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white font-bold px-3.5 py-1.5 rounded text-xs shadow-sm transition active:scale-95 cursor-pointer"
                    >
                      <Mail className="w-3.5 h-3.5" /> Send Directly via Gmail Compose
                    </a>
                    <a
                      href={mailtoUrl}
                      className="inline-flex items-center gap-1.5 bg-blue-700 hover:bg-blue-800 text-white font-bold px-3.5 py-1.5 rounded text-xs shadow-sm transition active:scale-95 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" /> Send via Default Mail App
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* STATUS: ERROR / FALLBACK */}
            {submissionStatus === "error" && (
              <div className="bg-blue-50 border-2 border-blue-500 text-blue-950 p-4 rounded-lg text-xs space-y-3 shadow-sm animate-fade-in">
                <div className="flex items-start gap-2.5">
                  <Mail className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div className="space-y-1 flex-1">
                    <strong className="text-sm block text-blue-950 font-bold">
                      Deliver Inquiry to Ashokarora.enb@gmail.com
                    </strong>
                    <p className="text-blue-900 leading-relaxed font-medium">
                      Your inquiry details have been saved. Click below to deliver it directly to{" "}
                      <strong className="font-mono text-blue-950 font-bold">
                        Ashokarora.enb@gmail.com
                      </strong>
                      :
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  <a
                    href={gmailComposeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white font-bold px-3.5 py-1.5 rounded text-xs shadow-sm transition active:scale-95 cursor-pointer"
                  >
                    <Mail className="w-3.5 h-3.5" /> Open in Gmail Compose
                  </a>
                  <a
                    href={mailtoUrl}
                    className="inline-flex items-center gap-1.5 bg-blue-700 hover:bg-blue-800 text-white font-bold px-3.5 py-1.5 rounded text-xs shadow-sm transition active:scale-95 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" /> Open in Default Mail App
                  </a>
                </div>
              </div>
            )}

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
                  disabled={isSubmitting}
                  className="bg-white border border-gray-400 hover:bg-gray-100 text-gray-800 font-bold px-6 py-1.5 rounded text-xs transition shadow-2xs cursor-pointer active:scale-95 disabled:opacity-50 flex items-center gap-1.5"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <span>Submit</span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  className="bg-white border border-gray-400 hover:bg-gray-100 text-gray-800 font-bold px-6 py-1.5 rounded text-xs transition shadow-2xs cursor-pointer active:scale-95"
                >
                  Reset
                </button>
              </div>

              {/* DIRECT EMAIL INFO FOOTNOTE */}
              <div className="pt-2 flex flex-wrap items-center justify-between text-[11px] text-gray-500 border-t border-gray-100 gap-2">
                <span>
                  Inquiries delivered to:{" "}
                  <a
                    href="mailto:Ashokarora.enb@gmail.com"
                    className="font-mono text-blue-800 font-bold hover:underline"
                  >
                    Ashokarora.enb@gmail.com
                  </a>
                </span>
                <a
                  href={`mailto:Ashokarora.enb@gmail.com?subject=BHSE%20Delhi%20Inquiry`}
                  className="text-blue-700 hover:underline font-semibold flex items-center gap-1"
                >
                  <Mail className="w-3 h-3" /> Direct Email
                </a>
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
