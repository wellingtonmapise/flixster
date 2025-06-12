import { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import { favoritesUtils} from '../utils/utils';
import './Favorite.css'

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
    <div>
    <div className='header-top'>
        <h1> Favorites</h1>
    </div>
     <div className="movie-list">
      {favorites.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
        favorites.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            posterUrl={movie.poster_path}
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
