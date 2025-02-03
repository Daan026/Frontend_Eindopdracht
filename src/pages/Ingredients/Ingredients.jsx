import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {api} from '../../services/api.jsx';
import './Ingredients.css';

const Ingredients = () => {
    const [ingredients, setIngredients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchIngredients();
    }, []);

    const fetchIngredients = async () => {
        try {
            const response = await api.getIngredients();
            if (response.meals) {
                // Filter out ingredients with empty names or descriptions
                const validIngredients = response.meals.filter(ingredient =>
                    ingredient.strIngredient &&
                    ingredient.strIngredient.trim() !== '' &&
                    ingredient.strDescription &&
                    ingredient.strDescription.trim() !== ''
                );
                setIngredients(validIngredients);
            } else {
                setError('No ingredients found');
            }
            setLoading(false);
        } catch (error) {
            setError('Error loading ingredients');
            setLoading(false);
        }
    };

    const handleIngredientClick = (ingredientName) => {
        navigate(`/ingredient/${ingredientName}`);
    };

    const filteredIngredients = ingredients.filter(ingredient =>
        ingredient.strIngredient.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="loading-container">
                <p>Loading ingredients...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-container">
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="ingredients-page">
            <h1>Ingredients</h1>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search ingredients..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="ingredients-grid">
                {filteredIngredients.map((ingredient) => (
                    <div
                        key={ingredient.idIngredient}
                        className="ingredient-card"
                        onClick={() => handleIngredientClick(ingredient.strIngredient)}
                    >
                        <img
                            src={`https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}.png`}
                            alt={ingredient.strIngredient}
                        />
                        <h3>{ingredient.strIngredient}</h3>
                        <p className="ingredient-description">
                            {ingredient.strDescription.length > 100
                                ? `${ingredient.strDescription.substring(0, 100)}...`
                                : ingredient.strDescription}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Ingredients;
