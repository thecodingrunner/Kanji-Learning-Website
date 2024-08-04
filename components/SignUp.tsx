"use client";
import React, { SyntheticEvent, useEffect, useState } from "react";
import Link from "next/link";
import google from "../public/icons/google-icon.svg";

import { getProviders, signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const SignUp = ({ setFormType }: any) => {
  const [providers, setProviders] = useState<any>(null);
  const { data: session } = useSession();

  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      console.log(response);

      setProviders(response);
    };

    setUpProviders();
  }, []);

  async function register(e: SyntheticEvent) {
    // const result = await signIn("credentials", {
    //   username: values.username,
    //   password: values.password,
    //   redirect: false,
    // });
    e.preventDefault();

    const user = {
      username,
      password,
    };

    console.log(user);

    const result = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!result.ok) {
      console.error("failed to register");
    } else {
      router.push("/");
    }

    setFormType("signin");
  }

  return (
    <div className="shadow-2xl py-6 px-10 bg-blue-500 text-white">
      <h1 className="text-3xl font-semibold">Sign up</h1>
      <h3 className="pb-6">Get started scanning books</h3>
      <form onSubmit={(e) => register(e)} className="gap-4 flex flex-col">
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="px-2 py-1"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="px-2 py-1"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button type="submit" className="w-full font-bold">
          Sign up
        </button>
      </form>
      <p className="w-full text-center my-4">or</p>
      {session?.user ? (
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="w-full text-black bg-white p-2 flex justify-center gap-1 rounded-lg"
            onClick={() => signOut()}
          >
            <img src={google.src} className="h-6 mr-2" alt="google icon" />
            Sign out with Google
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          {providers &&
            Object.values(providers)
              .filter((provider: any) => provider.name === "Google")
              .map((provider: any) => (
                <button
                  type="button"
                  className="w-full text-black bg-white p-2 flex justify-center gap-1 rounded-lg"
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                    router.push("/");
                  }}
                >
                  <img
                    src={google.src}
                    className="h-6 mr-2"
                    alt="google icon"
                  />
                  Sign up with Google
                </button>
              ))}
        </div>
      )}
      <p className="mt-4">
        Already have an account?{" "}
        <button onClick={() => setFormType("signin")} className="underline">
          Sign In
        </button>
      </p>
    </div>
  );
};

export default SignUp;
