import React, { useState, useEffect } from "react";
import { X, Lock, Mail, ShieldCheck, ArrowRight, RefreshCw, KeyRound } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { dbStore } from "@/lib/db";

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess?: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaCode, setCaptchaCode] = useState("AD98kX");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const generateCaptcha = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789abcdefghijkmnpqrstuvwxyz";
    let code = "";
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(code);
  };

  useEffect(() => {
    if (isOpen) {
      generateCaptcha();
      setCaptchaInput("");
      setError("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter both Email and Password.");
      return;
    }

    if (!captchaInput.trim()) {
      setError("Please enter the Security ReCAPTCHA verification code.");
      return;
    }

    if (captchaInput.trim().toLowerCase() !== captchaCode.toLowerCase()) {
      setError("Security ReCAPTCHA verification failed. Please enter the correct code.");
      generateCaptcha();
      setCaptchaInput("");
      return;
    }

    const isValid = dbStore.validateAdminLogin(email, password);
    if (!isValid) {
      setError("Invalid Admin Email or Password. Please enter correct credentials.");
      generateCaptcha();
      setCaptchaInput("");
      return;
    }

    setError("");
    onClose();
    if (onLoginSuccess) {
      onLoginSuccess();
    } else {
      navigate({ to: "/admin" });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 font-sans">
      <div className="w-full max-w-md overflow-hidden rounded-lg bg-white shadow-2xl border border-gray-200">
        <div className="bg-gradient-to-r from-blue-900 to-indigo-950 px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-amber-400" />
            <h3 className="font-bold text-lg">Admin Control Login</h3>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded font-bold">
                {error}
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                Admin Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. info@bhsed.co.in"
                  className="w-full text-xs pl-9 pr-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-900 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                Admin Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Password"
                  className="w-full text-xs pl-9 pr-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-900 font-mono"
                />
              </div>
            </div>

            {/* Security Captcha Field */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                Security ReCAPTCHA Verification
              </label>
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <KeyRound className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={captchaInput}
                    onChange={(e) => setCaptchaInput(e.target.value)}
                    placeholder="Enter captcha code"
                    className="w-full text-xs pl-9 pr-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-900 font-mono tracking-wider font-bold"
                  />
                </div>
                <div className="flex items-center gap-1.5 bg-slate-900 text-amber-400 px-3 py-1.5 rounded border border-slate-700 select-none">
                  <span className="font-mono font-black text-sm tracking-widest line-through decoration-amber-500/60">
                    {captchaCode}
                  </span>
                  <button
                    type="button"
                    onClick={generateCaptcha}
                    className="p-1 text-slate-400 hover:text-white transition cursor-pointer"
                    title="Refresh Captcha"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-gray-600 hover:text-gray-800 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-900 hover:bg-blue-950 text-white font-bold text-xs uppercase tracking-wider rounded transition flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                Access Dashboard <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
