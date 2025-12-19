import "./MovieModal.css";
import MovieTrailer from "./MovieTrailer";

const MovieModal = ({ movie, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{movie.title}</h2>
          <button
            type="button"
            className="close-btn"
            onClick={onClose}
            aria-label="Close"
          >
            Close
          </button>
        </div>
        <img
          className="modal-backdrop"
          src={
            movie.backdrop_path
              ? `https://image.tmdb.org/t/p/w780${movie.backdrop_path}`
              : "src/assets/placeholder.png"
          }
          alt={movie.title}
        />
        <div className="modal-details">
          <p className="modal-overview">{movie.overview}</p>
          <div className="modal-meta">
            <div>
              <span className="meta-label">Runtime</span>
              <span className="meta-value">{movie.runtime} min</span>
            </div>
            <div>
              <span className="meta-label">Release Date</span>
              <span className="meta-value">{movie.release_date}</span>
            </div>
            <div>
              <span className="meta-label">Genres</span>
              <span className="meta-value">
                {movie.genres?.map((g) => g.name).join(", ")}
              </span>
            </div>
            <div>
              <span className="meta-label">Rating</span>
              <span className="meta-value">
                {movie.vote_average?.toFixed(1)}
              </span>
            </div>
          </div>
        </div>
        <MovieTrailer movie={movie} />
      </div>
    </div>
  );
};

export default MovieModal;
