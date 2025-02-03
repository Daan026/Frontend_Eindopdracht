import React, {useState, useEffect} from 'react';
import {api} from '../../services/api.jsx';
import RandomRecipe from '../../Components/RandomRecipe/RandomRecipe.jsx';
import './Random.css';

const Random = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchRandomRecipes = async () => {
        try {
            setLoading(true);

            const promises = Array(6).fill().map(() => api.getRandomMeal());
            const results = await Promise.all(promises);
            setRecipes(results.map(result => result.meals[0]));
            setLoading(false);
        } catch (err) {
            setError('Er is een fout opgetreden bij het ophalen van de recepten. Probeer het later opnieuw.');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRandomRecipes();
    }, []);

    const handleRefresh = () => {
        fetchRandomRecipes();
    };

    if (loading) return <div className="loading">Laden...</div>;
    if (error) return <div className="error">{error}</div>;
    if (!recipes.length) return null;

    return (
        <div className="random-page">
            <h1 className="page-title">Random Recepten</h1>
            <button className="refresh-button" onClick={handleRefresh}>
                Vernieuw Recepten
            </button>
            <div className="recipes-grid">
                {recipes.map(recipe => (
                    <RandomRecipe
                        key={recipe.idMeal}
                        recipe={recipe}
                    />
                ))}
            </div>
        </div>
    );
};

export default Random;
