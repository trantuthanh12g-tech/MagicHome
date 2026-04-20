import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, ChevronDown } from "lucide-react";

const EMAIL = "Magichome.editing@gmail.com";

export const EmailDropdownBubble: React.FC = () => {
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
        className="flex items-center gap-2.5 px-4 py-2.5 bg-white rounded-2xl shadow-xl border border-gray-100 text-sm whitespace-nowrap hover:shadow-2xl transition-shadow cursor-pointer w-full focus:outline-none"
        onClick={() => setOpen((v) => !v)}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <div className="w-7 h-7 rounded-full bg-amber-50 flex items-center justify-center flex-shrink-0">
          <Mail className="w-4 h-4 text-amber-500" />
        </div>
        <div className="flex-1 min-w-0 text-left">
          <p className="font-semibold text-gray-800 text-xs leading-tight">Email</p>
          <p className="text-gray-400 text-xs leading-tight">{EMAIL}</p>
        </div>
        <div className="text-gray-300 flex-shrink-0">
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
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block px-5 py-3 text-sm text-gray-700 hover:bg-orange-50 transition-colors"
            >
              Send via Gmail (browser)
            </a>
            <a
              href={`mailto:${EMAIL}`}
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