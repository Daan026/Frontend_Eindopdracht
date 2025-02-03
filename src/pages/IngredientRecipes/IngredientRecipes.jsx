import React, {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import axios from 'axios';
import './IngredientRecipes.css';

const IngredientRecipes = () => {
    const {ingredient} = useParams();
    const navigate = useNavigate();
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchIngredientRecipes = async () => {
            if (!ingredient) {
                setError('Geen ingredient opgegeven');
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const apiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(ingredient)}`;
                const response = await axios.get(apiUrl);
                const data = response.data;

                if (!data || !data.meals) {
                    setError(`Geen recepten gevonden met ${ingredient}`);
                    setRecipes([]);
                } else {
                    setRecipes(data.meals);
                    setError(null);
                }
            } catch (error) {
                setError('Er ging iets mis bij het laden van de recepten');
                setRecipes([]);
            } finally {
                setLoading(false);
            }
        };

        fetchIngredientRecipes();
    }, [ingredient]);

    if (loading) {
        return (
            <div className="loading-container">
                <p>Recepten zoeken met {ingredient}...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="no-results">
                <p>{error}</p>
                <p>Probeer een ander ingredient</p>
            </div>
        );
    }

    return (
        <div className="ingredient-recipes">
            <h1>Recepten met {ingredient}</h1>
            <div className="recipes-grid">
                {recipes.length === 0 ? (
                    <div className="no-results">
                        <p>Geen recepten gevonden met {ingredient}</p>
                        <p>Probeer een ander ingredient</p>
                    </div>
                ) : (
                    recipes.map(recipe => (
                        <div
                            key={recipe.idMeal}
                            className="recipe-card"
                            onClick={() => navigate(`/recipe/${recipe.idMeal}`)}
                        >
                            <img
                                src={recipe.strMealThumb}
                                alt={recipe.strMeal}
                                className="recipe-image"
                            />
                            <div className="recipe-content">
                                <h3>{recipe.strMeal}</h3>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default IngredientRecipes;
