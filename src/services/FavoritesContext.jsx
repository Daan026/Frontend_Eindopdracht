import React, {createContext, useState, useContext, useEffect} from 'react';
import {authService} from './auth';

const FavoritesContext = createContext();

export const useFavorites = () => {
    return useContext(FavoritesContext);
};

export const FavoritesProvider = ({children}) => {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadFavorites();
    }, []);

    const loadFavorites = () => {
        const user = authService.getCurrentUser();
        if (user) {
            const storedFavorites = localStorage.getItem(`favorites_${user.username}`);
            if (storedFavorites) {
                setFavorites(JSON.parse(storedFavorites));
            }
        }
        setLoading(false);
    };

    const saveFavorites = (newFavorites) => {
        const user = authService.getCurrentUser();
        if (user) {
            localStorage.setItem(`favorites_${user.username}`, JSON.stringify(newFavorites));
        }
    };

    const addFavorite = async (recipe) => {
        const user = authService.getCurrentUser();
        if (!user) {
            throw new Error('Je moet ingelogd zijn om recepten als favoriet op te slaan');
        }

        const newFavorites = [...favorites, recipe];
        setFavorites(newFavorites);
        saveFavorites(newFavorites);
    };

    const removeFavorite = async (recipeId) => {
        const user = authService.getCurrentUser();
        if (!user) {
            throw new Error('Je moet ingelogd zijn om recepten uit favorieten te verwijderen');
        }

        const newFavorites = favorites.filter(recipe => recipe.idMeal !== recipeId);
        setFavorites(newFavorites);
        saveFavorites(newFavorites);
    };

    const isFavorite = (recipeId) => {
        return favorites.some(recipe => recipe.idMeal === recipeId);
    };

    return (
        <FavoritesContext.Provider value={{
            favorites,
            loading,
            addFavorite,
            removeFavorite,
            isFavorite
        }}>
            {children}
        </FavoritesContext.Provider>
    );
};

export default FavoritesContext;
