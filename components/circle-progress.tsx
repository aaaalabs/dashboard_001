"use client";

import { motion } from "framer-motion";

interface CircleProgressProps {
  title: string;
  percentage: number;
  color: string;
}

export function CircleProgress({ title, percentage, color }: CircleProgressProps) {
  const circumference = 2 * Math.PI * 40;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center"
    >
      <div className="relative w-32 h-32">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="64"
            cy="64"
            r="40"
            stroke="#E5E7EB"
            strokeWidth="12"
            fill="none"
            strokeLinecap="round"
          />
          <motion.circle
            cx="64"
            cy="64"
            r="40"
            stroke={color}
            strokeWidth="12"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold">{percentage}%</span>
        </div>
      </div>
      <h3 className="mt-4 text-xl font-semibold text-gray-800">{title}</h3>
    </motion.div>
  );
}