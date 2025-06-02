"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Cpu, BrainCircuit } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};

const floatingAnimation = {
  y: ["0%", "5%", "0%"],
  transition: {
    duration: 5,
    repeat: Number.POSITIVE_INFINITY,
    ease: "easeInOut",
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 text-gray-800 dark:text-white overflow-hidden">
      <div className="container mx-auto px-4 py-16 relative">
        <motion.div
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-400 dark:bg-blue-500 rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 3 + Math.random() * 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>

        <motion.h1
          className="text-6xl font-extrabold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-500"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
        >
          Master Data Structures
          <br />
          <span className="text-4xl font-bold">with Interactive Learning</span>
        </motion.h1>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/queues"
              className="block p-8 bg-blue-500 dark:bg-blue-600 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2"
            >
              <motion.div animate={floatingAnimation} className="mb-4">
                <Cpu className="w-16 h-16 text-white" />
              </motion.div>
              <h2 className="text-3xl font-bold mb-4 text-white">
                Queues Mastery
              </h2>
              <p className="text-blue-100 dark:text-blue-200 text-lg">
                Dive into the world of queues with mind-bending visualizations
                and challenges.
              </p>
            </Link>
          </motion.div>
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/recursion"
              className="block p-8 bg-purple-500 dark:bg-purple-600 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2"
            >
              <motion.div animate={floatingAnimation} className="mb-4">
                <BrainCircuit className="w-16 h-16 text-white" />
              </motion.div>
              <h2 className="text-3xl font-bold mb-4 text-white">
                Recursion Wizardry
              </h2>
              <p className="text-purple-100 dark:text-purple-200 text-lg">
                Unravel the mysteries of recursion with captivating step-by-step
                visualizations.
              </p>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
