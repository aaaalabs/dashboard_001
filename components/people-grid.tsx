"use client";

import { motion } from "framer-motion";

interface PeopleGridProps {
  progress: number;
  colors: Record<string, string>;
}

export function PeopleGrid({ progress, colors }: PeopleGridProps) {
  const getOpacity = (index: number) => {
    const figureRanges = [
      // Phase 1 (0-25%)
      [0, 4.17], [4.17, 8.34], [8.34, 12.5], [12.5, 16.67], [16.67, 20.84], [20.84, 25],
      // Phase 2 (25-50%)
      [25, 29.17], [29.17, 33.34], [33.34, 37.5], [37.5, 41.67], [41.67, 45.84], [45.84, 50],
      // Phase 3 (50-80%)
      [50, 55], [55, 60], [60, 65], [65, 70], [70, 75], [75, 80],
      // Phase 4 (80-100%)
      [80, 84], [84, 88], [88, 92], [92, 96], [96, 98], [98, 100]
    ];

    const range = figureRanges[index];
    return progress >= range[0] ? 1 : 0.2;
  };

  const getColorForIndex = (index: number) => {
    if (index < 6) return colors.yellow;
    if (index < 12) return colors.orange;
    if (index < 18) return colors.purple;
    return colors.blue;
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white p-6 rounded-2xl shadow-lg"
    >
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Data 2</h3>
      <div className="grid grid-cols-6 gap-4">
        {Array.from({ length: 24 }).map((_, index) => (
          <motion.div
            key={index}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.02 }}
          >
            <svg
              viewBox="0 0 29.48 53.82"
              className="w-8 h-8 transition-all duration-300"
              style={{
                color: getColorForIndex(index),
                opacity: getOpacity(index)
              }}
            >
              <path
                d="M14.74,0c-2.72,0-5.14,2.11-5.14,5.14v1.51c0,2.72,2.42,5.14,5.14,5.14s5.14-2.42,5.14-5.14v-1.51c0-3.03-2.42-5.14-5.14-5.14ZM9.6,22.98s-.3-.3-.3,0l-3.63,8.47c-.6,1.21-1.81,2.11-3.33,2.11H.83c-.3,0-.6,0-.6-.3-.3-.3-.3-.6,0-.91l4.54-10.58,1.51-4.23c1.21-2.42,3.63-4.23,6.35-4.23h4.23c2.72,0,5.14,1.82,6.35,4.23l1.51,4.23,4.54,10.58c.3.3.3.6,0,.91,0,.3-.3.3-.6.3h-1.51c-1.52,0-2.72-.91-3.33-2.11l-3.63-8.47c0-.3-.3,0-.3,0l1.52,10.58,1.81,19.35c0,.3-.3.3-.3.6-.3,0-.3.31-.6.31h-1.21c-1.82,0-3.33-1.21-3.33-3.03l-2.72-16.33h-.61l-2.72,16.33c0,1.81-1.51,3.03-3.33,3.03h-1.21c-.3,0-.3-.31-.6-.31,0-.3-.3-.3-.3-.6l1.81-19.35,1.52-10.58Z"
                fill="currentColor"
              />
            </svg>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}