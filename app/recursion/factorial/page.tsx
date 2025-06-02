"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import RecursiveTreeVisualization from "@/components/RecursiveTreeVisualization";
import CallstackVisualization from "@/components/CallstackVisualization";
import CodeBlock from "@/components/CodeBlock";

const factorialCode = `
#include <stdio.h>

int factorial(int n) {
    if (n == 0 || n == 1) {
        return 1;
    }
    return n * factorial(n - 1);
}

int main() {
    int n = 5;
    printf("Factorial of %d is %d\\n", n, factorial(n));
    return 0;
}
`;

interface TreeNode {
  name: string;
  attributes?: { [key: string]: string | number };
  children?: TreeNode[];
}

function generateFactorialTree(n: number): TreeNode {
  if (n === 0 || n === 1) {
    return { name: `factorial(${n})`, attributes: { result: 1 } };
  }
  const child = generateFactorialTree(n - 1);
  const result = n * (child.attributes?.result as number);
  return {
    name: `factorial(${n})`,
    attributes: { result },
    children: [child],
  };
}

export default function FactorialPage() {
  const [input, setInput] = useState("5");
  const [result, setResult] = useState<number | null>(null);
  const [callstack, setCallstack] = useState<string[]>([]);
  const [treeData, setTreeData] = useState<TreeNode | null>(null);
  const [calculating, setCalculating] = useState(false);

  const calculateFactorial = (n: number): number => {
    if (n === 0 || n === 1) {
      setCallstack((prev) => [...prev, `factorial(${n}) = 1`]);
      return 1;
    }
    setCallstack((prev) => [
      ...prev,
      `factorial(${n}) calls factorial(${n - 1})`,
    ]);
    const subResult = n * calculateFactorial(n - 1);
    setCallstack((prev) => [
      ...prev,
      `factorial(${n}) = ${n} * factorial(${n - 1}) = ${subResult}`,
    ]);
    return subResult;
  };

  const handleCalculate = () => {
    const n = Number.parseInt(input);
    setCallstack([]);
    setCalculating(true);
    const result = calculateFactorial(n);
    setResult(result);
    setTreeData(generateFactorialTree(n));
    setCalculating(false);
  };

  return (
    <div className="space-y-8">
      <section className="mb-8 p-6 bg-card rounded-lg border border-border shadow-sm">
        <h1 className="text-3xl font-bold mb-6">Factorial</h1>
        <p className="mb-4">
          The factorial of a non-negative integer n, denoted as n!, is the
          product of all positive integers less than or equal to n. It&apos;s
          defined as:
        </p>
        <p className="mb-4 font-semibold">
          n! = n × (n-1) × (n-2) × ... × 3 × 2 × 1
        </p>
        <p className="mb-4">By definition, 0! and 1! are both equal to 1.</p>
        <p className="mb-4">Examples:</p>
        <ul className="list-disc list-inside mb-4 pl-4">
          <li>5! = 5 × 4 × 3 × 2 × 1 = 120</li>
          <li>3! = 3 × 2 × 1 = 6</li>
          <li>1! = 1</li>
          <li>0! = 1 (by definition)</li>
        </ul>
      </section>

      <section className="mb-8 p-6 bg-card rounded-lg border border-border shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">
          Recursive Implementation
        </h2>
        <p className="mb-4">
          Factorial calculation is a classic example of a problem that can be
          solved recursively. The recursive definition of factorial is:
        </p>
        <ul className="list-disc list-inside mb-4 pl-4">
          <li>n! = 1 if n = 0 or n = 1 (base case)</li>
          <li>n! = n × (n-1)! for n &gt; 1 (recursive case)</li>
        </ul>
        <p className="mb-4">
          This definition translates directly into a recursive function, making
          it an excellent introductory example for understanding recursion.
        </p>
      </section>

      <section className="mb-8 p-6 bg-card rounded-lg border border-border shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">
          Interactive Factorial Calculator
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
              Factorial of {input} is: <strong>{result}</strong>
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
        <CodeBlock code={factorialCode} language="c" />
        <p className="mt-4">
          This C code demonstrates a simple recursive implementation of the
          factorial function. While it&apos;s straightforward and mirrors the
          mathematical definition closely, it&apos;s worth noting that for very
          large numbers, this approach can lead to stack overflow. In practice,
          an iterative implementation or tail-recursive optimization might be
          preferred for handling larger inputs.
        </p>
      </section>

      <section className="mb-8 p-6 bg-card rounded-lg border border-border shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">
          Applications of Factorial
        </h2>
        <p className="mb-4">
          Factorial has numerous applications in mathematics and computer
          science:
        </p>
        <ul className="list-disc list-inside mb-4 pl-4">
          <li>
            Combinatorics: Calculating the number of ways to arrange n distinct
            objects
          </li>
          <li>
            Probability: Used in calculating permutations and combinations
          </li>
          <li>
            Taylor series expansions: In calculus, for expressing functions as
            infinite series
          </li>
          <li>
            Graph theory: In counting the number of possible spanning trees in a
            complete graph
          </li>
          <li>Number theory: Appears in various theorems and formulas</li>
        </ul>
      </section>

      <section className="mb-8 p-6 bg-card rounded-lg border border-border shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">
          Limitations and Considerations
        </h2>
        <p className="mb-4">
          When working with factorials, it&apos;s important to keep in mind:
        </p>
        <ul className="list-disc list-inside mb-4 pl-4">
          <li>
            Factorial grows very quickly, leading to large numbers even for
            relatively small inputs
          </li>
          <li>
            For large inputs, the result may exceed the maximum value that can
            be stored in standard integer types
          </li>
          <li>
            Recursive implementations can lead to stack overflow for large
            inputs
          </li>
          <li>
            In practice, approximations like Stirling&apos;s formula may be used
            for very large factorials
          </li>
        </ul>
        <p className="mb-4">
          Understanding these limitations is crucial when implementing factorial
          calculations in real-world applications.
        </p>
      </section>
    </div>
  );
}
