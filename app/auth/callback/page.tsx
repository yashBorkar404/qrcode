import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { postUser } from "@/actions/user";

const AuthCallback = async () => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.id || !session.user.name) {
    console.error("No session found");
    redirect("/sign-in");
  }

  try {
    await postUser(session.user.id, session.user.name);
  } catch (error) {
    console.error("An error occurred while creating user", error);
  }

  redirect("/");
};

export default AuthCallback;
