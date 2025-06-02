"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CallstackVisualizationProps {
  callstack: string[];
}

export default function CallstackVisualization({
  callstack,
}: CallstackVisualizationProps) {
  const [visibleStack, setVisibleStack] = useState<string[]>([]);

  useEffect(() => {
    setVisibleStack(callstack);
  }, [callstack]);

  return (
    <div className="border border-border rounded-lg p-4 bg-card">
      <div className="mb-4 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-card-foreground">
          Call Stack:
        </h3>
      </div>
      <div className="flex flex-col-reverse space-y-2 space-y-reverse">
        <AnimatePresence initial={false}>
          {visibleStack.map((call, index) => (
            <motion.div
              key={`${call}-${index}`}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-primary text-primary-foreground p-2 rounded"
            >
              {call}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
