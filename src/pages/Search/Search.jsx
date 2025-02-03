import React, {useState} from 'react';
import {api} from '../../services/api.jsx';
import SearchBar from '../../Components/SearchBar/SearchBar.jsx';
import Button from '../../Components/Button/Button.jsx';
import './Search.css';

const Search = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async (query) => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.searchMeals(query);
            setSearchResults(response.meals || []);
            if (!response.meals) {
                setError('Geen recepten gevonden. Probeer een ander ingredient!');
            }
        } catch (err) {
            setError('Er ging iets mis met zoeken. Probeer het later opnieuw.');
        }
        setLoading(false);
    };

    return (
        <div className="search-page">
            <div className="search-header">
                <h1>Vind jou perfecte recept</h1>
                <p>Zoek tussen duizenden recepten!</p>
                <SearchBar onSearch={handleSearch}/>
            </div>

            {loading && <div className="loading">Recepten zoeken...</div>}
            {error && <div className="no-results">{error}</div>}

            <div className="search-results">
                {searchResults.length === 0 && !loading && !error ? (
                    <div className="no-results">
                        Start de zoektocht naar jouw recept!
                    </div>
                ) : (
                    <div className="results-grid">
                        {searchResults.map((meal) => (
                            <div key={meal.idMeal} className="result-card">
                                <img src={meal.strMealThumb} alt={meal.strMeal}/>
                                <div className="result-content">
                                    <h3>{meal.strMeal}</h3>
                                    <div className="result-tags">
                                        <span className="tag">{meal.strCategory}</span>
                                        <span className="tag">{meal.strArea}</span>
                                    </div>
                                    <Button
                                        variant="primary"
                                        onClick={() => window.location.href = `/recipe/${meal.idMeal}`}
                                    >
                                        Bekijk recept
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Search;
