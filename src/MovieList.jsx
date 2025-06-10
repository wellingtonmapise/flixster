import MovieCard from './MovieCard';
import { useEffect,useState } from 'react';
import './MovieList.css';
import SearchBar from './SearchBar';

const MovieList = () => {
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [movies, setMovies] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [mode,setMode] = useState("NowPlaying");


  const fetchMovies = async (pageNumber) => {
    try {
      const apiKey = import.meta.env.VITE_APP_API_KEY;
      const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&page=${pageNumber}&language=en-US`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }
      const data = await response.json();
      setMovies((prevMovies) => [...prevMovies,...data.results]);

      
      if (pageNumber >= data.total_pages){
        setHasMore(false);
      }

    } catch (err) {
      console.error(error);
      setError(error.message);
    }
  };
  useEffect(() => {
    fetchMovies(page);
  }, []);

const searchMovies = async (query) => {
     if (!searchQuery.trim()) return;
    setLoading(true);

    try {
      const apiKey = import.meta.env.VITE_APP_API_KEY;
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${encodeURIComponent(query)}&page=1`
      );
      const data = await response.json();
      console.log(data);
      setMovies(data.results);
    } catch (error) {
      console.error(error);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };
 useEffect(() => {
  if (mode === 'NowPlaying') {
    setPage(1);
    setHasMore(true);
    fetchMovies(1);
  } else if (searchQuery) {
    searchMovies(searchQuery);
  }
}, [mode, searchQuery]);

  
  const handleLoadMore = () =>{
    const nextPage = page + 1;
    setPage(nextPage);
    fetchMovies(nextPage);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setMode("search");
    searchMovies(query);
    setMovies([]);
  };

  return (
    <main>
        <div className='nav'>
        <div className='toggle-buttons'>
            <button onClick={()=>{
                setMode("NowPlaying");
                setMovies([]);
                setPage(1);
                fetchMovies(1);
            }}> Now Playing
            </button>
        </div>
        <SearchBar onSearch={handleSearch}/>
        </div>
        <h2>{(mode === "search") ? `Results for: ${searchQuery}`: "Now Playing"}</h2>
        <div className="movie-list">
        {movies.length === 0 && searchQuery ? (
            <p>No movies matching your search: "{searchQuery}"</p>
        ) : (
            movies.map((movie, index) => (
            <MovieCard
                key={`${movie.id}-${index}`}
                title={movie.title}
                posterUrl={movie.poster_path}
                voteAverage={movie.vote_average}
            />
            ))
        )}
        </div>
        {hasMore ? (
            <button onClick={handleLoadMore}>Load More</button>

        ) : (
            <p>Sorry no more movies to show</p>
        )}
        
    </main>

  )
}

export default MovieList
