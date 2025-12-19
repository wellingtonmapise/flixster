import "./MovieCard.css";
import { FaHeart, FaEye, FaEyeSlash } from "react-icons/fa";
import { useEffect, useState } from "react";
import { favoritesUtils, watchedUtils } from "../utils/utils";

const MovieCard = ({
  id,
  title,
  posterUrl,
  backdropUrl,
  voteAverage,
  releaseDate,
  overview,
  genreNames = [],
  onClick,
  isFavorited = false,
  isWatched = false,
  onUnfavorite,
  onUnwatch,
}) => {
  const [isFavorite, setIsFavorite] = useState(isFavorited);
  const [isSeen, setIsSeen] = useState(isWatched);
  const [isHovering, setIsHovering] = useState(false);
  const [trailerKey, setTrailerKey] = useState(null);
  const [trailerStatus, setTrailerStatus] = useState("idle");

  const apiKey = import.meta.env.VITE_APP_API_KEY;

  useEffect(() => {
    setIsFavorite(isFavorited || favoritesUtils.has(id));
    setIsSeen(isWatched || watchedUtils.has(id));
  }, [id, isFavorited, isWatched]);

  const toggleFavorite = (event) => {
    event.stopPropagation();
    if (isFavorite) {
      favoritesUtils.remove(id);
      onUnfavorite?.();
    } else {
      const movie = {
        id,
        title,
        poster_path: posterUrl,
        backdrop_path: backdropUrl,
        vote_average: voteAverage,
      };
      favoritesUtils.save(movie);
    }
    setIsFavorite(!isFavorite);
  };

  const toggleWatched = (event) => {
    event.stopPropagation();
    if (isSeen) {
      watchedUtils.remove(id);
      onUnwatch?.();
    } else {
      const movie = {
        id,
        title,
        poster_path: posterUrl,
        backdrop_path: backdropUrl,
        vote_average: voteAverage,
      };
      watchedUtils.save(movie);
    }
    setIsSeen(!isSeen);
  };

  const fetchTrailer = async () => {
    if (!apiKey || trailerStatus !== "idle") return;
    setTrailerStatus("loading");
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}`,
      );
      if (!response.ok) {
        throw new Error("Failed to fetch trailer");
      }
      const data = await response.json();
      const trailer = data?.results?.find(
        (video) => video.type === "Trailer" && video.site === "YouTube",
      );
      if (trailer) {
        setTrailerKey(trailer.key);
        setTrailerStatus("ready");
      } else {
        setTrailerStatus("missing");
      }
    } catch (err) {
      console.error(err);
      setTrailerStatus("missing");
    }
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
    fetchTrailer();
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const imagePath = backdropUrl || posterUrl;
  const imageSize = backdropUrl ? "w780" : "w500";
  const imageUrl = imagePath
    ? `https://image.tmdb.org/t/p/${imageSize}${imagePath}`
    : "src/assets/placeholder.png";
  const releaseYear = releaseDate ? releaseDate.split("-")[0] : "";

  return (
    <div
      className={`movie-card ${isHovering ? "is-hovering" : ""}`}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="media">
        <img
          src={imageUrl}
          alt={`${title} poster`}
          className="media-image"
          loading="lazy"
        />
        {trailerStatus === "ready" && isHovering && trailerKey && (
          <iframe
            className="trailer-preview"
            title={`${title} trailer preview`}
            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&controls=0&playsinline=1&loop=1&playlist=${trailerKey}`}
            allow="autoplay; encrypted-media; picture-in-picture"
            loading="lazy"
          ></iframe>
        )}
        <div className="media-gradient"></div>
        <div className="card-actions">
          <button
            type="button"
            className={`icon-btn ${isFavorite ? "active" : ""}`}
            onClick={toggleFavorite}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            aria-pressed={isFavorite}
          >
            <FaHeart />
          </button>
          <button
            type="button"
            className={`icon-btn ${isSeen ? "active" : ""}`}
            onClick={toggleWatched}
            aria-label={isSeen ? "Mark as unwatched" : "Mark as watched"}
            aria-pressed={isSeen}
          >
            {isSeen ? <FaEye /> : <FaEyeSlash />}
          </button>
        </div>
      </div>
      <div className="card-body">
        <h3 className="card-title">{title}</h3>
        <div className="card-meta">
          <span>{voteAverage?.toFixed(1)}</span>
          {releaseYear && <span>{releaseYear}</span>}
        </div>
        {genreNames.length > 0 && (
          <div className="card-genres">
            {genreNames.slice(0, 2).map((genre) => (
              <span key={genre}>{genre}</span>
            ))}
          </div>
        )}
        {isHovering && overview && (
          <p className="card-overview">{overview}</p>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
