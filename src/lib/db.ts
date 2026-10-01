import { createClient } from "@libsql/client";

// Turso libSQL client configuration
const TURSO_URL = "libsql://education-saravsingh729.aws-ap-south-1.turso.io";

export interface Announcement {
  id: string;
  text: string;
  category: string;
  date: string;
  is_new: boolean;
}

export interface SubjectMarks {
  sl_no: number;
  code: string;
  name: string;
  max_marks: number;
  pass_marks: number;
  theory: number;
  practical: number;
  total: number;
  words: string;
}

export interface StudentResult {
  serial_no: string;
  roll_no: string;
  school_code: string;
  exam_center: string;
  status_mode: string; // "REGULAR" | "PRIVATE"
  fee_status: string; // "PAID" | "PENDING" | "VERIFIED"
  student_name: string;
  dob: string;
  dob_words: string;
  father_name: string;
  mother_name: string;
  course: string; // "10TH (General)" or "12TH (Senior Secondary)"
  batch: string;
  enrollment_no: string;
  school_name: string;
  photo_url: string;
  exam_year: string;
  total_marks: number;
  max_marks: number;
  total_words: string;
  percentage: string;
  status: string; // "PASS / FIRST DIVISION" | "PASS FIRST DIVISION"
  result_declaration_date: string;
  subjects_json: string;
  is_hidden?: boolean; // Visibility toggle (ON = Visible in public search, OFF = Hidden)
  exam_type?: string; // "ON DEMAND"
  centre_code?: string; // "2100013"
  place?: string; // "SURATGARH(RAJ.)"
  board_name?: string; // "COUNCIL OF OPEN SCHOOL EDUCATION, RAJASTHAN"
  format?: "COSE" | "BHSE";
}

export interface EnrollmentRecord {
  enrollment_no: string;
  student_name: string;
  cert_no: string;
  course: string;
  year: string;
  is_verified: boolean;
  issue_date: string;
}

export interface AdminCredentials {
  email: string;
  password_hash: string;
  role: string;
  last_login?: string;
}

export const DEFAULT_ADMIN_CREDS: AdminCredentials = {
  email: "admin@bhsed.co.in",
  password_hash: "admin123",
  role: "SUPER_ADMIN",
};

// Number to words helpers
export function numberToWords(num: number): string {
  const units = [
    "ZERO",
    "ONE",
    "TWO",
    "THREE",
    "FOUR",
    "FIVE",
    "SIX",
    "SEVEN",
    "EIGHT",
    "NINE",
    "TEN",
    "ELEVEN",
    "TWELVE",
    "THIRTEEN",
    "FOURTEEN",
    "FIFTEEN",
    "SIXTEEN",
    "SEVENTEEN",
    "EIGHTEEN",
    "NINETEEN",
  ];
  const tens = [
    "",
    "",
    "TWENTY",
    "THIRTY",
    "FORTY",
    "FIFTY",
    "SIXTY",
    "SEVENTY",
    "EIGHTY",
    "NINETY",
  ];

  if (num < 20) return units[num] || String(num);
  if (num < 100) {
    const digit = num % 10;
    return tens[Math.floor(num / 10)] + (digit ? " " + units[digit] : "");
  }
  return String(num);
}

export function numberToIndividualDigitWords(num: number): string {
  const digits = String(num).split("");
  const wordsMap: Record<string, string> = {
    "0": "ZERO",
    "1": "ONE",
    "2": "TWO",
    "3": "THREE",
    "4": "FOUR",
    "5": "FIVE",
    "6": "SIX",
    "7": "SEVEN",
    "8": "EIGHT",
    "9": "NINE",
  };
  return digits.map((d) => wordsMap[d] || d).join(" ");
}

const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: "ann_1",
    text: "TO WHOM IT MAY CONCERN BOARD OF HIGHER SECONDARY EDUCATION, DELHI (BHSE) OFFICIAL HELPLINE NOTICE: The Board of Higher Secondary Education, Delhi (BHSE) has issued its official Helpline Number for providing assistance to students, candidates, institutions.",
    category: "Helpline",
    date: "2026-09-22",
    is_new: true,
  },
  {
    id: "ann_2",
    text: "CONTACT & DOCUMENT VERIFICATION Helpline No.: +91-7979777354 Contact Time: 10:30 AM to 6:30 PM Document Verification / Official Email IDs: 1. coe.verification@bhsed.co.in 2. info@bhsed.co.in",
    category: "Verification",
    date: "2026-09-20",
    is_new: true,
  },
  {
    id: "ann_3",
    text: "EXAMINATION DATE SHEET FOR CLASS X AND CLASS XII ANNUAL EXAMINATIONS 2026 PUBLISHED. Candidates can download date sheet from Download Section.",
    category: "Date Sheet",
    date: "2026-09-18",
    is_new: true,
  },
];

