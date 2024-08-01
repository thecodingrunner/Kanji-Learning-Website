"use client"

import SignIn from "@/components/SignIn";
import SignUp from "@/components/SignUp";
import React, { useState } from "react";

const page = () => {
    const [formType, setFormType] = useState('signin')

  return (
    <main className="flex flex-col lg:flex-row w-9/12 mx-auto my-10 justify-center items-center gap-6">
      <div className="flex flex-col gap-5 justify-center">
      </div>
      {formType === "signin" ? (
        <SignIn setFormType={setFormType} />
      ) : (
        <SignUp setFormType={setFormType} />
      )}
    </main>
  );
};

export default page;
