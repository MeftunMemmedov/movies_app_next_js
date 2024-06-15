import React from 'react'
import { MovieContextProvider } from '../context/MovieContext'

const Providers = ({children}) => {
  return (
    <>
    <MovieContextProvider>
      {children}
    </MovieContextProvider>
    </>
  )
}

export default Providers
