import { useState } from 'react'
import './App.css'
import MovieList from './MovieList'
import Nav from './Nav'


const App = () => {
  //const [movies, setMovies] = useState([]);
  return (
    <div className="App">
      <MovieList/> {/* pass Movilist.... */}
    </div>
  )
}

export default App
