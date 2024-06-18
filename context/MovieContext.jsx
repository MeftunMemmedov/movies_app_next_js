'use client'
import { createContext, useState } from "react";

export const MovieContext=createContext()

export const MovieContextProvider=({children})=>{

    const [searchInput, setSearchInput]=useState('')


    return (
        <MovieContext.Provider value={[searchInput, setSearchInput]}>
            {children}
        </MovieContext.Provider>
    )
}

//     const url = 'https://imdb-top-100-movies.p.rapidapi.com/';
//     const options = {
// 	method: 'GET',
// 	headers: {
// 		'x-rapidapi-key': 'bb53b62975msh052aad4c1e07260p19c4b4jsna7e772d2223d',
// 		'x-rapidapi-host': 'imdb-top-100-movies.p.rapidapi.com'
// 	}
// }

//     async function getAllMovies(){
//         try {
//             const response = await fetch(url, options);
//             const result = await response.json();
//             setMovies(result)
//         } catch (error) {
//             console.error(error);
//         }
//     }