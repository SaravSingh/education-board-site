import React, { useState } from "react";
import { X, ShieldCheck, Mail, CheckCircle2, AlertCircle } from "lucide-react";
import { dbStore, EnrollmentRecord } from "@/lib/db";

interface VerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VerificationModal: React.FC<VerificationModalProps> = ({ isOpen, onClose }) => {
  const [certNo, setCertNo] = useState("");
  const [candidateName, setCandidateName] = useState("");
  const [record, setRecord] = useState<EnrollmentRecord | null>(null);
  const [searched, setSearched] = useState(false);
  const [notFound, setNotFound] = useState(false);

  if (!isOpen) return null;

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certNo.trim()) return;

    setSearched(true);
    const found = dbStore.getEnrollmentByCertOrNo(certNo.trim());

    if (found) {
      setNotFound(false);
      setRecord(found);
    } else {
      setNotFound(true);
      setRecord(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="w-full max-w-lg overflow-hidden rounded-lg bg-white shadow-2xl border border-gray-200">
        <div className="bg-gradient-to-r from-emerald-800 to-teal-900 px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-emerald-300" />
            <h3 className="font-bold text-lg">Document Verification Portal</h3>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-xs text-emerald-900 mb-4 flex items-start gap-2">
            <Mail className="w-4 h-4 shrink-0 text-emerald-700 mt-0.5" />
            <div>
              <strong>Official Verification Email:</strong> coe.verification@bhsed.co.in
            </div>
          </div>

          {searched && notFound && (
            <div className="p-4 bg-amber-50 border border-amber-200 text-amber-900 text-xs rounded-lg flex items-center gap-2 mb-4">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
              <div>
                <strong>No Enrollment Record Found for '{certNo}'</strong>. Please check the
                Certificate ID / Enrollment No.
              </div>
            </div>
          )}

          {searched && !notFound && record ? (
            <div className="text-center py-4 bg-emerald-50/50 rounded-lg border border-emerald-200 p-4">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-2" />
              <h4 className="font-bold text-base text-gray-800">Genuine Document Verified</h4>
              <p className="text-xs text-gray-600 mt-1">
                Certificate ID{" "}
                <span className="font-mono font-bold text-emerald-800">{record.cert_no}</span> is
                authentic &amp; verified under Deptt. of School Education record registry.
              </p>
              <div className="mt-4 text-left text-xs bg-white p-3 rounded border border-gray-200 space-y-1">
                <div>
                  <strong>Candidate Name:</strong> {record.student_name}
                </div>
                <div>
                  <strong>Enrollment No:</strong> {record.enrollment_no}
                </div>
                <div>
                  <strong>Course Level:</strong> {record.course} ({record.year})
                </div>
                <div>
                  <strong>Status:</strong> VERIFIED &amp; VALID
                </div>
                <div>
                  <strong>Issue Body:</strong> Board of Higher Secondary Education, Delhi (Regd No.
                  275)
                </div>
              </div>
              <button
                onClick={() => setSearched(false)}
                className="mt-4 px-4 py-2 bg-emerald-800 text-white font-bold text-xs rounded cursor-pointer"
              >
                Verify Another Document
              </button>
            </div>
          ) : (
            <form onSubmit={handleVerify} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Certificate / Registration / Enrollment Number
                </label>
                <input
                  type="text"
                  required
                  value={certNo}
                  onChange={(e) => setCertNo(e.target.value)}
                  placeholder="e.g. BHSE/VER/2026/94820 or BHSE/2026/102983"
                  className="w-full text-sm border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-emerald-800 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Candidate Name (Optional)
                </label>
                <input
                  type="text"
                  value={candidateName}
                  onChange={(e) => setCandidateName(e.target.value)}
                  placeholder="Full name as printed on certificate"
                  className="w-full text-sm border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-emerald-800"
                />
              </div>

              <div className="text-[11px] text-gray-500 font-mono">
                Sample Record:{" "}
                <span
                  className="font-bold text-emerald-800 cursor-pointer"
                  onClick={() => setCertNo("BHSE/VER/2026/94820")}
                >
                  BHSE/VER/2026/94820
                </span>
              </div>

              <div className="pt-2 flex justify-between items-center">
                <button
                  type="button"
                  onClick={onClose}
                  className="text-xs text-gray-600 hover:text-gray-800 font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs uppercase tracking-wider rounded transition cursor-pointer"
                >
                  Verify Authenticity
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
