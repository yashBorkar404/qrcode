"use client";
import CodeBlock from "@/components/CodeBlock";
import CircularQueueVisualization from "@/components/CircularQueueVisualization";

const circularQueueCode = `
#include <stdio.h>
#include <stdlib.h>

#define MAX_SIZE 5

typedef struct {
    int items[MAX_SIZE];
    int front;
    int rear;
    int size;
} CircularQueue;

void initializeQueue(CircularQueue *q) {
    q->front = -1;
    q->rear = -1;
    q->size = 0;
}

int isFull(CircularQueue *q) {
    return (q->size == MAX_SIZE);
}

int isEmpty(CircularQueue *q) {
    return (q->size == 0);
}

void enqueue(CircularQueue *q, int value) {
    if (isFull(q)) {
        printf("Queue is full!\\n");
        return;
    }
    if (isEmpty(q)) {
        q->front = 0;
    }
    q->rear = (q->rear + 1) % MAX_SIZE;
    q->items[q->rear] = value;
    q->size++;
    printf("%d enqueued to the queue\\n", value);
}

int dequeue(CircularQueue *q) {
    if (isEmpty(q)) {
        printf("Queue is empty!\\n");
        return -1;
    }
    int item = q->items[q->front];
    q->front = (q->front + 1) % MAX_SIZE;
    q->size--;
    if (isEmpty(q)) {
        q->front = -1;
        q->rear = -1;
    }
    printf("%d dequeued from the queue\\n", item);
    return item;
}

void display(CircularQueue *q) {
    if (isEmpty(q)) {
        printf("Queue is empty\\n");
        return;
    }
    printf("Queue elements: ");
    int count = 0;
    int i = q->front;
    while (count < q->size) {
        printf("%d ", q->items[i]);
        i = (i + 1) % MAX_SIZE;
        count++;
    }
    printf("\\n");
}

int main() {
    CircularQueue q;
    initializeQueue(&q);

    enqueue(&q, 1);
    enqueue(&q, 2);
    enqueue(&q, 3);
    display(&q);

    dequeue(&q);
    display(&q);

    enqueue(&q, 4);
    enqueue(&q, 5);
    display(&q);

    return 0;
}
`;

export default function CircularQueuePage() {
  return (
    <div className="space-y-8">
      <section className="mb-8 p-6 bg-card rounded-lg border border-border shadow-sm">
        <h1 className="text-3xl font-bold mb-6">Circular Queue</h1>
        <p className="mb-4">
          A <strong>Circular Queue</strong> is an advanced implementation of a
          queue that addresses some limitations of a simple queue. It&apos;s
          also known as a &quot;Ring Buffer&quot; because it conceptually wraps
          around to form a circle.
        </p>
        <p className="mb-4">Key characteristics of a Circular Queue:</p>
        <ul className="list-disc list-inside mb-4 pl-4">
          <li>
            It efficiently uses storage, unlike a simple queue implementation
          </li>
          <li>
            The last element points to the first element, forming a circular
            structure
          </li>
          <li>It follows the FIFO (First In First Out) principle</li>
          <li>
            It solves the problem of unutilized space in a simple queue
            implementation
          </li>
        </ul>
      </section>

      <section className="mb-8 p-6 bg-card rounded-lg border border-border shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">
          Circular Queue Operations
        </h2>
        <ul className="list-disc list-inside mb-4 pl-4">
          <li>
            <strong>Enqueue:</strong> Add an element to the rear of the queue
          </li>
          <li>
            <strong>Dequeue:</strong> Remove and return the element at the front
            of the queue
          </li>
          <li>
            <strong>Front:</strong> Get the front element of the queue without
            removing it
          </li>
          <li>
            <strong>IsEmpty:</strong> Check if the queue is empty
          </li>
          <li>
            <strong>IsFull:</strong> Check if the queue is full
          </li>
        </ul>
      </section>

      <section className="mb-8 p-6 bg-card rounded-lg border border-border shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">
          Interactive Circular Queue Demonstration
        </h2>
        <p className="mb-4">
          Explore the behavior of a circular queue with this interactive
          visualization:
        </p>
        <CircularQueueVisualization />
      </section>

      <section className="mb-8 p-6 bg-card rounded-lg border border-border shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">C Code Implementation</h2>
        <p className="mb-4">
          Here&apos;s an example implementation of a Circular Queue in C:
        </p>
        <CodeBlock code={circularQueueCode} language="c" />
        <p className="mt-4">
          This implementation uses an array to store the queue elements and
          keeps track of the front, rear, and size. The modulo operation is used
          to wrap around the array indices, creating the circular behavior.
        </p>
      </section>

      <section className="mb-8 p-6 bg-card rounded-lg border border-border shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">
          Advantages of Circular Queues
        </h2>
        <ul className="list-disc list-inside mb-4 pl-4">
          <li>
            <strong>Better Memory Utilization:</strong> Reuses the empty spaces
            created by dequeue operations
          </li>
          <li>
            <strong>Prevents Overflow:</strong> As long as there&apos;s at least
            one empty space, enqueue operation can be performed
          </li>
          <li>
            <strong>Efficient for Circular Operations:</strong> Ideal for
            applications that require repeated cycling through elements
          </li>
        </ul>
      </section>

      <section className="mb-8 p-6 bg-card rounded-lg border border-border shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">
          Applications of Circular Queues
        </h2>
        <p className="mb-4">
          Circular queues are used in various real-world applications,
          including:
        </p>
        <ul className="list-disc list-inside mb-4 pl-4">
          <li>
            <strong>Traffic Light Control:</strong> Managing the cycling of
            traffic light phases
          </li>
          <li>
            <strong>CPU Scheduling:</strong> In operating systems for
            round-robin scheduling
          </li>
          <li>
            <strong>Audio/Video Streaming:</strong> Buffering data for smooth
            playback
          </li>
          <li>
            <strong>Memory Management:</strong> In embedded systems with limited
            memory
          </li>
        </ul>
      </section>
    </div>
  );
}
