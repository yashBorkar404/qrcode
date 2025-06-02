import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Logout from "./Logout";
import ThemeToggle from "./ThemeToggle";
import Image from "next/image";

export async function Navbar() {
  const session = await getServerSession(authOptions);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Queues", path: "/queues" },
    { name: "Recursion", path: "/recursion" },
    { name: "Practice", path: "/practice" },
    { name: "Leaderboard", path: "/leaderboard" },
  ];

  return (
    <nav className="bg-background border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold text-primary">
            QRcode
          </Link>

          <div className="hidden md:flex space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="md:hidden lg:hidden space-x-4">
            <Link
              href={"/leaderboard"}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              {"Leaderboard"}
            </Link>
            <Link
              href={"/practice"}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              {"Practice"}
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {!session?.user ? (
              <Link href="/sign-in">
                <div className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors duration-200">
                  Login
                </div>
              </Link>
            ) : (
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium text-muted-foreground">
                  {session.user.name}
                </span>
                {session.user.image && (
                  <Image
                    className="h-8 w-8 rounded-full border border-border"
                    alt="User Avatar"
                    width={32}
                    height={32}
                    src={session.user.image || "/placeholder.svg"}
                  />
                )}
                <Logout />
              </div>
            )}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
