"use client"

import React, { useState } from 'react'
import SearchBar from './SearchBar'
import Cards from './Cards'

const CardsDisplay = () => {
  const [filter, setFilter] = useState('New');

  return (
    <section className='w-[80vw] my-10 p-2 mx-auto border-2 border-blue-500 rounded-lg'>
        <SearchBar filter={filter} setFilter={setFilter} />
        <Cards filter={filter} setFilter={setFilter} />
    </section>
  )
}

export default CardsDisplay