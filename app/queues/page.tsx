"use client";

import { useState } from "react";

export default function QueuesPage() {
  const [videoPlaying, setVideoPlaying] = useState<number | null>(null);

  const playVideo = (videoId: number) => {
    setVideoPlaying(videoId);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="space-y-8">
        <h1 className="text-3xl font-bold mb-6">Queue Data Structure</h1>

        <section className="mb-8 p-6 bg-card rounded-lg border border-border shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">What is a Queue?</h2>
          <p className="mb-4">
            A <strong>queue</strong> is a fundamental data structure that
            follows the <em>First-In-First-Out (FIFO)</em> principle. It&apos;s
            similar to a real-world queue or line, where the first person to
            join the line is the first one to be served.
          </p>
          <p className="mb-4">
            Think of a queue like a line of people waiting to buy tickets at a
            movie theater:
          </p>
          <ul className="list-disc list-inside mb-4 pl-4">
            <li>New people join the back of the line (enqueue operation)</li>
            <li>
              The person at the front of the line is served first (dequeue
              operation)
            </li>
            <li>
              People can&apos;t &quot;cut&quot; in line - they must wait their
              turn
            </li>
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
                      src="https://www.youtube.com/embed/vu6xBl7ReiU"
                      title="Queue Data Structure Explained"
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
                  Queue Data Structure Explained
                </h3>
                <p className="text-sm text-gray-600">
                  An in-depth look at queues and their implementations.
                </p>
              </div>
            </div>
          </div>
        </section>
        <hr className="my-8 border-border" />

        <section className="mb-8 p-6 bg-card rounded-lg border border-border shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">
            Basic Queue Operations
          </h2>
          <ul className="list-disc list-inside mb-4 pl-4">
            <li>
              <strong>Enqueue:</strong> Add an element to the back of the queue
            </li>
            <li>
              <strong>Dequeue:</strong> Remove and return the element at the
              front of the queue
            </li>
            <li>
              <strong>Front/Peek:</strong> View the element at the front of the
              queue without removing it
            </li>
            <li>
              <strong>IsEmpty:</strong> Check if the queue is empty
            </li>
            <li>
              <strong>Size:</strong> Get the number of elements in the queue
            </li>
          </ul>
        </section>
        <hr className="my-8 border-border" />

        <section className="mb-8 p-6 bg-card rounded-lg border border-border shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">Types of Queues</h2>
          <p className="mb-4">
            There are several variations of queues, each with its own use cases:
          </p>

          <h3 className="text-xl font-semibold mb-2">1. Simple Queue</h3>
          <p className="mb-4">
            The basic implementation of a queue. Elements are added to the rear
            and removed from the front.
          </p>

          <h3 className="text-xl font-semibold mb-2">2. Circular Queue</h3>
          <p className="mb-4">
            A space-efficient version of a queue using a circular buffer. When
            the rear reaches the end of the array, it wraps around to the
            beginning if there&apos;s space.
          </p>

          <h3 className="text-xl font-semibold mb-2">
            3. Double-ended Queue (Deque)
          </h3>
          <p className="mb-4">
            A queue that allows insertion and deletion at both ends. It&apos;s
            more flexible than a standard queue.
          </p>

          <h3 className="text-xl font-semibold mb-2">4. Priority Queue</h3>
          <p className="mb-4">
            A queue where elements have associated priorities. Elements with
            higher priority are served before elements with lower priority.
          </p>
        </section>
        <hr className="my-8 border-border" />

        <section className="mb-8 p-6 bg-card rounded-lg border border-border shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">
            Real-world Applications
          </h2>
          <p className="mb-4">
            Queues are used in various applications, including:
          </p>
          <ul className="list-disc list-inside mb-4 pl-4">
            <li>
              <strong>Task Scheduling:</strong> In operating systems for
              managing processes
            </li>
            <li>
              <strong>Breadth-First Search:</strong> In graph algorithms for
              traversing or searching tree or graph data structures
            </li>
            <li>
              <strong>Buffering:</strong> In computer networks for managing data
              packets
            </li>
            <li>
              <strong>Print Queue Management:</strong> In printer spoolers for
              managing print jobs
            </li>
            <li>
              <strong>Call Center Systems:</strong> For managing customer
              service calls in the order they are received
            </li>
          </ul>
        </section>
        <hr className="my-8 border-border" />

        <section className="mb-8 p-6 bg-card rounded-lg border border-border shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">
            Explore Queue Implementations
          </h2>
          <p className="mb-4">
            In the following sections, you&apos;ll find interactive
            visualizations and code implementations for different types of
            queues. These will help you understand how queues work and how they
            can be implemented in code.
          </p>
          <ul className="list-disc list-inside mb-4 pl-4">
            <li>
              <a
                href="/queues/simple"
                className="text-blue-600 hover:underline"
              >
                Simple Queue
              </a>
            </li>
            <li>
              <a
                href="/queues/circular"
                className="text-blue-600 hover:underline"
              >
                Circular Queue
              </a>
            </li>
            <li>
              <a href="/queues/deque" className="text-blue-600 hover:underline">
                Double-ended Queue (Deque)
              </a>
            </li>
            <li>
              <a
                href="/queues/priority"
                className="text-blue-600 hover:underline"
              >
                Priority Queue
              </a>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
