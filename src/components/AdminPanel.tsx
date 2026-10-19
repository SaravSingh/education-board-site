import React, { useState, useEffect } from "react";
import {
  dbStore,
  Announcement,
  StudentResult,
  EnrollmentRecord,
  InquiryRecord,
  SubjectMarks,
  numberToWords,
  numberToIndividualDigitWords,
} from "@/lib/db";
import {
  ShieldCheck,
  Megaphone,
  GraduationCap,
  FileCheck,
  Plus,
  Trash2,
  Database,
  ArrowLeft,
  CheckCircle,
  Clock,
  UserPlus,
  Save,
  Edit3,
  Eye,
  Mail,
  CreditCard,
  Building,
  X,
  Printer,
  Search,
  Filter,
  ToggleLeft,
  ToggleRight,
  FileText,
  Award,
  BookOpen,
  LayoutDashboard,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  School,
  Sparkles,
  Users,
  LogOut,
  Download,
  Loader2,
} from "lucide-react";
import logoEmblem from "@/assets/logo_emblem.svg";
import digitalIndia from "@/assets/digital_india.svg";
import { CoseMarksheetDegree } from "@/components/CoseMarksheetDegree";
import { MigrationCertificate } from "@/components/MigrationCertificate";
import { DocumentWatermarkBg } from "@/components/DocumentWatermarkBg";

interface AdminPanelProps {
  onBackToSite: () => void;
}

// Convert any image URL to an inline base64 Data URL to guarantee zero canvas tainting during PDF export
const fetchAsDataUrl = async (url: string): Promise<string> => {
  try {
    const res = await fetch(url);
    const blob = await res.blob();
    return await new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = () => resolve(url);
      reader.readAsDataURL(blob);
    });
  } catch (e) {
    return url;
  }
};

