import Image from 'next/image'
import Link from 'next/link';
import React from 'react'
import { TbPointFilled } from "react-icons/tb";


const SearchResult = ({result, setSearchInput}) => {
  return (
      <Link href={result.title?`/allmovies/${result.title}`:`/persons/${result.name}`} className='' >
        <div className=' h-16 flex my-1 hover:bg-slate-500'>
        <div className=' w-[12%] relative'>
            <Image src={result.poster||result.image} objectFit='cover' fill/>
        </div>
        <div className=' w-4/5 p-2'>
            <h6 className='text-sm'>{result.title || result.name}</h6>
            <div className='flex items-center'>
                <p className='text-sm text-slate-300'>{result.type || ''}</p>
                    <TbPointFilled size={12}  className='text-slate-300'/>
                <p className='text-sm text-slate-300'>{result.year || ''}</p>
            </div>
        </div>
        </div>
      </Link>
  )
}

export default SearchResult
