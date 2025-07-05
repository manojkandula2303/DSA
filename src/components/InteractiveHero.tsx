import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const HERO_TEXT = "DSA";

// Number of grid columns
const GRID_COLUMNS = 12;
const MAX_COMETS = 3;

// Comet as a vertical glowing line
const Comet: React.FC<{
  x: number;
  delay: number;
  sectionHeight: number;
}> = ({ x, delay, sectionHeight }) => {
  const travelLength = sectionHeight * 0.6;
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: x, top: 0, width: 1, height: sectionHeight, zIndex: 0 }}
      initial={{ opacity: 0.5, y: -40 }}
      animate={{
        y: travelLength + 40,
        opacity: 0,
      }}
      transition={{
        duration: 7,
        delay: delay,
        ease: "easeIn",
        repeat: Infinity,
        repeatDelay: 4,
      }}
    >
      <div
        style={{
          width: 1,
          height: 60,
          background: 'linear-gradient(180deg, #3b82f6 60%, rgba(59,130,246,0.03) 100%)',
          boxShadow: '0 0 2px 0 #3b82f6',
          borderRadius: 0.5,
          margin: '0 auto',
        }}
      />
    </motion.div>
  );
};

const InteractiveHero: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });

  useEffect(() => {
    if (svgRef.current && cursor.x !== null && cursor.y !== null) {
      const svgRect = svgRef.current.getBoundingClientRect();
      const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100;
      const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100;
      setMaskPosition({
        cx: `${cxPercentage}%`,
        cy: `${cyPercentage}%`,
      });
    }
  }, [cursor]);

  return (
    <div ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center text-center bg-hero-grid overflow-hidden">
      {/* Minimal animated background */}
      <div className="absolute inset-0 -z-10 pointer-events-none animate-hero-gradient bg-gradient-to-br from-blue-900 via-purple-900 to-blue-900 opacity-30 blur-3xl" />
      
      <div className="flex flex-col items-center justify-center w-full h-full min-h-screen space-y-8">
        {/* Main Title */}
        <div className="flex items-center justify-center">
          <svg
            ref={svgRef}
            width="600"
            height="200"
            viewBox="0 0 300 100"
            xmlns="http://www.w3.org/2000/svg"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
            className="select-none"
          >
            <defs>
              <linearGradient
                id="textGradient"
                gradientUnits="userSpaceOnUse"
                cx="50%"
                cy="50%"
                r="25%"
              >
                {hovered && (
                  <>
                    <stop offset="0%" stopColor="#eab308" />
                    <stop offset="25%" stopColor="#ef4444" />
                    <stop offset="50%" stopColor="#3b82f6" />
                    <stop offset="75%" stopColor="#06b6d4" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </>
                )}
              </linearGradient>

              <motion.radialGradient
                id="revealMask"
                gradientUnits="userSpaceOnUse"
                r="60%"
                initial={{ cx: "50%", cy: "50%" }}
                animate={maskPosition}
                transition={{ duration: 0, ease: "easeOut" }}
              >
                <stop offset="0%" stopColor="white" />
                <stop offset="100%" stopColor="black" />
              </motion.radialGradient>
              <mask id="textMask">
                <rect
                  x="0"
                  y="0"
                  width="100%"
                  height="100%"
                  fill="url(#revealMask)"
                />
              </mask>
            </defs>
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              strokeWidth="0.3"
              className="fill-transparent stroke-neutral-200 font-[helvetica] text-7xl font-bold dark:stroke-neutral-800"
              style={{ opacity: hovered ? 0.7 : 0 }}
            >
              {HERO_TEXT}
            </text>
            <motion.text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              strokeWidth="0.3"
              className="fill-transparent stroke-neutral-200 font-[helvetica] text-7xl font-bold dark:stroke-neutral-800"
              initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
              animate={{
                strokeDashoffset: 0,
                strokeDasharray: 1000,
              }}
              transition={{
                duration: 4,
                ease: "easeInOut",
              }}
            >
              {HERO_TEXT}
            </motion.text>
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              stroke="url(#textGradient)"
              strokeWidth="0.3"
              mask="url(#textMask)"
              className="fill-transparent font-[helvetica] text-7xl font-bold"
            >
              {HERO_TEXT}
            </text>
          </svg>
        </div>

        {/* Subtitle */}
        <div className="text-center space-y-4">
          <motion.h2 
            className="text-2xl md:text-3xl font-semibold text-gray-200 dark:text-gray-300 cursor-default"
            whileHover={{ 
              y: -2,
              opacity: 0.9
            }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            Master Data Structures & Algorithms
          </motion.h2>
          <motion.p 
            className="text-lg md:text-xl text-gray-300 dark:text-gray-400 max-w-2xl mx-auto px-4 cursor-default"
            whileHover={{ 
              y: -1,
              opacity: 0.8
            }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            Interactive learning platform with practice problems, progress tracking, and comprehensive solutions
          </motion.p>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 mt-8">
          <motion.div 
            className="text-center cursor-default"
            whileHover={{ 
              y: -3,
              opacity: 0.8
            }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <div className="text-3xl md:text-4xl font-bold text-blue-400 dark:text-blue-300">150+</div>
            <div className="text-sm md:text-base text-gray-300 dark:text-gray-400">Practice Problems</div>
          </motion.div>
          <motion.div 
            className="text-center cursor-default"
            whileHover={{ 
              y: -3,
              opacity: 0.8
            }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <div className="text-3xl md:text-4xl font-bold text-green-400 dark:text-green-300">50+</div>
            <div className="text-sm md:text-base text-gray-300 dark:text-gray-400">Topics Covered</div>
          </motion.div>
          <motion.div 
            className="text-center cursor-default"
            whileHover={{ 
              y: -3,
              opacity: 0.8
            }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <div className="text-3xl md:text-4xl font-bold text-purple-400 dark:text-purple-300">24/7</div>
            <div className="text-sm md:text-base text-gray-300 dark:text-gray-400">Learning Access</div>
          </motion.div>
        </div>

        {/* Call to Action */}
        <div className="mt-8 space-y-4">
          <motion.button 
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg"
            whileHover={{ 
              y: -2,
              opacity: 0.9
            }}
            whileTap={{ y: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={() => {
              const el = document.getElementById('main-content');
              if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Start Learning
          </motion.button>
          <motion.p 
            className="text-sm text-gray-400 dark:text-gray-500 cursor-default"
            whileHover={{ 
              y: -1,
              opacity: 0.7
            }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            Hover over "DSA" to see the magic! ✨
          </motion.p>
        </div>
      </div>
    </div>
  );
};

export default InteractiveHero;