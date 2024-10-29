"use client";

import { motion } from "framer-motion";

interface BarChartSectionProps {
  progress: number;
  colors: Record<string, string>;
}

export function BarChartSection({ progress, colors }: BarChartSectionProps) {
  const getBarWidth = (min: number, max: number) => {
    if (progress < min) return 0;
    if (progress > max) return 100;
    return ((progress - min) / (max - min)) * 100;
  };

  const bars = [
    { name: "Item 1", width: getBarWidth(0, 25), color: colors.yellow },
    { name: "Item 2", width: getBarWidth(25, 50), color: colors.orange },
    { name: "Item 3", width: getBarWidth(50, 75), color: colors.purple },
    { name: "Item 4", width: getBarWidth(75, 100), color: colors.blue },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white p-6 rounded-2xl shadow-lg"
    >
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Data 1</h3>
      <div className="space-y-4">
        {bars.map((bar, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>{bar.name}</span>
              <span>{Math.round(bar.width)}%</span>
            </div>
            <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: bar.color }}
                initial={{ width: 0 }}
                animate={{ width: `${bar.width}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}