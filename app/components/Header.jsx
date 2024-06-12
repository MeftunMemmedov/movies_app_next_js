'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { FaSearch } from "react-icons/fa";
import localFont from 'next/font/local'
import { BiMoviePlay } from "react-icons/bi";


const logoFont=localFont({ src: '../../public/fonts/JosefinSans-Bold.ttf' })


const Header = () => {
  const [searchInput, setSearchInput]=useState('')
  const [searchFocus, setSearchFocus]=useState(false)
  const [searchEmpty, setSearchEmpty]=useState(true)

  useEffect(()=>{
   searchInput!==''?setSearchEmpty(false):setSearchEmpty(true)
}, [searchInput])

  return (
    <>
      <header className='backdrop-blur-xl h-16 sticky top-0 z-50'>
        <div className='container flex justify-around m-auto h-full'>

          <div className='lg:w-4/12 md:w-3/5  flex justify-around items-center '>
            <Link href={'/'}>
              <h2 className={` ${logoFont.className} font-bold md:text-2xl text-xl lg:ml-5 m-0 w-1/5 text-orange-400`}>Movies</h2>
            </Link>
            <div className='w-3/5 h-8 relative'>
              <label htmlFor='search' className={`absolute right-5 top-2 `}>
                <FaSearch className={`${searchFocus?'text-black':'white'} ${searchEmpty?'block':'hidden'}`}/>
              </label>
              <input 
                type='search' 
                id='search'
                placeholder='search...'
                onChange={(e)=>setSearchInput(e.target.value)}            
                className='w-full h-full rounded-3xl bg-zinc-800 focus:bg-white focus:outline-0 focus:text-black px-5' 
                onFocus={()=>setSearchFocus(true)} 
                onBlur={()=>setSearchFocus(false)} 
              />
            </div>
          </div>

          <div className='lg:w-2/5 lg:block hidden '>
            <nav className=' h-full flex items-center'>
              <Link href={'/allmovies'} className='border border-slate-600 p-2 rounded-3xl'><BiMoviePlay className='inline mb-1 mx-1' size={20}/>All Movies</Link>
            </nav>
          </div>

          <div className='w-1/4 flex justify-end items-center '>
            <Link href={''} className='lg:mr-20 md:mr-10 font-bold bg-zinc-800 w-20 h-10 flex justify-center items-center rounded-3xl'><p>Sign In</p></Link>
          </div>

        </div>        
      </header>
    </>
  )
}

export default Header
