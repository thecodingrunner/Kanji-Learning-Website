"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const page = () => {

  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (!session?.user.id) {
      router.push('/')
    }
  }, [])

  // General revision landing page, relocate to the revising page when the button is pressed
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
