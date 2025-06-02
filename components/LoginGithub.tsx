"use client";
import { login } from "@/actions/auth";
import React from "react";
import { Github } from "lucide-react";

const LoginGithub = () => {
  return (
    <div
      onClick={() => login("github")}
      className="mt-6 flex h-12 w-full items-center justify-center gap-4 rounded-md bg-black p-4 hover:cursor-pointer"
    >
      <Github className="text-white" />
      <p className="text-white">Login with Github</p>
    </div>
  );
};

export default LoginGithub;
