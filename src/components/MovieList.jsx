import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import MovieCard from "./MovieCard";
import "./MovieList.css";
import SearchBar from "./SearchBar";
import Sort from "./Sort";
import MovieModal from "./MovieModal";
import GenreFilter from "./GenreFilter";

const sortMovies = (list, option) => {
  const sorted = [...list];
  if (option === "title") {
    sorted.sort((a, b) => a.title.localeCompare(b.title));
  } else if (option === "vote_average") {
    sorted.sort((a, b) => b.vote_average - a.vote_average);
  } else if (option === "release_date") {
    sorted.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
  }
  return sorted;
};

const mergeMovies = (previous, next) => {
  const existing = new Set(previous.map((movie) => movie.id));
  return [...previous, ...next.filter((movie) => !existing.has(movie.id))];
};

const MovieList = () => {
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("nowPlaying");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [sortOption, setSortOption] = useState("");
  const sortRef = useRef("");

  const apiKey = import.meta.env.VITE_APP_API_KEY;
  const baseUrl = "https://api.themoviedb.org/3";

  const genreMap = useMemo(
    () => new Map(genres.map((genre) => [genre.id, genre.name])),
    [genres],
  );

  const getGenreNames = (ids = []) =>
    ids.map((id) => genreMap.get(id)).filter(Boolean);

  const updateMovies = useCallback(
    (results, pageNumber, totalPages, append) => {
      setMovies((prev) => {
        const combined = append ? mergeMovies(prev, results) : results;
        const activeSort = sortRef.current;
        return activeSort ? sortMovies(combined, activeSort) : combined;
      });
      setHasMore(pageNumber < totalPages);
    },
    [setMovies, setHasMore],
  );

  useEffect(() => {
    const fetchGenres = async () => {
      if (!apiKey) return;
      try {
        const response = await fetch(
          `${baseUrl}/genre/movie/list?api_key=${apiKey}&language=en-US`,
        );
        if (!response.ok) {
          throw new Error("Failed to fetch genres");
        }
        const data = await response.json();
        setGenres(data.genres || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchGenres();
  }, [apiKey, baseUrl]);

  const fetchMovies = useCallback(
    async ({ mode, pageNumber = 1, append = false, query, genreId }) => {
      if (!apiKey) {
        setError("Missing TMDB API key");
        return;
      }
      setLoading(true);
      setError(null);
      try {
        let url = "";
        if (mode === "search") {
          if (!query?.trim()) {
            setMovies([]);
            setHasMore(false);
            return;
          }
          url = `${baseUrl}/search/movie?api_key=${apiKey}&page=${pageNumber}&language=en-US&include_adult=false&query=${encodeURIComponent(query)}`;
        } else if (mode === "genre" && genreId) {
          url = `${baseUrl}/discover/movie?api_key=${apiKey}&page=${pageNumber}&language=en-US&include_adult=false&sort_by=popularity.desc&with_genres=${genreId}`;
        } else {
          url = `${baseUrl}/movie/now_playing?api_key=${apiKey}&page=${pageNumber}&language=en-US`;
        }

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }
        const data = await response.json();
        let results = data.results || [];

        if (mode === "search" && genreId) {
          results = results.filter((movie) =>
            movie.genre_ids?.includes(genreId),
          );
        }

        updateMovies(results, pageNumber, data.total_pages || 1, append);
      } catch (err) {
        console.error(err);
        setError(err.message);
        if (!append) {
          setMovies([]);
        }
      } finally {
        setLoading(false);
      }
    },
    [apiKey, baseUrl, updateMovies, setMovies, setHasMore],
  );

  useEffect(() => {
    setPage(1);
    setMovies([]);
    setHasMore(true);

    if (viewMode === "search" && !searchQuery.trim()) {
      setHasMore(false);
      return;
    }
    fetchMovies({
      mode: viewMode,
      pageNumber: 1,
      append: false,
      query: searchQuery,
      genreId: selectedGenre,
    });
  }, [viewMode, searchQuery, selectedGenre, fetchMovies, setHasMore]);

  useEffect(() => {
    sortRef.current = sortOption;
    if (!sortOption) return;
    setMovies((prev) => sortMovies(prev, sortOption));
  }, [sortOption]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchMovies({
      mode: viewMode,
      pageNumber: nextPage,
      append: true,
      query: searchQuery,
      genreId: selectedGenre,
    });
  };

  const handleSearchSubmit = (query) => {
    const trimmed = query.trim();
    setSearchInput(trimmed);
    setSearchQuery(trimmed);
    setViewMode(
      trimmed ? "search" : selectedGenre ? "genre" : "nowPlaying",
    );
  };

  const handleClearSearch = () => {
    setSearchInput("");
    setSearchQuery("");
    setViewMode(selectedGenre ? "genre" : "nowPlaying");
  };

  const handleGenreSelect = (genreId) => {
    setSelectedGenre(genreId);
    if (searchQuery.trim()) {
      setViewMode("search");
    } else {
      setViewMode(genreId ? "genre" : "nowPlaying");
    }
  };

  const handleSort = (value) => {
    setSortOption(value);
  };

  const handleCardClick = async (movieId) => {
    if (!apiKey) return;
    const [movieRes, videoRes] = await Promise.all([
      fetch(`${baseUrl}/movie/${movieId}?api_key=${apiKey}`),
      fetch(`${baseUrl}/movie/${movieId}/videos?api_key=${apiKey}`),
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

  const featuredMovie = movies[0];
  const heroImage =
    featuredMovie?.backdrop_path || featuredMovie?.poster_path || null;
  const heroGenres = featuredMovie
    ? getGenreNames(featuredMovie.genre_ids).slice(0, 3)
    : [];

  const heroStyle = heroImage
    ? {
        backgroundImage: `linear-gradient(90deg, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.55) 40%, rgba(0, 0, 0, 0.2) 100%), url(https://image.tmdb.org/t/p/original${heroImage})`,
      }
    : undefined;

  const sectionTitle =
    viewMode === "search" && searchQuery
      ? `Results for "${searchQuery}"`
      : selectedGenre
        ? `${genreMap.get(selectedGenre) || "Genre"} picks`
        : "Now Playing";

  const showHero = featuredMovie && viewMode !== "search";

  return (
    <main className="main-section">
      {showHero && (
        <section className="hero" style={heroStyle}>
          <div className="hero-content">
            <span className="hero-tag">
              Featured
            </span>
            <h1 className="hero-title">{featuredMovie.title}</h1>
            <p className="hero-overview">{featuredMovie.overview}</p>
            <div className="hero-meta">
              {heroGenres.length > 0 && (
                <div className="hero-genres">
                  {heroGenres.map((genre) => (
                    <span key={genre}>{genre}</span>
                  ))}
                </div>
              )}
              <span className="hero-rating">
                Rating {featuredMovie.vote_average?.toFixed(1)}
              </span>
            </div>
            <div className="hero-actions">
              <button
                type="button"
                className="btn-primary"
                onClick={() => handleCardClick(featuredMovie.id)}
              >
                Play Trailer
              </button>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => handleCardClick(featuredMovie.id)}
              >
                More Info
              </button>
            </div>
          </div>
        </section>
      )}

      <section className="controls">
        <div className="controls-row">
          <SearchBar
            value={searchInput}
            onChange={setSearchInput}
            onSubmit={handleSearchSubmit}
          />
          <button className="clear-btn" type="button" onClick={handleClearSearch}>
            Clear
          </button>
          <Sort value={sortOption} onSort={handleSort} />
        </div>
        <GenreFilter
          genres={genres}
          selectedGenre={selectedGenre}
          onSelect={handleGenreSelect}
        />
      </section>

      <section className="list-section">
        <h2 className="section-title">{sectionTitle}</h2>
        {error && <p className="status-msg error">{error}</p>}
        {loading && <p className="status-msg">Loading...</p>}
        <div className="movie-grid">
          {movies.length === 0 && !loading ? (
            <p className="status-msg">No movies found.</p>
          ) : (
            movies.map((movie) => (
              <MovieCard
                key={movie.id}
                id={movie.id}
                title={movie.title}
                posterUrl={movie.poster_path}
                backdropUrl={movie.backdrop_path}
                voteAverage={movie.vote_average}
                releaseDate={movie.release_date}
                overview={movie.overview}
                genreNames={getGenreNames(movie.genre_ids).slice(0, 3)}
                onClick={() => handleCardClick(movie.id)}
              />
            ))
          )}
        </div>
        {hasMore && movies.length > 0 ? (
          <button
            className="load-more-btn"
            onClick={handleLoadMore}
            disabled={loading}
          >
            Load More
          </button>
        ) : (
          movies.length > 0 && <p className="status-msg">End of the line.</p>
        )}
      </section>

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
