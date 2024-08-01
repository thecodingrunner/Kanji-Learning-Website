"use client"

import React, { Dispatch, SetStateAction, useState } from 'react'
import { FaSearch } from "react-icons/fa";
import { TiTick } from "react-icons/ti";

// Define the prop types
interface SearchProps {
  filter: string;
  setFilter: Dispatch<SetStateAction<string>>;
}

const SearchBar: React.FC<SearchProps> = ({ filter, setFilter }) => {

  return (
    <div className='flex justify-between gap-3 m-4'>
        <form className='input flex gap-2 items-center justify-center text-blue-500' onClick={() => {}} >
            <input type='text' placeholder='Search for a kanji' className='focus:outline-blue-500'/>
            <button type='submit'><FaSearch /></button>
        </form>
        
        <div className='flex gap-3 items-center justify-center'>
            <button className={`${filter === 'New' ? 'btn-primary' : 'btn-secondary'} flex items-center`} onClick={() => setFilter('New')}>{filter === 'New' && <TiTick className='text-xl' />} New</button>
            <button className={`${filter === 'Popular ascending' ? 'btn-primary' : 'btn-secondary'} flex items-center`} onClick={() => setFilter('Popular ascending')}>{filter === 'Popular ascending' && <TiTick className='text-xl' />} Popular ascending</button>
            <button className={`${filter === 'Popular descending' ? 'btn-primary' : 'btn-secondary'} flex items-center`} onClick={() => setFilter('Popular descending')}>{filter === 'Popular descending' && <TiTick className='text-xl' />} Popular descending</button>
            <button className={`${filter === 'Rating' ? 'btn-primary' : 'btn-secondary'} flex items-center`} onClick={() => setFilter('Rating')}>{filter === 'Rating' && <TiTick className='text-xl' />} Rating</button>
        </div>
    </div>
  )
}

export default SearchBar