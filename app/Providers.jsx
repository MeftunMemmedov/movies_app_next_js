'use client'
import React from 'react'
import { MovieContextProvider } from '../context/MovieContext'
import { Provider } from 'react-redux'
import { store } from '@/redux/store'
import { WishlistProvider } from 'react-use-wishlist'

const Providers = ({children}) => {
  return (
    <>
    <MovieContextProvider>
      <Provider store={store}>
          {children}
      </Provider>
    </MovieContextProvider>
        
    </>
  )
}

export default Providers
