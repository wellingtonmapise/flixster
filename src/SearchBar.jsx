import { useState } from "react";
import "./SearchBar.css";

function SearchBar({ onSearch }) {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        onSearch(searchQuery);
        setSearchQuery("");
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    return (
        <form id="search-bar" onSubmit={handleSubmit}>
            <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search for movies"
            />
            <button type="submit" className="search-btn">
                Search
            </button>
        </form>
    );
}

export default SearchBar;
