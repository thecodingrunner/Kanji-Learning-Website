"use client"

import CreateKanjiForm from '@/components/CreateKanjiForm'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

// This will allow for the creation of general kanji cards without any specific boilerplate

const Page = () => {

  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "loading") return; // Don't run effect while session is loading
    if (!session?.user?.id) {
      router.push("/");
    }
  }, [session, status, router]);

  return (
    <CreateKanjiForm />
  )
}

export default Page