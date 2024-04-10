"use client"

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const { data: session } = useSession();

  const handleLogout = async () => {
    await signOut({ redirect: "false" , callbackUrl: '/' });
  };

  return (
    <nav className="flex justify-between items-center w-full align-middle bg-purple-700 px-8 py-3 gap-2 max-sm:px-1 relative">
      <Link className="text-white font-bold text-xl max-sm:text-sm align-middle " href={"/"}>
        Task Management
      </Link>
      {session ? (
        <>
          <Link className="bg-white rounded-md font-semibold p-2 max-sm:p-1 text-md max-sm:text-sm " href={"/seeTasks"}>
            <h1 className="flex justify-center items-center">See Tasks</h1>
          </Link>
          <Link className="bg-white rounded-md font-semibold p-2 max-sm:p-1 text-md max-sm:text-sm" href={"/addTopic"}>
            Add Tasks
          </Link>
          <button onClick={handleLogout} className="bg-white rounded-md font-semibold p-2 max-sm:p-1 text-md max-sm:text-sm hover:underline">
            Logout
          </button>
        </>
      ) : (
        <Link className="bg-white p-2 rounded-md font-semibold hover:underline" href={"/login"}>
          Login
        </Link>
      )}
    </nav>
  );
}
