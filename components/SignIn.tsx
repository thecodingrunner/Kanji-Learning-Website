"use client";

import React, { SyntheticEvent, useEffect, useState } from "react";
import google from "../public/icons/google-icon.svg";

import { getProviders, signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const SignIn = ({ setFormType }: any) => {
  const [providers, setProviders] = useState<any>(null);

  // Access session
  const { data: session } = useSession();

  // Instantiate router
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Set up providers on page load
  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      console.log(response);

      setProviders(response);
    };

    setUpProviders();
  }, []);

  // Log in function
  async function signin(e: SyntheticEvent) {
    e.preventDefault();

    try {
      const result = await signIn("credentials", {
        username: username,
        password: password,
        redirect: false,
      });

      if (result?.error) {
        console.log("Failed to log in", result.error);
      } else {
        router.push("/");
      }
    } catch (error) {
      console.log("Failed to log in", error);
    }
  }

  return (
    <div className="shadow-2xl py-6 px-10 bg-blue-500 text-white">
      <h1 className="text-3xl font-semibold">Sign in</h1>
      <h3 className="pb-6">Get started scanning books</h3>

      {/* Username and Password login form */}
      <form onSubmit={(e) => signin(e)} className="gap-4 flex flex-col">
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="px-2 py-1 text-black"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="px-2 py-1 text-black"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
        <button type="submit" className="w-full font-bold">
          Sign in
        </button>
      </form>

      <p className="w-full text-center my-4">or</p>

      {/* If already logged in with provider, display log out with provider option */}
      {/* If not yet logged in with provided, display log in with provider option */}
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
                  onClick={async () => {
                    signIn(provider.id);
                  }}
                >
                  <img
                    src={google.src}
                    className="h-6 mr-2"
                    alt="google icon"
                  />
                  Sign in with Google
                </button>
              ))}
        </div>
      )}

      {/* Link to Sign up section */}
      <p className="mt-4">
        Don't have an account yet?{" "}
        <button onClick={() => setFormType("signup")} className="underline">
          Sign up
        </button>
      </p>
    </div>
  );
};

export default SignIn;
