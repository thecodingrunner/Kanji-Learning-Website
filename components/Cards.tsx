import React from 'react'
import flame from '../public/flame.jpg'
import Image from 'next/image'
import Link from 'next/link'

interface cardsArrayInterface {
    kanji: string,
    word: string,
    imageUrl: string,
    notes: string,
}

const cardsArray = [
    {
        kanji: '炎',
        word: 'flame',
        imageUrl: '/flame.jpg',
        notes: 'Notes about the kanji',
    },
    {
        kanji: '炎',
        word: 'flame',
        imageUrl: '/flame.jpg',
        notes: 'Notes about the kanji',
    },
    {
        kanji: '炎',
        word: 'flame',
        imageUrl: '/flame.jpg',
        notes: 'Notes about the kanji',
    },
    {
        kanji: '炎',
        word: 'flame',
        imageUrl: '/flame.jpg',
        notes: 'Notes about the kanji',
    },
    {
        kanji: '炎',
        word: 'flame',
        imageUrl: '/flame.jpg',
        notes: 'Notes about the kanji',
    },
]

const Cards = () => {
  return (
    <section className='grid grid-cols-5 m-4 gap-2'> 
        {cardsArray && cardsArray.map(({kanji, word, imageUrl, notes}: cardsArrayInterface) => (
            <Link className='relative border-black rounded-md' key={kanji} href={`/pages/${word}`}>
                <img src={imageUrl} alt='' className=''/>
                <div className='absolute left-0 top-0 w-full h-full flex items-center justify-center flex-col bg-opacity-20 bg-black'>
                    <h3 className='text-9xl text-white'>{kanji}</h3>
                    <h2 className='text-2xl text-white font-semibold'>{word}</h2>
                </div>
            </Link>
        ))}
    </section>
  )
}

export default Cards