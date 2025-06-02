"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SimpleQueue() {
  const [queue, setQueue] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  const enqueue = () => {
    if (inputValue.trim() !== "") {
      setQueue([...queue, inputValue.trim()]);
      setInputValue("");
    }
  };

  const dequeue = () => {
    if (queue.length > 0) {
      const newQueue = [...queue];
      newQueue.shift();
      setQueue(newQueue);
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
          Queue Contents:
        </h3>
        <div className="flex space-x-2">
          {queue.map((item, index) => (
            <div
              key={index}
              className="bg-accent text-accent-foreground p-2 rounded border border-border"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
