"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

type Provider = "github";

export const login = async (provider: Provider) => {
  redirect(`/api/auth/signin/${provider}?callbackUrl=/auth/callback`);
};

export const logout = async () => {
  redirect("/api/auth/signout");
};
