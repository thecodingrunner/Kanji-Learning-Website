"use client"

import { useRouter } from 'next/navigation';
import React, { Dispatch, SetStateAction, useState } from 'react'
import { FaSearch } from "react-icons/fa";
import { TiTick } from "react-icons/ti";

// Define the prop types
interface SearchProps {
  filter: string;
  setFilter: Dispatch<SetStateAction<string>>;
}

const SearchBar: React.FC<SearchProps> = ({ filter, setFilter }) => {

  const [searchInput, setSearchInput] = useState<string>('')

  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (searchInput === '') {
      return alert('Please fill in the search bar')
    }

    updateSearchParams(searchInput.toLowerCase())
  }

  const updateSearchParams = (searchInput: string) => {
    const searchParams = new URLSearchParams(window.location.search);

    if (searchInput) {
      searchParams.set('search', searchInput)
    } else {
      searchParams.delete('search')
    }

    const newPathname = `${window.location.pathname}?${searchParams.toString()}`

    router.push(newPathname)
  }

  return (
    <div className='flex justify-between gap-3 m-4 items-center'>
        <form className='input flex gap-2 items-center justify-center text-blue-500 bg-white p-2' onSubmit={handleSearch} >
            <input type='text' value={searchInput} placeholder='Search for a kanji' className='focus:outline-blue-500 text-blue-500 text-xl' onChange={(e) => setSearchInput(e.target.value)}/>
            <button type='submit' className='text-2xl'><FaSearch /></button>
        </form>
        
        <div className='flex gap-3 items-center justify-center text-xl'>
            <button className={`${filter === 'New' ? 'btn-primary' : 'btn-secondary'} flex items-center`} onClick={() => setFilter('New')}>{filter === 'New' && <TiTick className='text-xl' />} New</button>
            <button className={`${filter === 'Popular ascending' ? 'btn-primary' : 'btn-secondary'} flex items-center`} onClick={() => setFilter('Popular ascending')}>{filter === 'Popular ascending' && <TiTick className='text-xl' />} Popular ascending</button>
            <button className={`${filter === 'Popular descending' ? 'btn-primary' : 'btn-secondary'} flex items-center`} onClick={() => setFilter('Popular descending')}>{filter === 'Popular descending' && <TiTick className='text-xl' />} Popular descending</button>
            <button className={`${filter === 'Rating' ? 'btn-primary' : 'btn-secondary'} flex items-center`} onClick={() => setFilter('Rating')}>{filter === 'Rating' && <TiTick className='text-xl' />} Rating</button>
        </div>
    </div>
  )
}

export default SearchBar