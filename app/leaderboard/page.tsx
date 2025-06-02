"use client";

import { motion } from "framer-motion";
import { getAllUsers, User } from "@/actions/user";
import { useState, useEffect } from "react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

export default function LeaderboardPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getAllUsers()
      .then((users) => setUsers(users))
      .then((users) => console.log(users))
      .catch((e) => setError("can't fetch users" + e));
  }, []);

  if (error) {
    return <div>{error}</div>;
  } else {
    return (
      <div className="container mx-auto px-4 py-8">
        <motion.h1
          className="text-3xl font-bold mb-6 text-primary"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Leaderboard
        </motion.h1>
        <motion.div
          className="bg-card rounded-lg shadow-lg overflow-hidden"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-primary text-primary-foreground">
                <th className="p-2 text-left">Rank</th>
                <th className="p-2 text-left">Username</th>
                <th className="p-2 text-right">Queues Score</th>
                <th className="p-2 text-right">Recursion Score</th>
                <th className="p-2 text-right">Total Score</th>
              </tr>
            </thead>
            <tbody>
              {users
                .sort(
                  (a, b) =>
                    b.queue_score +
                    b.recursion_score -
                    a.queue_score -
                    a.recursion_score
                )
                .map((user, index) => (
                  <motion.tr
                    key={user.id ?? `user-${index}`}
                    className="border-b border-border"
                    variants={itemVariants}
                  >
                    <td className="p-2">{index + 1}</td>
                    <td className="p-2">{user.user_name}</td>
                    <td className="p-2 text-right">{user.queue_score}</td>
                    <td className="p-2 text-right">{user.recursion_score}</td>
                    <td className="p-2 text-right">
                      {user.queue_score + user.recursion_score}
                    </td>
                  </motion.tr>
                ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    );
  }
}
