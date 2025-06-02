"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CircularQueueVisualization() {
  const [queue, setQueue] = useState<(string | null)[]>(
    new Array(5).fill(null),
  );
  const [front, setFront] = useState(-1);
  const [rear, setRear] = useState(-1);
  const [inputValue, setInputValue] = useState("");

  const enqueue = () => {
    if (inputValue.trim() !== "") {
      if ((rear + 1) % queue.length === front) {
        alert("Queue is full!");
        return;
      }
      if (front === -1) {
        setFront(0);
        setRear(0);
      } else {
        setRear((rear + 1) % queue.length);
      }
      const newQueue = [...queue];
      newQueue[rear] = inputValue.trim();
      setQueue(newQueue);
      setInputValue("");
    }
  };

  const dequeue = () => {
    if (front === -1) {
      alert("Queue is empty!");
      return;
    }
    const newQueue = [...queue];
    newQueue[front] = null;
    if (front === rear) {
      setFront(-1);
      setRear(-1);
    } else {
      setFront((front + 1) % queue.length);
    }
    setQueue(newQueue);
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
          Circular Queue:
        </h3>
        <div className="flex justify-center items-center h-48">
          <AnimatePresence>
            {queue.map((item, index) => (
              <motion.div
                key={index}
                className={`w-16 h-16 flex items-center justify-center rounded-full border-2 m-1 ${
                  item
                    ? "bg-primary text-primary-foreground"
                    : "bg-accent text-accent-foreground"
                } ${index === front ? "border-green-500" : ""} ${index === rear ? "border-red-500" : ""}`}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {item || ""}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <div className="mt-2 text-center text-card-foreground">
          <span className="text-green-500 mr-4">Front: {front}</span>
          <span className="text-red-500">Rear: {rear}</span>
        </div>
      </div>
    </div>
  );
}
