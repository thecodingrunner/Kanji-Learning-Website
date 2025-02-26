"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const { data: session } = useSession();

  const [toggleMenu, setToggleMenu] = useState<boolean>(false)

  return (
    <nav className="flex justify-between gap-8 py-4 px-12 items-center hero-gradient m-2 rounded-3xl shadow-xl">
      {/* Logo and website name */}
      <Link
          href={"/"} className="flex sm:flex-row flex-col gap-4 items-center justify-center">
        <div
          className="text-2xl bg-white rounded-full p-2 shadow-xl"
        >
          <img
            src="/logos/water logo 1.jpg"
            className="w-28 h-28 rounded-full"
          />
        </div>
        <h1 className="text-5xl text-white font-bold">Kanjify</h1>
      </Link>

      {/* Display different buttons and links depending on whether logged in or not */}
      {session?.user ? (
        <>
          <div className="hidden lg:flex gap-5 justify-center items-center text-lg">
            <Link href={"/pages/createCard"} className="btn-white">
              Create a new card
            </Link>
            <Link href={"/pages/revise"} className="text-white">
              Revise
            </Link>
            <Link href={"/pages/browse"} className="text-white">
              Browse
            </Link>
            <Link href={"/pages/cardLibrary"} className="text-white">
              Your collection
            </Link>
            <button className="btn-white" onClick={() => signOut()}>
              Sign out
            </button>
          </div>

          <div className="lg:hidden text-5xl justify-center items-center flex text-white" onClick={() => setToggleMenu(prev => !prev)}>
            <GiHamburgerMenu />
          </div>

          {toggleMenu && (
            <div className="absolute top-[20vh] z-50 right-2 flex flex-col lg:hidden gap-5 justify-center items-center text-lg hero-gradient rounded-lg p-5 shadow-lg">
            <Link href={"/pages/createCard"} className="btn-white">
              Create a new card
            </Link>
            <Link href={"/pages/revise"} className="text-white">
              Revise
            </Link>
            <Link href={"/pages/browse"} className="text-white">
              Browse
            </Link>
            <Link href={"/pages/cardLibrary"} className="text-white">
              Your collection
            </Link>
            <button className="btn-white" onClick={() => signOut()}>
              Sign out
            </button>
          </div>
          )}
        </>
      ) : (
        <div className="flex gap-5 justify-center items-center">
          <a className="btn-white text-center" href={"/pages/authPage"}>
            Sign in
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
