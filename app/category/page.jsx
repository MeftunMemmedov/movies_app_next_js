'use client'
import { MovieContext } from '@/context/MovieContext'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'

const Category = () => {

    const [searchInput, setSearchInput]=useContext(MovieContext)
    
    const categories = [
        {
            category:'action',
            color:'orange'
        },
        {
            category:'drama',
            color:'gray'
        },
        {
            category:'crime',
            color:'red'
        },
        {
            category:'comedy',
            color:'blue'
        },
        {
            category:'thriller',
            color:'green'
        },
        {
            category:'horror',
            color:'gold'
        },
        {
            category:'sci-fi',
            color:'violet'
        },
        {
            category:'romance',
            color:'violet'
        },

     ]
    
    // const categoriesFromMovies=movies.map((movie,i)=>movie.genre)
    // const ctgr=categories.concat(categoriesFromMovies.map((category)=>category))
    // const allCategories=ctgr.filter((ct)=>ct)



    useEffect(()=>{    
        setSearchInput('')
    },[])
  return (
    <div className=''>
            <h2 className='text-5xl font-bold text-center py-10'>Categories</h2>
        <div className='container m-auto flex flex-wrap justify-center gap-x-10'>
        {
            categories.map((ctgr)=>{
                return (
                    <Link href={`/category/${ctgr.category}`} className={`w-1/6 hover:border hover:scale-110 transition duration-300 rounded-xl h-32 my-10 flex justify-center items-center`} style={{backgroundColor:ctgr.color}}>
                        <h2 className='text-2xl font-bold'>{ctgr.category.charAt(0).toUpperCase()+ctgr.category.slice(1)}</h2>
                    </Link>
                )
            })
        }
        </div>
    </div>
  )
}

export default Category
