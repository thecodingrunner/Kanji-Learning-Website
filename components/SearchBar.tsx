"use client"

import { useRouter, useSearchParams } from 'next/navigation';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { FaSearch } from "react-icons/fa";
import { TiTick } from "react-icons/ti";


const SearchBar = () => {

  const searchParams = useSearchParams(); 
  const search = searchParams.get('search');

  const router = useRouter();

  // const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   if (searchInput === '') {
  //     return alert('Please fill in the search bar')
  //   }

  //   updateSearchParams(searchInput.toLowerCase())
  // }

  const updateSearchParams = (searchInput: string) => {
    const searchParams = new URLSearchParams(window.location.search);

    if (searchInput) {
      searchParams.set('search', searchInput)
    } else {
      searchParams.delete('search')
    }

    const newPathname = `${window.location.pathname}?${searchParams.toString()}`

    router.push(newPathname)

    console.log(searchParams)
  }

  return (
    <div className='flex justify-center gap-3 m-4 items-center'>
        {/* <form className='input flex gap-2 items-center justify-center text-blue-500 bg-white p-2' onSubmit={handleSearch} >
            <input type='text' value={searchInput} placeholder='Search for a kanji' className='focus:outline-blue-500 text-blue-500 text-xl' onChange={(e) => setSearchInput(e.target.value)}/>
            <button type='submit' className='text-2xl'><FaSearch /></button>
        </form> */}
        
        <div className='flex gap-3 items-center justify-center text-xl flex-wrap'>
            <button className={`${search === 'New' ? 'btn-primary' : 'btn-secondary'} flex items-center`} onClick={() => updateSearchParams('New')}>{search === 'New' && <TiTick className='text-xl' />} New</button>
            <button className={`${search === 'Popular ascending' ? 'btn-primary' : 'btn-secondary'} flex items-center`} onClick={() => updateSearchParams('Popular ascending')}>{search === 'Popular ascending' && <TiTick className='text-xl' />} Popular ascending</button>
            <button className={`${search === 'Popular descending' ? 'btn-primary' : 'btn-secondary'} flex items-center`} onClick={() => updateSearchParams('Popular descending')}>{search === 'Popular descending' && <TiTick className='text-xl' />} Popular descending</button>
            <button className={`${search === 'Rating' ? 'btn-primary' : 'btn-secondary'} flex items-center`} onClick={() => updateSearchParams('Rating')}>{search === 'Rating' && <TiTick className='text-xl' />} Highest rating</button>
        </div>
    </div>
  )
}

export default SearchBar