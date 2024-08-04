"use client";

import Link from "next/link";
import React, { useState } from "react";

const page = () => {

  return (
    <main className="flex items-center justify-center absolute top-1/2 w-full h-screen">
      <Link
        className="btn-secondary-lg text-4xl"
        href={'/pages/revise/revising'}
      >
        Start Revision
      </Link>
    </main>
  );
};

export default page;
