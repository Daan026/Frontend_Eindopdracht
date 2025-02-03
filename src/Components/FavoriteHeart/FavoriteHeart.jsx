import React from 'react';
import {useFavorites} from '../../services/FavoritesContext.jsx';
import './FavoriteHeart.css';

const FavoriteHeart = ({recipe}) => {
    const {addToFavorites, removeFromFavorites, isFavorite} = useFavorites();
    const isRecipeFavorite = isFavorite(recipe.id);

    const handleClick = (e) => {
        e.stopPropagation();
        if (isRecipeFavorite) {
            removeFromFavorites(recipe.id);
        } else {
            addToFavorites(recipe);
        }
    };

    return (
        <div
            className={`favorite-heart ${isRecipeFavorite ? 'active' : ''}`}
            onClick={handleClick}
            title={isRecipeFavorite ? 'Verwijder uit favorieten' : 'Voeg toe aan favorieten'}
        >
            {isRecipeFavorite ? (
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path
                        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
            ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path
                        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
            )}
        </div>
    );
};

export default FavoriteHeart;
