import React, { useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'
import { useResultContext } from '../../contexts/ResultContextProvider'

const Search = () => {
  const [text, setText] = useState('corgi');
  const { setSearchTerm } = useResultContext();
  const [debouncedValue] = useDebounce(text, 500);

  useEffect(() => {
    if (debouncedValue) setSearchTerm(debouncedValue)
  }, [debouncedValue])

  return (
    <div className='relative sm:ml-48 md:ml-72 w-full'>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        type="text"
        placeholder='Search...'
        className='w-full md:w-1/2 py-1.5 pl-2 rounded-lg shadow-sm hover:shadow-lg dark:bg-gray-200 border outline-none text-black'
      />
      {!text && (
        <button type="button" className='absolute top-1.5 right-4 text-2xl text-gray-500' onClick={setText('')}>
          X
        </button>
      )}
    </div>
  )
}

export default Search
