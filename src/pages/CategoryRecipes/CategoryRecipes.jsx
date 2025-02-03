import React, {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {api} from '../../../../assignement/src/services/api.jsx';
import Button from '../../Components/Button/Button.jsx';
import './CategoryRecipes.css';

const CategoryRecipes = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const {category} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                setLoading(true);
                const response = await api.filterByCategory(category);
                setRecipes(response.meals || []);
                setError(null);
            } catch (err) {
                setError('Error loading recipes. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchRecipes();
    }, [category]);

    const handleRecipeClick = (recipeId) => {
        navigate(`/recipe/${recipeId}`);
    };

    if (loading) return (
        <div className="loading-container">
            <p>Loading recipes...</p>
        </div>
    );
    if (error) return (
        <div className="error-container">
            <p>{error}</p>
        </div>
    );

    return (
        <div className="category-recipes-page">
            <div className="page-header">
                <Button
                    onClick={() => navigate('/categories')}
                    variant="text"
                    className="back-button"
                >
                    ← Terug naar Categorieën
                </Button>
                <h1>{category} Recepten</h1>
            </div>

            <div className="recipes-grid">
                {recipes.map((recipe) => (
                    <div
                        key={recipe.idMeal}
                        className="recipe-card"
                        onClick={() => handleRecipeClick(recipe.idMeal)}
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
                ))}
            </div>
        </div>
    );
};

export default CategoryRecipes;
