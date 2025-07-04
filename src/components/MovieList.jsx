import MovieCard from "./MovieCard";
import { useEffect, useState } from "react";
import "./MovieList.css";
import SearchBar from "./SearchBar";
import Sort from "./Sort";
import MovieModal from "./MovieModal";
import Header from "./Header";

const MovieList = () => {
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [mode, setMode] = useState("NowPlaying");
  const [selectedMovie, setSelectedMovie] = useState(null);

  const fetchMovies = async (pageNumber) => {
    try {
      const apiKey = import.meta.env.VITE_APP_API_KEY;
      const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&page=${pageNumber}&language=en-US`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }
      const data = await response.json();
      setMovies((prevMovies) => [...prevMovies, ...data.results]);

      if (pageNumber >= data.total_pages) {
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

  useEffect(() => {
    if (mode === "NowPlaying") {
      setPage(1);
      setHasMore(true);
      fetchMovies(1);
    } else if (searchQuery) {
      searchMovies(searchQuery, 1);
    }
  }, [mode, searchQuery]);

  const searchMovies = async (query, pageNumber) => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const apiKey = import.meta.env.VITE_APP_API_KEY;
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&page=${pageNumber}&language=en-US&query=${encodeURIComponent(query)}`,
      );
      if (!response.ok) {
        throw new Error("Failed to fetch search results");
      }
      const data = await response.json();
      setMovies(data.results);
      setHasMore(pageNumber < data.total_pages);
    } catch (err) {
      console.error(err);
      setMovies([]);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    if (mode === "NowPlaying") {
      fetchMovies(nextPage);
    } else if (mode === "search") {
      searchMovies(searchQuery, nextPage);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setMode("search");
    setMovies([]);
    searchMovies(query, page);
  };

  const handleCardClick = async (movieId) => {
    const apiKey = import.meta.env.VITE_APP_API_KEY;
    const [movieRes, videoRes] = await Promise.all([
      fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`),
      fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`,
      ),
    ]);
    const movieData = await movieRes.json();
    const videoData = await videoRes.json();
    const trailer = videoData?.results?.find(
      (v) => v.type === "Trailer" && v.site === "YouTube",
    );
    setSelectedMovie({
      ...movieData,
      trailerKey: trailer ? trailer.key : null,
    });
  };

  const handleSort = (value) => {
    const uniqueMovies = Array.from(
      new Map(movies.map((movie) => [movie.id, movie])).values(),
    );
    const sortedMovies = [...uniqueMovies];

    if (value === "title") {
      sortedMovies.sort((a, b) => a.title.localeCompare(b.title));
    } else if (value === "vote_average") {
      sortedMovies.sort((a, b) => b.vote_average - a.vote_average);
    } else if (value == "release_date") {
      sortedMovies.sort(
        (a, b) => new Date(b.release_date) - new Date(a.release_date),
      );
    }

    setMovies(sortedMovies);
  };

  return (
    <main className="main-section">
      <div className="header-section">
        <Header />
      </div>
      <div className="nav">
        <div className="nav-bottom">
          <div className="search-section">
            <SearchBar onSearch={handleSearch} />
            <button
              className="clear-btn"
              onClick={() => {
                setMode("NowPlaying");
                setMovies([]);
                setPage(1);
                fetchMovies(1);
              }}
            >
              Clear
            </button>
          </div>
        </div>
        <Sort onSort={handleSort} />
      </div>
      <h2>
        {mode === "search" ? `Results for: ${searchQuery}` : "Now Playing"}
      </h2>
      <div className="movie-list">
        {movies.length === 0 && searchQuery ? (
          <p>No movies matching your search: "{searchQuery}"</p>
        ) : (
          movies.map((movie, index) => (
            <MovieCard
              key={`${movie.id}-${index}`}
              id={movie.id}
              title={movie.title}
              posterUrl={movie.poster_path}
              voteAverage={movie.vote_average}
              onClick={() => handleCardClick(movie.id)}
            />
          ))
        )}
      </div>
      {hasMore ? (
        <button className="load-more-btn" onClick={handleLoadMore}>
          Load More
        </button>
      ) : (
        <p>Sorry no more movies to show</p>
      )}

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </main>
  );
};

export default MovieList;
