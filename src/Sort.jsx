import './Sort.css'

const Sort = ({onSort}) => {
    const handleSortChange = (event) => {
    onSort(event.target.value);

  };

  return (
    <select className="sort-bar"  onChange={handleSortChange}>
        <option value=""> Sort By</option>
        <option value="title"> Title</option>
        <option value="release_date"> Release Date</option>
        <option value="vote_average">Vote Average</option>
    
    </select>
  )
}

export default Sort;
 