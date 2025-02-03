import React from 'react';
import {useNavigate} from 'react-router-dom';
import {useFavorites} from '../../services/FavoritesContext.jsx';
import './RandomRecipe.css';

const RandomRecipe = ({recipe}) => {
    const navigate = useNavigate();
    const {favorites, toggleFavorite} = useFavorites();

    const handleViewRecipe = () => {
        navigate(`/recipe/${recipe.idMeal}`);
    };

    return (
        <div className="recipe-card" onClick={handleViewRecipe}>
            <img src={recipe.strMealThumb} alt={recipe.strMeal} className="recipe-image"/>
            <div className="recipe-content">
                <h3 className="recipe-title">{recipe.strMeal}</h3>
                <div className="recipe-meta">
                    <div className="tags">
                        {recipe.strArea && <span className="tag">{recipe.strArea}</span>}
                        {recipe.strCategory && <span className="tag">{recipe.strCategory}</span>}
                    </div>
                </div>
                <div className="recipe-actions">
                    <button
                        className="favorite-button"
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(recipe.idMeal);
                        }}
                        aria-label={favorites.includes(recipe.idMeal) ? 'Remove from favorites' : 'Add to favorites'}
                    >
                        {favorites.includes(recipe.idMeal) ? '❤️' : '🤍'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RandomRecipe;
