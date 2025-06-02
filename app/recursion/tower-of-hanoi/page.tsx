"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import RecursiveTreeVisualization from "@/components/RecursiveTreeVisualization";
import CallstackVisualization from "@/components/CallstackVisualization";
import CodeBlock from "@/components/CodeBlock";

const towerOfHanoiCode = `
#include <stdio.h>

void towerOfHanoi(int n, char from_rod, char to_rod, char aux_rod) {
    if (n == 1) {
        printf("Move disk 1 from rod %c to rod %c\\n", from_rod, to_rod);
        return;
    }
    towerOfHanoi(n - 1, from_rod, aux_rod, to_rod);
    printf("Move disk %d from rod %c to rod %c\\n", n, from_rod, to_rod);
    towerOfHanoi(n - 1, aux_rod, to_rod, from_rod);
}

int main() {
    int n = 3;
    towerOfHanoi(n, 'A', 'C', 'B');
    return 0;
}
`;

export default function TowerOfHanoiPage() {
  const [input, setInput] = useState("3");
  const [moves, setMoves] = useState<string[]>([]);
  const [callstack, setCallstack] = useState<string[]>([]);

  const solveTowerOfHanoi = (
    n: number,
    from: string,
    to: string,
    aux: string,
  ): void => {
    setCallstack((prev) => [
      ...prev,
      `towerOfHanoi(${n}, ${from}, ${to}, ${aux})`,
    ]);
    if (n === 1) {
      setMoves((prev) => [...prev, `Move disk 1 from ${from} to ${to}`]);
      setCallstack((prev) => [...prev, `Move disk 1 from ${from} to ${to}`]);
      return;
    }
    solveTowerOfHanoi(n - 1, from, aux, to);
    setMoves((prev) => [...prev, `Move disk ${n} from ${from} to ${to}`]);
    setCallstack((prev) => [...prev, `Move disk ${n} from ${from} to ${to}`]);
    solveTowerOfHanoi(n - 1, aux, to, from);
  };

  const handleSolve = () => {
    const n = Number.parseInt(input);
    setMoves([]);
    setCallstack([]);
    solveTowerOfHanoi(n, "A", "C", "B");
  };

  return (
    <div className="space-y-8">
      <section className="mb-8 p-6 bg-card rounded-lg border border-border shadow-sm">
        <h1 className="text-3xl font-bold mb-6">Tower of Hanoi</h1>
        <p className="mb-4">
          The Tower of Hanoi is a classic problem in computer science and
          mathematics. It consists of three rods and a number of disks of
          different sizes which can slide onto any rod. The puzzle starts with
          the disks in a neat stack in ascending order of size on one rod, the
          smallest at the top.
        </p>
        <p className="mb-4">
          The objective of the puzzle is to move the entire stack to another
          rod, obeying the following rules:
        </p>
        <ul className="list-disc list-inside mb-4 pl-4">
          <li>Only one disk can be moved at a time.</li>
          <li>
            Each move consists of taking the upper disk from one of the stacks
            and placing it on top of another stack or on an empty rod.
          </li>
          <li>No larger disk may be placed on top of a smaller disk.</li>
        </ul>
        <p className="mb-4">
          The Tower of Hanoi puzzle is an excellent example of a problem that
          can be solved efficiently using recursion. It demonstrates how complex
          problems can be broken down into smaller, more manageable
          sub-problems.
        </p>
      </section>

      <section className="mb-8 p-6 bg-card rounded-lg border border-border shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">Recursive Solution</h2>
        <p className="mb-4">
          The Tower of Hanoi problem can be solved efficiently using recursion.
          The recursive strategy works as follows:
        </p>
        <ol className="list-decimal list-inside mb-4 pl-4">
          <li>Move n-1 disks from the source rod to the auxiliary rod</li>
          <li>Move the nth disk from the source rod to the destination rod</li>
          <li>
            Move the n-1 disks from the auxiliary rod to the destination rod
          </li>
        </ol>
        <p className="mb-4">
          This process is repeated recursively until we reach the base case of
          moving just one disk. The beauty of this solution lies in its
          simplicity and how it breaks down the problem into smaller, identical
          sub-problems.
        </p>
      </section>

      <section className="mb-8 p-6 bg-card rounded-lg border border-border shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">
          Interactive Tower of Hanoi Solver
        </h2>
        <p className="mb-4">
          Use the interactive solver below to see how the Tower of Hanoi problem
          is solved for different numbers of disks:
        </p>
        <div className="space-y-4">
          <div className="flex space-x-2">
            <Input
              type="number"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter number of disks"
              className="bg-background text-foreground"
            />
            <Button
              onClick={handleSolve}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Solve
            </Button>
          </div>
          {moves.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold mb-2">Solution Steps:</h3>
              <ul className="list-decimal list-inside">
                {moves.map((move, index) => (
                  <li key={index}>{move}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      <section className="mb-8 p-6 bg-card rounded-lg border border-border shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">Visualization</h2>
        <p className="mb-4">
          The following visualizations help illustrate the recursive nature of
          the Tower of Hanoi solution:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-2">Callstack</h3>
            <p className="mb-2">
              This visualization shows the function calls as they are added to
              and removed from the callstack:
            </p>
            <CallstackVisualization callstack={callstack} />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Recursion Tree</h3>
            <p className="mb-2">
              This tree structure illustrates the recursive calls made during
              the solution process:
            </p>
            <RecursiveTreeVisualization
              data={{
                name: `towerOfHanoi(${input}, A, C, B)`,
                children: [
                  {
                    name: `towerOfHanoi(${Number.parseInt(input) - 1}, A, B, C)`,
                  },
                  {
                    name: `Move disk ${input} from A to C`,
                  },
                  {
                    name: `towerOfHanoi(${Number.parseInt(input) - 1}, B, C, A)`,
                  },
                ],
              }}
            />
          </div>
        </div>
      </section>

      <section className="mb-8 p-6 bg-card rounded-lg border border-border shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">C Code Implementation</h2>
        <p className="mb-4">
          Here&apos;s an example implementation of the Tower of Hanoi solution
          in C:
        </p>
        <CodeBlock code={towerOfHanoiCode} language="c" />
        <p className="mt-4">
          This C code demonstrates a recursive implementation of the Tower of
          Hanoi problem. The function `towerOfHanoi` takes four parameters: the
          number of disks, the source rod, the destination rod, and the
          auxiliary rod. It recursively solves the problem by breaking it down
          into smaller sub-problems.
        </p>
      </section>

      <section className="mb-8 p-6 bg-card rounded-lg border border-border shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">Time Complexity</h2>
        <p className="mb-4">
          The time complexity of the Tower of Hanoi algorithm is O(2^n), where n
          is the number of disks. This is because:
        </p>
        <ul className="list-disc list-inside mb-4 pl-4">
          <li>For n disks, the function is called 2^n - 1 times</li>
          <li>Each function call performs a constant amount of work</li>
        </ul>
        <p className="mb-4">
          While this exponential time complexity makes the algorithm inefficient
          for large numbers of disks, it remains an excellent example of
          recursive problem-solving for smaller instances. The number of moves
          required to solve the puzzle is 2^n - 1, which grows rapidly as n
          increases.
        </p>
      </section>

      <section className="mb-8 p-6 bg-card rounded-lg border border-border shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">
          Applications and Variations
        </h2>
        <p className="mb-4">
          The Tower of Hanoi problem has several interesting applications and
          variations:
        </p>
        <ul className="list-disc list-inside mb-4 pl-4">
          <li>Backup rotation schemes in computer systems</li>
          <li>Algorithm design and analysis in computer science education</li>
          <li>Psychological assessment of problem-solving skills</li>
          <li>
            Variations like the Tower of London test used in neuropsychological
            diagnosis
          </li>
        </ul>
        <p className="mb-4">
          Understanding and implementing the Tower of Hanoi algorithm provides
          valuable insights into recursive thinking and problem decomposition,
          skills that are crucial in many areas of computer science and software
          development. It serves as an excellent introduction to the power and
          elegance of recursive algorithms.
        </p>
      </section>
    </div>
  );
}
