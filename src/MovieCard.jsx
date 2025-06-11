import './MovieCard.css'

const MovieCard = ({ title, posterUrl, voteAverage, onClick }) => {
    return (
        <div className="movie-card" onClick={onClick}>
            <img src={posterUrl ? `https://image.tmdb.org/t/p/w500${posterUrl} `: `src/assets/placeholder.png`} alt={`${title} poster`} />
            <h3>{title}</h3>
            <p>Rating:{voteAverage}⭐️</p>
        </div>
    )
}

export default MovieCard;
