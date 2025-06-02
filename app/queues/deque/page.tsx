"use client";
import CodeBlock from "@/components/CodeBlock";
import DequeVisualization from "@/components/DequeVisualization";

const dequeCode = `
#include <stdio.h>
#include <stdlib.h>

#define MAX_SIZE 5

typedef struct {
    int items[MAX_SIZE];
    int front;
    int rear;
    int size;
} Deque;

void initializeDeque(Deque *d) {
    d->front = -1;
    d->rear = 0;
    d->size = 0;
}

int isFull(Deque *d) {
    return d->size == MAX_SIZE;
}

int isEmpty(Deque *d) {
    return d->size == 0;
}

void addFront(Deque *d, int value) {
    if (isFull(d)) {
        printf("Deque is full!\\n");
        return;
    }
    if (d->front == -1) {
        d->front = 0;
        d->rear = 0;
    } else if (d->front == 0) {
        d->front = MAX_SIZE - 1;
    } else {
        d->front--;
    }
    d->items[d->front] = value;
    d->size++;
    printf("%d added to the front\\n", value);
}

void addRear(Deque *d, int value) {
    if (isFull(d)) {
        printf("Deque is full!\\n");
        return;
    }
    if (d->front == -1) {
        d->front = 0;
        d->rear = 0;
    } else if (d->rear == MAX_SIZE - 1) {
        d->rear = 0;
    } else {
        d->rear++;
    }
    d->items[d->rear] = value;
    d->size++;
    printf("%d added to the rear\\n", value);
}

int removeFront(Deque *d) {
    if (isEmpty(d)) {
        printf("Deque is empty!\\n");
        return -1;
    }
    int item = d->items[d->front];
    if (d->front == d->rear) {
        d->front = -1;
        d->rear = -1;
    } else if (d->front == MAX_SIZE - 1) {
        d->front = 0;
    } else {
        d->front++;
    }
    d->size--;
    printf("%d removed from the front\\n", item);
    return item;
}

int removeRear(Deque *d) {
    if (isEmpty(d)) {
        printf("Deque is empty!\\n");
        return -1;
    }
    int item = d->items[d->rear];
    if (d->front == d->rear) {
        d->front = -1;
        d->rear = -1;
    } else if (d->rear == 0) {
        d->rear = MAX_SIZE - 1;
    } else {
        d->rear--;
    }
    d->size--;
    printf("%d removed from the rear\\n", item);
    return item;
}

void display(Deque *d) {
    if (isEmpty(d)) {
        printf("Deque is empty\\n");
        return;
    }
    printf("Deque elements: ");
    int i = d->front;
    for (int count = 0; count < d->size; count++) {
        printf("%d ", d->items[i]);
        i = (i + 1) % MAX_SIZE;
    }
    printf("\\n");
}

int main() {
    Deque d;
    initializeDeque(&d);

    addFront(&d, 1);
    addRear(&d, 2);
    addFront(&d, 3);
    display(&d);

    removeFront(&d);
    display(&d);

    removeRear(&d);
    display(&d);

    addRear(&d, 4);
    addFront(&d, 5);
    display(&d);

    return 0;
}
`;

export default function DequePage() {
  return (
    <div className="space-y-8">
      <section className="mb-8 p-6 bg-card rounded-lg border border-border shadow-sm">
        <h1 className="text-3xl font-bold mb-6">Double-ended Queue (Deque)</h1>
        <p className="mb-4">
          A <strong>Double-ended Queue</strong>, often abbreviated as{" "}
          <strong>Deque</strong> (pronounced &quot;deck&quot;), is an abstract
          data type that generalizes a queue, for which elements can be added to
          or removed from either the front (head) or back (tail).
        </p>
        <p className="mb-4">Key characteristics of a Deque:</p>
        <ul className="list-disc list-inside mb-4 pl-4">
          <li>Elements can be added to both the front and rear</li>
          <li>Elements can be removed from both the front and rear</li>
          <li>Combines the functionality of both stacks and queues</li>
          <li>
            Provides more flexibility in how data is accessed and manipulated
          </li>
        </ul>
      </section>

      <section className="mb-8 p-6 bg-card rounded-lg border border-border shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">Deque Operations</h2>
        <ul className="list-disc list-inside mb-4 pl-4">
          <li>
            <strong>addFront / pushFront:</strong> Add an element to the front
            of the deque
          </li>
          <li>
            <strong>addRear / pushBack:</strong> Add an element to the rear of
            the deque
          </li>
          <li>
            <strong>removeFront / popFront:</strong> Remove and return the
            element at the front of the deque
          </li>
          <li>
            <strong>removeRear / popBack:</strong> Remove and return the element
            at the rear of the deque
          </li>
          <li>
            <strong>front / peekFront:</strong> View the element at the front of
            the deque without removing it
          </li>
          <li>
            <strong>rear / peekBack:</strong> View the element at the rear of
            the deque without removing it
          </li>
          <li>
            <strong>isEmpty:</strong> Check if the deque is empty
          </li>
          <li>
            <strong>isFull:</strong> Check if the deque is full (for bounded
            implementations)
          </li>
        </ul>
      </section>

      <section className="mb-8 p-6 bg-card rounded-lg border border-border shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">
          Interactive Deque Demonstration
        </h2>
        <p className="mb-4">
          Explore the behavior of a double-ended queue with this interactive
          visualization:
        </p>
        <DequeVisualization />
      </section>

      <section className="mb-8 p-6 bg-card rounded-lg border border-border shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">C Code Implementation</h2>
        <p className="mb-4">
          Here&apos;s an example implementation of a Deque in C:
        </p>
        <CodeBlock code={dequeCode} language="c" />
        <p className="mt-4">
          This implementation uses a circular array to efficiently manage the
          deque elements. The front and rear pointers wrap around the array,
          allowing for efficient use of space and constant-time operations at
          both ends.
        </p>
      </section>

      <section className="mb-8 p-6 bg-card rounded-lg border border-border shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">Applications of Deques</h2>
        <p className="mb-4">
          Deques are versatile data structures used in various applications,
          including:
        </p>
        <ul className="list-disc list-inside mb-4 pl-4">
          <li>
            <strong>Undo operations:</strong> Maintaining a history of
            operations that can be undone from the most recent
          </li>
          <li>
            <strong>Browser history:</strong> Implementing forward and backward
            navigation
          </li>
          <li>
            <strong>Palindrome checking:</strong> Efficiently checking if a
            string is a palindrome
          </li>
          <li>
            <strong>A-Steal job scheduling algorithm:</strong> Used in
            multi-threaded computations
          </li>
          <li>
            <strong>Implementing other data structures:</strong> Such as stacks
            and queues
          </li>
        </ul>
      </section>

      <section className="mb-8 p-6 bg-card rounded-lg border border-border shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">
          Advantages and Considerations
        </h2>
        <p className="mb-4">Advantages of using Deques:</p>
        <ul className="list-disc list-inside mb-4 pl-4">
          <li>Versatility: Can be used as both a stack and a queue</li>
          <li>Efficiency: Constant time operations at both ends</li>
          <li>
            Flexibility: Allows for more complex algorithms and data
            manipulations
          </li>
        </ul>
        <p className="mb-4">Considerations when using Deques:</p>
        <ul className="list-disc list-inside mb-4 pl-4">
          <li>
            Complexity: More complex to implement than simple queues or stacks
          </li>
          <li>
            Memory usage: May use more memory than specialized data structures
          </li>
          <li>
            Potential for misuse: The flexibility can lead to confusing or
            inefficient code if not used properly
          </li>
        </ul>
      </section>
    </div>
  );
}
