import React from 'react'
import SearchBar from './SearchBar'
import Cards from './Cards'

const CardsDisplay = () => {
  return (
    <section className='w-full p-2'>
        <SearchBar />
        <Cards />
    </section>
  )
}

export default CardsDisplay