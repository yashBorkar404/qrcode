import Link from "next/link";

export default function RecursionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Recursion</h1>
      <div className="flex flex-wrap mb-6">
        <Link
          href="/recursion/factorial"
          className="mr-4 mb-2 text-blue-600 hover:underline"
        >
          Factorial
        </Link>
        <Link
          href="/recursion/fibonacci"
          className="mr-4 mb-2 text-blue-600 hover:underline"
        >
          Fibonacci
        </Link>
        <Link
          href="/recursion/tower-of-hanoi"
          className="mr-4 mb-2 text-blue-600 hover:underline"
        >
          Tower of Hanoi
        </Link>
      </div>
      {children}
    </div>
  );
}
