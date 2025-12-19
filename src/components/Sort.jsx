import "./Sort.css";

const Sort = ({ onSort, value }) => {
  const handleSortChange = (event) => {
    onSort(event.target.value);
  };

  return (
    <div className="sort-bar">
      <select
        onChange={handleSortChange}
        value={value}
        aria-label="Sort movies"
      >
        <option value=""> Sort By</option>
        <option value="title"> Title</option>
        <option value="release_date"> Release Date</option>
        <option value="vote_average">Vote Average</option>
      </select>
    </div>
  );
};

export default Sort;
