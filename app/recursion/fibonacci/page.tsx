"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import RecursiveTreeVisualization from "@/components/RecursiveTreeVisualization";
import CallstackVisualization from "@/components/CallstackVisualization";
import CodeBlock from "@/components/CodeBlock";

const fibonacciCode = `
#include <stdio.h>

int fibonacci(int n) {
    if (n <= 1) {
        return n;
    }
    return fibonacci(n - 1) + fibonacci(n - 2);
}

int main() {
    int n = 5;
    printf("The %dth Fibonacci number is %d\\n", n, fibonacci(n));
    return 0;
}
`;

interface TreeNode {
  name: string;
  attributes?: { [key: string]: string | number };
  children?: TreeNode[];
}

function generateFibonacciTree(n: number): TreeNode {
  if (n <= 1) {
    return { name: `fibonacci(${n})`, attributes: { result: n } };
  }
  const left = generateFibonacciTree(n - 1);
  const right = generateFibonacciTree(n - 2);
  const result =
    (left.attributes?.result as number) + (right.attributes?.result as number);
  return {
    name: `fibonacci(${n})`,
    attributes: { result },
    children: [left, right],
  };
}

export default function FibonacciPage() {
  const [input, setInput] = useState("5");
  const [result, setResult] = useState<number | null>(null);
  const [callstack, setCallstack] = useState<string[]>([]);
  const [treeData, setTreeData] = useState<TreeNode | null>(null);
  const [calculating, setCalculating] = useState(false);

  const calculateFibonacci = (n: number): number => {
    setCallstack((prev) => [...prev, `fibonacci(${n})`]);
    if (n <= 1) {
      setCallstack((prev) => [...prev, `return ${n}`]);
      return n;
    }
    const subResult = calculateFibonacci(n - 1) + calculateFibonacci(n - 2);
    setCallstack((prev) => [
      ...prev,
      `return fibonacci(${n - 1}) + fibonacci(${n - 2}) = ${subResult}`,
    ]);
    return subResult;
  };

  const handleCalculate = () => {
    const n = Number.parseInt(input);
    setCallstack([]);
    setCalculating(true);
    const result = calculateFibonacci(n);
    setResult(result);
    setTreeData(generateFibonacciTree(n));
    setCalculating(false);
  };

  return (
    <div className="space-y-8">
      <section className="mb-8 p-6 bg-card rounded-lg border border-border shadow-sm">
        <h1 className="text-3xl font-bold mb-6">Fibonacci Sequence</h1>
        <p className="mb-4">
          The Fibonacci sequence is a series of numbers where each number is the
          sum of the two preceding ones. It typically starts with 0 and 1, and
          each subsequent number is the sum of the previous two.
        </p>
        <p className="mb-4">
          The sequence begins: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, ...
        </p>
        <p className="mb-4">
          Mathematically, the sequence F(n) of Fibonacci numbers is defined by
          the recurrence relation:
        </p>
        <p className="mb-4 font-semibold">F(n) = F(n-1) + F(n-2)</p>
        <p className="mb-4">With seed values:</p>
        <p className="mb-4 font-semibold">F(0) = 0 and F(1) = 1</p>
      </section>

      <section className="mb-8 p-6 bg-card rounded-lg border border-border shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">
          Recursive Implementation
        </h2>
        <p className="mb-4">
          The Fibonacci sequence can be implemented recursively, making it a
          classic example of recursive algorithms. Here&apos;s how it works:
        </p>
        <ul className="list-disc list-inside mb-4 pl-4">
          <li>Base case: If n is 0 or 1, return n</li>
          <li>
            Recursive case: For n &gt; 1, return fibonacci(n-1) + fibonacci(n-2)
          </li>
        </ul>
        <p className="mb-4">
          This recursive approach directly translates the mathematical
          definition into code, making it intuitive but potentially inefficient
          for large values of n due to redundant calculations.
        </p>
      </section>

      <section className="mb-8 p-6 bg-card rounded-lg border border-border shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">
          Interactive Fibonacci Calculator
        </h2>
        <div className="space-y-4">
          <div className="flex space-x-2">
            <Input
              type="number"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter a number"
              className="bg-background text-foreground"
            />
            <Button
              onClick={handleCalculate}
              className="bg-primary text-primary-foreground"
              disabled={calculating}
            >
              Calculate
            </Button>
          </div>
          {result !== null && (
            <p className="text-lg">
              The {input}th Fibonacci number is: <strong>{result}</strong>
            </p>
          )}
        </div>
      </section>

      <section className="mb-8 p-6 bg-card rounded-lg border border-border shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">Visualization</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-2">Callstack</h3>
            <CallstackVisualization callstack={callstack} />
          </div>
          <div className="bg-card p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Recursion Tree</h3>
            {treeData && <RecursiveTreeVisualization data={treeData} />}
          </div>
        </div>
      </section>

      <section className="mb-8 p-6 bg-card rounded-lg border border-border shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">C Code Implementation</h2>
        <CodeBlock code={fibonacciCode} language="c" />
        <p className="mt-4">
          This C code demonstrates a simple recursive implementation of the
          Fibonacci sequence. While it&apos;s straightforward, it&apos;s
          important to note that this approach has exponential time complexity
          and can be very slow for large values of n. In practice, more
          efficient algorithms like dynamic programming or matrix exponentiation
          are used for calculating Fibonacci numbers.
        </p>
      </section>

      <section className="mb-8 p-6 bg-card rounded-lg border border-border shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">
          Applications of Fibonacci Sequence
        </h2>
        <p className="mb-4">
          The Fibonacci sequence appears in various fields and has several
          applications:
        </p>
        <ul className="list-disc list-inside mb-4 pl-4">
          <li>
            Nature: Describes the arrangement of leaves on some plants and the
            spiral of shells
          </li>
          <li>
            Art and Architecture: Used in compositions to create aesthetically
            pleasing proportions
          </li>
          <li>
            Computer Algorithms: Used in the Fibonacci heap data structure
          </li>
          <li>
            Financial Markets: Some traders believe that asset prices and stock
            market movements follow Fibonacci retracements
          </li>
          <li>
            Music: Used in some compositions to determine rhythms, chord
            progressions, or scales
          </li>
        </ul>
      </section>
    </div>
  );
}
