"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Page = () => {

  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "loading") return; // Don't run effect while session is loading
    if (!session?.user?.id) {
      router.push("/");
    }
  }, [session, status, router]);

  // General revision landing page, relocate to the revising page when the button is pressed
  return (
    <main className="flex items-center justify-center w-full h-screen">
      <Link
        className="btn-secondary-lg text-4xl"
        href={'/pages/revise/revising'}
      >
        Start Revision
      </Link>
    </main>
  );
};

export default Page;
