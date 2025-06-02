"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface PriorityQueueItem {
  value: string;
  priority: number;
}

export default function PriorityQueueVisualization() {
  const [queue, setQueue] = useState<PriorityQueueItem[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [inputPriority, setInputPriority] = useState("");

  const enqueue = () => {
    if (inputValue.trim() !== "" && inputPriority.trim() !== "") {
      const newItem: PriorityQueueItem = {
        value: inputValue.trim(),
        priority: Number.parseInt(inputPriority.trim()),
      };
      const newQueue = [...queue, newItem].sort(
        (a, b) => b.priority - a.priority,
      );
      setQueue(newQueue);
      setInputValue("");
      setInputPriority("");
    }
  };

  const dequeue = () => {
    if (queue.length > 0) {
      setQueue(queue.slice(1));
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <Input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter item"
          className="bg-background text-foreground"
        />
        <Input
          type="number"
          value={inputPriority}
          onChange={(e) => setInputPriority(e.target.value)}
          placeholder="Priority"
          className="bg-background text-foreground"
        />
        <Button
          onClick={enqueue}
          className="bg-primary text-primary-foreground"
        >
          Enqueue
        </Button>
        <Button
          onClick={dequeue}
          className="bg-secondary text-secondary-foreground"
        >
          Dequeue
        </Button>
      </div>
      <div className="bg-card p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2 text-card-foreground">
          Priority Queue:
        </h3>
        <div className="flex flex-col items-start space-y-2">
          <AnimatePresence>
            {queue.map((item, index) => (
              <motion.div
                key={index}
                className="flex items-center space-x-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-8 h-8 flex items-center justify-center bg-accent text-accent-foreground rounded-full">
                  {item.priority}
                </div>
                <div className="bg-primary text-primary-foreground px-4 py-2 rounded">
                  {item.value}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
