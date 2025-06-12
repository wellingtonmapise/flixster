import { useState } from 'react'
import './App.css'
import MovieList from './MovieList'
import Footer from './Footer'
import SideBar from './SideBar'
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom'
import Favorites from './Favorites';
import Watched from './Watched';


const App = () => {
  return (
    <Router>
      <div className="app">
      <div className='main-page'>
        <SideBar/> 
        <Routes>
          <Route path="/" element={<MovieList/> }/>
          <Route  path="/favorites" element={<Favorites/> }/>
          <Route  path="/watched" element={<Watched/> }/>
        </Routes>

      </div>
      <Footer/>
    </div>
    </Router>

  )
}
export default App