const INITIAL_RESULTS: StudentResult[] = [
  {
    serial_no: "401879",
    roll_no: "10203527",
    school_code: "2100013",
    centre_code: "2100013",
    exam_center: "2100013 - SURATGARH",
    status_mode: "ON DEMAND",
    exam_type: "ON DEMAND",
    fee_status: "PAID",
    student_name: "SATISH KUMAR",
    dob: "21/01/1992",
    dob_words: "TWENTY ONE JANUARY ONE THOUSAND NINE HUNDRED NINETY TWO",
    father_name: "BHAGWAN CHANDER",
    mother_name: "BIMLA RANI",
    course: "Secondary School Examination",
    batch: "MAY 2009",
    enrollment_no: "A-08-COSE-221311",
    school_name: "COUNCIL OF OPEN SCHOOL EDUCATION, RAJASTHAN",
    board_name: "COUNCIL OF OPEN SCHOOL EDUCATION, RAJASTHAN",
    place: "SURATGARH(RAJ.)",
    photo_url: "/satish_kumar_hd.png",
    exam_year: "2009",
    total_marks: 379,
    max_marks: 600,
    total_words: "THREE SEVEN NINE",
    percentage: "63.16%",
    status: "PASS FIRST DIVISION",
    result_declaration_date: "15/07/2009",
    format: "COSE",
    subjects_json: JSON.stringify([
      {
        sl_no: 1,
        code: "202",
        name: "English",
        max_marks: 100,
        pass_marks: 33,
        theory: 59,
        practical: 0,
        total: 59,
        words: "FIVE NINE",
      },
      {
        sl_no: 2,
        code: "201",
        name: "Hindi",
        max_marks: 100,
        pass_marks: 33,
        theory: 67,
        practical: 0,
        total: 67,
        words: "SIX SEVEN",
      },
      {
        sl_no: 3,
        code: "206",
        name: "Mathematics",
        max_marks: 100,
        pass_marks: 33,
        theory: 61,
        practical: 0,
        total: 61,
        words: "SIX ONE",
      },
      {
        sl_no: 4,
        code: "208",
        name: "Science",
        max_marks: 100,
        pass_marks: 33,
        theory: 44,
        practical: 20,
        total: 64,
        words: "SIX FOUR",
      },
      {
        sl_no: 5,
        code: "236",
        name: "Physical Education",
        max_marks: 100,
        pass_marks: 33,
        theory: 49,
        practical: 17,
        total: 66,
        words: "SIX SIX",
      },
      {
        sl_no: 6,
        code: "209",
        name: "Social Science",
        max_marks: 100,
        pass_marks: 33,
        theory: 62,
        practical: 0,
        total: 62,
        words: "SIX TWO",
      },
    ]),
  },
  {
    serial_no: "20241832",
    roll_no: "20243664",
    school_code: "105-G",
    exam_center: "105-G NASIK (MS)",
    status_mode: "PRIVATE",
    fee_status: "PAID",
    student_name: "SAMRIDDHI SAHA",
    dob: "21-05-2006",
    dob_words: "TWENTY ONE MAY TWOTHOUSAND SIX",
    father_name: "SRINJOY SAHA",
    mother_name: "SANGHAMITRA MUKHERJEE",
    course: "12TH (Senior Secondary)",
    batch: "SESSION: 2023-24",
    enrollment_no: "20241832",
    school_name: "CENTRE CODE - 105-G NASIK (MS)",
    photo_url: "/students/samriddhi_saha.jpg",
    exam_year: "2024",
    total_marks: 306,
    max_marks: 500,
    total_words: "THREE ZERO SIX",
    percentage: "61.2%",
    status: "PASS / FIRST DIVISION",
    result_declaration_date: "19-06-2024",
    subjects_json: JSON.stringify([
      {
        sl_no: 1,
        code: "HINDI",
        name: "HINDI",
        max_marks: 100,
        pass_marks: 33,
        theory: 66,
        practical: 0,
        total: 66,
        words: "SIXTY SIX",
      },
      {
        sl_no: 2,
        code: "ENGLISH",
        name: "ENGLISH",
        max_marks: 100,
        pass_marks: 33,
        theory: 67,
        practical: 0,
        total: 67,
        words: "SIXTY SEVEN",
      },
      {
        sl_no: 3,
        code: "POLITICAL SCIENCE",
        name: "POLITICAL SCIENCE",
        max_marks: 100,
        pass_marks: 33,
        theory: 58,
        practical: 0,
        total: 58,
        words: "FIFTY EIGHT",
      },
      {
        sl_no: 4,
        code: "HISTORY",
        name: "HISTORY",
        max_marks: 100,
        pass_marks: 33,
        theory: 54,
        practical: 0,
        total: 54,
        words: "FIFTY FOUR",
      },
      {
        sl_no: 5,
        code: "SOCIOLOGY",
        name: "SOCIOLOGY",
        max_marks: 100,
        pass_marks: 33,
        theory: 61,
        practical: 0,
        total: 61,
        words: "SIXTY ONE",
      },
    ]),
  },
  {
    serial_no: "20264034",
    roll_no: "20268068",
    school_code: "105-G",
    exam_center: "105-G NASIK (MS)",
    status_mode: "PRIVATE",
    fee_status: "PAID",
    student_name: "DHIRODUTTA SAHA",
    dob: "14-01-2010",
    dob_words: "FOURTEENTH JANUARY TWO THOUSAND TEN",
    father_name: "SRINJOY SAHA",
    mother_name: "SANGHAMITRA MUKHERJEE",
    course: "10TH (General)",
    batch: "SESSION: 2025-26",
    enrollment_no: "20264034",
    school_name: "CENTRE CODE - 105-G NASIK (MS)",
    photo_url: "/students/dhirodutta_saha.jpg",
    exam_year: "2026",
    total_marks: 473,
    max_marks: 600,
    total_words: "FOUR SEVEN THREE",
    percentage: "78.8%",
    status: "PASS / FIRST DIVISION",
    result_declaration_date: "22-06-2026",
    subjects_json: JSON.stringify([
      {
        sl_no: 1,
        code: "HINDI",
        name: "HINDI",
        max_marks: 100,
        pass_marks: 33,
        theory: 79,
        practical: 0,
        total: 79,
        words: "SEVENTY NINE",
      },
      {
        sl_no: 2,
        code: "ENGLISH",
        name: "ENGLISH",
        max_marks: 100,
        pass_marks: 33,
        theory: 77,
        practical: 0,
        total: 77,
        words: "SEVENTY SEVEN",
      },
      {
        sl_no: 3,
        code: "MATHEMATICS",
        name: "MATHEMATICS",
        max_marks: 100,
        pass_marks: 33,
        theory: 74,
        practical: 0,
        total: 74,
        words: "SEVENTY FOUR",
      },
      {
        sl_no: 4,
        code: "SCIENCE",
        name: "SCIENCE",
        max_marks: 100,
        pass_marks: 33,
        theory: 56,
        practical: 19,
        total: 75,
        words: "SEVENTY FIVE",
      },
      {
        sl_no: 5,
        code: "SOCIAL SCIENCE",
        name: "SOCIAL SCIENCE",
        max_marks: 100,
        pass_marks: 33,
        theory: 76,
        practical: 0,
        total: 76,
        words: "SEVENTY SIX",
      },
      {
        sl_no: 6,
        code: "PHYSICAL EDUCATION",
        name: "PHYSICAL EDUCATION",
        max_marks: 100,
        pass_marks: 33,
        theory: 72,
        practical: 20,
        total: 92,
        words: "NINETY TWO",
      },
    ]),
  },
  {
    serial_no: "20223218",
    roll_no: "20226436",
    school_code: "105-G",
    exam_center: "105-G NASIK (MS)",
    status_mode: "PRIVATE",
    fee_status: "PAID",
    student_name: "SAMRIDDHI SAHA",
    dob: "21-05-2006",
    dob_words: "TWENTY ONE MAY TWO THOUSAND SIX",
    father_name: "SRINJOY SAHA",
    mother_name: "SANGHAMITRA MUKHERJEE",
    course: "10TH (General)",
    batch: "SESSION: 2021-22",
    enrollment_no: "20223218",
    school_name: "CENTRE CODE - 105-G NASIK (MS)",
    photo_url: "/students/samriddhi_saha.jpg",
    exam_year: "2022",
    total_marks: 453,
    max_marks: 600,
    total_words: "FOUR FIVE THREE",
    percentage: "75.5%",
    status: "PASS / FIRST DIVISION",
    result_declaration_date: "22-06-2022",
    subjects_json: JSON.stringify([
      {
        sl_no: 1,
        code: "HINDI",
        name: "HINDI",
        max_marks: 100,
        pass_marks: 33,
        theory: 79,
        practical: 0,
        total: 79,
        words: "SEVENTY NINE",
      },
      {
        sl_no: 2,
        code: "ENGLISH",
        name: "ENGLISH",
        max_marks: 100,
        pass_marks: 33,
        theory: 77,
        practical: 0,
        total: 77,
        words: "SEVENTY SEVEN",
      },
      {
        sl_no: 3,
        code: "MATHEMATICS",
        name: "MATHEMATICS",
        max_marks: 100,
        pass_marks: 33,
        theory: 74,
        practical: 0,
        total: 74,
        words: "SEVENTY FOUR",
      },
      {
        sl_no: 4,
        code: "SCIENCE",
        name: "SCIENCE",
        max_marks: 100,
        pass_marks: 33,
        theory: 56,
        practical: 19,
        total: 75,
        words: "SEVENTY FIVE",
      },
      {
        sl_no: 5,
        code: "SOCIAL SCIENCE",
        name: "SOCIAL SCIENCE",
        max_marks: 100,
        pass_marks: 33,
        theory: 76,
        practical: 0,
        total: 76,
        words: "SEVENTY SIX",
      },
      {
        sl_no: 6,
        code: "DRAWING",
        name: "DRAWING",
        max_marks: 100,
        pass_marks: 33,
        theory: 72,
        practical: 0,
        total: 72,
        words: "SEVENTY TWO",
      },
    ]),
  },
  {
    serial_no: "20262455",
    roll_no: "202648110",
    school_code: "105-G",
    exam_center: "105-G NASIK (MS)",
    status_mode: "PRIVATE",
    fee_status: "PAID",
    student_name: "KRITI SAHA",
    dob: "05-07-2008",
    dob_words: "FIFTH JULY, TWO THOUSAND EIGHT",
    father_name: "SRINJOY SAHA",
    mother_name: "SANGHAMITRA MUKHERJEE",
    course: "12TH (Senior Secondary)",
    batch: "SESSION: 2025-26",
    enrollment_no: "20262455",
    school_name: "CENTRE CODE - 105-G NASIK (MS)",
    photo_url: "/students/kriti_saha.jpg",
    exam_year: "2026",
    total_marks: 317,
    max_marks: 500,
    total_words: "THREE ONE SEVEN",
    percentage: "63.4%",
    status: "PASS / FIRST DIVISION",
    result_declaration_date: "20-06-2026",
    subjects_json: JSON.stringify([
      {
        sl_no: 1,
        code: "HINDI",
        name: "HINDI",
        max_marks: 100,
        pass_marks: 33,
        theory: 63,
        practical: 0,
        total: 63,
        words: "SIXTY THREE",
      },
      {
        sl_no: 2,
        code: "ENGLISH",
        name: "ENGLISH",
        max_marks: 100,
        pass_marks: 33,
        theory: 60,
        practical: 0,
        total: 60,
        words: "SIXTY",
      },
      {
        sl_no: 3,
        code: "SOCIOLOGY",
        name: "SOCIOLOGY",
        max_marks: 100,
        pass_marks: 33,
        theory: 65,
        practical: 0,
        total: 65,
        words: "SIXTY FIVE",
      },
      {
        sl_no: 4,
        code: "HISTORY",
        name: "HISTORY",
        max_marks: 100,
        pass_marks: 33,
        theory: 58,
        practical: 0,
        total: 58,
        words: "FIFTY EIGHT",
      },
      {
        sl_no: 5,
        code: "POL. SCIENCE",
        name: "POL. SCIENCE",
        max_marks: 100,
        pass_marks: 33,
        theory: 71,
        practical: 0,
        total: 71,
        words: "SEVENTY ONE",
      },
    ]),
  },
  {
    serial_no: "20242307",
    roll_no: "20244614",
    school_code: "105-G",
    exam_center: "105-G NASIK (MS)",
    status_mode: "PRIVATE",
    fee_status: "PAID",
    student_name: "KRITI SAHA",
    dob: "05-07-2008",
    dob_words: "FIFTH JULY, TWO THOUSAND EIGHT",
    father_name: "SRINJOY SAHA",
    mother_name: "SANGHAMITRA MUKHERJEE",
    course: "10TH (General)",
    batch: "SESSION: 2023-24",
    enrollment_no: "20242307",
    school_name: "CENTRE CODE - 105-G NASIK (MS)",
    photo_url: "/students/kriti_saha.jpg",
    exam_year: "2024",
    total_marks: 382,
    max_marks: 600,
    total_words: "THREE EIGHT TWO",
    percentage: "63.7%",
    status: "PASS / FIRST DIVISION",
    result_declaration_date: "19-06-2024",
    subjects_json: JSON.stringify([
      {
        sl_no: 1,
        code: "HINDI",
        name: "HINDI",
        max_marks: 100,
        pass_marks: 33,
        theory: 68,
        practical: 0,
        total: 68,
        words: "SIXTY EIGHT",
      },
      {
        sl_no: 2,
        code: "ENGLISH",
        name: "ENGLISH",
        max_marks: 100,
        pass_marks: 33,
        theory: 66,
        practical: 0,
        total: 66,
        words: "SIXTY SIX",
      },
      {
        sl_no: 3,
        code: "MATHEMATICS",
        name: "MATHEMATICS",
        max_marks: 100,
        pass_marks: 33,
        theory: 69,
        practical: 0,
        total: 69,
        words: "SIXTY NINE",
      },
      {
        sl_no: 4,
        code: "SCIENCE",
        name: "SCIENCE",
        max_marks: 100,
        pass_marks: 33,
        theory: 35,
        practical: 17,
        total: 52,
        words: "FIFTY TWO",
      },
      {
        sl_no: 5,
        code: "SOCIAL SCIENCE",
        name: "SOCIAL SCIENCE",
        max_marks: 100,
        pass_marks: 33,
        theory: 52,
        practical: 0,
        total: 52,
        words: "FIFTY TWO",
      },
      {
        sl_no: 6,
        code: "PAINTING",
        name: "PAINTING",
        max_marks: 100,
        pass_marks: 33,
        theory: 55,
        practical: 20,
        total: 75,
        words: "SEVENTY FIVE",
      },
    ]),
  },
];

