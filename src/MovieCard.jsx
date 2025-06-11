import './MovieCard.css'

const MovieCard = ({ title, posterUrl, voteAverage, onClick }) => {
    return (
        <div className="movie-card" onClick={onClick}>
            <img src={`https://image.tmdb.org/t/p/w500${posterUrl}`} alt={`${title} poster`} />
            <h3>{title}</h3>
            <p>Rating:{voteAverage}⭐️</p>
        </div>
    )
}

export default MovieCard;
