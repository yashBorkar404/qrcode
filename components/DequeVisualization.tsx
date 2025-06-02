"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function DequeVisualization() {
  const [deque, setDeque] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  const addFront = () => {
    if (inputValue.trim() !== "") {
      setDeque([inputValue.trim(), ...deque]);
      setInputValue("");
    }
  };

  const addRear = () => {
    if (inputValue.trim() !== "") {
      setDeque([...deque, inputValue.trim()]);
      setInputValue("");
    }
  };

  const removeFront = () => {
    if (deque.length > 0) {
      setDeque(deque.slice(1));
    }
  };

  const removeRear = () => {
    if (deque.length > 0) {
      setDeque(deque.slice(0, -1));
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
        <Button
          onClick={addFront}
          className="bg-primary text-primary-foreground"
        >
          Add Front
        </Button>
        <Button
          onClick={addRear}
          className="bg-secondary text-secondary-foreground"
        >
          Add Rear
        </Button>
        <Button
          onClick={removeFront}
          className="bg-accent text-accent-foreground"
        >
          Remove Front
        </Button>
        <Button
          onClick={removeRear}
          className="bg-primary text-primary-foreground"
        >
          Remove Rear
        </Button>
      </div>
      <div className="bg-card p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2 text-card-foreground">
          Double-ended Queue (Deque):
        </h3>
        <div className="flex justify-center items-center h-48">
          <AnimatePresence>
            {deque.map((item, index) => (
              <motion.div
                key={index}
                className="w-16 h-16 flex items-center justify-center bg-primary text-primary-foreground rounded-lg border-2 border-secondary mx-1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {item}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
