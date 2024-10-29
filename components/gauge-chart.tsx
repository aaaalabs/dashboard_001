"use client";

import { motion } from "framer-motion";

interface GaugeChartProps {
  progress: number;
  colors: Record<string, string>;
}

export function GaugeChart({ progress, colors }: GaugeChartProps) {
  const rotation = -90 + (progress / 100) * 180;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-2xl shadow-lg"
    >
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Data 4</h3>
      <div className="relative h-48">
        <svg className="w-full h-full" viewBox="0 0 200 120">
          <path
            d="M20 100 A80 80 0 0 1 180 100"
            fill="none"
            stroke="#E5E7EB"
            strokeWidth="20"
            strokeLinecap="round"
          />
          <motion.path
            d="M20 100 A80 80 0 0 1 180 100"
            fill="none"
            stroke="url(#gaugeGradient)"
            strokeWidth="20"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: progress / 100 }}
            transition={{ duration: 0.5 }}
          />
          <defs>
            <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={colors.yellow} />
              <stop offset="33%" stopColor={colors.orange} />
              <stop offset="66%" stopColor={colors.purple} />
              <stop offset="100%" stopColor={colors.blue} />
            </linearGradient>
          </defs>
        </svg>
        <motion.div
          className="absolute left-1/2 bottom-0 origin-bottom"
          initial={{ rotate: -90 }}
          animate={{ rotate: rotation }}
          transition={{ duration: 0.5 }}
          style={{ transformOrigin: "bottom center" }}
        >
          <svg className="w-6 h-48 -ml-3" viewBox="0 0 28 127.45">
            <defs>
              <clipPath id="needleClip">
                <path d="M28,113.52c-.04,7.73-6.35,13.97-14.08,13.92C6.19,127.41-.04,121.1,0,113.37L11.81,2.78c0-1,.54-1.92,1.41-2.42.87-.5,1.94-.49,2.8.01.87.5,1.39,1.43,1.39,2.44l10.59,110.71Z"/>
              </clipPath>
            </defs>
            <g clipPath="url(#needleClip)">
              <rect fill={colors.blue} x="-179.92" y="-20.19" width="336" height="168" transform="translate(-30.88 1.73) rotate(-27.57)"/>
            </g>
          </svg>
        </motion.div>
      </div>
    </motion.div>
  );
}