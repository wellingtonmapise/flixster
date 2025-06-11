import './MovieCard.css'
import { FaHeart,FaEye,FaEyeSlash } from 'react-icons/fa';
import { useState } from 'react';


const MovieCard = ({ title, posterUrl, voteAverage, onClick }) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const [isWatched, setIsWatched] = useState(FaEye);

    const toggleFavorite = (e) => {
    e.stopPropagation()
    setIsFavorite(!isFavorite);
  };

    const toggleEye = (e) => {
    e.stopPropagation()
    setIsWatched(!isWatched);
  };
    return (
        <div className="movie-card" onClick={onClick}>
            <img src={posterUrl ? `https://image.tmdb.org/t/p/w500${posterUrl} `: `src/assets/placeholder.png`} alt={`${title} poster`} />
            <h3>{title}</h3>
            <p>Rating:{voteAverage}</p>
            <div className='toggle-icons'>
                <p className='toggle-like' onClick={toggleFavorite}> {isFavorite ? <FaHeart color="red" /> : <FaHeart />}</p>
                <p className='watch-eye' onClick={toggleEye}>  {isWatched ? <FaEyeSlash /> : <FaEye />}</p>
            </div>         
        </div>
    )
}

export default MovieCard;
