import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactPlayer from 'react-player';

import { useResultContext } from '../../contexts/ResultContextProvider';
// import Loading from '../Loading';

const Results = () => {
  const { results, isLoading, getResults, searchTerm } = useResultContext();
  const location = useLocation();

  useEffect(() => {
    if (searchTerm) {
      if (location.pathname === '/videos') {
        getResults(`/search/q=${searchTerm} videos`);
      } else {
        getResults(`${location.pathname}/q=${searchTerm}&num=40`)
      }
    }
  }, [searchTerm, location.pathname]);

  if (isLoading) return <p>Loading...</p>;

  switch (location.pathname) {
    case '/search':
      return (
        <div className='flex flex-wrap justify-between space-y-6 sm:px-56'>
          {results?.map(({link, title}, idx) => (
            <div key={idx} className='md:w-2/5 w-full'>
              <a href={link} rel="noreferrer">
                <p className='text-lg hover:underline dark:text-blue-300 text-blue-700'>
                  {title}
                </p>
                <p className='text-sm'>
                  {link.link > 30 ? link.substring(0,30) : link}
                </p>
              </a>
            </div>
          ))}
        </div>
      )
    case '/images':
      return (
        <div className='flex flex-wrap justify-center items-center'>
          {results?.map(({image, link: {href, title}}, idx) => (
            <a href={href} className='sm:p-3 p-5' key={idx} rel="noreferrer">
              <img src={image?.src} alt={title} loading="lazy"/>
              <p className='w-36 break-words text-small mt-2'>
                {title}
              </p>
            </a>
          ))}
        </div>
      )
    case '/news':
      return (
        <div className='flex flex-wrap justify-between space-y-6 sm:px-56 items-center'>
          {results?.map(({links, title, id, source}) => (
            <div key={id} className='w-full'>
              <a href={links?.[0].href} rel="noreferrer" className='hover:underline'>
                <p className='text-lg dark:text-blue-300 text-blue-700'>
                  {title}
                </p>
                <div className='flex gap-4'>
                  <a href={source?.href} rel="noreferrer">
                    {source?.href}
                  </a>
                </div>
              </a>
            </div>
          ))}
        </div>
      )
    case '/videos':
      return (
        <div className='flex flex-wrap'>
          {results.map((video, idx) => (
            <div key={idx} className='p-2'>
              <ReactPlayer url={video?.additional_links[0].href} controls width="350px" height="200px" />
            </div>
          ))}
        </div>
      )
  
    default:
      return 'Error';
  }
}

export default Results
