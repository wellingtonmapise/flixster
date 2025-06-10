import './MovieCard.css'

const MovieCard = ({title, posterUrl, voteAverage}) => {
  return (
    <div className="movie-card">
        <img src={`https://image.tmdb.org/t/p/w500${posterUrl}`} alt={`${title} poster`}/>
        <h3>{title}</h3>
        <p>⭐️{voteAverage}</p>
    </div>
  )
}

export default MovieCard;
