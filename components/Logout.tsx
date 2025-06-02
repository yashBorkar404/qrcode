"use client";
import { logout } from "@/actions/auth";

const Logout = () => {
  return (
    <div onClick={() => logout()}>
      <div className="cursor-pointer rounded-md bg-gray-600 px-4 py-2 text-sm text-white">
        logout
      </div>
    </div>
  );
};

export default Logout;
