import React, {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {useAuth} from '../../contexts/AuthContext';
import {useFavorites} from '../../services/FavoritesContext';
import './RecipeDetail.css';

const RecipeDetail = () => {
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const {id} = useParams();
    const navigate = useNavigate();
    const {user} = useAuth();
    const {isFavorite, addFavorite, removeFavorite} = useFavorites();

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                setLoading(true);
                const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
                const data = await response.json();

                if (data.meals) {
                    const meal = data.meals[0];
                    const ingredients = [];
                    for (let i = 1; i <= 20; i++) {
                        if (meal[`strIngredient${i}`] && meal[`strIngredient${i}`].trim()) {
                            ingredients.push({
                                ingredient: meal[`strIngredient${i}`],
                                measure: meal[`strMeasure${i}`]
                            });
                        }
                    }
                    setRecipe({...meal, ingredients});
                } else {
                    setError('Recept niet gevonden');
                }
            } catch (error) {
                console.error('Error fetching recipe:', error);
                setError('Kon recept niet laden');
            } finally {
                setLoading(false);
            }
        };

        fetchRecipe();
    }, [id]);

    const handleFavoriteClick = async () => {
        if (!user) {
            navigate('/login', {state: {from: `/recipe/${id}`}});
            return;
        }

        try {
            if (isFavorite(recipe.idMeal)) {
                await removeFavorite(recipe.idMeal);
            } else {
                await addFavorite(recipe);
            }
        } catch (error) {
            setError(error.message);
        }
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Recept laden...</p>
            </div>
        );
    }

    if (error || !recipe) {
        return (
            <div className="error-container">
                <p>{error}</p>
                <button onClick={() => navigate(-1)} className="back-button">
                    Terug naar overzicht
                </button>
            </div>
        );
    }

    return (
        <div className="recipe-details">
            <button onClick={() => navigate(-1)} className="back-button">
                ← Terug naar overzicht
            </button>

            <div className="recipe-details-container">
                <div className="recipe-header">
                    <div className="image-container">
                        <img src={recipe.strMealThumb} alt={recipe.strMeal}/>
                    </div>
                </div>

                <div className="recipe-content">
                    <div className="recipe-header-content">
                        <h1 className="recipe-title">{recipe.strMeal}</h1>
                        <button
                            className={`favorite-button ${isFavorite(recipe.idMeal) ? 'active' : ''}`}
                            onClick={handleFavoriteClick}
                            aria-label={isFavorite(recipe.idMeal) ? 'Verwijder uit favorieten' : 'Voeg toe aan favorieten'}
                        >
                            <svg viewBox="0 0 24 24">
                                <path
                                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                            </svg>
                        </button>
                    </div>
                    <span className="recipe-category">{recipe.strCategory}</span>

                    <div className="recipe-info">
                        <div className="recipe-section">
                            <h2>Ingrediënten</h2>
                            <ul className="ingredients-list">
                                {recipe.ingredients.map((item, index) => (
                                    <li key={index}>
                                        {item.measure} {item.ingredient}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="recipe-section">
                            <h2>Bereidingswijze</h2>
                            <p className="instructions">{recipe.strInstructions}</p>
                        </div>
                    </div>

                    <div className="button-container">
                        {recipe.strYoutube && (
                            <a
                                href={recipe.strYoutube}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="video-button"
                            >
                                Bekijk op YouTube
                            </a>
                        )}
                        {recipe.strSource && (
                            <a
                                href={recipe.strSource}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="source-button"
                            >
                                Bekijk origineel recept
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecipeDetail;
