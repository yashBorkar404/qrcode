"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export interface User {
  id: string;
  user_name: string;
  queue_score: number;
  recursion_score: number;
}

export const postUser = async (userId: string, user_name: string) => {
  try {
    const res = await fetch(
      process.env.BACKEND_URL + `/user/${userId}?user_name=${user_name}`,
      {
        method: "POST",
      },
    );

    if (!res.ok) {
      throw new Error("Failed to create user in backend");
    }
  } catch (error) {
    throw error;
  }
};

export const setUserScore = async (
  topic: "queue" | "recursion",
  score: number,
) => {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  if (!userId) {
    throw new Error("User not found");
  }
  try {
    const res = await fetch(
      process.env.BACKEND_URL + `/user/${userId}/${topic}?score=${score}`,
      {
        method: "PUT",
      },
    );

    if (!res.ok) {
      throw new Error("Failed to update user in backend");
    }
  } catch (error) {
    throw error;
  }
};

export const getAllUsers = async () => {
  try {
    const res = await fetch(process.env.BACKEND_URL + "/users");
    if (!res.ok) {
      throw new Error("Failed to fetch users from backend");
    }
    const users_array_array = await res.json();
    const users_array: User[] = [];
    users_array_array.forEach(
      (user_array: [string, string, number, number]) => {
        const user: User = {
          id: user_array[0],
          user_name: user_array[1],
          queue_score: Number(user_array[2]),
          recursion_score: Number(user_array[3]),
        };
        users_array.push(user);
      },
    );
    return users_array;
  } catch (error) {
    throw error;
  }
};
