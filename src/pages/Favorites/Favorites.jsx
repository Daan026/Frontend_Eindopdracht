import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useAuth} from '../../contexts/AuthContext';
import {useFavorites} from '../../services/FavoritesContext';
import './Favorites.css';

const Favorites = () => {
    const navigate = useNavigate();
    const {user} = useAuth();
    const {favorites, loading, removeFavorite} = useFavorites();

    if (!user) {
        navigate('/login');
        return null;
    }

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Favorieten laden...</p>
            </div>
        );
    }

    const handleRemoveFavorite = async (recipeId) => {
        try {
            await removeFavorite(recipeId);
        } catch (error) {
            console.error('Error removing favorite:', error);
        }
    };

    if (favorites.length === 0) {
        return (
            <div className="favorites-container">
                <h1>Mijn Favorieten</h1>
                <div className="no-favorites">
                    <p>Je hebt nog geen favoriete recepten.</p>
                    <button onClick={() => navigate('/')}>Bekijk recepten</button>
                </div>
            </div>
        );
    }

    return (
        <div className="favorites-container">
            <h1>Mijn Favorieten</h1>
            <div className="favorites-grid">
                {favorites.map((recipe) => (
                    <div key={recipe.idMeal} className="favorite-card">
                        <div className="favorite-image">
                            <img src={recipe.strMealThumb} alt={recipe.strMeal}/>
                        </div>
                        <div className="favorite-content">
                            <h3>{recipe.strMeal}</h3>
                            <div className="favorite-info">
                                <span>{recipe.strCategory}</span>
                                <span>{recipe.strArea}</span>
                            </div>
                            <div className="favorite-actions">
                                <Link to={`/recipe/${recipe.idMeal}`} className="view-button">
                                    Bekijk Recept
                                </Link>
                                <button
                                    onClick={() => handleRemoveFavorite(recipe.idMeal)}
                                    className="remove-button"
                                >
                                    Verwijder
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Favorites;
