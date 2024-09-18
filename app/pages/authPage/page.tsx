"use client"

import SignIn from "@/components/SignIn";
import SignUp from "@/components/SignUp";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
    const [formType, setFormType] = useState('signin')

    const { data: session } = useSession();
    const router = useRouter()

    useEffect(() => {
      if (session?.user.id) {
        router.push('/')
      }
    }, [session])

  return (
    <main className="flex flex-col lg:flex-row w-9/12 mx-auto my-10 justify-center items-center gap-6">
      <div className="pt-10">
      {formType === "signin" ? (
        <SignIn setFormType={setFormType} />
      ) : (
        <SignUp setFormType={setFormType} />
      )}
      </div>
    </main>
  );
};

export default Page;
