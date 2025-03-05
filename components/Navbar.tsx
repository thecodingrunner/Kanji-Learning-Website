"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { LuBrain } from "react-icons/lu";

const Navbar = () => {
  const { data: session } = useSession();

  const [toggleMenu, setToggleMenu] = useState<boolean>(false)

  return (
    <nav className={`${session?.user ? "py-3 fixed left-0 top-0 w-full bg-blue-500" : "rounded-3xl m-2 py-6 hero-gradient"} flex justify-between gap-8 px-12 items-center shadow-xl z-50`}>
      {/* Logo and website name */}
      {!session?.user && (
        <Link
            href={"/"} className="flex sm:flex-row flex-col gap-4 items-center justify-center">
            <div
              className="text-2xl bg-white rounded-full p-1 shadow-xl"
            >
              <img
                src="/logos/mountain logo 1.jpg"
                className="w-20 h-20 rounded-full"
              />
            </div>
            <h1 className="text-6xl text-white font-bold">Kanjify</h1>
        </Link>
      )}
      {session?.user && (
        <Link
          href={"/pages/profile"} className="flex sm:flex-row flex-col gap-4 items-center justify-center">
          <h1 className="text-4xl text-white font-bold">Kanjify</h1>
        </Link>
      )}

      {/* Display different buttons and links depending on whether logged in or not */}
      {session?.user ? (
        <>
          <div className="hidden gap-5 justify-center items-center text-lg">
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
            <Link href={"/pages/profile"} className="text-white">
              Profile
            </Link>
            <button className="btn-white" onClick={() => signOut()}>
              Sign out
            </button>
          </div>

          <div className="flex gap-4 justify-center items-center">
            {/* <div className="rounded-full h-auto w-auto overflow-hidden">
              <Image
                src={`${session?.user.image}`}
                alt=""
                className="object-cover w-full h-full object-center"
                width={250}
                height={250}
              />
            </div> */}
            <div className="text-5xl justify-center items-center flex text-white" onClick={() => setToggleMenu(prev => !prev)}>
              <GiHamburgerMenu />
            </div>
          </div>

          {toggleMenu && (
            <div className="absolute top-[10vh] z-50 right-2 flex flex-col gap-5 justify-center items-center text-lg bg-blue-500 rounded-lg p-5 shadow-lg">
              <Link href={"/pages/profile"} className="text-white" onClick={() => setToggleMenu(prev => !prev)}>
                Profile
              </Link>
              <Link href={"/pages/revise"} className="text-white flex justify-center items-center gap-2" onClick={() => setToggleMenu(prev => !prev)}>
                Revise
                {/* <LuBrain /> */}
              </Link>
              <Link href={"/pages/cardLibrary"} className="text-white" onClick={() => setToggleMenu(prev => !prev)}>
                Your collection
              </Link>
              <Link href={"/pages/browse"} className="text-white" onClick={() => setToggleMenu(prev => !prev)}>
                Browse
              </Link>
              <Link href={"/pages/createCard"} className="btn-white" onClick={() => setToggleMenu(prev => !prev)}>
                Create a new card
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
