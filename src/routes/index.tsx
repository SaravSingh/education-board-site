import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import React, { useState, useEffect } from "react";
import slideKalam from "@/assets/slide_kalam.jpg";
import slideModi from "@/assets/slide_modi.jpg";
import slideStudents from "@/assets/slide_students.jpg";
import slideHealth from "@/assets/slide_health.jpg";
import welcomeExecutive from "@/assets/welcome_executive.jpg";
import azadiMahotsav from "@/assets/azadi_mahotsav.svg";
import swachhBharat from "@/assets/swachh_bharat.svg";

import { Header } from "@/components/Header";
import { AdminLoginModal } from "@/components/AdminLoginModal";
import { ResultModal } from "@/components/ResultModal";
import { VerificationModal } from "@/components/VerificationModal";
import { ChevronLeft, ChevronRight, ShieldCheck } from "lucide-react";
import { dbStore, Announcement } from "@/lib/db";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Board of Higher Secondary Education, Delhi — Official Portal" },
      {
        name: "description",
        content:
          "Official portal of Board of Higher Secondary Education, Delhi. Govt. of Delhi Regd. No. 275 (India), Approved by NCERT, Deptt. of School Education and Literacy.",
      },
      { property: "og:title", content: "Board of Higher Secondary Education, Delhi" },
      {
        property: "og:description",
        content:
          "Official portal for Class X and XII examinations, online result verification, date sheets, and institutional affiliations.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Home,
});

