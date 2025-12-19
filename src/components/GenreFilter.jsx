import "./GenreFilter.css";

const GenreFilter = ({ genres, selectedGenre, onSelect }) => {
  return (
    <div className="genre-filter">
      <button
        type="button"
        className={!selectedGenre ? "active" : ""}
        onClick={() => onSelect(null)}
        aria-pressed={!selectedGenre}
      >
        All
      </button>
      {genres.map((genre) => (
        <button
          key={genre.id}
          type="button"
          className={selectedGenre === genre.id ? "active" : ""}
          onClick={() => onSelect(genre.id)}
          aria-pressed={selectedGenre === genre.id}
        >
          {genre.name}
        </button>
      ))}
    </div>
  );
};

export default GenreFilter;