const INITIAL_ENROLLMENTS: EnrollmentRecord[] = [
  {
    enrollment_no: "A-08-COSE-221311",
    student_name: "SATISH KUMAR",
    cert_no: "COSE/VER/2009/10203527",
    course: "SECONDARY SCHOOL EXAMINATION",
    year: "2009",
    is_verified: true,
    issue_date: "2009-07-15",
  },
  {
    enrollment_no: "20241832",
    student_name: "SAMRIDDHI SAHA",
    cert_no: "BHSE/VER/2024/20243664",
    course: "CLASS XII",
    year: "2024",
    is_verified: true,
    issue_date: "2024-06-19",
  },
  {
    enrollment_no: "20264034",
    student_name: "DHIRODUTTA SAHA",
    cert_no: "BHSE/VER/2026/20268068",
    course: "CLASS X",
    year: "2026",
    is_verified: true,
    issue_date: "2026-06-22",
  },
  {
    enrollment_no: "20223218",
    student_name: "SAMRIDDHI SAHA",
    cert_no: "BHSE/VER/2022/20226436",
    course: "CLASS X",
    year: "2022",
    is_verified: true,
    issue_date: "2022-06-22",
  },
  {
    enrollment_no: "20262455",
    student_name: "KRITI SAHA",
    cert_no: "BHSE/VER/2026/202648110",
    course: "CLASS XII",
    year: "2026",
    is_verified: true,
    issue_date: "2026-06-20",
  },
  {
    enrollment_no: "20242307",
    student_name: "KRITI SAHA",
    cert_no: "BHSE/VER/2024/20244614",
    course: "CLASS X",
    year: "2024",
    is_verified: true,
    issue_date: "2024-06-19",
  },
];

