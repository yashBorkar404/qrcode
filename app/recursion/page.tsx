"use client";

import { useState } from "react";

export default function RecursionPage() {
  const [videoPlaying, setVideoPlaying] = useState<number | null>(null);

  const playVideo = (videoId: number) => {
    setVideoPlaying(videoId);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Recursion in Programming</h1>

      <section className="mb-8 p-6 bg-card rounded-lg border border-border shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">What is Recursion?</h2>
        <p className="mb-4">
          <strong>Recursion</strong> is a powerful programming technique where a
          function calls itself to solve a problem by breaking it down into
          smaller, similar subproblems. It&apos;s a way of solving problems that
          can be divided into simpler versions of the same problem.
        </p>
        <p className="mb-4">Think of recursion like a Russian nesting doll:</p>
        <ul className="list-disc list-inside mb-4 pl-4">
          <li>Each doll contains a smaller version of itself</li>
          <li>You keep opening dolls until you reach the smallest one</li>
          <li>Then you work your way back up, closing each doll</li>
        </ul>
      </section>
      <hr className="my-8 border-border" />

      <section className="mb-8 p-6 bg-card rounded-lg border border-border shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">Video Explanations</h2>
        <div className="grid grid-cols-1 gap-6">
          <div className="bg-card rounded-lg overflow-hidden shadow-lg">
            <div className="aspect-w-16 aspect-h-9 mb-4">
              <div
                className="w-full h-0"
                style={{ paddingBottom: "56.25%", position: "relative" }}
              >
                {videoPlaying === 1 ? (
                  <iframe
                    src="https://www.youtube.com/embed/uHP3OdUI0SQ"
                    title="Understanding Recursion"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute top-0 left-0 w-full h-full"
                  ></iframe>
                ) : (
                  <div
                    className="absolute top-0 left-0 w-full h-full bg-gray-200 flex items-center justify-center cursor-pointer"
                    onClick={() => playVideo(1)}
                  >
                    <span className="text-6xl">▶️</span>
                  </div>
                )}
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">
                Understanding Recursion
              </h3>
              <p className="text-sm text-gray-600">
                A comprehensive guide to recursion in programming.
              </p>
            </div>
          </div>
        </div>
      </section>
      <hr className="my-8 border-border" />

      <section className="mb-8 p-6 bg-card rounded-lg border border-border shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">
          Key Components of Recursion
        </h2>
        <ul className="list-disc list-inside mb-4 pl-4">
          <li>
            <strong>Base Case:</strong> The condition that stops the recursion
          </li>
          <li>
            <strong>Recursive Case:</strong> The part where the function calls
            itself
          </li>
          <li>
            <strong>Progress Towards Base Case:</strong> Each recursive call
            should move closer to the base case
          </li>
        </ul>
      </section>
      <hr className="my-8 border-border" />

      <section className="mb-8 p-6 bg-card rounded-lg border border-border shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">
          Example: Factorial Calculation
        </h2>
        <p className="mb-4">
          Let&apos;s look at a simple example of recursion: calculating the
          factorial of a number.
        </p>
        <pre className="bg-gray-100 p-4 rounded-md mb-4">
          <code>{`
function factorial(n) {
  // Base case
  if (n === 0 || n === 1) {
    return 1;
  }
  // Recursive case
  return n * factorial(n - 1);
}
          `}</code>
        </pre>
        <p className="mb-4">In this example:</p>
        <ul className="list-disc list-inside mb-4 pl-4">
          <li>The base case is when n is 0 or 1</li>
          <li>The recursive case multiplies n by the factorial of (n-1)</li>
          <li>Each call reduces n by 1, moving towards the base case</li>
        </ul>
      </section>
      <hr className="my-8 border-border" />

      <section className="mb-8 p-6 bg-card rounded-lg border border-border shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">Types of Recursion</h2>

        <h3 className="text-xl font-semibold mb-2">1. Direct Recursion</h3>
        <p className="mb-4">
          A function calls itself directly. The factorial example above is
          direct recursion.
        </p>

        <h3 className="text-xl font-semibold mb-2">2. Indirect Recursion</h3>
        <p className="mb-4">
          Function A calls function B, which in turn calls function A. This
          forms a cycle of function calls.
        </p>

        <h3 className="text-xl font-semibold mb-2">3. Tail Recursion</h3>
        <p className="mb-4">
          A recursive call is the last operation in the function. This can be
          optimized by some compilers.
        </p>
      </section>
      <hr className="my-8 border-border" />

      <section className="mb-8 p-6 bg-card rounded-lg border border-border shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">
          Advantages and Disadvantages
        </h2>
        <h3 className="text-xl font-semibold mb-2">Advantages:</h3>
        <ul className="list-disc list-inside mb-4 pl-4">
          <li>Can lead to clean, elegant code for certain problems</li>
          <li>
            Naturally suited for problems with recursive structures (e.g., tree
            traversal)
          </li>
          <li>Can be more intuitive for some complex algorithms</li>
        </ul>
        <h3 className="text-xl font-semibold mb-2">Disadvantages:</h3>
        <ul className="list-disc list-inside mb-4 pl-4">
          <li>Can be less efficient due to function call overhead</li>
          <li>Risk of stack overflow for deep recursion</li>
          <li>
            Sometimes harder to understand and debug than iterative solutions
          </li>
        </ul>
      </section>
      <hr className="my-8 border-border" />

      <section className="mb-8 p-6 bg-card rounded-lg border border-border shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">
          Common Recursive Algorithms
        </h2>
        <p className="mb-4">
          Explore the following recursive algorithms with interactive
          visualizations:
        </p>
        <ul className="list-disc list-inside mb-4 pl-4">
          <li>
            <a
              href="/recursion/factorial"
              className="text-blue-600 hover:underline"
            >
              Factorial
            </a>{" "}
            - Calculate the product of all positive integers up to a given
            number
          </li>
          <li>
            <a
              href="/recursion/fibonacci"
              className="text-blue-600 hover:underline"
            >
              Fibonacci
            </a>{" "}
            - Generate the Fibonacci sequence where each number is the sum of
            the two preceding ones
          </li>
          <li>
            <a
              href="/recursion/tower-of-hanoi"
              className="text-blue-600 hover:underline"
            >
              Tower of Hanoi
            </a>{" "}
            - Solve the classic puzzle of moving disks between pegs
          </li>
        </ul>
        <p className="mb-4">
          Each page demonstrates the algorithm with C code, a callstack
          visualization, and a recursion tree to help you understand how these
          recursive algorithms work.
        </p>
      </section>
    </div>
  );
}
