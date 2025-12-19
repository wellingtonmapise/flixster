import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import { favoritesUtils } from "../utils/utils";
import "./Favorite.css";

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setFavorites(favoritesUtils.get());
  }, []);

  const handleUnfavorite = (id) => {
    favoritesUtils.remove(id);
    const updated = favorites.filter((movie) => movie.id !== id);
    setFavorites(updated);
  };

  return (
    <div className="list-page">
      <div className="page-header">
        <h1>Favorites</h1>
        <p>Your saved picks, ready to rewatch.</p>
      </div>
      <div className="movie-grid">
        {favorites.length === 0 ? (
          <p className="status-msg">No favorites yet.</p>
        ) : (
          favorites.map((movie) => (
              <MovieCard
                key={movie.id}
                id={movie.id}
                title={movie.title}
                posterUrl={movie.poster_path}
                backdropUrl={movie.backdrop_path}
                voteAverage={movie.vote_average}
                isFavorited={true}
                onUnfavorite={() => handleUnfavorite(movie.id)}
              />
          ))
        )}
      </div>
    </div>
  );
}

export default Favorites;
