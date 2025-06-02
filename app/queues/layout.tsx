import Link from "next/link";

export default function QueuesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Queues</h1>
      <div className="flex flex-wrap mb-6">
        <Link
          href="/queues/simple"
          className="mr-4 mb-2 text-blue-600 hover:underline"
        >
          Simple Queue
        </Link>
        <Link
          href="/queues/circular"
          className="mr-4 mb-2 text-blue-600 hover:underline"
        >
          Circular Queue
        </Link>
        <Link
          href="/queues/priority"
          className="mr-4 mb-2 text-blue-600 hover:underline"
        >
          Priority Queue
        </Link>
        <Link
          href="/queues/deque"
          className="mr-4 mb-2 text-blue-600 hover:underline"
        >
          Double-ended Queue
        </Link>
      </div>
      {children}
    </div>
  );
}
