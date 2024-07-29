import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between py-4 px-6 items-center'>
      <Link href={'/'} className='text-2xl'>
        <img src='/logos/water logo 1.jpg' className='w-28 h-28 rounded-full' />
      </Link>
      <div className='flex gap-5 justify-center items-center'>
        <Link href={'/pages/createCard'} className='btn-primary'>Create a new card</Link>
        <Link href={'/pages/revise'}>Revise</Link>
        <Link href={'/pages/cardLibrary'}>Your collection</Link>
        <button className='btn-primary'>Sign In</button>
        <button className='btn-secondary'>Register</button>
      </div>
    </nav>
  )
}

export default Navbar