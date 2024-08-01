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
    <nav className="flex justify-between py-4 px-6 items-center">
      <Link href={"/"} className="text-2xl">
        <img src="/logos/water logo 1.jpg" className="w-28 h-28 rounded-full" />
      </Link>
      {session?.user ? (
        <div className="flex gap-5 justify-center items-center">
          <Link href={"/pages/createCard"} className="btn-primary">
            Create a new card
          </Link>
          <Link href={"/pages/revise"}>Revise</Link>
          <Link href={"/pages/cardLibrary"}>Your collection</Link>
          <button className="btn-primary" onClick={() => signOut()}>Sign out</button>
        </div>
      ) : (
        <div className="flex gap-5 justify-center items-center">
          <a className="btn-primary" href={"/pages/authPage"}>Sign in</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
