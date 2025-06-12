import "./MovieModal.css";

const MovieTrailer = ({ movie }) => {
    const noMovieTrailerFound = () =>{
        return(
            <>
                <p>no movie trailer found!</p>
            </>

        )

    }
    const movieTrailerFound = () =>{
        return(
            <>
                <iframe
                    width="560"
                    height="315"
                    src={`https://www.youtube.com/embed/${movie.trailerKey}?autoplay=1`}
                    title="Movie Trailer"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                ></iframe> 
            
            </>

        )
    }
  return (
    <div className="movie-trailer">
      {movie.trailerKey ? movieTrailerFound(): noMovieTrailerFound()} 
    </div>
  );
};

export default MovieTrailer;
