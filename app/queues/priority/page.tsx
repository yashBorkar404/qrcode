"use client";
import CodeBlock from "@/components/CodeBlock";
import PriorityQueueVisualization from "@/components/PriorityQueueVisualization";

const priorityQueueCode = `
#include <stdio.h>
#include <stdlib.h>

#define MAX_SIZE 100

typedef struct {
    int value;
    int priority;
} PQElement;

typedef struct {
    PQElement items[MAX_SIZE];
    int size;
} PriorityQueue;

void initializeQueue(PriorityQueue *pq) {
    pq->size = 0;
}

int isFull(PriorityQueue *pq) {
    return pq->size == MAX_SIZE;
}

int isEmpty(PriorityQueue *pq) {
    return pq->size == 0;
}

void enqueue(PriorityQueue *pq, int value, int priority) {
    if (isFull(pq)) {
        printf("Queue is full!\\n");
        return;
    }

    PQElement newElement = {value, priority};
    int i;
    for (i = pq->size - 1; i >= 0; i--) {
        if (pq->items[i].priority > priority) {
            pq->items[i + 1] = pq->items[i];
        } else {
            break;
        }
    }
    pq->items[i + 1] = newElement;
    pq->size++;
    printf("Enqueued: %d with priority %d\\n", value, priority);
}

int dequeue(PriorityQueue *pq) {
    if (isEmpty(pq)) {
        printf("Queue is empty!\\n");
        return -1;
    }
    int value = pq->items[0].value;
    for (int i = 0; i < pq->size - 1; i++) {
        pq->items[i] = pq->items[i + 1];
    }
    pq->size--;
    printf("Dequeued: %d\\n", value);
    return value;
}

void display(PriorityQueue *pq) {
    if (isEmpty(pq)) {
        printf("Queue is empty\\n");
        return;
    }
    printf("Queue elements (value, priority): ");
    for (int i = 0; i < pq->size; i++) {
        printf("(%d, %d) ", pq->items[i].value, pq->items[i].priority);
    }
    printf("\\n");
}

int main() {
    PriorityQueue pq;
    initializeQueue(&pq);

    enqueue(&pq, 3, 1);
    enqueue(&pq, 4, 2);
    enqueue(&pq, 2, 3);
    enqueue(&pq, 1, 4);
    display(&pq);

    dequeue(&pq);
    display(&pq);

    enqueue(&pq, 5, 2);
    display(&pq);

    return 0;
}
`;

export default function PriorityQueuePage() {
  return (
    <div className="space-y-8">
      <section className="mb-8 p-6 bg-card rounded-lg border border-border shadow-sm">
        <h1 className="text-3xl font-bold mb-6">Priority Queue</h1>
        <p className="mb-4">
          A <strong>Priority Queue</strong> is a special type of queue where
          each element has an associated priority. Elements with higher priority
          are served before elements with lower priority, regardless of their
          order in the queue.
        </p>
        <p className="mb-4">Key characteristics of a Priority Queue:</p>
        <ul className="list-disc list-inside mb-4 pl-4">
          <li>
            Elements are dequeued based on their priority, not their arrival
            order
          </li>
          <li>
            Can be implemented using various data structures (arrays, linked
            lists, heaps)
          </li>
          <li>
            Supports both ascending (min) and descending (max) priority orders
          </li>
          <li>
            Commonly used in algorithms like Dijkstra&apos;s shortest path and
            Huffman coding
          </li>
        </ul>
      </section>

      <section className="mb-8 p-6 bg-card rounded-lg border border-border shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">
          Priority Queue Operations
        </h2>
        <ul className="list-disc list-inside mb-4 pl-4">
          <li>
            <strong>Enqueue:</strong> Add an element with a priority to the
            queue
          </li>
          <li>
            <strong>Dequeue:</strong> Remove and return the element with the
            highest priority
          </li>
          <li>
            <strong>Peek:</strong> View the element with the highest priority
            without removing it
          </li>
          <li>
            <strong>IsEmpty:</strong> Check if the queue is empty
          </li>
          <li>
            <strong>IsFull:</strong> Check if the queue is full (for fixed-size
            implementations)
          </li>
        </ul>
      </section>

      <section className="mb-8 p-6 bg-card rounded-lg border border-border shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">
          Interactive Priority Queue Demonstration
        </h2>
        <p className="mb-4">
          Explore the behavior of a priority queue with this interactive
          visualization:
        </p>
        <PriorityQueueVisualization />
      </section>

      <section className="mb-8 p-6 bg-card rounded-lg border border-border shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">C Code Implementation</h2>
        <p className="mb-4">
          Here&apos;s an example implementation of a Priority Queue in C using
          an array:
        </p>
        <CodeBlock code={priorityQueueCode} language="c" />
        <p className="mt-4">
          This implementation uses an array of structures to store elements and
          their priorities. The enqueue operation inserts elements in the
          correct position based on their priority, while the dequeue operation
          always removes the element at the front (highest priority).
        </p>
      </section>

      <section className="mb-8 p-6 bg-card rounded-lg border border-border shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">
          Applications of Priority Queues
        </h2>
        <p className="mb-4">
          Priority queues are used in various real-world applications and
          algorithms, including:
        </p>
        <ul className="list-disc list-inside mb-4 pl-4">
          <li>
            <strong>Task Scheduling:</strong> In operating systems to schedule
            processes based on priority
          </li>
          <li>
            <strong>Dijkstra&apos;s Algorithm:</strong> For finding the shortest
            path in a graph
          </li>
          <li>
            <strong>Huffman Coding:</strong> In data compression algorithms
          </li>
          <li>
            <strong>Event-driven Simulation:</strong> To process events in order
            of their occurrence time
          </li>
          <li>
            <strong>Load Balancing:</strong> In distributed systems to handle
            requests based on priority
          </li>
        </ul>
      </section>

      <section className="mb-8 p-6 bg-card rounded-lg border border-border shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">
          Advantages and Considerations
        </h2>
        <p className="mb-4">Advantages of using Priority Queues:</p>
        <ul className="list-disc list-inside mb-4 pl-4">
          <li>Efficient handling of prioritized data</li>
          <li>Useful in scenarios where order of processing matters</li>
          <li>Can be optimized for fast insertion or fast extraction</li>
        </ul>
        <p className="mb-4">Considerations when using Priority Queues:</p>
        <ul className="list-disc list-inside mb-4 pl-4">
          <li>
            Implementation choice affects time complexity (e.g., array vs heap)
          </li>
          <li>May require additional memory compared to simple queues</li>
          <li>
            Handling of elements with equal priorities needs to be defined
          </li>
        </ul>
      </section>
    </div>
  );
}
