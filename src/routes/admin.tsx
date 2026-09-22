import { useState, useEffect } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AdminPanel } from "@/components/AdminPanel";
import { AdminLoginModal } from "@/components/AdminLoginModal";
import { dbStore } from "@/lib/db";
import { ShieldCheck, Lock, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [{ title: "Admin Portal — Board of Higher Secondary Education, Delhi" }],
  }),
  component: AdminPage,
});

function AdminPage() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);

  useEffect(() => {
    const authStatus = dbStore.isAuthenticated();
    setIsAuthenticated(authStatus);
    if (!authStatus) {
      setShowLoginModal(true);
    }
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center p-4 font-sans select-none relative overflow-hidden">
        {/* Background Decorative Glow */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-900/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-xl p-6 sm:p-8 shadow-2xl text-center space-y-6 z-10 animate-fade-in">
          <div className="w-16 h-16 bg-amber-500/20 text-amber-400 rounded-full flex items-center justify-center mx-auto border border-amber-500/30">
            <Lock className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-extrabold text-white font-serif tracking-wide">
              Restricted Admin Access
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Authentication is required to access the Board Master Control Panel. Please log in
              with valid admin credentials.
            </p>
          </div>

          <div className="flex flex-col gap-3 pt-2">
            <button
              onClick={() => setShowLoginModal(true)}
              className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs py-3 rounded-lg uppercase tracking-wider transition cursor-pointer shadow-lg flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" /> Enter Admin Credentials to Unlock
            </button>

            <button
              onClick={() => navigate({ to: "/" })}
              className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs py-2.5 rounded-lg transition cursor-pointer flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" /> Return to Main Portal
            </button>
          </div>
        </div>

        <AdminLoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          onLoginSuccess={() => {
            setIsAuthenticated(true);
            setShowLoginModal(false);
          }}
        />
      </div>
    );
  }

  return (
    <AdminPanel
      onBackToSite={() => {
        dbStore.logout();
        setIsAuthenticated(false);
        navigate({ to: "/" });
      }}
    />
  );
}