type StoreListener = () => void;

class LocalStore {
  private announcements: Announcement[] = INITIAL_ANNOUNCEMENTS;
  private results: StudentResult[] = INITIAL_RESULTS;
  private enrollments: EnrollmentRecord[] = INITIAL_ENROLLMENTS;
  private adminCreds: AdminCredentials = DEFAULT_ADMIN_CREDS;
  private isLoggedIn: boolean = false;
  private listeners: Set<StoreListener> = new Set();

  constructor() {
    if (typeof window !== "undefined") {
      const savedAnn = localStorage.getItem("bhse_announcements");
      if (savedAnn) {
        try {
          this.announcements = JSON.parse(savedAnn);
        } catch (e) {
          console.warn("Failed to parse saved announcements:", e);
        }
      }
      const savedRes = localStorage.getItem("bhse_results_v5");
      if (savedRes) {
        try {
          const parsed: StudentResult[] = JSON.parse(savedRes);
          // Ensure any missing initial results (like Satish Kumar) are present
          const existingRolls = new Set(parsed.map((r) => r.roll_no.toLowerCase()));
          INITIAL_RESULTS.forEach((initR) => {
            if (!existingRolls.has(initR.roll_no.toLowerCase())) {
              parsed.unshift(initR);
            }
          });
          this.results = parsed;
        } catch (e) {
          console.warn("Failed to parse saved results:", e);
        }
      } else {
        localStorage.removeItem("bhse_results");
        localStorage.removeItem("bhse_results_v2");
        localStorage.removeItem("bhse_results_v3");
        localStorage.removeItem("bhse_results_v4");
        this.save();
      }
      const savedEnr = localStorage.getItem("bhse_enrollments_v5");
      if (savedEnr) {
        try {
          const parsedEnr: EnrollmentRecord[] = JSON.parse(savedEnr);
          const existingEnrs = new Set(parsedEnr.map((e) => e.enrollment_no.toLowerCase()));
          INITIAL_ENROLLMENTS.forEach((initE) => {
            if (!existingEnrs.has(initE.enrollment_no.toLowerCase())) {
              parsedEnr.unshift(initE);
            }
          });
          this.enrollments = parsedEnr;
        } catch (e) {
          console.warn("Failed to parse saved enrollments:", e);
        }
      } else {
        localStorage.removeItem("bhse_enrollments");
        localStorage.removeItem("bhse_enrollments_v2");
        localStorage.removeItem("bhse_enrollments_v3");
        localStorage.removeItem("bhse_enrollments_v4");
        this.save();
      }
      const savedAdmin = localStorage.getItem("bhse_admin_creds");
      if (savedAdmin) {
        try {
          this.adminCreds = JSON.parse(savedAdmin);
        } catch (e) {
          console.warn("Failed to parse saved admin credentials:", e);
        }
      }
      const savedAuth = sessionStorage.getItem("bhse_admin_auth");
      if (savedAuth === "true") {
        this.isLoggedIn = true;
      }

      window.addEventListener("storage", () => {
        this.reloadFromStorage();
        this.notify();
      });
    }
  }

