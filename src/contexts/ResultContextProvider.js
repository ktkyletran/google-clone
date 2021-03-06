import React, { createContext, useContext, useState } from 'react';

const ResultContext = createContext();
const baseUrl = 'https://google-search3.p.rapidapi.com/api/v1';

export const ResultContextProvider = ({children}) => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('corgi');

  const getResults = async (endPoint) => {
    setIsLoading(true);

    const response = await fetch(`${baseUrl}${endPoint}`, {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'google-search3.p.rapidapi.com',
        'x-rapidapi-key': process.env.REACT_APP_GOOGLE_SEARCH
      }
    });

    const data = await response.json();
    
    if (endPoint.includes('/news')) {
      setResults(data.entries)
    } else if (endPoint.includes('/images')) {
      setResults(data.image_results)
    } else {
      setResults(data.results)
    }

    setIsLoading(false);
  }

  return (
    <ResultContext.Provider value={{ getResults, results, searchTerm, setSearchTerm, isLoading }}>
      {children}
    </ResultContext.Provider>
  )
};

export const useResultContext = () => useContext(ResultContext);