"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const Navbar = () => {
  const { data: session } = useSession();
  // const session = {user: true}
  const router = useRouter();

  return (
    <nav className="flex justify-between py-4 px-6 items-center bg-blue-500 m-2 rounded-3xl shadow-xl">
      <Link href={"/"} className="text-2xl bg-white rounded-full p-2 shadow-xl">
        <img src="/logos/water logo 1.jpg" className="w-28 h-28 rounded-full" />
      </Link>
      {session?.user ? (
        <div className="flex gap-5 justify-center items-center">
          <Link href={"/pages/createCard"} className="btn-white">
            Create a new card
          </Link>
          <Link href={"/pages/revise"} className="text-white">Revise</Link>
          <Link href={"/pages/cardLibrary"} className="text-white">Your collection</Link>
          <button className="btn-white" onClick={() => signOut()}>Sign out</button>
        </div>
      ) : (
        <div className="flex gap-5 justify-center items-center">
          <a className="btn-white" href={"/pages/authPage"}>Sign in</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