export const AdminPanel: React.FC<AdminPanelProps> = ({ onBackToSite }) => {
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "students" | "add_student" | "announcements" | "enrollments" | "stats" | "inquiries"
  >("dashboard");

  // Inquiries state
  const [inquiries, setInquiries] = useState<InquiryRecord[]>(dbStore.getInquiries());

  useEffect(() => {
    const unsub = dbStore.subscribe(() => {
      setInquiries(dbStore.getInquiries());
    });
    return unsub;
  }, []);

  // Announcements state
  const [announcements, setAnnouncements] = useState<Announcement[]>(dbStore.getAnnouncements());
  const [annText, setAnnText] = useState("");
  const [annCategory, setAnnCategory] = useState("Public Notice");
  const [annIsNew, setAnnIsNew] = useState(true);

  // Student Results state
  const [results, setResults] = useState<StudentResult[]>(dbStore.getResults());
  const [selectedClassFilter, setSelectedClassFilter] = useState<string>("ALL");
  const [selectedYearFilter, setSelectedYearFilter] = useState<string>("ALL");
  const [searchTerm, setSearchTerm] = useState("");

  const [editingRollNo, setEditingRollNo] = useState<string | null>(null);

  // Form Fields for Add/Edit Student
  const [serialNo, setSerialNo] = useState("250110");
  const [rollNo, setRollNo] = useState("500110");
  const [schoolCode, setSchoolCode] = useState("105");
  const [examCenter, setExamCenter] = useState("105 - ELLENABAD EXAM HALL");
  const [statusMode, setStatusMode] = useState("PRIVATE");
  const [feeStatus, setFeeStatus] = useState("PAID");
  const [studentName, setStudentName] = useState("");
  const [dob, setDob] = useState("05-01-1992");
  const [dobWords, setDobWords] = useState("FIVE JANUARY ONE THOUSAND NINE HUNDRED NINETY TWO");
  const [fatherName, setFatherName] = useState("");
  const [motherName, setMotherName] = useState("");
  const [course, setCourse] = useState("10TH (General)");
  const [batch, setBatch] = useState("SESSION: 2007-08");
  const [enrollmentNo, setEnrollmentNo] = useState("250110/2007");
  const [schoolName, setSchoolName] = useState("VINOBA BHAVE SR. SEC. SCHOOL , ELLENABAD");
  const [photoUrl, setPhotoUrl] = useState(
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
  );
  const [examYear, setExamYear] = useState("2008");
  const [resultDeclarationDate, setResultDeclarationDate] = useState("09-06-2014");
  const [isHidden, setIsHidden] = useState(false);

  // Dynamic Subjects state
  const [subjects, setSubjects] = useState([
    {
      sl_no: 1,
      code: "501 - HINDI",
      name: "HINDI",
      max_marks: 100,
      pass_marks: 33,
      theory: 61,
      practical: 0,
    },
    {
      sl_no: 2,
      code: "502 - ENGLISH",
      name: "ENGLISH",
      max_marks: 100,
      pass_marks: 33,
      theory: 50,
      practical: 0,
    },
    {
      sl_no: 3,
      code: "516 - MATHEMATICS",
      name: "MATHEMATICS",
      max_marks: 100,
      pass_marks: 33,
      theory: 56,
      practical: 0,
    },
    {
      sl_no: 4,
      code: "518 - SCIENCE",
      name: "SCIENCE",
      max_marks: 100,
      pass_marks: 33,
      theory: 35,
      practical: 18,
    },
    {
      sl_no: 5,
      code: "519 - SOCIAL SCIENCE",
      name: "SOCIAL SCIENCE",
      max_marks: 100,
      pass_marks: 33,
      theory: 56,
      practical: 0,
    },
    {
      sl_no: 6,
      code: "528 - DRAWING",
      name: "DRAWING",
      max_marks: 100,
      pass_marks: 33,
      theory: 60,
      practical: 0,
    },
  ]);

  // Comprehensive Student Detail Page / Modal state
  const [detailStudent, setDetailStudent] = useState<StudentResult | null>(null);
  const [docTab, setDocTab] = useState<
    | "COSE_MARKSHEET"
    | "COSE_DEGREE"
    | "MARKSHEET"
    | "PROVISIONAL"
    | "TC"
    | "MIGRATION"
    | "TRANSCRIPT"
  >("COSE_MARKSHEET");
  const [adminInternetCopy, setAdminInternetCopy] = useState(false);

  // Enrollments state
  const [enrollments, setEnrollments] = useState<EnrollmentRecord[]>(dbStore.getEnrollments());
  const [enrNo, setEnrNo] = useState("");
  const [enrName, setEnrName] = useState("");
  const [enrCertNo, setEnrCertNo] = useState("");
  const [enrCourse, setEnrCourse] = useState("CLASS X");

  const [notification, setNotification] = useState("");

  const showMsg = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(""), 4000);
  };

  const handleAddSubjectRow = () => {
    setSubjects([
      ...subjects,
      {
        sl_no: subjects.length + 1,
        code: `${530 + subjects.length} - NEW SUBJECT`,
        name: "NEW SUBJECT",
        max_marks: 100,
        pass_marks: 33,
        theory: 50,
        practical: 0,
      },
    ]);
  };

  const handleRemoveSubjectRow = (idx: number) => {
    setSubjects(subjects.filter((_, i) => i !== idx));
  };

  // Toggle Visibility handler for a student
  const handleToggleVisibility = (roll: string) => {
    const isNowHidden = dbStore.toggleStudentVisibility(roll);
    setResults([...dbStore.getResults()]);
    if (detailStudent && detailStudent.roll_no === roll) {
      setDetailStudent({ ...detailStudent, is_hidden: isNowHidden });
    }
    showMsg(
      `Student Roll No ${roll} status set to ${isNowHidden ? "HIDDEN (Off)" : "VISIBLE (On)"}`,
    );
  };

  const [isExportingPdf, setIsExportingPdf] = useState(false);

  // High-Resolution Direct PDF Download
  const handleExportPdf = async () => {
    if (!detailStudent || isExportingPdf) return;
    setIsExportingPdf(true);
    try {
      const docElement =
        document.getElementById("bhse-migration-document") ||
        document.getElementById("bhse-degree-document") ||
        document.getElementById("bhse-tc-document") ||
        document.getElementById("bhse-transcript-document") ||
        document.getElementById("bhse-provisional-document") ||
        document.querySelector<HTMLElement>(".printable-marksheet > div");

      if (!docElement) {
        window.print();
        return;
      }

      // Pre-load all images to avoid blank spaces
      const images = docElement.getElementsByTagName("img");
      await Promise.all(
        Array.from(images).map((img) =>
          img.complete
            ? Promise.resolve()
            : new Promise((r) => {
                img.onload = r;
                img.onerror = r;
              }),
        ),
      );
      if (document.fonts) await document.fonts.ready;

      const { default: html2canvas } = await import("html2canvas");
      const { jsPDF } = await import("jspdf");

      const canvas = await html2canvas(docElement, {
        scale: 2,
        useCORS: true,
        allowTaint: false,
        logging: false,
        backgroundColor: "#ffffff",
        scrollX: 0,
        scrollY: 0,
        windowWidth: 1200,
        onclone: async (clonedDoc) => {
          const target =
            clonedDoc.getElementById("bhse-migration-document") ||
            clonedDoc.getElementById("bhse-degree-document") ||
            clonedDoc.getElementById("bhse-tc-document") ||
            clonedDoc.getElementById("bhse-transcript-document") ||
            clonedDoc.getElementById("bhse-provisional-document") ||
            clonedDoc.querySelector<HTMLElement>(".printable-marksheet > div");
          if (target) {
            target.style.width = "794px";
            target.style.maxWidth = "794px";
            target.style.margin = "0 auto";
            target.style.transform = "none";
          }
          const clonedImgs = clonedDoc.querySelectorAll<HTMLImageElement>(
            "#bhse-migration-document img, #bhse-degree-document img, #bhse-tc-document img, #bhse-transcript-document img, #bhse-provisional-document img, .printable-marksheet img",
          );
          await Promise.all(
            Array.from(clonedImgs).map(async (img) => {
              if (img.src && !img.src.startsWith("data:")) {
                const dataUrl = await fetchAsDataUrl(img.src);
                if (dataUrl) img.src = dataUrl;
              }
            }),
          );
        },
      });

      const imgData = canvas.toDataURL("image/jpeg", 0.96);
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
        compress: true,
      });

      pdf.addImage(imgData, "JPEG", 0, 0, 210, 297, undefined, "FAST");

      const cleanName = detailStudent.student_name
        ? detailStudent.student_name.trim().replace(/\s+/g, "_")
        : "Student";
      const docLabel =
        docTab === "MIGRATION"
          ? "Migration_Certificate"
          : docTab === "COSE_DEGREE"
          ? "Degree_Certificate"
          : docTab === "TC"
          ? "Transfer_Certificate"
          : docTab === "PROVISIONAL"
          ? "Provisional_Certificate"
          : docTab === "TRANSCRIPT"
          ? "Academic_Transcript"
          : "Marksheet";
      const fileName = `${cleanName}_${detailStudent.roll_no}_${docLabel}.pdf`;

      try {
        pdf.save(fileName);
      } catch (saveErr) {
        const blob = pdf.output("blob");
        const blobUrl = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(() => URL.revokeObjectURL(blobUrl), 15000);
      }
    } catch (err) {
      console.error("PDF generation fallback:", err);
      window.print();
    } finally {
      setIsExportingPdf(false);
    }
  };

  // Edit existing student handler
  const handleEditStudent = (r: StudentResult) => {
    setEditingRollNo(r.roll_no);
    setSerialNo(r.serial_no || "250109");
    setRollNo(r.roll_no);
    setSchoolCode(r.school_code || "105");
    setExamCenter(r.exam_center || "105 - ELLENABAD EXAM HALL");
    setStatusMode(r.status_mode || "PRIVATE");
    setFeeStatus(r.fee_status || "PAID");
    setStudentName(r.student_name);
    setDob(r.dob || "05-01-1992");
    setDobWords(r.dob_words || "FIVE JANUARY ONE THOUSAND NINE HUNDRED NINETY TWO");
    setFatherName(r.father_name);
    setMotherName(r.mother_name);
    setCourse(r.course);
    setBatch(r.batch || "SESSION: 2007-08");
    setEnrollmentNo(r.enrollment_no);
    setSchoolName(r.school_name);
    setPhotoUrl(r.photo_url || "");
    setExamYear(r.exam_year);
    setResultDeclarationDate(r.result_declaration_date || "09-06-2014");
    setIsHidden(!!r.is_hidden);

    try {
      setSubjects(JSON.parse(r.subjects_json));
    } catch (err) {
      setSubjects([]);
    }

    setActiveTab("add_student");
    showMsg(`Loaded Roll No ${r.roll_no} into editor.`);
  };

  const handleClearForm = () => {
    setEditingRollNo(null);
    setRollNo("");
    setStudentName("");
    setFatherName("");
    setMotherName("");
    setIsHidden(false);
  };

  // Add or Update student result handler
  const handleAddOrUpdateResult = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rollNo || !studentName) return;

    const computedSubjects = subjects.map((s, i) => {
      const total = Number(s.theory) + Number(s.practical);
      const words = numberToWords(total);
      return {
        ...s,
        sl_no: i + 1,
        total,
        words,
      };
    });

    const totalMarks = computedSubjects.reduce((acc, curr) => acc + curr.total, 0);
    const maxMarks = computedSubjects.reduce((acc, curr) => acc + (curr.max_marks || 100), 0);
    const percentage = ((totalMarks / maxMarks) * 100).toFixed(1) + "%";
    const status =
      totalMarks >= maxMarks * 0.6 ? "PASS / FIRST DIVISION" : "PASS / SECOND DIVISION";
    const totalWords = numberToIndividualDigitWords(totalMarks);

    const newResult: StudentResult = {
      serial_no: serialNo.toUpperCase(),
      roll_no: rollNo.toUpperCase(),
      school_code: schoolCode,
      exam_center: examCenter.toUpperCase(),
      status_mode: statusMode.toUpperCase(),
      fee_status: feeStatus.toUpperCase(),
      student_name: studentName.toUpperCase(),
      dob,
      dob_words: dobWords.toUpperCase(),
      father_name: fatherName.toUpperCase() || "N/A",
      mother_name: motherName.toUpperCase() || "N/A",
      course,
      batch,
      enrollment_no: enrollmentNo.toUpperCase(),
      school_name: schoolName.toUpperCase(),
      photo_url:
        photoUrl ||
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      exam_year: examYear,
      total_marks: totalMarks,
      max_marks: maxMarks,
      total_words: totalWords,
      percentage,
      status,
      result_declaration_date: resultDeclarationDate,
      subjects_json: JSON.stringify(computedSubjects),
      is_hidden: isHidden,
    };

    dbStore.saveResult(newResult);

    // Auto add/update enrollment record
    dbStore.saveEnrollment({
      enrollment_no: newResult.enrollment_no,
      student_name: newResult.student_name,
      cert_no: `BHSE/VER/${newResult.exam_year}/${newResult.roll_no}`,
      course: newResult.course,
      year: newResult.exam_year,
      is_verified: true,
      issue_date: newResult.result_declaration_date,
    });

    setResults([...dbStore.getResults()]);
    setEditingRollNo(null);
    setActiveTab("students");
    showMsg(`Student ${newResult.student_name} (${newResult.roll_no}) saved successfully!`);
  };

  // Delete result handler
  const handleDeleteResult = (rNo: string) => {
    if (confirm(`Are you sure you want to delete student record for Roll No ${rNo}?`)) {
      dbStore.deleteResult(rNo);
      setResults([...dbStore.getResults()]);
      if (detailStudent && detailStudent.roll_no === rNo) setDetailStudent(null);
      showMsg(`Result for Roll No ${rNo} deleted.`);
    }
  };

  // Add announcement handler
  const handleAddAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!annText.trim()) return;

    dbStore.addAnnouncement({
      text: annText,
      category: annCategory,
      is_new: annIsNew,
    });

    setAnnouncements([...dbStore.getAnnouncements()]);
    setAnnText("");
    showMsg("New Announcement published successfully!");
  };

  const handleDeleteAnnouncement = (id: string) => {
    dbStore.deleteAnnouncement(id);
    setAnnouncements([...dbStore.getAnnouncements()]);
    showMsg("Announcement deleted.");
  };

  // Add enrollment record handler
  const handleAddEnrollment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!enrNo || !enrName || !enrCertNo) return;

    const newEnr: EnrollmentRecord = {
      enrollment_no: enrNo.toUpperCase(),
      student_name: enrName.toUpperCase(),
      cert_no: enrCertNo.toUpperCase(),
      course: enrCourse,
      year: "2026",
      is_verified: true,
      issue_date: new Date().toISOString().slice(0, 10),
    };

    dbStore.saveEnrollment(newEnr);
    setEnrollments([...dbStore.getEnrollments()]);

    setEnrNo("");
    setEnrName("");
    setEnrCertNo("");
    showMsg(`Enrollment Certificate ${newEnr.cert_no} added & verified!`);
  };

  // Filter students based on Class, Year, Search Term
  const filteredStudents = results.filter((st) => {
    const matchesClass =
      selectedClassFilter === "ALL" ||
      (selectedClassFilter === "10TH" && st.course.includes("10")) ||
      (selectedClassFilter === "12TH" && st.course.includes("12"));

    const matchesYear = selectedYearFilter === "ALL" || st.exam_year === selectedYearFilter;

    const matchesSearch =
      st.student_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      st.roll_no.toLowerCase().includes(searchTerm.toLowerCase()) ||
      st.enrollment_no.toLowerCase().includes(searchTerm.toLowerCase()) ||
      st.school_name.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesClass && matchesYear && matchesSearch;
  });

  // Unique session years in database for filter
  const sessionYears = Array.from(new Set(results.map((r) => r.exam_year)))
    .sort()
    .reverse();

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans select-none">
      {/* Background Admin Dashboard - completely hidden in print when a student detail modal is open */}
      <div className={`flex flex-col flex-1 ${detailStudent ? "print:hidden" : ""}`}>
        {/* 1. TOP ADMIN HEADER */}
        <header className="bg-slate-950 border-b border-slate-800 px-3 sm:px-6 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sticky top-0 z-40 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="bg-amber-500 text-slate-950 p-2 rounded-lg font-bold shrink-0">
              <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
          <div>
            <h1 className="font-extrabold text-sm sm:text-base lg:text-lg text-white font-serif tracking-wide flex flex-wrap items-center gap-2">
              <span>BHSE Delhi — Dynamic Admin Panel</span>
              <span className="bg-amber-500/20 text-amber-400 text-[10px] font-mono px-2 py-0.5 rounded border border-amber-500/40 shrink-0">
                PRO V2.5
              </span>
            </h1>
            <p className="text-[10px] sm:text-[11px] text-slate-400 flex items-center gap-1 font-mono truncate max-w-xs sm:max-w-md">
              <Database className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> Turso DB:{" "}
              <span className="text-emerald-400 truncate">
                education-saravsingh729.aws-ap-south-1.turso.io
              </span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => {
              dbStore.logout();
              onBackToSite();
            }}
            className="flex-1 sm:flex-initial bg-red-900/80 hover:bg-red-800 text-white font-bold text-xs px-3.5 py-1.5 sm:py-2 rounded flex items-center justify-center gap-1.5 transition border border-red-700 cursor-pointer shrink-0"
            title="Logout Admin Session"
          >
            <LogOut className="w-3.5 h-3.5" /> Logout
          </button>

          <button
            onClick={onBackToSite}
            className="flex-1 sm:flex-initial bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs px-3.5 py-1.5 sm:py-2 rounded flex items-center justify-center gap-2 transition border border-slate-700 cursor-pointer shrink-0"
          >
            <ArrowLeft className="w-4 h-4" /> Exit Site
          </button>
        </div>
      </header>

      {/* Toast Notification */}
      {notification && (
        <div className="bg-emerald-600 text-white px-4 sm:px-6 py-2 text-xs font-extrabold flex items-center justify-center gap-2 shadow-lg animate-fade-in border-b border-emerald-500">
          <CheckCircle className="w-4 h-4 shrink-0" /> {notification}
        </div>
      )}

      {/* 2. MAIN ADMIN LAYOUT GRID */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6">
        {/* SIDEBAR NAVIGATION PANEL (Horizontal Scrollable Pills on Mobile, Vertical Stack on Desktop) */}
        <aside className="md:col-span-3 space-y-3">
          <div className="bg-slate-950 p-2.5 sm:p-3 rounded-lg border border-slate-800">
            <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-2 hidden md:block">
              Admin Navigation
            </div>

            <div className="flex md:flex-col overflow-x-auto pb-1 md:pb-0 gap-1.5 sm:gap-2 scrollbar-thin">
              <button
                onClick={() => setActiveTab("dashboard")}
                className={`shrink-0 md:w-full text-left px-3 sm:px-3.5 py-2 rounded-lg font-bold text-xs flex items-center justify-between transition cursor-pointer ${
                  activeTab === "dashboard"
                    ? "bg-amber-500 text-slate-950 shadow-md"
                    : "bg-slate-900 hover:bg-slate-800 text-slate-300"
                }`}
              >
                <div className="flex items-center gap-2">
                  <LayoutDashboard className="w-4 h-4 shrink-0" /> Overview
                </div>
                <ChevronRight className="w-3.5 h-3.5 hidden md:block" />
              </button>

              <button
                onClick={() => setActiveTab("students")}
                className={`shrink-0 md:w-full text-left px-3 sm:px-3.5 py-2 rounded-lg font-bold text-xs flex items-center justify-between transition cursor-pointer ${
                  activeTab === "students"
                    ? "bg-amber-500 text-slate-950 shadow-md"
                    : "bg-slate-900 hover:bg-slate-800 text-slate-300"
                }`}
              >
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 shrink-0" /> Students Directory
                </div>
                <span className="bg-slate-800 text-amber-400 font-mono text-[10px] px-1.5 py-0.5 rounded font-bold ml-1.5">
                  {results.length}
                </span>
              </button>

              <button
                onClick={() => {
                  handleClearForm();
                  setActiveTab("add_student");
                }}
                className={`shrink-0 md:w-full text-left px-3 sm:px-3.5 py-2 rounded-lg font-bold text-xs flex items-center justify-between transition cursor-pointer ${
                  activeTab === "add_student"
                    ? "bg-amber-500 text-slate-950 shadow-md"
                    : "bg-slate-900 hover:bg-slate-800 text-slate-300"
                }`}
              >
                <div className="flex items-center gap-2">
                  <UserPlus className="w-4 h-4 shrink-0" /> Add Student
                </div>
                <Plus className="w-3.5 h-3.5 text-amber-400 hidden md:block" />
              </button>

              <button
                onClick={() => setActiveTab("announcements")}
                className={`shrink-0 md:w-full text-left px-3 sm:px-3.5 py-2 rounded-lg font-bold text-xs flex items-center justify-between transition cursor-pointer ${
                  activeTab === "announcements"
                    ? "bg-amber-500 text-slate-950 shadow-md"
                    : "bg-slate-900 hover:bg-slate-800 text-slate-300"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Megaphone className="w-4 h-4 shrink-0" /> Notices
                </div>
                <span className="bg-slate-800 text-amber-400 font-mono text-[10px] px-1.5 py-0.5 rounded ml-1.5">
                  {announcements.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab("enrollments")}
                className={`shrink-0 md:w-full text-left px-3 sm:px-3.5 py-2 rounded-lg font-bold text-xs flex items-center justify-between transition cursor-pointer ${
                  activeTab === "enrollments"
                    ? "bg-amber-500 text-slate-950 shadow-md"
                    : "bg-slate-900 hover:bg-slate-800 text-slate-300"
                }`}
              >
                <div className="flex items-center gap-2">
                  <FileCheck className="w-4 h-4 shrink-0" /> Verification
                </div>
                <span className="bg-slate-800 text-emerald-400 font-mono text-[10px] px-1.5 py-0.5 rounded ml-1.5">
                  {enrollments.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab("inquiries")}
                className={`shrink-0 md:w-full text-left px-3 sm:px-3.5 py-2 rounded-lg font-bold text-xs flex items-center justify-between transition cursor-pointer ${
                  activeTab === "inquiries"
                    ? "bg-amber-500 text-slate-950 shadow-md"
                    : "bg-slate-900 hover:bg-slate-800 text-slate-300"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 shrink-0" /> Inquiries
                </div>
                <span className="bg-slate-800 text-sky-400 font-mono text-[10px] px-1.5 py-0.5 rounded ml-1.5">
                  {inquiries.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab("stats")}
                className={`shrink-0 md:w-full text-left px-3 sm:px-3.5 py-2 rounded-lg font-bold text-xs flex items-center justify-between transition cursor-pointer ${
                  activeTab === "stats"
                    ? "bg-amber-500 text-slate-950 shadow-md"
                    : "bg-slate-900 hover:bg-slate-800 text-slate-300"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4 shrink-0" /> Health
                </div>
                <ChevronRight className="w-3.5 h-3.5 hidden md:block" />
              </button>
            </div>
          </div>

          {/* Quick System Info Card */}
          <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 space-y-1.5 text-xs hidden sm:block">
            <div className="text-[11px] font-bold text-amber-400 flex items-center gap-1 uppercase">
              <Sparkles className="w-3.5 h-3.5" /> Public Visibility Toggle
            </div>
            <p className="text-[11px] text-slate-400 leading-normal">
              Admin can toggle student results ON (Visible) or OFF (Hidden) from public search
              queries instantly.
            </p>
          </div>
        </aside>

        {/* MAIN ADMIN WORKSPACE */}
        <main className="md:col-span-9 bg-slate-800 rounded-xl p-5 border border-slate-700 shadow-2xl">
          {/* TAB 1: DASHBOARD OVERVIEW */}
          {activeTab === "dashboard" && (
            <div className="space-y-6 animate-fade-in">
              <div className="border-b border-slate-700 pb-3 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <LayoutDashboard className="w-5 h-5 text-amber-400" /> Administrative Dashboard
                    Summary
                  </h2>
                  <p className="text-xs text-slate-400">
                    Real-time stats across all student sessions and board certificates
                  </p>
                </div>

                <button
                  onClick={() => {
                    handleClearForm();
                    setActiveTab("add_student");
                  }}
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs px-3.5 py-1.5 rounded flex items-center gap-1.5 transition cursor-pointer shadow-sm"
                >
                  <Plus className="w-4 h-4" /> Add Student Record
                </button>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-slate-900 p-4 rounded-lg border border-slate-700 space-y-1">
                  <div className="text-xs font-bold text-slate-400 uppercase flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-amber-400" /> Total Enrolled Students
                  </div>
                  <div className="text-3xl font-black text-amber-400 font-mono">
                    {results.length}
                  </div>
                  <div className="text-[10px] text-slate-500">Across Class X &amp; XII</div>
                </div>

                <div className="bg-slate-900 p-4 rounded-lg border border-slate-700 space-y-1">
                  <div className="text-xs font-bold text-slate-400 uppercase flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-blue-400" /> Class 10th (Secondary)
                  </div>
                  <div className="text-3xl font-black text-blue-400 font-mono">
                    {results.filter((r) => r.course.includes("10")).length}
                  </div>
                  <div className="text-[10px] text-slate-500">Active High School Records</div>
                </div>

                <div className="bg-slate-900 p-4 rounded-lg border border-slate-700 space-y-1">
                  <div className="text-xs font-bold text-slate-400 uppercase flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4 text-purple-400" /> Class 12th (Sr. Secondary)
                  </div>
                  <div className="text-3xl font-black text-purple-400 font-mono">
                    {results.filter((r) => r.course.includes("12")).length}
                  </div>
                  <div className="text-[10px] text-slate-500">Senior Secondary Records</div>
                </div>

                <div className="bg-slate-900 p-4 rounded-lg border border-slate-700 space-y-1">
                  <div className="text-xs font-bold text-slate-400 uppercase flex items-center gap-1.5">
                    <ToggleRight className="w-4 h-4 text-emerald-400" /> Active Visible / Hidden
                  </div>
                  <div className="text-2xl font-black text-emerald-400 font-mono">
                    {results.filter((r) => !r.is_hidden).length}{" "}
                    <span className="text-xs text-slate-500 font-normal">
                      / {results.filter((r) => r.is_hidden).length} Hidden
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-500">Public Search Toggle Status</div>
                </div>
              </div>

              {/* Recent Student Records Table Preview */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-xs uppercase text-slate-300 flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-amber-400" /> Recent Student
                    Registrations
                  </h3>
                  <button
                    onClick={() => setActiveTab("students")}
                    className="text-xs text-amber-400 hover:underline font-semibold cursor-pointer"
                  >
                    View All Students ({results.length}) →
                  </button>
                </div>

                <div className="overflow-x-auto border border-slate-700 rounded-lg">
                  <table className="w-full text-xs text-left text-slate-300">
                    <thead className="bg-slate-900 text-slate-200 font-bold uppercase text-[11px]">
                      <tr>
                        <th className="p-2.5 border-r border-slate-700 w-12 text-center">Photo</th>
                        <th className="p-2.5 border-r border-slate-700">Roll No</th>
                        <th className="p-2.5 border-r border-slate-700">Candidate Name</th>
                        <th className="p-2.5 border-r border-slate-700">Class</th>
                        <th className="p-2.5 border-r border-slate-700">Year</th>
                        <th className="p-2.5 border-r border-slate-700 text-center">
                          Visibility Toggle
                        </th>
                        <th className="p-2.5 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700">
                      {results.slice(0, 5).map((r) => (
                        <tr
                          key={r.roll_no}
                          className="bg-slate-900/50 hover:bg-slate-900 transition"
                        >
                          <td className="p-2 border-r border-slate-700 text-center">
                            <img
                              src={r.photo_url}
                              alt="Photo"
                              className="w-7 h-7 rounded-full object-cover mx-auto"
                            />
                          </td>
                          <td className="p-2 border-r border-slate-700 font-mono font-bold text-amber-400">
                            {r.roll_no}
                          </td>
                          <td className="p-2 border-r border-slate-700 font-bold text-white">
                            {r.student_name}
                          </td>
                          <td className="p-2 border-r border-slate-700">{r.course}</td>
                          <td className="p-2 border-r border-slate-700 font-mono">{r.exam_year}</td>
                          <td className="p-2 border-r border-slate-700 text-center">
                            <button
                              onClick={() => handleToggleVisibility(r.roll_no)}
                              className={`px-2 py-0.5 rounded text-[10px] font-extrabold cursor-pointer transition ${
                                r.is_hidden
                                  ? "bg-red-950 text-red-400 border border-red-800 hover:bg-red-900"
                                  : "bg-emerald-950 text-emerald-400 border border-emerald-800 hover:bg-emerald-900"
                              }`}
                            >
                              {r.is_hidden ? "OFF (HIDDEN)" : "ON (VISIBLE)"}
                            </button>
                          </td>
                          <td className="p-2 text-center">
                            <button
                              onClick={() => setDetailStudent(r)}
                              className="text-blue-400 hover:text-blue-300 font-bold text-xs cursor-pointer flex items-center justify-center gap-1 mx-auto"
                            >
                              <Eye className="w-3.5 h-3.5" /> Full Page Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: STUDENTS DIRECTORY (Filter by Class 10th/12th & Year) */}
          {activeTab === "students" && (
            <div className="space-y-5 animate-fade-in">
              <div className="border-b border-slate-700 pb-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-amber-400" /> Student Directory &amp;
                    Records Management
                  </h2>
                  <p className="text-xs text-slate-400">
                    View, edit, toggle visibility, and generate marksheets/certificates for students
                  </p>
                </div>

                <button
                  onClick={() => {
                    handleClearForm();
                    setActiveTab("add_student");
                  }}
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs px-3.5 py-1.5 rounded flex items-center gap-1.5 transition cursor-pointer shadow-sm"
                >
                  <Plus className="w-4 h-4" /> Add New Student
                </button>
              </div>

              {/* Filters Bar: Class Tabs, Session Year Select, Search Input */}
              <div className="bg-slate-900 p-3.5 rounded-lg border border-slate-700 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  {/* Class Filter Tabs */}
                  <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-md border border-slate-800">
                    {["ALL", "10TH", "12TH"].map((c) => (
                      <button
                        key={c}
                        onClick={() => setSelectedClassFilter(c)}
                        className={`px-3 py-1 rounded text-xs font-bold transition cursor-pointer ${
                          selectedClassFilter === c
                            ? "bg-amber-500 text-slate-950 shadow-xs"
                            : "text-slate-400 hover:text-white"
                        }`}
                      >
                        {c === "ALL" ? "All Classes" : c === "10TH" ? "Class 10th" : "Class 12th"}
                      </button>
                    ))}
                  </div>

                  {/* Year Filter Select */}
                  <div className="flex items-center gap-2 text-xs">
                    <label className="text-slate-400 font-semibold">Session Year:</label>
                    <select
                      value={selectedYearFilter}
                      onChange={(e) => setSelectedYearFilter(e.target.value)}
                      className="bg-slate-800 border border-slate-700 text-white rounded px-2.5 py-1 text-xs font-mono font-bold"
                    >
                      <option value="ALL">All Years</option>
                      {sessionYears.map((y) => (
                        <option key={y} value={y}>
                          {y}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Search Input */}
                  <div className="relative w-full sm:w-64">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search roll, name, enrollment..."
                      className="w-full pl-8 pr-3 py-1 text-xs bg-slate-800 border border-slate-700 rounded text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>
              </div>

              {/* Students Directory Table */}
              <div className="overflow-x-auto border border-slate-700 rounded-lg">
                <table className="w-full text-xs text-left text-slate-300">
                  <thead className="bg-slate-950 text-slate-200 font-bold uppercase text-[11px]">
                    <tr>
                      <th className="p-3 border-r border-slate-700 w-12 text-center">Photo</th>
                      <th className="p-3 border-r border-slate-700">Roll No</th>
                      <th className="p-3 border-r border-slate-700">Candidate Name</th>
                      <th className="p-3 border-r border-slate-700">Class</th>
                      <th className="p-3 border-r border-slate-700">Session Year</th>
                      <th className="p-3 border-r border-slate-700">Marks (%)</th>
                      <th className="p-3 border-r border-slate-700 text-center">
                        Public Visibility Toggle
                      </th>
                      <th className="p-3 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700">
                    {filteredStudents.length > 0 ? (
                      filteredStudents.map((st) => (
                        <tr
                          key={st.roll_no}
                          className="bg-slate-900/40 hover:bg-slate-900 transition"
                        >
                          <td className="p-2 border-r border-slate-700 text-center">
                            <img
                              src={st.photo_url}
                              alt="Photo"
                              className="w-8 h-8 rounded-full object-cover mx-auto"
                            />
                          </td>
                          <td className="p-2.5 border-r border-slate-700 font-mono font-bold text-amber-400">
                            {st.roll_no}
                          </td>
                          <td className="p-2.5 border-r border-slate-700 font-bold text-white uppercase">
                            {st.student_name}
                          </td>
                          <td className="p-2.5 border-r border-slate-700">{st.course}</td>
                          <td className="p-2.5 border-r border-slate-700 font-mono">
                            {st.exam_year}
                          </td>
                          <td className="p-2.5 border-r border-slate-700 font-mono font-bold text-emerald-400">
                            {st.total_marks}/{st.max_marks} ({st.percentage})
                          </td>
                          <td className="p-2.5 border-r border-slate-700 text-center">
                            <button
                              onClick={() => handleToggleVisibility(st.roll_no)}
                              className={`px-2.5 py-1 rounded text-[10px] font-extrabold cursor-pointer transition flex items-center gap-1 mx-auto ${
                                st.is_hidden
                                  ? "bg-red-950 text-red-400 border border-red-800 hover:bg-red-900"
                                  : "bg-emerald-950 text-emerald-400 border border-emerald-800 hover:bg-emerald-900"
                              }`}
                            >
                              {st.is_hidden ? (
                                <>
                                  <ToggleLeft className="w-3.5 h-3.5" /> OFF (HIDDEN)
                                </>
                              ) : (
                                <>
                                  <ToggleRight className="w-3.5 h-3.5" /> ON (VISIBLE)
                                </>
                              )}
                            </button>
                          </td>
                          <td className="p-2.5 text-center">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={() => {
                                  setDetailStudent(st);
                                  setDocTab(
                                    st.format === "COSE" || st.roll_no === "10203527"
                                      ? "COSE_MARKSHEET"
                                      : "COSE_MARKSHEET",
                                  );
                                }}
                                className="px-2 py-1 bg-blue-900/60 hover:bg-blue-800 text-blue-300 rounded font-bold text-[11px] cursor-pointer transition flex items-center gap-1"
                                title="Open Student Detail Page"
                              >
                                <Eye className="w-3.5 h-3.5" /> Detail Page
                              </button>

                              <button
                                onClick={() => handleEditStudent(st)}
                                className="p-1 text-amber-400 hover:text-amber-300 cursor-pointer"
                                title="Edit Record"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>

                              <button
                                onClick={() => handleDeleteResult(st.roll_no)}
                                className="p-1 text-red-400 hover:text-red-300 cursor-pointer"
                                title="Delete Record"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={8} className="p-8 text-center text-slate-500 font-medium">
                          No student records found matching the filter criteria.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: ADD / EDIT STUDENT FORM */}
          {activeTab === "add_student" && (
            <div className="space-y-6 animate-fade-in">
              <div className="border-b border-slate-700 pb-3 flex items-center justify-between">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <UserPlus className="w-5 h-5 text-amber-400" />
                  {editingRollNo
                    ? `Editing Student Record (Roll No: ${editingRollNo})`
                    : "Add New Student Record"}
                </h2>
                {editingRollNo && (
                  <button
                    onClick={handleClearForm}
                    className="bg-slate-700 hover:bg-slate-600 text-white font-bold text-xs px-3 py-1 rounded cursor-pointer"
                  >
                    + Add New Instead
                  </button>
                )}
              </div>

              <form
                onSubmit={handleAddOrUpdateResult}
                className="bg-slate-900 p-5 rounded-lg border border-slate-700 space-y-5"
              >
                {/* Registration Details */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">
                      Serial No.
                    </label>
                    <input
                      type="text"
                      required
                      value={serialNo}
                      onChange={(e) => setSerialNo(e.target.value)}
                      placeholder="e.g. 250109"
                      className="w-full text-xs bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">
                      Roll Number
                    </label>
                    <input
                      type="text"
                      required
                      value={rollNo}
                      onChange={(e) => setRollNo(e.target.value)}
                      placeholder="e.g. 500109"
                      className="w-full text-xs bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-white font-mono font-bold text-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">
                      School Code
                    </label>
                    <input
                      type="text"
                      value={schoolCode}
                      onChange={(e) => setSchoolCode(e.target.value)}
                      placeholder="e.g. 105"
                      className="w-full text-xs bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">
                      Status / Mode
                    </label>
                    <select
                      value={statusMode}
                      onChange={(e) => setStatusMode(e.target.value)}
                      className="w-full text-xs bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-white font-bold"
                    >
                      <option value="PRIVATE">PRIVATE</option>
                      <option value="REGULAR">REGULAR</option>
                    </select>
                  </div>
                </div>

                {/* Bio Info */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">
                      Candidate Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      placeholder="RAKESH KUMAR"
                      className="w-full text-xs bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-white font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">
                      Date of Birth (DD-MM-YYYY)
                    </label>
                    <input
                      type="text"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      placeholder="05-01-1992"
                      className="w-full text-xs bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">
                      Father's Name
                    </label>
                    <input
                      type="text"
                      value={fatherName}
                      onChange={(e) => setFatherName(e.target.value)}
                      placeholder="MULKH RAJ"
                      className="w-full text-xs bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">
                      Mother's Name
                    </label>
                    <input
                      type="text"
                      value={motherName}
                      onChange={(e) => setMotherName(e.target.value)}
                      placeholder="DWARKA DEVI"
                      className="w-full text-xs bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">
                      Class Level
                    </label>
                    <select
                      value={course}
                      onChange={(e) => setCourse(e.target.value)}
                      className="w-full text-xs bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-white font-bold"
                    >
                      <option value="10TH (General)">10TH (Secondary Examination)</option>
                      <option value="12TH (Senior Secondary)">
                        12TH (Senior Secondary Examination)
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">
                      Session Year
                    </label>
                    <input
                      type="text"
                      value={examYear}
                      onChange={(e) => setExamYear(e.target.value)}
                      placeholder="2026"
                      className="w-full text-xs bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-white font-mono font-bold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">
                      School Name
                    </label>
                    <input
                      type="text"
                      value={schoolName}
                      onChange={(e) => setSchoolName(e.target.value)}
                      className="w-full text-xs bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 uppercase mb-1">
                      Candidate Photo URL
                    </label>
                    <input
                      type="text"
                      value={photoUrl}
                      onChange={(e) => setPhotoUrl(e.target.value)}
                      placeholder="https://..."
                      className="w-full text-xs bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-white font-mono"
                    />
                  </div>
                </div>

                {/* Public Search Visibility Switch */}
                <div className="bg-slate-850 p-3 rounded border border-slate-750 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-white">
                      Public Search Visibility Toggle
                    </div>
                    <div className="text-[11px] text-slate-400">
                      When OFF, student result is hidden from public search inquiries
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsHidden(!isHidden)}
                    className={`px-4 py-1.5 rounded text-xs font-bold transition cursor-pointer ${
                      isHidden
                        ? "bg-red-950 text-red-400 border border-red-800"
                        : "bg-emerald-950 text-emerald-400 border border-emerald-800"
                    }`}
                  >
                    {isHidden ? "OFF (HIDDEN FROM SEARCH)" : "ON (VISIBLE IN SEARCH)"}
                  </button>
                </div>

                {/* Dynamic Subject Marks Table */}
                <div className="space-y-2 pt-2 border-t border-slate-700">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-amber-400 uppercase">
                      Dynamic Subject Marks Breakdown
                    </label>
                    <button
                      type="button"
                      onClick={handleAddSubjectRow}
                      className="text-xs bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold px-3 py-1 rounded flex items-center gap-1 border border-slate-700 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Subject
                    </button>
                  </div>

                  <div className="space-y-2 max-h-[280px] overflow-y-auto pr-1">
                    {subjects.map((sub, idx) => (
                      <div
                        key={idx}
                        className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center bg-slate-800 p-2.5 sm:p-2 rounded text-xs border border-slate-700"
                      >
                        <input
                          type="text"
                          value={sub.code}
                          onChange={(e) => {
                            setSubjects((prev) =>
                              prev.map((item, i) =>
                                i === idx ? { ...item, code: e.target.value } : item,
                              ),
                            );
                          }}
                          className="col-span-1 sm:col-span-3 bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 sm:py-1 font-mono text-white text-xs sm:text-[11px]"
                          placeholder="Code (e.g. 501 - HINDI)"
                        />
                        <input
                          type="text"
                          value={sub.name}
                          onChange={(e) => {
                            setSubjects((prev) =>
                              prev.map((item, i) =>
                                i === idx ? { ...item, name: e.target.value } : item,
                              ),
                            );
                          }}
                          className="col-span-1 sm:col-span-4 bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 sm:py-1 text-white text-xs sm:text-[11px]"
                          placeholder="Subject Name"
                        />
                        <div className="col-span-1 sm:col-span-4 grid grid-cols-2 gap-2">
                          <input
                            type="number"
                            value={sub.theory}
                            onChange={(e) => {
                              setSubjects((prev) =>
                                prev.map((item, i) =>
                                  i === idx ? { ...item, theory: Number(e.target.value) } : item,
                                ),
                              );
                            }}
                            className="bg-slate-900 border border-slate-700 rounded px-2 py-1 text-center text-white text-xs sm:text-[11px]"
                            placeholder="Theory"
                          />
                          <input
                            type="number"
                            value={sub.practical}
                            onChange={(e) => {
                              setSubjects((prev) =>
                                prev.map((item, i) =>
                                  i === idx ? { ...item, practical: Number(e.target.value) } : item,
                                ),
                              );
                            }}
                            className="bg-slate-900 border border-slate-700 rounded px-2 py-1 text-center text-white text-xs sm:text-[11px]"
                            placeholder="Practical"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveSubjectRow(idx)}
                          className="col-span-1 text-red-400 hover:text-red-300 flex justify-center py-1 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    type="submit"
                    className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs uppercase px-6 py-2.5 rounded flex items-center justify-center gap-1.5 transition cursor-pointer shadow-md"
                  >
                    <Save className="w-4 h-4" />
                    {editingRollNo ? "Update Student Record" : "Save New Student Record"}
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab("students")}
                    className="w-full sm:w-auto bg-slate-700 hover:bg-slate-600 text-white font-bold text-xs uppercase px-4 py-2.5 rounded transition cursor-pointer text-center"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 4: ANNOUNCEMENTS */}
          {activeTab === "announcements" && (
            <div className="space-y-6 animate-fade-in">
              <div className="border-b border-slate-700 pb-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  <Megaphone className="w-5 h-5 text-amber-400" /> Publish Portal Marquee Notices
                </h2>
                <span className="text-xs text-slate-400">
                  Total: {announcements.length} Published
                </span>
              </div>

              <form
                onSubmit={handleAddAnnouncement}
                className="bg-slate-900 p-4 rounded-lg border border-slate-700 space-y-4"
              >
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                    Notice Content
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={annText}
                    onChange={(e) => setAnnText(e.target.value)}
                    placeholder="Enter notice text to publish on homepage live marquee ticker..."
                    className="w-full text-xs bg-slate-800 border border-slate-700 rounded p-3 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                      Notice Category
                    </label>
                    <select
                      value={annCategory}
                      onChange={(e) => setAnnCategory(e.target.value)}
                      className="w-full text-xs bg-slate-800 border border-slate-700 rounded px-3 py-2 text-white"
                    >
                      <option value="Public Notice">Public Notice</option>
                      <option value="Helpline">Helpline Notice</option>
                      <option value="Verification">Verification Notice</option>
                      <option value="Date Sheet">Date Sheet Announcement</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2 pt-2 sm:pt-4">
                    <input
                      type="checkbox"
                      id="isNewCheck"
                      checked={annIsNew}
                      onChange={(e) => setAnnIsNew(e.target.checked)}
                      className="w-4 h-4 accent-amber-500 cursor-pointer"
                    />
                    <label
                      htmlFor="isNewCheck"
                      className="text-xs font-semibold text-slate-300 cursor-pointer"
                    >
                      Display Blinking 'NEW' Badge
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs uppercase px-5 py-2.5 rounded flex items-center justify-center gap-1.5 transition cursor-pointer"
                >
                  <Plus className="w-4 h-4" /> Publish Notice
                </button>
              </form>

              <div className="space-y-3">
                <h3 className="font-bold text-xs uppercase text-slate-400">
                  Currently Published Notices
                </h3>
                {announcements.map((a) => (
                  <div
                    key={a.id}
                    className="bg-slate-900 p-4 rounded-lg border border-slate-700 flex items-start justify-between gap-4"
                  >
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        {a.is_new && (
                          <span className="bg-red-600 text-white font-extrabold text-[10px] px-1.5 py-0.5 rounded">
                            NEW
                          </span>
                        )}
                        <span className="bg-slate-800 text-slate-300 text-[10px] font-bold px-2 py-0.5 rounded">
                          {a.category}
                        </span>
                        <span className="text-[11px] text-slate-500 font-mono">{a.date}</span>
                      </div>
                      <p className="text-xs text-slate-200 leading-relaxed">{a.text}</p>
                    </div>

                    <button
                      onClick={() => handleDeleteAnnouncement(a.id)}
                      className="text-red-400 hover:text-red-300 p-1 rounded hover:bg-red-900/30 transition shrink-0 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: ENROLLMENTS */}
          {activeTab === "enrollments" && (
            <div className="space-y-6 animate-fade-in">
              <div className="border-b border-slate-700 pb-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  <FileCheck className="w-5 h-5 text-amber-400" /> Certificate Verification Lookup
                  Database
                </h2>
                <span className="text-xs text-slate-400">Total Records: {enrollments.length}</span>
              </div>

              <form
                onSubmit={handleAddEnrollment}
                className="bg-slate-900 p-4 rounded-lg border border-slate-700 space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                      Enrollment Number
                    </label>
                    <input
                      type="text"
                      required
                      value={enrNo}
                      onChange={(e) => setEnrNo(e.target.value)}
                      placeholder="e.g. 250109/2007"
                      className="w-full text-xs bg-slate-800 border border-slate-700 rounded px-3 py-2 text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                      Certificate / Verification Code
                    </label>
                    <input
                      type="text"
                      required
                      value={enrCertNo}
                      onChange={(e) => setEnrCertNo(e.target.value)}
                      placeholder="e.g. BHSE/VER/2008/250109"
                      className="w-full text-xs bg-slate-800 border border-slate-700 rounded px-3 py-2 text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                      Candidate Name
                    </label>
                    <input
                      type="text"
                      required
                      value={enrName}
                      onChange={(e) => setEnrName(e.target.value)}
                      placeholder="Candidate full name"
                      className="w-full text-xs bg-slate-800 border border-slate-700 rounded px-3 py-2 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                      Course Level
                    </label>
                    <select
                      value={enrCourse}
                      onChange={(e) => setEnrCourse(e.target.value)}
                      className="w-full text-xs bg-slate-800 border border-slate-700 rounded px-3 py-2 text-white"
                    >
                      <option value="CLASS X">CLASS X</option>
                      <option value="CLASS XII">CLASS XII</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs uppercase px-5 py-2.5 rounded flex items-center justify-center gap-1.5 transition cursor-pointer"
                >
                  <UserPlus className="w-4 h-4" /> Save Verification Record
                </button>
              </form>

              <div className="space-y-2">
                {enrollments.map((e) => (
                  <div
                    key={e.enrollment_no}
                    className="bg-slate-900 p-3.5 rounded border border-slate-700 flex flex-wrap items-center justify-between text-xs gap-2"
                  >
                    <div>
                      <div className="font-bold text-amber-400 font-mono">
                        {e.cert_no}{" "}
                        <span className="text-slate-400 font-normal">({e.enrollment_no})</span>
                      </div>
                      <div className="text-slate-200 mt-0.5">
                        {e.student_name} — {e.course} ({e.year})
                      </div>
                    </div>
                    <span className="bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" /> VERIFIED
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5.5: WEBSITE INQUIRIES */}
          {activeTab === "inquiries" && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-700 pb-3">
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <Mail className="w-5 h-5 text-amber-400" /> Website Inquiries &amp; Messages
                  </h2>
                  <p className="text-xs text-slate-400">
                    Inquiries submitted through the Contact Us form.
                  </p>
                </div>
                <span className="px-2.5 py-1 bg-slate-800 border border-slate-700 text-slate-300 text-xs rounded-full font-mono">
                  Total: {inquiries.length}
                </span>
              </div>

              {inquiries.length === 0 ? (
                <div className="bg-slate-900 border border-slate-800 p-8 rounded-xl text-center space-y-2">
                  <Mail className="w-10 h-10 text-slate-600 mx-auto" />
                  <p className="text-sm font-semibold text-slate-300">No Inquiries Received Yet</p>
                  <p className="text-xs text-slate-500">
                    Submissions from the Contact Us form will appear here.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {inquiries.map((inq) => (
                    <div
                      key={inq.id}
                      className="bg-slate-900 border border-slate-800 rounded-lg p-4 space-y-2.5 hover:border-slate-700 transition"
                    >
                      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-slate-800/80 pb-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-white text-sm">{inq.name}</span>
                          <a
                            href={`mailto:${inq.email}`}
                            className="text-xs text-sky-400 hover:underline font-mono"
                          >
                            &lt;{inq.email}&gt;
                          </a>
                        </div>
                        <div className="flex items-center gap-2 text-[11px] text-slate-400">
                          <Clock className="w-3.5 h-3.5 text-slate-500" />
                          <span>{inq.submitted_at}</span>
                          <button
                            onClick={() => {
                              if (confirm("Delete this inquiry record?")) {
                                dbStore.deleteInquiry(inq.id);
                                setInquiries(dbStore.getInquiries());
                              }
                            }}
                            className="text-red-400 hover:text-red-300 p-1 rounded hover:bg-slate-800 ml-2 cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      <p className="text-xs text-slate-200 whitespace-pre-wrap leading-relaxed bg-slate-950/60 p-3 rounded border border-slate-800/60">
                        {inq.message}
                      </p>
                      <div className="flex items-center gap-2 pt-1 text-[11px]">
                        <a
                          href={`mailto:${inq.email}?subject=${encodeURIComponent(`Reply from BHSE Delhi regarding your inquiry`)}`}
                          className="inline-flex items-center gap-1 text-amber-400 hover:underline font-semibold"
                        >
                          <Mail className="w-3 h-3" /> Reply to Sender
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 6: SYSTEM METRICS */}
          {activeTab === "stats" && (
            <div className="space-y-6 animate-fade-in">
              <div className="border-b border-slate-700 pb-3">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Database className="w-5 h-5 text-amber-400" /> System Metrics &amp; Turso
                  Database Status
                </h2>
              </div>

              <div className="bg-slate-900 p-4 sm:p-5 rounded-lg border border-slate-700 space-y-3 text-xs">
                <h3 className="font-bold text-white uppercase text-sm flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-400" /> Database Connection Information
                </h3>
                <div className="font-mono bg-slate-950 p-3.5 rounded text-emerald-400 border border-slate-800 space-y-1 overflow-x-auto text-[11px]">
                  <div>ENDPOINT: libsql://education-saravsingh729.aws-ap-south-1.turso.io</div>
                  <div>DRIVER: @libsql/client</div>
                  <div>STATUS: ACTIVE &amp; SYNCHRONIZED</div>
                  <div>LOCAL STORAGE BACKUP: ENABLED &amp; PERSISTED (V4)</div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
      </div>

      {/* 3. FULL COMPREHENSIVE STUDENT DETAIL MODAL */}
      {detailStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-2 sm:p-4 lg:p-6 overflow-y-auto text-slate-900 font-sans print:static print:p-0 print:m-0 print:bg-white print:overflow-visible print:w-full print:h-auto print:block">
          <div className="w-full max-w-5xl my-2 sm:my-6 bg-white rounded-xl shadow-2xl border-2 border-slate-300 overflow-hidden relative animate-fade-in print:my-0 print:p-0 print:shadow-none print:border-none print:w-full print:h-auto print:max-w-none print:overflow-visible print:rounded-none">
            {/* Header Control Strip - Student Identity & Record Actions */}
            <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 text-white px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 shadow-md print:hidden">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center shrink-0 shadow-inner">
                  <GraduationCap className="w-5 h-5 text-amber-400" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-extrabold tracking-wider uppercase text-slate-400">
                      Student Record File
                    </span>
                    <span className="text-[10px] font-mono text-cyan-400 font-semibold hidden sm:inline">
                      • {detailStudent.course} ({detailStudent.batch})
                    </span>
                  </div>
                  <div className="text-sm sm:text-base font-black text-white truncate flex items-center gap-2">
                    <span className="text-amber-300 font-serif uppercase tracking-wide">
                      {detailStudent.student_name}
                    </span>
                    <span className="px-2 py-0.5 bg-slate-800 text-slate-200 rounded font-mono text-[11px] font-bold border border-slate-700">
                      Roll: {detailStudent.roll_no}
                    </span>
                    <span className="hidden md:inline px-2 py-0.5 bg-slate-800/80 text-slate-300 rounded font-mono text-[11px] border border-slate-700">
                      Enr: {detailStudent.enrollment_no}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons: Visibility Toggle + Edit Record + Print + Close */}
              <div className="flex items-center flex-wrap gap-2.5 shrink-0 ml-auto print:hidden">
                {/* Portal Visibility Switch */}
                <button
                  onClick={() => handleToggleVisibility(detailStudent.roll_no)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all flex items-center gap-1.5 shadow-sm border active:scale-95 ${
                    detailStudent.is_hidden
                      ? "bg-red-950/80 hover:bg-red-900 text-red-200 border-red-700/80"
                      : "bg-emerald-950/80 hover:bg-emerald-900 text-emerald-200 border-emerald-700/80"
                  }`}
                  title={
                    detailStudent.is_hidden
                      ? "Hidden from public result portal. Click to make Visible."
                      : "Live on public result portal. Click to Hide."
                  }
                >
                  {detailStudent.is_hidden ? (
                    <>
                      <ToggleLeft className="w-4 h-4 text-red-400" />
                      <span>Portal: Hidden</span>
                    </>
                  ) : (
                    <>
                      <ToggleRight className="w-4 h-4 text-emerald-400" />
                      <span>Portal: Visible</span>
                    </>
                  )}
                </button>

                {/* Edit Record Button */}
                <button
                  onClick={() => handleEditStudent(detailStudent)}
                  className="px-3.5 py-1.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs rounded-lg transition-all shadow-sm cursor-pointer flex items-center gap-1.5 active:scale-95 border border-amber-500"
                  title="Edit Student Marks & Details"
                >
                  <Edit3 className="w-3.5 h-3.5 text-slate-950" />
                  <span>Edit Record</span>
                </button>

                {/* Download PDF Button */}
                <button
                  onClick={handleExportPdf}
                  disabled={isExportingPdf}
                  className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-lg transition-all shadow-sm cursor-pointer flex items-center gap-1.5 active:scale-95 border border-emerald-400 disabled:opacity-60"
                  title="Directly download high-resolution PDF file to your device"
                >
                  {isExportingPdf ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 text-white animate-spin" />
                      <span>Generating PDF...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-3.5 h-3.5 text-white" />
                      <span>Download PDF</span>
                    </>
                  )}
                </button>

                {/* Print / PDF Button */}
                <button
                  onClick={() => window.print()}
                  className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-lg transition-all shadow-sm cursor-pointer flex items-center gap-1.5 active:scale-95 border border-blue-400"
                  title="Print active document on A4 sheet or Save as PDF"
                >
                  <Printer className="w-3.5 h-3.5 text-yellow-300" />
                  <span>Print (A4)</span>
                </button>

                {/* Close Button */}
                <button
                  onClick={() => setDetailStudent(null)}
                  className="bg-slate-800 hover:bg-red-600 text-slate-300 hover:text-white p-1.5 rounded-lg transition-colors cursor-pointer shrink-0 border border-slate-700 active:scale-95"
                  title="Close Student Record"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Document Navigation & Watermark Control Bar */}
            <div className="bg-slate-100/90 border-b border-slate-200 px-3 sm:px-6 py-2 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2.5 shadow-xs print:hidden">
              {/* Document Selector Tabs */}
              <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
                <button
                  onClick={() => setDocTab("COSE_MARKSHEET")}
                  className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    docTab === "COSE_MARKSHEET"
                      ? "bg-[#002b7f] text-white shadow-sm ring-1 ring-blue-700 font-extrabold"
                      : "bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 hover:text-blue-900"
                  }`}
                >
                  <FileText
                    className={`w-3.5 h-3.5 ${docTab === "COSE_MARKSHEET" ? "text-amber-300" : "text-blue-700"}`}
                  />
                  <span>COSE Marksheet</span>
                </button>

                <button
                  onClick={() => setDocTab("MIGRATION")}
                  className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    docTab === "MIGRATION"
                      ? "bg-purple-800 text-white shadow-sm ring-1 ring-purple-900 font-extrabold"
                      : "bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 hover:text-purple-900"
                  }`}
                >
                  <Award
                    className={`w-3.5 h-3.5 ${docTab === "MIGRATION" ? "text-purple-200" : "text-purple-600"}`}
                  />
                  <span>Migration Certificate</span>
                </button>

                <button
                  onClick={() => setDocTab("COSE_DEGREE")}
                  className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    docTab === "COSE_DEGREE"
                      ? "bg-[#002b7f] text-white shadow-sm ring-1 ring-blue-700 font-extrabold"
                      : "bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 hover:text-blue-900"
                  }`}
                >
                  <GraduationCap
                    className={`w-3.5 h-3.5 ${docTab === "COSE_DEGREE" ? "text-amber-300" : "text-amber-600"}`}
                  />
                  <span>COSE Degree</span>
                </button>

                <button
                  onClick={() => setDocTab("PROVISIONAL")}
                  className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    docTab === "PROVISIONAL"
                      ? "bg-[#002b7f] text-white shadow-sm ring-1 ring-blue-700 font-extrabold"
                      : "bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 hover:text-blue-900"
                  }`}
                >
                  <Award
                    className={`w-3.5 h-3.5 ${docTab === "PROVISIONAL" ? "text-amber-300" : "text-amber-600"}`}
                  />
                  <span>Provisional Certificate</span>
                </button>

                <button
                  onClick={() => setDocTab("TC")}
                  className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    docTab === "TC"
                      ? "bg-[#002b7f] text-white shadow-sm ring-1 ring-blue-700 font-extrabold"
                      : "bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 hover:text-blue-900"
                  }`}
                >
                  <School
                    className={`w-3.5 h-3.5 ${docTab === "TC" ? "text-emerald-300" : "text-emerald-600"}`}
                  />
                  <span>Transfer Certificate (TC)</span>
                </button>

                <button
                  onClick={() => setDocTab("TRANSCRIPT")}
                  className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    docTab === "TRANSCRIPT"
                      ? "bg-[#002b7f] text-white shadow-sm ring-1 ring-blue-700 font-extrabold"
                      : "bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 hover:text-blue-900"
                  }`}
                >
                  <FileText
                    className={`w-3.5 h-3.5 ${docTab === "TRANSCRIPT" ? "text-cyan-300" : "text-cyan-600"}`}
                  />
                  <span>Academic Transcript</span>
                </button>

                <button
                  onClick={() => setDocTab("MARKSHEET")}
                  className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    docTab === "MARKSHEET"
                      ? "bg-[#002b7f] text-white shadow-sm ring-1 ring-blue-700 font-extrabold"
                      : "bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 hover:text-slate-600"
                  }`}
                >
                  <FileCheck
                    className={`w-3.5 h-3.5 ${docTab === "MARKSHEET" ? "text-cyan-300" : "text-slate-500"}`}
                  />
                  <span>BHSE Format</span>
                </button>
              </div>

              {/* Watermark Selector & Document Options */}
              <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                {(docTab === "COSE_MARKSHEET" || docTab === "COSE_DEGREE") && (
                  <button
                    type="button"
                    onClick={() => setAdminInternetCopy((prev) => !prev)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 border cursor-pointer active:scale-95 ${
                      adminInternetCopy
                        ? "bg-amber-50 text-amber-900 border-amber-300 shadow-2xs"
                        : "bg-blue-50 text-blue-900 border-blue-200 shadow-2xs"
                    }`}
                    title="Toggle between Clean Official certificate and Internet Result copy watermark"
                  >
                    {adminInternetCopy ? (
                      <>
                        <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0"></span>
                        <span>Watermark: Internet Copy</span>
                      </>
                    ) : (
                      <>
                        <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0"></span>
                        <span>Watermark: Clean Official</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* DOCUMENT CANVAS CONTAINER */}
            <div className="p-4 sm:p-8 max-h-[75vh] overflow-y-auto printable-marksheet print:p-0 print:m-0 print:max-h-none print:overflow-visible print:block">
              {/* DOCUMENT VIEW 0: COSE ORIGINAL MARKSHEET & DEGREE */}
              {(docTab === "COSE_MARKSHEET" || docTab === "COSE_DEGREE") && detailStudent && (
                <CoseMarksheetDegree
                  student={detailStudent}
                  defaultDocType={docTab === "COSE_DEGREE" ? "DEGREE" : "MARKSHEET"}
                  isInternetCopy={adminInternetCopy}
                  hideToolbar={true}
                />
              )}

              {/* DOCUMENT VIEW 1: OFFICIAL MARKSHEET */}
              {docTab === "MARKSHEET" && (
                <div className="space-y-4">
                  {/* Marksheet Header */}
                  <div className="w-full text-center border-b-2 border-gray-300 pb-3">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-2 px-2">
                      <div className="flex items-center gap-2">
                        <img src={logoEmblem} alt="Emblem" className="w-16 h-16 object-contain" />
                        <div className="text-left">
                          <span className="text-red-700 font-extrabold text-[11px] font-serif uppercase block">
                            Approved by NCERT
                          </span>
                          <span className="text-xs font-bold text-slate-800">
                            Govt. of Delhi Regd. No. 275 (India)
                          </span>
                        </div>
                      </div>

                      <div className="text-center">
                        <h1 className="text-lg sm:text-xl font-extrabold text-[#1d359c] font-serif leading-tight">
                          बोर्ड ऑफ हायर सेकण्डरी एजुकेशन, दिल्ली
                        </h1>
                        <h2 className="text-base sm:text-lg font-black text-[#b30000] font-serif leading-tight">
                          Board of Higher Secondary Education, Delhi
                        </h2>
                        <div className="text-[10px] text-slate-600 font-semibold">
                          An Autonomous Organisation under Deptt. of School Education and Literacy
                        </div>
                      </div>

                      <div className="flex flex-col items-end">
                        <img
                          src={digitalIndia}
                          alt="Digital India"
                          className="w-20 h-8 object-contain"
                        />
                        <span className="text-xs font-mono font-bold text-blue-900">
                          {detailStudent.exam_year}
                        </span>
                      </div>
                    </div>

                    <div className="inline-block px-4 py-0.5 bg-[#e2f0d9] border border-emerald-600 rounded">
                      <span className="font-extrabold text-xs text-emerald-800 uppercase tracking-wider">
                        OFFICIAL MARKSHEET &amp; DEGREE RECORD
                      </span>
                    </div>
                  </div>

                  {/* Serial Info Table */}
                  <div>
                    <table className="w-full text-center text-xs border-collapse border-2 border-cyan-500 font-bold">
                      <thead>
                        <tr className="bg-slate-100">
                          <th className="p-2 border-2 border-cyan-500">Serial No.</th>
                          <th className="p-2 border-2 border-cyan-500">Roll No.</th>
                          <th className="p-2 border-2 border-cyan-500">School Code</th>
                          <th className="p-2 border-2 border-cyan-500">Status / Mode</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="font-mono text-xs sm:text-sm text-slate-900">
                          <td className="p-2 border-2 border-cyan-500">
                            {detailStudent.serial_no}
                          </td>
                          <td className="p-2 border-2 border-cyan-500">{detailStudent.roll_no}</td>
                          <td className="p-2 border-2 border-cyan-500">
                            {detailStudent.school_code}
                          </td>
                          <td className="p-2 border-2 border-cyan-500 uppercase">
                            {detailStudent.status_mode}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Bio Card */}
                  <div className="border-2 border-cyan-500 rounded-lg p-3 sm:p-4 bg-white flex flex-col sm:flex-row justify-between items-center sm:items-start gap-4 text-xs font-semibold">
                    <div className="space-y-1 text-slate-800 text-center sm:text-left w-full">
                      <div>
                        Candidate Name:{" "}
                        <strong className="uppercase font-bold text-slate-900">
                          {detailStudent.student_name}
                        </strong>
                      </div>
                      <div>
                        Date of Birth: <strong>{detailStudent.dob}</strong> (
                        {detailStudent.dob_words})
                      </div>
                      <div>
                        Father's Name:{" "}
                        <strong className="uppercase">{detailStudent.father_name}</strong>
                      </div>
                      <div>
                        Mother's Name:{" "}
                        <strong className="uppercase">{detailStudent.mother_name}</strong>
                      </div>
                      <div>
                        Class Level: <strong>{detailStudent.course}</strong>
                      </div>
                      <div>
                        Enrollment No:{" "}
                        <strong className="font-mono">{detailStudent.enrollment_no}</strong>
                      </div>
                      <div>
                        School Name:{" "}
                        <strong className="uppercase">{detailStudent.school_name}</strong>
                      </div>
                    </div>

                    <div className="border-2 border-slate-700 p-1 bg-white rounded shrink-0">
                      <img
                        src={detailStudent.photo_url}
                        alt="Candidate"
                        className="w-20 h-28 sm:w-24 sm:h-32 object-cover block"
                      />
                    </div>
                  </div>

                  {/* Marks Table */}
                  <div className="relative border-2 border-cyan-500 rounded-lg">
                    {/* Background Watermark */}
                    <div className="marksheet-watermark absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none z-0">
                      <img
                        src={logoEmblem}
                        alt="Watermark"
                        className="w-48 h-48 sm:w-60 sm:h-60 object-contain"
                      />
                    </div>
                    <table className="w-full text-center text-[10px] sm:text-xs border-collapse relative z-10 font-medium">
                      <thead>
                        <tr className="bg-white border-b-2 border-cyan-500 text-blue-900 font-bold">
                          <th className="p-1.5 border-r-2 border-cyan-500 w-[8%] sm:w-[6%]">
                            SL. No.
                          </th>
                          <th className="p-1.5 border-r-2 border-cyan-500 text-left w-[24%] sm:w-[26%]">
                            Subject/Code
                          </th>
                          <th className="p-1.5 border-r-2 border-cyan-500 w-[13%] sm:w-[12%]">
                            Max
                          </th>
                          <th className="p-1.5 border-r-2 border-cyan-500 w-[11%] sm:w-[10%]">
                            Pass
                          </th>
                          <th className="p-1.5 border-r-2 border-cyan-500 w-[10%] sm:w-[8%]">
                            Theory
                          </th>
                          <th className="p-1.5 border-r-2 border-cyan-500 w-[10%] sm:w-[8%]">
                            Practical
                          </th>
                          <th className="p-1.5 border-r-2 border-cyan-500 w-[11%] sm:w-[10%]">
                            Total
                          </th>
                          <th className="p-1.5 text-left w-[15%] sm:w-[20%]">In Words</th>
                        </tr>
                      </thead>
                      <tbody>
                        {JSON.parse(detailStudent.subjects_json || "[]").map(
                          (sub: SubjectMarks, i: number) => (
                            <tr key={i} className="border-b border-cyan-200">
                              <td className="p-1.5 border-r-2 border-cyan-500 font-mono">
                                {i + 1}
                              </td>
                              <td className="p-1.5 border-r-2 border-cyan-500 text-left font-bold uppercase">
                                {sub.code || sub.name}
                              </td>
                              <td className="p-1.5 border-r-2 border-cyan-500 font-mono">
                                {sub.max_marks || 100}
                              </td>
                              <td className="p-1.5 border-r-2 border-cyan-500 font-mono">
                                {sub.pass_marks || 33}
                              </td>
                              <td className="p-1.5 border-r-2 border-cyan-500 font-mono">
                                {sub.theory}
                              </td>
                              <td className="p-1.5 border-r-2 border-cyan-500 font-mono">
                                {sub.practical}
                              </td>
                              <td className="p-1.5 border-r-2 border-cyan-500 font-mono font-bold">
                                {sub.total}
                              </td>
                              <td className="p-1.5 text-left font-mono font-semibold uppercase">
                                {sub.words}
                              </td>
                            </tr>
                          ),
                        )}
                        <tr className="bg-white font-bold border-t-2 border-cyan-500">
                          <td colSpan={2} className="p-2 border-r-2 border-cyan-500 uppercase">
                            GRAND TOTAL &amp; RESULT
                          </td>
                          <td
                            colSpan={4}
                            className="p-2 border-r-2 border-cyan-500 text-emerald-800 font-extrabold uppercase"
                          >
                            {detailStudent.status}
                          </td>
                          <td className="p-2 border-r-2 border-cyan-500 font-mono text-sm">
                            {detailStudent.total_marks}/{detailStudent.max_marks}
                          </td>
                          <td className="p-2 text-left font-mono uppercase">
                            {detailStudent.total_words}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* DOCUMENT VIEW 2: PROVISIONAL CERTIFICATE */}
              {docTab === "PROVISIONAL" && (
                <div className="w-full flex justify-center py-2 print:p-0 print:m-0 print:block">
                  <div
                    id="bhse-provisional-document"
                    className="bhse-certificate-document relative w-[794px] min-w-[794px] max-w-[794px] h-[1123px] min-h-[1123px] max-h-[1123px] bg-white text-slate-900 rounded-xs shadow-2xl overflow-hidden print:shadow-none print:m-0 print:w-[210mm] print:h-[290mm] print:max-w-[210mm] print:max-h-[290mm] print:min-h-0 print:rounded-none flex flex-col justify-between select-none p-3.5 sm:p-5"
                    style={{ boxSizing: "border-box" }}
                  >
                    {/* Authentic Continuous Security Micro-Pattern Watermark */}
                    <svg
                      className="bhse-bg-watermark absolute inset-0 w-full h-full pointer-events-none z-0"
                      xmlns="http://www.w3.org/2000/svg"
                      width="100%"
                      height="100%"
                      style={{
                        opacity: 0.85,
                        WebkitPrintColorAdjust: "exact",
                        printColorAdjust: "exact",
                      }}
                    >
                      <defs>
                        <pattern
                          id="bhse-watermark-pattern-prov"
                          width="208"
                          height="9"
                          patternUnits="userSpaceOnUse"
                        >
                          <text
                            x="0"
                            y="7.4"
                            fontFamily="'Arial', 'Helvetica Neue', Helvetica, sans-serif"
                            fontSize="8"
                            fontWeight="700"
                            fill="#9bb2dd"
                            textLength="208"
                            lengthAdjust="spacingAndGlyphs"
                          >
                            BOARD OF HIGHER SECONDARY EDUCATION DELHI&#160;
                          </text>
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#bhse-watermark-pattern-prov)" />
                    </svg>

                    {/* CSS Pattern Fallback for html2canvas */}
                    <div
                      className="bhse-bg-watermark-bg absolute inset-0 pointer-events-none z-0 opacity-80"
                      style={{
                        backgroundImage:
                          'url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjA4IiBoZWlnaHQ9IjkiIHZpZXdCb3g9IjAgMCAyMDggOSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGV4dCB4PSIwIiB5PSI3LjQiIGZvbnQtZmFtaWx5PSInQXJpYWwnLCAnaGVsdmV0aWNhIE5ldWUnLCBIZWx2ZXRpY2EsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iOCIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iIzliYjJkZCIgdGV4dExlbmd0aD0iMjA4IiBsZW5ndGhBZGp1c3Q9InNwYWNpbmdBbmRHbHlwaHMiPkJPQVJEIE9GIEhJR0hFUiBTRUNPTkRBUlkgRURVQ0FUSU9OIERFTEhJJiMxNjA7PC90ZXh0Pjwvc3ZnPg==")',
                        backgroundRepeat: "repeat",
                        backgroundSize: "208px 9px",
                        WebkitPrintColorAdjust: "exact",
                        printColorAdjust: "exact",
                      }}
                    />

                    {/* Large Central Board Emblem Watermark */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden select-none">
                      <img
                        src="/bhse_emblem_blue.png"
                        alt="Watermark"
                        crossOrigin="anonymous"
                        className="w-[480px] h-[430px] object-contain opacity-15 transform translate-y-8"
                      />
                    </div>

                    {/* Outer Dark Blue Border Frame Container */}
                    <div className="relative z-10 w-full h-full border-2 border-[#0028a5] p-5 sm:p-7 flex flex-col justify-between">
                      <div>
                        {/* Top Reference Numbers */}
                        <div className="flex justify-between items-center text-[10px] sm:text-[11px] font-bold text-[#0028a5] mb-1 px-1 font-serif">
                          <div>Government of India (TM-1, No. 1791977)</div>
                          <div>Govt. of Delhi Regd. No. 275 (India)</div>
                        </div>

                        {/* Main Board Heading in Hindi */}
                        <h1 className="text-center font-bold text-[#0028a5] text-[18px] sm:text-[23px] leading-tight font-serif tracking-normal">
                          उच्चतर माध्यमिक शिक्षा परिषद्, दिल्ली
                        </h1>

                        {/* Main Board Heading in English */}
                        <h2 className="text-center font-black text-[#0028a5] text-[17px] sm:text-[21px] leading-tight font-serif tracking-wide uppercase mt-0.5">
                          Board of Higher Secondary Education, Delhi
                        </h2>

                        {/* Central Round Emblem */}
                        <div className="pt-2 pb-1 flex justify-center">
                          <img
                            src="/bhse_emblem_blue.png"
                            alt="BHSE Emblem"
                            className="w-16 h-16 object-contain"
                          />
                        </div>

                        {/* Recognition Subtitle */}
                        <div className="text-center text-[10px] sm:text-[11px] font-bold text-[#0028a5] tracking-wide uppercase">
                          AN AUTONOMOUS ORGANISATION UNDER DEPTT. OF SCHOOL EDUCATION &amp; LITERACY
                        </div>

                        {/* Serial Number & Roll Number Row */}
                        <div className="flex justify-between items-end mt-4 text-xs font-semibold px-2 font-serif">
                          <div>
                            <span className="text-slate-800 font-bold">क्रमांक संख्या :</span>
                            <div className="flex items-baseline gap-1 mt-0.5">
                              <span className="text-slate-700 font-bold">Cert. No:</span>
                              <span className="font-mono font-black text-sm text-slate-950 border-b border-dotted border-slate-900 px-3 tracking-widest">
                                PROV/{detailStudent.exam_year}/{detailStudent.roll_no}
                              </span>
                            </div>
                          </div>

                          <div className="text-right">
                            <span className="text-slate-800 font-bold">अनुक्रमांक</span>
                            <div className="flex items-baseline justify-end gap-1 mt-0.5">
                              <span className="text-slate-700 font-bold">Roll No.</span>
                              <span className="font-mono font-black text-sm sm:text-base text-slate-950 border-b border-dotted border-slate-900 px-3 tracking-widest">
                                {detailStudent.roll_no}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Certificate Title Banner */}
                        <div className="text-center mt-5 mb-6">
                          <div className="text-base font-bold text-slate-900 tracking-wide font-serif">
                            औपबंधिक उत्तीर्ण प्रमाण - पत्र
                          </div>
                          <div className="text-xl sm:text-2xl font-black text-[#0028a5] tracking-widest font-serif uppercase mt-0.5 border-b-2 border-[#0028a5] inline-block px-6 pb-1">
                            PROVISIONAL PASS CERTIFICATE
                          </div>
                        </div>

                        {/* Certificate Body */}
                        <div className="space-y-6 text-[14px] leading-loose text-slate-950 px-3 font-serif">
                          <p className="text-justify indent-8">
                            This is to certify that{" "}
                            <strong className="font-mono font-black text-base text-blue-950 uppercase border-b border-dotted border-slate-900 px-2">
                              {detailStudent.student_name}
                            </strong>
                            , Son / Daughter of{" "}
                            <strong className="font-mono font-bold text-slate-900 uppercase border-b border-dotted border-slate-900 px-2">
                              {detailStudent.father_name}
                            </strong>{" "}
                            &amp;{" "}
                            <strong className="font-mono font-bold text-slate-900 uppercase border-b border-dotted border-slate-900 px-2">
                              {detailStudent.mother_name}
                            </strong>
                            , Roll No.{" "}
                            <strong className="font-mono font-black text-blue-950 border-b border-dotted border-slate-900 px-2">
                              {detailStudent.roll_no}
                            </strong>
                            , Enrollment No.{" "}
                            <strong className="font-mono font-bold text-slate-900 border-b border-dotted border-slate-900 px-2">
                              {detailStudent.enrollment_no}
                            </strong>
                            , student of{" "}
                            <strong className="font-mono font-bold text-slate-900 uppercase border-b border-dotted border-slate-900 px-2">
                              {detailStudent.school_name}
                            </strong>{" "}
                            has successfully appeared and passed the{" "}
                            <strong className="font-mono font-black text-base text-blue-950 uppercase border-b border-dotted border-slate-900 px-2">
                              {detailStudent.course}
                            </strong>{" "}
                            Examination held in the session year{" "}
                            <strong className="font-mono font-bold text-slate-900 border-b border-dotted border-slate-900 px-2">
                              {detailStudent.exam_year}
                            </strong>{" "}
                            and has been placed in{" "}
                            <strong className="font-mono font-black text-emerald-800 uppercase text-base border-b border-dotted border-slate-900 px-3">
                              {detailStudent.status}
                            </strong>
                            .
                          </p>

                          <div className="pt-4 p-3 bg-slate-50/70 rounded border border-slate-200/80 text-xs text-slate-700 font-sans">
                            Note: This provisional certificate is issued to enable the candidate to seek admission to higher classes or apply for employment pending the issue of the original Certificate / Marksheet.
                          </div>
                        </div>
                      </div>

                      {/* Bottom Signatures */}
                      <div className="flex justify-between items-end pt-6 px-2 mt-4 font-serif">
                        <div className="flex items-end gap-5">
                          <div className="space-y-0.5 text-xs text-slate-800 font-semibold">
                            <div>दिल्ली / Delhi</div>
                            <div className="pt-1.5">
                              Date of Issue:{" "}
                              <span className="font-mono font-black text-slate-950 border-b border-dotted border-slate-900 px-2">
                                {detailStudent.result_declaration_date}
                              </span>
                            </div>
                          </div>

                          {/* Official Seal */}
                          <div className="w-20 h-20 rounded-full border-2 border-dashed border-[#0028a5]/60 flex flex-col items-center justify-center text-center p-1 opacity-85 select-none bg-blue-50/30">
                            <span className="text-[7px] font-black uppercase text-[#0028a5] tracking-tighter leading-none">
                              BOARD OF HIGHER SECONDARY
                            </span>
                            <span className="text-[8.5px] font-black uppercase text-[#b8860b] my-0.5">
                              ★ SEAL ★
                            </span>
                            <span className="text-[7px] font-black uppercase text-[#0028a5] tracking-tighter leading-none">
                              EDUCATION DELHI
                            </span>
                          </div>
                        </div>

                        {/* Right: Controller Signature */}
                        <div className="text-center space-y-0.5">
                          <img
                            src="/bhse_controller_signature.png"
                            alt="Controller Signature (ओमप्रकाश गुप्ता)"
                            className="h-10 sm:h-12 mx-auto object-contain mb-1"
                          />
                          <div className="font-bold text-xs sm:text-sm text-[#0028a5] leading-tight">
                            (ओमप्रकाश गुप्ता)
                          </div>
                          <div className="font-bold text-xs text-[#0028a5] leading-tight">
                            परीक्षा नियंत्रक
                          </div>
                          <div className="font-bold text-[11px] text-[#0028a5] leading-tight uppercase font-sans">
                            Controller of Examination
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* DOCUMENT VIEW 3: TRANSFER CERTIFICATE (TC) */}
              {docTab === "TC" && (
                <div className="w-full flex justify-center py-2 print:p-0 print:m-0 print:block">
                  <div
                    id="bhse-tc-document"
                    className="bhse-certificate-document relative w-[794px] min-w-[794px] max-w-[794px] h-[1123px] min-h-[1123px] max-h-[1123px] bg-white text-slate-900 rounded-xs shadow-2xl overflow-hidden print:shadow-none print:m-0 print:w-[210mm] print:h-[290mm] print:max-w-[210mm] print:max-h-[290mm] print:min-h-0 print:rounded-none flex flex-col justify-between select-none p-3.5 sm:p-5"
                    style={{ boxSizing: "border-box" }}
                  >
                    {/* Authentic Continuous Security Micro-Pattern Watermark */}
                    <svg
                      className="bhse-bg-watermark absolute inset-0 w-full h-full pointer-events-none z-0"
                      xmlns="http://www.w3.org/2000/svg"
                      width="100%"
                      height="100%"
                      style={{
                        opacity: 0.85,
                        WebkitPrintColorAdjust: "exact",
                        printColorAdjust: "exact",
                      }}
                    >
                      <defs>
                        <pattern
                          id="bhse-watermark-pattern-tc"
                          width="208"
                          height="9"
                          patternUnits="userSpaceOnUse"
                        >
                          <text
                            x="0"
                            y="7.4"
                            fontFamily="'Arial', 'Helvetica Neue', Helvetica, sans-serif"
                            fontSize="8"
                            fontWeight="700"
                            fill="#9bb2dd"
                            textLength="208"
                            lengthAdjust="spacingAndGlyphs"
                          >
                            BOARD OF HIGHER SECONDARY EDUCATION DELHI&#160;
                          </text>
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#bhse-watermark-pattern-tc)" />
                    </svg>

                    {/* CSS Pattern Fallback for html2canvas */}
                    <div
                      className="bhse-bg-watermark-bg absolute inset-0 pointer-events-none z-0 opacity-80"
                      style={{
                        backgroundImage:
                          'url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjA4IiBoZWlnaHQ9IjkiIHZpZXdCb3g9IjAgMCAyMDggOSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGV4dCB4PSIwIiB5PSI3LjQiIGZvbnQtZmFtaWx5PSInQXJpYWwnLCAnaGVsdmV0aWNhIE5ldWUnLCBIZWx2ZXRpY2EsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iOCIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iIzliYjJkZCIgdGV4dExlbmd0aD0iMjA4IiBsZW5ndGhBZGp1c3Q9InNwYWNpbmdBbmRHbHlwaHMiPkJPQVJEIE9GIEhJR0hFUiBTRUNPTkRBUlkgRURVQ0FUSU9OIERFTEhJJiMxNjA7PC90ZXh0Pjwvc3ZnPg==")',
                        backgroundRepeat: "repeat",
                        backgroundSize: "208px 9px",
                        WebkitPrintColorAdjust: "exact",
                        printColorAdjust: "exact",
                      }}
                    />

                    {/* Large Central Board Emblem Watermark */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden select-none">
                      <img
                        src="/bhse_emblem_blue.png"
                        alt="Watermark"
                        crossOrigin="anonymous"
                        className="w-[480px] h-[430px] object-contain opacity-15 transform translate-y-8"
                      />
                    </div>

                    {/* Outer Dark Blue Border Frame Container */}
                    <div className="relative z-10 w-full h-full border-2 border-[#0028a5] p-5 sm:p-7 flex flex-col justify-between">
                      <div>
                        {/* Top Reference Numbers */}
                        <div className="flex justify-between items-center text-[10px] sm:text-[11px] font-bold text-[#0028a5] mb-1 px-1 font-serif">
                          <div>Government of India (TM-1, No. 1791977)</div>
                          <div>Govt. of Delhi Regd. No. 275 (India)</div>
                        </div>

                        {/* Main Board Heading in Hindi */}
                        <h1 className="text-center font-bold text-[#0028a5] text-[18px] sm:text-[23px] leading-tight font-serif tracking-normal">
                          उच्चतर माध्यमिक शिक्षा परिषद्, दिल्ली
                        </h1>

                        {/* Main Board Heading in English */}
                        <h2 className="text-center font-black text-[#0028a5] text-[17px] sm:text-[21px] leading-tight font-serif tracking-wide uppercase mt-0.5">
                          Board of Higher Secondary Education, Delhi
                        </h2>

                        {/* Central Round Emblem */}
                        <div className="pt-2 pb-1 flex justify-center">
                          <img
                            src="/bhse_emblem_blue.png"
                            alt="BHSE Emblem"
                            className="w-16 h-16 object-contain"
                          />
                        </div>

                        {/* Recognition Subtitle */}
                        <div className="text-center text-[10px] sm:text-[11px] font-bold text-[#0028a5] tracking-wide uppercase">
                          AN AUTONOMOUS ORGANISATION UNDER DEPTT. OF SCHOOL EDUCATION &amp; LITERACY
                        </div>

                        {/* School Affiliation Line */}
                        <div className="text-center text-xs text-slate-700 font-semibold mt-1">
                          Affiliated Institution:{" "}
                          <span className="font-bold text-slate-900 uppercase">
                            {detailStudent.school_name}
                          </span>{" "}
                          (School Code: {detailStudent.school_code})
                        </div>

                        {/* Serial Number & Admission Number Row */}
                        <div className="flex justify-between items-end mt-3 text-xs font-semibold px-2 font-serif">
                          <div>
                            <span className="text-slate-800 font-bold">टी.सी. क्रमांक संख्या :</span>
                            <div className="flex items-baseline gap-1 mt-0.5">
                              <span className="text-slate-700 font-bold">TC Serial No:</span>
                              <span className="font-mono font-black text-sm text-slate-950 border-b border-dotted border-slate-900 px-3 tracking-widest">
                                TC/{detailStudent.exam_year}/{detailStudent.roll_no}
                              </span>
                            </div>
                          </div>

                          <div className="text-right">
                            <span className="text-slate-800 font-bold">प्रवेश क्रमांक</span>
                            <div className="flex items-baseline justify-end gap-1 mt-0.5">
                              <span className="text-slate-700 font-bold">Admission No:</span>
                              <span className="font-mono font-black text-sm sm:text-base text-slate-950 border-b border-dotted border-slate-900 px-3 tracking-widest">
                                {detailStudent.serial_no}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Certificate Title Banner */}
                        <div className="text-center mt-4 mb-5">
                          <div className="text-base font-bold text-slate-900 tracking-wide font-serif">
                            विद्यालय स्थानांतरण प्रमाण - पत्र
                          </div>
                          <div className="text-xl sm:text-2xl font-black text-[#0028a5] tracking-widest font-serif uppercase mt-0.5 border-b-2 border-[#0028a5] inline-block px-6 pb-1">
                            SCHOOL TRANSFER CERTIFICATE (TC)
                          </div>
                        </div>

                        {/* Certificate Student Details Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-xs sm:text-[13px] font-serif leading-relaxed px-2">
                          <div className="flex items-baseline gap-1 border-b border-dotted border-slate-400 pb-1">
                            <span className="text-slate-700 font-medium whitespace-nowrap">Student Name:</span>
                            <span className="font-mono font-black text-slate-950 uppercase px-1">
                              {detailStudent.student_name}
                            </span>
                          </div>

                          <div className="flex items-baseline gap-1 border-b border-dotted border-slate-400 pb-1">
                            <span className="text-slate-700 font-medium whitespace-nowrap">Date of Birth:</span>
                            <span className="font-mono font-bold text-slate-900 px-1">
                              {detailStudent.dob}
                            </span>
                          </div>

                          <div className="flex items-baseline gap-1 border-b border-dotted border-slate-400 pb-1">
                            <span className="text-slate-700 font-medium whitespace-nowrap">Father's Name:</span>
                            <span className="font-mono font-bold text-slate-900 uppercase px-1">
                              {detailStudent.father_name}
                            </span>
                          </div>

                          <div className="flex items-baseline gap-1 border-b border-dotted border-slate-400 pb-1">
                            <span className="text-slate-700 font-medium whitespace-nowrap">Mother's Name:</span>
                            <span className="font-mono font-bold text-slate-900 uppercase px-1">
                              {detailStudent.mother_name}
                            </span>
                          </div>

                          <div className="flex items-baseline gap-1 border-b border-dotted border-slate-400 pb-1">
                            <span className="text-slate-700 font-medium whitespace-nowrap">Class Last Attended:</span>
                            <span className="font-mono font-bold text-slate-900 px-1">
                              {detailStudent.course}
                            </span>
                          </div>

                          <div className="flex items-baseline gap-1 border-b border-dotted border-slate-400 pb-1">
                            <span className="text-slate-700 font-medium whitespace-nowrap">Board Exam Result:</span>
                            <span className="font-mono font-black text-emerald-800 uppercase px-1">
                              {detailStudent.status}
                            </span>
                          </div>

                          <div className="flex items-baseline gap-1 border-b border-dotted border-slate-400 pb-1">
                            <span className="text-slate-700 font-medium whitespace-nowrap">General Conduct:</span>
                            <span className="font-mono font-bold text-slate-900 px-1">
                              GOOD &amp; SATISFACTORY
                            </span>
                          </div>

                          <div className="flex items-baseline gap-1 border-b border-dotted border-slate-400 pb-1">
                            <span className="text-slate-700 font-medium whitespace-nowrap">Reason for Leaving:</span>
                            <span className="font-mono font-bold text-slate-900 px-1">
                              HIGHER STUDIES / COMPLETED COURSE
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Bottom Signatures */}
                      <div className="flex justify-between items-end pt-6 px-2 mt-4 font-serif">
                        <div className="flex items-end gap-5">
                          <div className="space-y-0.5 text-xs text-slate-800 font-semibold">
                            <div>दिल्ली / Delhi</div>
                            <div className="pt-1.5">
                              Date of Issue:{" "}
                              <span className="font-mono font-black text-slate-950 border-b border-dotted border-slate-900 px-2">
                                {detailStudent.result_declaration_date}
                              </span>
                            </div>
                            <div className="pt-3 font-bold text-slate-700">
                              Prepared &amp; Verified By
                            </div>
                          </div>

                          {/* Official Seal */}
                          <div className="w-20 h-20 rounded-full border-2 border-dashed border-[#0028a5]/60 flex flex-col items-center justify-center text-center p-1 opacity-85 select-none bg-blue-50/30">
                            <span className="text-[7px] font-black uppercase text-[#0028a5] tracking-tighter leading-none">
                              BOARD OF HIGHER SECONDARY
                            </span>
                            <span className="text-[8.5px] font-black uppercase text-[#b8860b] my-0.5">
                              ★ SEAL ★
                            </span>
                            <span className="text-[7px] font-black uppercase text-[#0028a5] tracking-tighter leading-none">
                              EDUCATION DELHI
                            </span>
                          </div>
                        </div>

                        {/* Right: Principal / Controller Signature */}
                        <div className="text-center space-y-0.5">
                          <img
                            src="/bhse_controller_signature.png"
                            alt="Principal / Controller Signature"
                            className="h-10 sm:h-12 mx-auto object-contain mb-1"
                          />
                          <div className="font-bold text-xs sm:text-sm text-[#0028a5] leading-tight">
                            (ओमप्रकाश गुप्ता)
                          </div>
                          <div className="border-t border-slate-900 pt-1 mt-1 font-bold text-xs text-slate-900">
                            PRINCIPAL / HEAD OF INSTITUTION
                          </div>
                          <div className="text-[10px] text-slate-600 font-normal">
                            {detailStudent.school_name}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* DOCUMENT VIEW 4: MIGRATION CERTIFICATE */}
              {docTab === "MIGRATION" && (
                <div className="w-full flex justify-center py-2 print:p-0 print:m-0 print:block">
                  <MigrationCertificate student={detailStudent} hideToolbar={true} />
                </div>
              )}

              {/* DOCUMENT VIEW 5: OFFICIAL ACADEMIC TRANSCRIPT */}
              {docTab === "TRANSCRIPT" && (
                <div className="w-full flex justify-center py-2 print:p-0 print:m-0 print:block">
                  <div
                    id="bhse-transcript-document"
                    className="bhse-certificate-document relative w-[794px] min-w-[794px] max-w-[794px] h-[1123px] min-h-[1123px] max-h-[1123px] bg-white text-slate-900 rounded-xs shadow-2xl overflow-hidden print:shadow-none print:m-0 print:w-[210mm] print:h-[290mm] print:max-w-[210mm] print:max-h-[290mm] print:min-h-0 print:rounded-none flex flex-col justify-between select-none p-3.5 sm:p-5"
                    style={{ boxSizing: "border-box" }}
                  >
                    {/* Authentic Continuous Security Micro-Pattern Watermark */}
                    <svg
                      className="bhse-bg-watermark absolute inset-0 w-full h-full pointer-events-none z-0"
                      xmlns="http://www.w3.org/2000/svg"
                      width="100%"
                      height="100%"
                      style={{
                        opacity: 0.85,
                        WebkitPrintColorAdjust: "exact",
                        printColorAdjust: "exact",
                      }}
                    >
                      <defs>
                        <pattern
                          id="bhse-watermark-pattern-trans"
                          width="208"
                          height="9"
                          patternUnits="userSpaceOnUse"
                        >
                          <text
                            x="0"
                            y="7.4"
                            fontFamily="'Arial', 'Helvetica Neue', Helvetica, sans-serif"
                            fontSize="8"
                            fontWeight="700"
                            fill="#9bb2dd"
                            textLength="208"
                            lengthAdjust="spacingAndGlyphs"
                          >
                            BOARD OF HIGHER SECONDARY EDUCATION DELHI&#160;
                          </text>
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#bhse-watermark-pattern-trans)" />
                    </svg>

                    {/* CSS Pattern Fallback for html2canvas */}
                    <div
                      className="bhse-bg-watermark-bg absolute inset-0 pointer-events-none z-0 opacity-80"
                      style={{
                        backgroundImage:
                          'url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjA4IiBoZWlnaHQ9IjkiIHZpZXdCb3g9IjAgMCAyMDggOSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGV4dCB4PSIwIiB5PSI3LjQiIGZvbnQtZmFtaWx5PSInQXJpYWwnLCAnaGVsdmV0aWNhIE5ldWUnLCBIZWx2ZXRpY2EsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iOCIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iIzliYjJkZCIgdGV4dExlbmd0aD0iMjA4IiBsZW5ndGhBZGp1c3Q9InNwYWNpbmdBbmRHbHlwaHMiPkJPQVJEIE9GIEhJR0hFUiBTRUNPTkRBUlkgRURVQ0FUSU9OIERFTEhJJiMxNjA7PC90ZXh0Pjwvc3ZnPg==")',
                        backgroundRepeat: "repeat",
                        backgroundSize: "208px 9px",
                        WebkitPrintColorAdjust: "exact",
                        printColorAdjust: "exact",
                      }}
                    />

                    {/* Large Central Board Emblem Watermark */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden select-none">
                      <img
                        src="/bhse_emblem_blue.png"
                        alt="Watermark"
                        crossOrigin="anonymous"
                        className="w-[480px] h-[430px] object-contain opacity-15 transform translate-y-8"
                      />
                    </div>

                    {/* Outer Dark Blue Border Frame Container */}
                    <div className="relative z-10 w-full h-full border-2 border-[#0028a5] p-4 sm:p-6 flex flex-col justify-between">
                      <div>
                        {/* Top Reference Numbers */}
                        <div className="flex justify-between items-center text-[10px] sm:text-[11px] font-bold text-[#0028a5] mb-1 px-1 font-serif">
                          <div>Government of India (TM-1, No. 1791977)</div>
                          <div>Govt. of Delhi Regd. No. 275 (India)</div>
                        </div>

                        {/* Main Board Heading in Hindi */}
                        <h1 className="text-center font-bold text-[#0028a5] text-[18px] sm:text-[23px] leading-tight font-serif tracking-normal">
                          उच्चतर माध्यमिक शिक्षा परिषद्, दिल्ली
                        </h1>

                        {/* Main Board Heading in English */}
                        <h2 className="text-center font-black text-[#0028a5] text-[17px] sm:text-[21px] leading-tight font-serif tracking-wide uppercase mt-0.5">
                          Board of Higher Secondary Education, Delhi
                        </h2>

                        {/* Central Round Emblem */}
                        <div className="pt-1.5 pb-1 flex justify-center">
                          <img
                            src="/bhse_emblem_blue.png"
                            alt="BHSE Emblem"
                            className="w-14 h-14 object-contain"
                          />
                        </div>

                        {/* Recognition Subtitle */}
                        <div className="text-center text-[10px] sm:text-[11px] font-bold text-[#0028a5] tracking-wide uppercase">
                          AN AUTONOMOUS ORGANISATION UNDER DEPTT. OF SCHOOL EDUCATION &amp; LITERACY
                        </div>

                        {/* Certificate Title Banner */}
                        <div className="text-center mt-3 mb-3">
                          <div className="text-sm font-bold text-slate-900 tracking-wide font-serif">
                            आधिकारिक संचयी शैक्षणिक प्रतिलेख
                          </div>
                          <div className="text-base sm:text-lg font-black text-[#0028a5] tracking-widest font-serif uppercase mt-0.5 border-b-2 border-[#0028a5] inline-block px-5 pb-0.5">
                            OFFICIAL ACADEMIC TRANSCRIPT OF MARKS
                          </div>
                        </div>

                        {/* Transcript Ref & Meta Strip */}
                        <div className="flex justify-between items-center bg-blue-50/70 border border-blue-200 px-3 py-1.5 text-xs font-serif font-semibold text-slate-800 mb-3">
                          <div>
                            Transcript Ref:{" "}
                            <span className="font-mono font-black text-[#0028a5]">
                              BHSE/TRN/{detailStudent.exam_year}/{detailStudent.roll_no}
                            </span>
                          </div>
                          <div>
                            Medium: <span className="font-bold text-slate-900">ENGLISH / HINDI</span>
                          </div>
                          <div>
                            Issue Date:{" "}
                            <span className="font-mono font-bold text-slate-900">
                              {detailStudent.result_declaration_date}
                            </span>
                          </div>
                        </div>

                        {/* Student Bio Details Grid with Photo */}
                        <div className="flex justify-between items-start gap-4 border border-slate-300 p-3 bg-slate-50/60 text-xs font-serif leading-relaxed mb-3">
                          <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 flex-1">
                            <div>
                              <span className="text-slate-600">Candidate Name: </span>
                              <strong className="font-mono font-black text-blue-950 uppercase">
                                {detailStudent.student_name}
                              </strong>
                            </div>
                            <div>
                              <span className="text-slate-600">Roll No: </span>
                              <strong className="font-mono font-bold text-slate-950">
                                {detailStudent.roll_no}
                              </strong>
                            </div>
                            <div>
                              <span className="text-slate-600">Enrollment No: </span>
                              <strong className="font-mono font-bold text-slate-900">
                                {detailStudent.enrollment_no}
                              </strong>
                            </div>
                            <div>
                              <span className="text-slate-600">Date of Birth: </span>
                              <strong className="font-mono font-bold text-slate-900">
                                {detailStudent.dob}
                              </strong>
                            </div>
                            <div>
                              <span className="text-slate-600">Father's Name: </span>
                              <strong className="font-mono font-bold text-slate-900 uppercase">
                                {detailStudent.father_name}
                              </strong>
                            </div>
                            <div>
                              <span className="text-slate-600">Mother's Name: </span>
                              <strong className="font-mono font-bold text-slate-900 uppercase">
                                {detailStudent.mother_name}
                              </strong>
                            </div>
                            <div>
                              <span className="text-slate-600">Course / Class: </span>
                              <strong className="font-mono font-bold text-blue-950 uppercase">
                                {detailStudent.course}
                              </strong>
                            </div>
                            <div>
                              <span className="text-slate-600">Batch / Session: </span>
                              <strong className="font-mono font-bold text-slate-900">
                                {detailStudent.batch || detailStudent.exam_year}
                              </strong>
                            </div>
                            <div className="col-span-2">
                              <span className="text-slate-600">School / Institution: </span>
                              <strong className="font-mono font-bold text-slate-900 uppercase">
                                {detailStudent.school_name}
                              </strong>
                            </div>
                          </div>

                          <div className="border border-slate-800 p-0.5 bg-white shrink-0">
                            <img
                              src={detailStudent.photo_url || "/students/dhirodutta_saha.jpg"}
                              alt={detailStudent.student_name}
                              crossOrigin="anonymous"
                              className="w-20 h-24 object-cover block grayscale contrast-105"
                            />
                          </div>
                        </div>

                        {/* Subject Marks Breakdown Table */}
                        <div className="border border-slate-800 overflow-hidden text-xs font-serif">
                          <table className="w-full text-center border-collapse">
                            <thead>
                              <tr className="bg-[#0028a5] text-white font-bold uppercase text-[10px] tracking-wider">
                                <th className="p-1.5 border-r border-blue-400 w-10">S.No.</th>
                                <th className="p-1.5 border-r border-blue-400 text-left">
                                  Subject Code &amp; Title
                                </th>
                                <th className="p-1.5 border-r border-blue-400 w-14">Max</th>
                                <th className="p-1.5 border-r border-blue-400 w-14">Pass</th>
                                <th className="p-1.5 border-r border-blue-400 w-14">Theory</th>
                                <th className="p-1.5 border-r border-blue-400 w-14">Practical</th>
                                <th className="p-1.5 border-r border-blue-400 w-16">Total</th>
                                <th className="p-1.5 text-left">Marks in Words</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-300">
                              {JSON.parse(detailStudent.subjects_json || "[]").map(
                                (sub: SubjectMarks, i: number) => (
                                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-blue-50/20"}>
                                    <td className="p-1.5 border-r border-slate-300 font-mono font-bold">
                                      {i + 1}
                                    </td>
                                    <td className="p-1.5 border-r border-slate-300 text-left font-bold text-slate-900">
                                      {sub.code || sub.name}
                                    </td>
                                    <td className="p-1.5 border-r border-slate-300 font-mono">
                                      {sub.max_marks || 100}
                                    </td>
                                    <td className="p-1.5 border-r border-slate-300 font-mono">
                                      {sub.pass_marks || 33}
                                    </td>
                                    <td className="p-1.5 border-r border-slate-300 font-mono">
                                      {sub.theory}
                                    </td>
                                    <td className="p-1.5 border-r border-slate-300 font-mono">
                                      {sub.practical}
                                    </td>
                                    <td className="p-1.5 border-r border-slate-300 font-mono font-extrabold text-[#0028a5]">
                                      {sub.total}
                                    </td>
                                    <td className="p-1.5 text-left font-mono font-bold text-slate-700 text-[11px] uppercase">
                                      {sub.words}
                                    </td>
                                  </tr>
                                ),
                              )}
                              <tr className="bg-slate-100 font-bold border-t-2 border-[#0028a5] text-slate-900">
                                <td
                                  colSpan={2}
                                  className="p-1.5 border-r border-slate-400 uppercase text-left pl-3 font-black text-xs"
                                >
                                  CUMULATIVE TOTAL &amp; RESULT
                                </td>
                                <td
                                  colSpan={4}
                                  className="p-1.5 border-r border-slate-400 text-emerald-800 font-black uppercase text-xs"
                                >
                                  {detailStudent.status}
                                </td>
                                <td className="p-1.5 border-r border-slate-400 font-mono text-xs font-black text-[#0028a5]">
                                  {detailStudent.total_marks}/{detailStudent.max_marks}
                                </td>
                                <td className="p-1.5 text-left font-mono font-extrabold text-[11px] uppercase">
                                  {detailStudent.total_words} ({detailStudent.percentage}%)
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Bottom Signatures & Seal */}
                      <div className="flex justify-between items-end pt-4 px-2 font-serif">
                        <div className="flex items-end gap-5">
                          <div className="space-y-0.5 text-xs text-slate-800 font-semibold">
                            <div>दिल्ली / Delhi</div>
                            <div className="pt-1">
                              Date:{" "}
                              <span className="font-mono font-black text-slate-950 border-b border-dotted border-slate-900 px-2">
                                {detailStudent.result_declaration_date}
                              </span>
                            </div>
                            <div className="pt-2 font-bold text-slate-700">
                              Prepared &amp; Verified By
                            </div>
                          </div>

                          {/* Official Board Seal */}
                          <div className="w-16 h-16 rounded-full border-2 border-dashed border-[#0028a5]/60 flex flex-col items-center justify-center text-center p-0.5 opacity-85 select-none bg-blue-50/30">
                            <span className="text-[6px] font-black uppercase text-[#0028a5] tracking-tighter leading-none">
                              BOARD OF HIGHER SECONDARY
                            </span>
                            <span className="text-[7.5px] font-black uppercase text-[#b8860b] my-0.5">
                              ★ SEAL ★
                            </span>
                            <span className="text-[6px] font-black uppercase text-[#0028a5] tracking-tighter leading-none">
                              EDUCATION DELHI
                            </span>
                          </div>
                        </div>

                        {/* Right: Controller of Examinations Signature */}
                        <div className="text-center space-y-0.5">
                          <img
                            src="/bhse_controller_signature.png"
                            alt="Controller Signature"
                            className="h-10 sm:h-12 mx-auto object-contain mb-1"
                          />
                          <div className="font-bold text-xs sm:text-sm text-[#0028a5] leading-tight">
                            (ओमप्रकाश गुप्ता)
                          </div>
                          <div className="border-t border-slate-900 pt-0.5 mt-0.5 font-bold text-xs text-slate-900">
                            परीक्षा नियंत्रक / Controller of Examinations
                          </div>
                          <div className="text-[10px] text-slate-600">
                            Board of Higher Secondary Education, Delhi
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
