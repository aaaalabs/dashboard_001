"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LightbulbIcon, Target, Rocket, Search } from "lucide-react";
import confetti from 'canvas-confetti';
import { StepCard } from "@/components/step-card";
import { BarChartSection } from "@/components/bar-chart-section";
import { PeopleGrid } from "@/components/people-grid";
import { CircleProgress } from "@/components/circle-progress";
import { GaugeChart } from "@/components/gauge-chart";
import { Slider } from "@/components/ui/slider";

const COLORS = {
  yellow: "#FFD700",
  orange: "#FF8C00",
  purple: "#8A2BE2",
  blue: "#4169E1",
  gray: "#CBD5E1"
};

export default function Home() {
  const [progress, setProgress] = useState(50);
  const [hasReached100, setHasReached100] = useState(false);

  useEffect(() => {
    if (progress === 100 && !hasReached100) {
      setHasReached100(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } else if (progress < 100) {
      setHasReached100(false);
    }
  }, [progress]);

  const handleStepClick = (targetProgress: number) => {
    setProgress(targetProgress);
  };

  const getStepColor = (threshold: number) => {
    return progress >= threshold ? COLORS[getColorKey(threshold)] : COLORS.gray;
  };

  const getColorKey = (threshold: number): keyof typeof COLORS => {
    if (threshold <= 25) return "yellow";
    if (threshold <= 50) return "orange";
    if (threshold <= 80) return "purple";
    return "blue";
  };

  return (
    <div className="min-h-[100dvh] bg-gradient-to-br from-purple-50 to-pink-50 p-4 sm:p-8 relative overflow-x-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto space-y-6 sm:space-y-8 pb-24"
      >
        <header className="text-center space-y-4">
          <motion.div 
            className="inline-block px-4 sm:px-6 py-2 bg-blue-600 rounded-full text-white text-base sm:text-lg font-medium"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            It&apos;s all about the
          </motion.div>
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-7xl font-bold text-indigo-900"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <motion.span
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Informational
            </motion.span>
            <br />
            <motion.span
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Data Infographic
            </motion.span>
          </motion.h1>
          <motion.p 
            className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Infographic makes it easier for readers to absorb chunks of information. 
            Shortly explain here what will this infographic cover.
          </motion.p>
        </header>

        <section className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <StepCard
            icon={<LightbulbIcon className="w-5 sm:w-6 h-5 sm:h-6" />}
            title="Step 1"
            color={getStepColor(25)}
            delay={0}
            onClick={() => handleStepClick(25)}
            active={progress >= 25}
          />
          <StepCard
            icon={<Target className="w-5 sm:w-6 h-5 sm:h-6" />}
            title="Step 2"
            color={getStepColor(50)}
            delay={0.1}
            onClick={() => handleStepClick(50)}
            active={progress >= 50}
          />
          <StepCard
            icon={<Rocket className="w-5 sm:w-6 h-5 sm:h-6" />}
            title="Step 3"
            color={getStepColor(80)}
            delay={0.2}
            onClick={() => handleStepClick(80)}
            active={progress >= 80}
          />
          <StepCard
            icon={<Search className="w-5 sm:w-6 h-5 sm:h-6" />}
            title="Step 4"
            color={getStepColor(100)}
            delay={0.3}
            onClick={() => handleStepClick(100)}
            active={progress >= 100}
          />
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          <BarChartSection progress={progress} colors={COLORS} />
          <PeopleGrid progress={progress} colors={COLORS} />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
          <CircleProgress title="Phase 1" percentage={Math.floor(Math.min(100, Math.max(0, progress * 4)))} color={COLORS.yellow} />
          <CircleProgress title="Phase 2" percentage={Math.floor(Math.min(100, Math.max(0, (progress - 25) * 4)))} color={COLORS.orange} />
          <CircleProgress title="Phase 3" percentage={Math.floor(Math.min(100, Math.max(0, (progress - 50) * 3.33)))} color={COLORS.purple} />
          <CircleProgress title="Phase 4" percentage={Math.floor(Math.min(100, Math.max(0, (progress - 80) * 5)))} color={COLORS.blue} />
        </div>

        <GaugeChart progress={progress} colors={COLORS} />
      </motion.div>

      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm p-4 sm:p-6 border-t border-gray-200 shadow-lg"
      >
        <div className="max-w-6xl mx-auto">
          <Slider
            value={[progress]}
            onValueChange={(value) => setProgress(value[0])}
            max={100}
            step={1}
            className="w-full h-8 touch-none"
          />
        </div>
      </motion.div>
    </div>
  );
}