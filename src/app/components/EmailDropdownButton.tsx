import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface EmailDropdownButtonProps {
  icon: React.ReactNode;
  bg: string;
  label: string;
  value: string;
}

export const EmailDropdownButton: React.FC<EmailDropdownButtonProps> = ({ icon, bg, label, value }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        className="flex items-center gap-4 w-full p-3.5 rounded-2xl border border-gray-100 hover:border-orange-200 hover:bg-orange-50/30 transition-all group focus:outline-none"
        onClick={() => setOpen((v) => !v)}
      >
        <div className={`w-11 h-11 rounded-2xl ${bg} flex items-center justify-center flex-shrink-0`}>
          {icon}
        </div>
        <div className="flex-1 min-w-0 text-left">
          <p className="text-gray-900 text-sm font-semibold">{label}</p>
          <p className="text-gray-500 text-xs truncate">{value}</p>
        </div>
        <div className="text-gray-300 group-hover:text-orange-400 transition-colors flex-shrink-0">
          <ChevronDown className="w-4 h-4" />
        </div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="absolute left-0 right-0 z-20 mt-2 bg-white border border-gray-100 rounded-xl shadow-lg overflow-hidden"
          >
            <a
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=${value}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block px-5 py-3 text-sm text-gray-700 hover:bg-orange-50 transition-colors"
            >
              Send via Gmail (browser)
            </a>
            <a
              href={`mailto:${value}`}
              className="block px-5 py-3 text-sm text-gray-700 hover:bg-blue-50 transition-colors"
            >
              Send via Email app
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
