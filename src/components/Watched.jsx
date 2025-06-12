import { watchedUtils } from '../utils/utils';
import { useState,useEffect } from 'react';
import MovieCard from './MovieCard';

function Watched() {
  const [watched, setWatched] = useState([]);

  useEffect(() => {
    setWatched(watchedUtils.get());
  }, []);

    const handleUnSeen = (id) => {
      watchedUtils.remove(id); 
      const updated = watched.filter((movie) => movie.id !== id);
      setWatched(updated);
    };

  return (
    <div>
    <div className='header-top'>
        <h1> Watched Movies</h1>
    </div>
    <div className="movie-list">
      {watched.length === 0 ? (
        <p>You haven't watched anything yet.</p>
      ) : (
        watched.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            posterUrl={movie.poster_path}
            voteAverage={movie.vote_average}
            isWatched={true}
            onUnwatch={()=> handleUnSeen(movie.id)}
          />
        ))
      )}
    </div>

    </div>

  );
}

export default Watched;