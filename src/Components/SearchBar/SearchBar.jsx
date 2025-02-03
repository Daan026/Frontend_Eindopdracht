import React, {useState} from 'react';
import Button from '../Button/Button.jsx';
import './SearchBar.css';

const SearchBar = ({onSearch}) => {
    const [query, setQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query);
        }
    };

    return (
        <form className="search-bar" onSubmit={handleSubmit}>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Zoek naar recepten..."
                className="search-input"
            />
            <Button type="submit" variant="primary">
                Zoeken
            </Button>
        </form>
    );
};

export default SearchBar;
