"use client"

import React, { useEffect, useState } from 'react'
import flame from '../public/flame.jpg'
import Image from 'next/image'
import Link from 'next/link'

interface cardsArrayInterface {
    kanji: string,
    onyomi: string,
    kunyomi: string,
    keyword: string,
    imageUrl: string,
}

// const cardsArray = [
//     {
//         kanji: '炎',
//         word: 'flame',
//         imageUrl: '/flame.jpg',
//         notes: 'Notes about the kanji',
//     },
//     {
//         kanji: '炎',
//         word: 'flame',
//         imageUrl: '/flame.jpg',
//         notes: 'Notes about the kanji',
//     },
//     {
//         kanji: '炎',
//         word: 'flame',
//         imageUrl: '/flame.jpg',
//         notes: 'Notes about the kanji',
//     },
//     {
//         kanji: '炎',
//         word: 'flame',
//         imageUrl: '/flame.jpg',
//         notes: 'Notes about the kanji',
//     },
//     {
//         kanji: '炎',
//         word: 'flame',
//         imageUrl: '/flame.jpg',
//         notes: 'Notes about the kanji',
//     },
// ]

const Cards = () => {

    const [cardsArray, setCardsArray] = useState<[cardsArrayInterface]>([{
        kanji: '',
        onyomi: '',
        kunyomi: '',
        keyword: '',
        imageUrl: '',
    }])

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch('/api/card');
            const data = await response.json();
            console.log(data)

            setCardsArray(data)
        }

        fetchPosts()

    },[])

  return (
    <section className='grid grid-cols-5 m-4 gap-2'> 
        {cardsArray && cardsArray.map(({kanji, keyword, imageUrl}: cardsArrayInterface) => (
            <Link className='relative h-60 border-black rounded-md overflow-hidden' key={kanji} href={`/pages/${keyword}`}>
                <img src={imageUrl} alt='' className='object-cover h-full object-center'/>
                <div className='absolute left-0 top-0 w-full h-full flex items-center justify-center flex-col bg-opacity-40 bg-black'>
                    <h3 className='text-9xl text-white'>{kanji}</h3>
                    <h2 className='text-2xl text-white font-semibold'>{keyword}</h2>
                </div>
            </Link>
        ))}
    </section>
  )
}

export default Cards