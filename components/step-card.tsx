"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface StepCardProps {
  icon: ReactNode;
  title: string;
  color: string;
  delay: number;
  onClick: () => void;
  active: boolean;
}

export function StepCard({ icon, title, color, delay, onClick, active }: StepCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg cursor-pointer transition-all duration-300 hover:shadow-xl"
      onClick={onClick}
    >
      <div className="flex flex-col items-center space-y-3 sm:space-y-4">
        <motion.div 
          className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center rounded-2xl text-white transition-colors duration-300"
          style={{ 
            backgroundColor: color,
            clipPath: "polygon(0% 0%, 100% 0%, 85% 100%, 0% 100%)"
          }}
          whileHover={{ rotate: 5 }}
          animate={active ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 0.3 }}
        >
          {icon}
        </motion.div>
        <motion.h3 
          className="text-lg sm:text-xl font-semibold text-center"
          animate={{ color: active ? '#1F2937' : '#9CA3AF' }}
          transition={{ duration: 0.3 }}
        >
          {title}
        </motion.h3>
      </div>
    </motion.div>
  );
}