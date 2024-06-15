'use client'
import { createContext, useState } from "react";

export const MovieContext=createContext()

export const MovieContextProvider=({children})=>{
    const [movies, setMovies]=useState([])
    
    const getAllContents=async()=>{
        await fetch('https://flvxlsycpoxwclnqfrvr.supabase.co/rest/v1/Movies?select=*',{
            method:"GET",
            headers:{
                apikey:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZsdnhsc3ljcG94d2NsbnFmcnZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkxMjM4NDAsImV4cCI6MjAyNDY5OTg0MH0.6_-pdewIM3-_Ai2IGf1yhlOjeWZU9rta-l7oN35FDUs',
                Authorization:'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZsdnhsc3ljcG94d2NsbnFmcnZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkxMjM4NDAsImV4cCI6MjAyNDY5OTg0MH0.6_-pdewIM3-_Ai2IGf1yhlOjeWZU9rta-l7oN35FDUs'
            }
        })
        .then(res=>res.json())
        .then(jsonData=>setMovies(jsonData))
    }


    return (
        <MovieContext.Provider value={[movies, setMovies, getAllContents]}>
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