  subscribe(listener: StoreListener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach((listener) => listener());
  }

  private reloadFromStorage() {
    if (typeof window === "undefined") return;
    try {
      const savedAnn = localStorage.getItem("bhse_announcements");
      if (savedAnn) this.announcements = JSON.parse(savedAnn);
      const savedRes = localStorage.getItem("bhse_results_v5");
      if (savedRes) this.results = JSON.parse(savedRes);
      const savedEnr = localStorage.getItem("bhse_enrollments_v5");
      if (savedEnr) this.enrollments = JSON.parse(savedEnr);
    } catch (e) {
      console.warn("Error reloading storage:", e);
    }
  }

  private save() {
    if (typeof window !== "undefined") {
      localStorage.setItem("bhse_announcements", JSON.stringify(this.announcements));
      localStorage.setItem("bhse_results_v5", JSON.stringify(this.results));
      localStorage.setItem("bhse_enrollments_v5", JSON.stringify(this.enrollments));
      localStorage.setItem("bhse_admin_creds", JSON.stringify(this.adminCreds));
    }
    this.notify();
  }

  getAdminCredentials(): AdminCredentials {
    return this.adminCreds;
  }

  validateAdminLogin(email: string, pass: string): boolean {
    const cleanEmail = email.trim().toLowerCase();
    const targetEmail = this.adminCreds.email.trim().toLowerCase();
    const isAllowedEmail =
      cleanEmail === targetEmail ||
      cleanEmail === "admin@bhsenewdelhi.net" ||
      cleanEmail === "admin@bhsed.co.in" ||
      cleanEmail === "info@bhsed.co.in";
    if (isAllowedEmail && pass === this.adminCreds.password_hash) {
      this.isLoggedIn = true;
      if (typeof window !== "undefined") {
        sessionStorage.setItem("bhse_admin_auth", "true");
      }
      return true;
    }
    return false;
  }

