import './MovieCard.css';
import { FaHeart, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { favoritesUtils, watchedUtils } from '../utils/utils';

const MovieCard = ({
  id,
  title,
  posterUrl,
  voteAverage,
  onClick,
  isFavorited = false,
  isWatched = false,
  onUnfavorite,
  onUnwatch
}) => {
  const [isFavorite, setIsFavorite] = useState(isFavorited);
  const [isSeen, setIsSeen] = useState(isWatched);

  useEffect(() => {
    if (!isFavorited) setIsFavorite(favoritesUtils.has(id));
    if (!isWatched) setIsSeen(watchedUtils.has(id));
  }, [id]);

  const toggleFavorite = (e) => {
    e.stopPropagation();
    if (isFavorite) {
      favoritesUtils.remove(id);
      onUnfavorite?.();
    } else {
      const movie = { id, title, poster_path: posterUrl, vote_average: voteAverage };
      favoritesUtils.save(movie);
    }
    setIsFavorite(!isFavorite);
  };

  const toggleWatched = (e) => {
    e.stopPropagation();
    if (isSeen) {
      watchedUtils.remove(id);
      onUnwatch?.();
    } else {
      const movie = { id, title, poster_path: posterUrl, vote_average: voteAverage };
      watchedUtils.save(movie);
    }
    setIsSeen(!isSeen);
  };

  return (
    <div className="movie-card" onClick={onClick}>
      <img
        src={posterUrl ? `https://image.tmdb.org/t/p/w500${posterUrl}` : 'src/assets/placeholder.png'}
        alt={`${title} poster`}
      />
      <h3>{title}</h3>
      <p>Rating: {voteAverage}★</p>

      <div className="toggle-icons">
        <p className="toggle-like" onClick={toggleFavorite}>
          {isFavorite ? <FaHeart color="red" /> : <FaHeart />}
        </p>
        <p className="watch-eye" onClick={toggleWatched}>
          {isSeen ? < FaEye/> : <FaEyeSlash />}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;

