"use server";

import { signIn, signOut } from "@/lib/auth";
import { revalidatePath } from "next/cache";

type Provider = "github";

export const login = async (provider: Provider) => {
  await signIn(provider, { redirectTo: "/auth/callback" });
};

export const logout = async () => {
  await signOut();
  revalidatePath("/");
};
