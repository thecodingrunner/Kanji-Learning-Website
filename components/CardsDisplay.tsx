"use client"

import React, { useState } from 'react'
import SearchBar from './SearchBar'
import Cards from './Cards'

const CardsDisplay = () => {
  const [filter, setFilter] = useState('New');

  return (
    <section className='w-full p-2'>
        <SearchBar filter={filter} setFilter={setFilter} />
        <Cards filter={filter} setFilter={setFilter} />
    </section>
  )
}

export default CardsDisplay