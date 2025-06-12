import "./MovieModal.css";
import MovieTrailer from './MovieTrailer'

const MovieModal = ({ movie, onClose }) => {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>{movie.title}</h2>
                <img
                    src={movie.backdrop_path ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}` : `src/assets/placeholder.png` }
                    alt={movie.title}
                />
                <p>Runtime: {movie.runtime} minutes</p>
                <p>
                    <strong>Realease Date: </strong>
                    {movie.release_date}
                </p>
                <p>
                    <strong>Overview : </strong>
                    {movie.overview}
                </p>
                <p>
                    <strong>Genres : </strong>
                    {movie.genres?.map((g) => g.name).join(",")}
                </p>
                <p>
                    <strong>Rating: </strong>
                    {movie.vote_average}
                </p>
                <MovieTrailer movie={movie}/>
                <button id="close-btn" onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default MovieModal;
