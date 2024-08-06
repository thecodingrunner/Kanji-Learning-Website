"use client";

import Link from "next/link";
import React, { useState } from "react";

const page = () => {

  return (
    <main className="flex items-center justify-center w-full h-[60vh]">
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