function Home() {
  const navigate = useNavigate();
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isResultOpen, setIsResultOpen] = useState(false);
  const [isVerificationOpen, setIsVerificationOpen] = useState(false);

  const [announcements, setAnnouncements] = useState<Announcement[]>(dbStore.getAnnouncements());
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Dr APJ Abdul Kalam Vision",
      img: slideKalam,
      alt: "Dr. APJ Abdul Kalam Banner",
    },
    {
      id: 2,
      title: "PM Shri Narendra Modi 21st Century Skills",
      img: slideModi,
      alt: "PM Shri Narendra Modi Quote Banner",
    },
    {
      id: 3,
      title: "Students Excellence & Education",
      img: slideStudents,
      alt: "Students Banner",
    },
    {
      id: 4,
      title: "Health & Safety Guidelines",
      img: slideHealth,
      alt: "Help Stop The Spread Health Banner",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  // Sync announcements reactively from dbStore when updated
  useEffect(() => {
    setAnnouncements(dbStore.getAnnouncements());
    const unsubscribe = dbStore.subscribe(() => {
      setAnnouncements([...dbStore.getAnnouncements()]);
    });
    return unsubscribe;
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col font-sans w-full overflow-x-hidden">
      {/* 100% Full Width Dynamic Header */}
      <Header
        onOpenAdminLogin={() => setIsAdminOpen(true)}
        onOpenResult={() => navigate({ to: "/result" })}
        onOpenVerification={() => navigate({ to: "/result" })}
      />

      {/* 100% Full Width Hero Slider */}
      <div className="w-full relative bg-slate-950 overflow-hidden border-b border-slate-300">
        <div className="w-full relative min-h-[220px] sm:min-h-[320px] md:min-h-[420px] lg:min-h-[480px]">
          {(() => {
            const activeSlide = slides[currentSlide] ?? slides[0]!;
            return (
              <img
                src={activeSlide.img}
                alt={activeSlide.alt}
                className="w-full h-[220px] sm:h-[320px] md:h-[420px] lg:h-[480px] object-cover sm:object-fill transition-all duration-500 block"
              />
            );
          })()}

          {/* Left Arrow Button */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black text-white p-2.5 sm:p-3.5 z-20 transition cursor-pointer"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-5 h-5 sm:w-7 sm:h-7" />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black text-white p-2.5 sm:p-3.5 z-20 transition cursor-pointer"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-5 h-5 sm:w-7 sm:h-7" />
          </button>

          {/* Slide Indicator Dots */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2.5 rounded-full transition-all cursor-pointer ${
                  currentSlide === idx ? "bg-amber-400 w-8" : "bg-white/70 w-2.5"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main Home Page Bottom Section */}
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
                    className="hover:text-amber-600 transition flex items-center gap-1.5 font-semibold"
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
                  <a
                    href="#announcements"
                    className="hover:text-amber-600 transition flex items-center gap-1.5"
                  >
                    <span className="text-amber-500 font-bold">▸</span> Notice
                  </a>
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

          {/* Right Column: About Us Text & Yellow ANNOUNCEMENT Box (Matching Screenshot) */}
          <div className="md:col-span-8 lg:col-span-9 space-y-6">
            <div>
              <h2
                id="about"
                className="font-serif italic text-2xl sm:text-3xl font-bold text-gray-800 border-b border-gray-200 pb-2 mb-4"
              >
                About Us
              </h2>

              <div className="text-xs sm:text-sm text-gray-600 leading-relaxed font-sans text-justify space-y-3">
                <p>
                  <strong className="text-gray-900">"BHSE Delhi board"</strong> is an autonomous
                  body and all educational boards / universities which are autonomous bodies. In
                  India have discretionary powers . According to these powers every board /
                  university / state Govts. / Central Govt. of India having the liberty and right to
                  take their own decision either to allow or refuse any admission / service. But we
                  do our best to make success the non formal education programme . All the education
                  programmes run by the board is board's own autonomous education programme.
                  Legality, Validity, Utility of the education programme is strict conformity with
                  the constitution of India and law of the land under Article 19(1)G, 29 &amp; 30 It
                  has been constituted to regulate non formal Primary, Middle, Higher Secondary
                  (10th ), Senior Secondary (12th ) education and other vocational courses ( Under
                  Self Employment Education Scheme) in India . With the help of educational experts
                  to educate un educated boys, girls, men and women to upliftment the literacy in
                  india. So that they can serve society effectively and with dignity . Board may
                  impart education with international techniques{" "}
                  <Link
                    to="/about"
                    className="text-amber-600 font-bold hover:underline cursor-pointer inline-block ml-1"
                  >
                    More..
                  </Link>
                </p>
              </div>
            </div>

            {/* ANNOUNCEMENT Box fetching live published announcements (Matching Screenshot) */}
            <div id="announcements" className="pt-2">
              <div className="bg-[#f7c232] text-black font-extrabold text-xs px-4 py-2 uppercase tracking-wide inline-block rounded-t shadow-2xs">
                ANNOUNCEMENT
              </div>

              <div className="bg-[#fffde7] border-2 border-[#f7c232] rounded-b rounded-tr p-4 shadow-xs">
                <div className="max-h-[300px] overflow-y-auto space-y-3 font-sans text-xs pr-2 scrollbar-thin">
                  {announcements.map((ann) => (
                    <div
                      key={ann.id}
                      className="p-2.5 bg-white border border-amber-200 rounded flex items-start gap-2 shadow-2xs"
                    >
                      <span className="text-base leading-none">👉</span>
                      <div>
                        {ann.is_new && (
                          <span className="inline-flex items-center gap-1 bg-red-600 text-white font-extrabold text-[10px] px-1.5 py-0.5 rounded mr-1.5 animate-pulse uppercase">
                            new
                          </span>
                        )}
                        <strong className="text-slate-900 uppercase">[{ann.category}]:</strong>{" "}
                        {ann.text}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Component */}
      <footer className="w-full bg-slate-900 text-slate-300 text-xs border-t border-slate-800 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <h4 className="font-bold text-white uppercase text-sm mb-3 font-serif">
              Board of Higher Secondary Education, Delhi
            </h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Govt. of Delhi Regd. No. 275 (India). Approved by NCERT. Autonomous organisation under
              Deptt. of School Education and Literacy.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase text-sm mb-3">
              Verification &amp; Helpline
            </h4>
            <p className="text-slate-400 leading-relaxed text-xs">
              <span className="text-slate-300 font-bold">Helpline No.: </span>
              <a
                href="tel:+917979777354"
                className="text-amber-400 font-bold hover:underline font-mono"
              >
                +91 7979777354
              </a>
              <br />
              <span className="text-slate-300 font-bold">Contact Time: </span>
              <span>10:30 AM to 6:30 PM</span>
              <br />
              <span className="text-slate-300 font-bold">Email: </span>
              <a
                href="mailto:coe.verification@bhsed.co.in"
                className="text-slate-300 hover:text-white hover:underline font-mono"
              >
                coe.verification@bhsed.co.in
              </a>
              <br />
              <span className="text-slate-300 font-bold">Email: </span>
              <a
                href="mailto:info@bhsed.co.in"
                className="text-slate-300 hover:text-white hover:underline font-mono"
              >
                info@bhsed.co.in
              </a>
              <br />
              Portal: www.bhsed.co.in
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase text-sm mb-3">Quick Navigation</h4>
            <div className="grid grid-cols-2 gap-2 text-slate-400">
              <button
                onClick={() => setIsResultOpen(true)}
                className="hover:text-amber-400 text-left cursor-pointer"
              >
                Result 2026
              </button>
              <button
                onClick={() => setIsVerificationOpen(true)}
                className="hover:text-amber-400 text-left cursor-pointer"
              >
                Document Verification
              </button>
              <Link to="/admin" className="hover:text-amber-400 text-left">
                Admin Portal
              </Link>
              <Link to="/contact" className="hover:text-amber-400 text-left">
                Contact Us
              </Link>
            </div>
          </div>
        </div>

        <div className="w-full bg-slate-950 py-3 text-center text-slate-500 text-[11px] border-t border-slate-800/80">
          © {new Date().getFullYear()} Board of Higher Secondary Education, Delhi. All Rights
          Reserved.
        </div>
      </footer>

      {/* Interactive Modals */}
      <AdminLoginModal isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
      <ResultModal isOpen={isResultOpen} onClose={() => setIsResultOpen(false)} />
      <VerificationModal isOpen={isVerificationOpen} onClose={() => setIsVerificationOpen(false)} />
    </div>
  );
}
