import MovieCard from './MovieCard';
import { useEffect,useState } from 'react';
import './MovieList.css';
import { use } from 'react';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const fetchMovies = async () => {
    try {
      const apiKey = import.meta.env.VITE_APP_API_KEY;
      const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }
      const data = await response.json();
      console.log(data);
      // Check if 'results' is an array before setting state
      if (Array.isArray(data.results)) {
        setMovies(data.results);
      } else {
        throw new Error("Unexpected data format");
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };
  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div className="movie-list">
        {movies.map((movie) => (
            <MovieCard
            key={movie.id}
            title={movie.title}
            posterUrl={movie.poster_path}
            voteAverage={movie.vote_average}
        />)
        )};

    </div>
  )
}

export default MovieList
