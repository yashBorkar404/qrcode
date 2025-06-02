"use client";
import CodeBlock from "@/components/CodeBlock";
import SimpleQueue from "@/components/SimpleQueue";

const simpleQueueCode = `
#include <stdio.h>
#include <stdlib.h>

#define MAX_SIZE 100

typedef struct {
    int items[MAX_SIZE];
    int front;
    int rear;
} Queue;

void initializeQueue(Queue *q) {
    q->front = -1;
    q->rear = -1;
}

int isEmpty(Queue *q) {
    return (q->front == -1 && q->rear == -1);
}

int isFull(Queue *q) {
    return (q->rear == MAX_SIZE - 1);
}

void enqueue(Queue *q, int value) {
    if (isFull(q)) {
        printf("Queue is full!\\n");
        return;
    }
    if (isEmpty(q)) {
        q->front = 0;
    }
    q->rear++;
    q->items[q->rear] = value;
    printf("%d enqueued to the queue\\n", value);
}

int dequeue(Queue *q) {
    if (isEmpty(q)) {
        printf("Queue is empty!\\n");
        return -1;
    }
    int item = q->items[q->front];
    q->front++;
    if (q->front > q->rear) {
        initializeQueue(q);
    }
    printf("%d dequeued from the queue\\n", item);
    return item;
}

void display(Queue *q) {
    if (isEmpty(q)) {
        printf("Queue is empty\\n");
        return;
    }
    printf("Queue elements: ");
    for (int i = q->front; i <= q->rear; i++) {
        printf("%d ", q->items[i]);
    }
    printf("\\n");
}

int main() {
    Queue q;
    initializeQueue(&q);

    enqueue(&q, 10);
    enqueue(&q, 20);
    enqueue(&q, 30);
    display(&q);

    dequeue(&q);
    display(&q);

    return 0;
}
`;

export default function SimpleQueuePage() {
  return (
    <div className="space-y-8">
      <section className="mb-8 p-6 bg-card rounded-lg border border-border shadow-sm">
        <h1 className="text-3xl font-bold mb-6">Simple Queue</h1>
        <p className="mb-4">
          A <strong>Simple Queue</strong> is the most basic implementation of a
          queue data structure. It follows the First-In-First-Out (FIFO)
          principle, where the first element added to the queue is the first one
          to be removed.
        </p>
        <p className="mb-4">Key characteristics of a Simple Queue:</p>
        <ul className="list-disc list-inside mb-4 pl-4">
          <li>Elements are always added to the rear (or back) of the queue</li>
          <li>Elements are always removed from the front of the queue</li>
          <li>It has a fixed capacity (in most implementations)</li>
          <li>
            Once an element is dequeued, the space cannot be reused (a
            limitation addressed by circular queues)
          </li>
        </ul>
      </section>

      <section className="mb-8 p-6 bg-card rounded-lg border border-border shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">Simple Queue Operations</h2>
        <ul className="list-disc list-inside mb-4 pl-4">
          <li>
            <strong>Enqueue:</strong> Add an element to the rear of the queue
          </li>
          <li>
            <strong>Dequeue:</strong> Remove and return the element at the front
            of the queue
          </li>
          <li>
            <strong>Front/Peek:</strong> View the element at the front of the
            queue without removing it
          </li>
          <li>
            <strong>IsEmpty:</strong> Check if the queue is empty
          </li>
          <li>
            <strong>IsFull:</strong> Check if the queue is full (if it has a
            fixed capacity)
          </li>
        </ul>
      </section>

      <section className="mb-8 p-6 bg-card rounded-lg border border-border shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">
          Interactive Simple Queue Demonstration
        </h2>
        <p className="mb-4">
          Try out the basic operations of a simple queue using the interactive
          visualization below:
        </p>
        <SimpleQueue />
      </section>

      <section className="mb-8 p-6 bg-card rounded-lg border border-border shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">C Code Implementation</h2>
        <p className="mb-4">
          Here&apos;s an example implementation of a Simple Queue in C:
        </p>
        <CodeBlock code={simpleQueueCode} language="c" />
        <p className="mt-4">
          This implementation uses an array to store the queue elements and
          keeps track of the front and rear indices. Note that this simple
          implementation doesn&apos;t reuse space after dequeuing, which is a
          limitation addressed by circular queues.
        </p>
      </section>

      <section className="mb-8 p-6 bg-card rounded-lg border border-border shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">
          Applications of Simple Queues
        </h2>
        <p className="mb-4">
          Simple queues are used in various applications, including:
        </p>
        <ul className="list-disc list-inside mb-4 pl-4">
          <li>
            <strong>Print Queue Management:</strong> Managing print jobs in the
            order they are received
          </li>
          <li>
            <strong>Breadth-First Search:</strong> In graph algorithms for
            traversing or searching tree or graph data structures
          </li>
          <li>
            <strong>Task Scheduling:</strong> In scenarios where tasks need to
            be processed in the order they arrive
          </li>
          <li>
            <strong>Buffering:</strong> In scenarios where data is transferred
            asynchronously between processes
          </li>
        </ul>
      </section>

      <section className="mb-8 p-6 bg-card rounded-lg border border-border shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">
          Limitations and Alternatives
        </h2>
        <p className="mb-4">
          While simple queues are straightforward to implement and use, they
          have some limitations:
        </p>
        <ul className="list-disc list-inside mb-4 pl-4">
          <li>Fixed size (in array-based implementations)</li>
          <li>
            Inefficient use of space (dequeued elements leave unused spaces)
          </li>
          <li>Cannot insert elements in the middle or at specific positions</li>
        </ul>
        <p className="mb-4">
          To address these limitations, other types of queues have been
          developed:
        </p>
        <ul className="list-disc list-inside mb-4 pl-4">
          <li>
            <a
              href="/queues/circular"
              className="text-blue-600 hover:underline"
            >
              Circular Queue
            </a>
            : Reuses the space of dequeued elements
          </li>
          <li>
            <a
              href="/queues/priority"
              className="text-blue-600 hover:underline"
            >
              Priority Queue
            </a>
            : Allows elements with higher priority to be dequeued first
          </li>
          <li>
            <a href="/queues/deque" className="text-blue-600 hover:underline">
              Double-ended Queue (Deque)
            </a>
            : Allows insertion and deletion at both ends
          </li>
        </ul>
      </section>
    </div>
  );
}