  isAuthenticated(): boolean {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("bhse_admin_auth") === "true" || this.isLoggedIn;
    }
    return this.isLoggedIn;
  }

  setAuthenticated(status: boolean) {
    this.isLoggedIn = status;
    if (typeof window !== "undefined") {
      if (status) {
        sessionStorage.setItem("bhse_admin_auth", "true");
      } else {
        sessionStorage.removeItem("bhse_admin_auth");
      }
    }
  }

  logout() {
    this.isLoggedIn = false;
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("bhse_admin_auth");
    }
  }

  getAnnouncements(): Announcement[] {
    return this.announcements;
  }

  addAnnouncement(ann: Omit<Announcement, "id" | "date">): Announcement {
    const newAnn: Announcement = {
      ...ann,
      id: "ann_" + Date.now(),
      date: new Date().toISOString().slice(0, 10),
    };
    this.announcements.unshift(newAnn);
    this.save();
    return newAnn;
  }

  deleteAnnouncement(id: string) {
    this.announcements = this.announcements.filter((a) => a.id !== id);
    this.save();
  }

  getResults(): StudentResult[] {
    return this.results;
  }

  getResultByRoll(rollNo: string): StudentResult | undefined {
    const found = this.results.find(
      (r) => r.roll_no.trim().toUpperCase() === rollNo.trim().toUpperCase(),
    );
    if (found && found.is_hidden) {
      return undefined; // Hidden from public search
    }
    return found;
  }

  getResultByRollAdmin(rollNo: string): StudentResult | undefined {
    return this.results.find((r) => r.roll_no.trim().toUpperCase() === rollNo.trim().toUpperCase());
  }

  toggleStudentVisibility(rollNo: string): boolean {
    const student = this.results.find(
      (r) => r.roll_no.trim().toUpperCase() === rollNo.trim().toUpperCase(),
    );
    if (student) {
      student.is_hidden = !student.is_hidden;
      this.save();
      return !!student.is_hidden;
    }
    return false;
  }

  saveResult(res: StudentResult): StudentResult {
    const idx = this.results.findIndex(
      (r) => r.roll_no.trim().toUpperCase() === res.roll_no.trim().toUpperCase(),
    );
    if (idx >= 0) {
      this.results[idx] = res;
    } else {
      this.results.unshift(res);
    }
    this.save();
    return res;
  }

  deleteResult(rollNo: string) {
    this.results = this.results.filter(
      (r) => r.roll_no.trim().toUpperCase() !== rollNo.trim().toUpperCase(),
    );
    this.save();
  }

  getEnrollments(): EnrollmentRecord[] {
    return this.enrollments;
  }

  getEnrollmentByCertOrNo(term: string): EnrollmentRecord | undefined {
    const cleanTerm = term.trim().toUpperCase();
    return this.enrollments.find(
      (e) =>
        e.cert_no.toUpperCase() === cleanTerm ||
        e.enrollment_no.toUpperCase() === cleanTerm ||
        e.student_name.toUpperCase().includes(cleanTerm),
    );
  }

  saveEnrollment(enr: EnrollmentRecord): EnrollmentRecord {
    const idx = this.enrollments.findIndex(
      (e) => e.enrollment_no.toUpperCase() === enr.enrollment_no.toUpperCase(),
    );
    if (idx >= 0) {
      this.enrollments[idx] = enr;
    } else {
      this.enrollments.unshift(enr);
    }
    this.save();
    return enr;
  }

  deleteEnrollment(enrNo: string) {
    this.enrollments = this.enrollments.filter(
      (e) => e.enrollment_no.toUpperCase() !== enrNo.toUpperCase(),
    );
    this.save();
  }
}

export const dbStore = new LocalStore();

export function getTursoClient() {
  try {
    return createClient({ url: TURSO_URL });
  } catch (err) {
    console.warn("Turso libSQL client initialization warning:", err);
    return null;
  }
}
