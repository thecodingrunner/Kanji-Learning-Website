"use client"

import CreateKanjiForm from '@/components/CreateKanjiForm'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

// This will allow for the creation of general kanji cards without any specific boilerplate

const page = () => {

  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (!session?.user.id) {
      router.push('/')
    }
  }, [])

  return (
    <CreateKanjiForm />
  )
}

export default page