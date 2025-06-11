import { useState } from 'react'
import './App.css'
import MovieList from './MovieList'
import Footer from './Footer'


const App = () => {
  return (
    <div className="App">
      <MovieList/> 
      <Footer/>
    </div>
  )
}
export default App
