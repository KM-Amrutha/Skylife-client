import React from "react";
import { ArrowLeft, ChevronRight } from "lucide-react";
import useUserHeader from "../../hooks/sharedHooks/useUserHeader";

interface StepIndicator {
  label: string;
  active: boolean;
}

interface UserHeaderProps {
  onBack?: () => void;
  backLabel?: string;
  steps?: StepIndicator[];
  rightExtra?: React.ReactNode; // for download button in BookedDetail
}

const UserHeader: React.FC<UserHeaderProps> = ({
  onBack,
  backLabel = "Back",
  steps,
  rightExtra,
}) => {
  const {
    userName,
    isDropdownOpen,
    dropdownRef,
    toggleDropdown,
    handleSignOut,
    goToDashboard,
  } = useUserHeader();

  return (
    <header className="flex items-center justify-between px-4 md:px-8 py-4 md:py-5 border-b border-gray-200 bg-white">

      {/* ── Left — back button or empty ── */}
      <div className="w-auto sm:w-32 flex-shrink-0">
        {onBack ? (
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">{backLabel}</span>
          </button>
        ) : (
          <div />
        )}
      </div>

      {/* ── Center — brand + steps ── */}
      <div className="flex flex-col items-center gap-1">
        <div className="flex items-center">
          <img src="/image/gemlogo.png" alt="Skylife" className="h-8 md:h-10" />
          <span className="text-base md:text-lg font-semibold tracking-wide text-gray-900">Skylife</span>
        </div>
        {steps && (
          <div className="hidden md:flex items-center gap-1 text-xs">
            {steps.map((step, i) => (
              <React.Fragment key={step.label}>
                <span
                  className={`font-semibold transition ${
                    step.active
                      ? "text-[#0a3a8a]"
                      : "text-gray-300"
                  }`}
                >
                  {i + 1}. {step.label}
                </span>
                {i < steps.length - 1 && (
                  <ChevronRight className="w-3 h-3 text-gray-300" />
                )}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>

      {/* ── Right — extra + user dropdown ── */}
      <div className="w-auto sm:w-32 flex-shrink-0 flex items-center justify-end gap-3">
        {rightExtra}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={toggleDropdown}
            className="flex items-center gap-2 bg-[#0a3a8a] text-white px-3 md:px-4 py-2 rounded-full font-semibold text-sm hover:bg-[#082c6b] transition-colors"
          >
            <span className="hidden sm:inline">Hi, {userName}</span>
            <svg
              className={`w-4 h-4 transition-transform duration-200 ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden z-50">
              <button
                onClick={goToDashboard}
                className="w-full px-4 py-3 text-left text-gray-900 hover:bg-gray-50 text-sm font-medium transition-colors"
              >
                My Dashboard
              </button>
              <div className="border-t border-gray-100" />
              <button
                onClick={handleSignOut}
                className="w-full px-4 py-3 text-left text-red-500 hover:bg-red-50 text-sm font-medium transition-colors"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default UserHeader;