import "./MovieTrailer.css";
const MovieTrailer = ({ movie }) => {
  const noMovieTrailerFound = () => {
    return (
      <div className="placeholder">
        <p className="animated-msg">No movie trailer found!</p>
        <img
          src="src/assets/trailer.png"
          alt="Trailer placeholder"
          loading="lazy"
        ></img>
      </div>
    );
  };
  const movieTrailerFound = () => {
    return (
      <div className="trailer-frame">
        <iframe
          className="trailer-iframe"
          src={`https://www.youtube.com/embed/${movie.trailerKey}`}
          title={`${movie.title} trailer`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>
    );
  };
  return (
    <div className="movie-trailer">
      {movie.trailerKey ? movieTrailerFound() : noMovieTrailerFound()}
    </div>
  );
};

export default MovieTrailer;
