import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {api} from '../../services/api.jsx';
import './Categories.css';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory] = useState(null);
    const [meals] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await api.getCategories();
            setCategories(response.categories);
            setLoading(false);
        } catch (error) {
            setError('Failed to fetch categories');
            setLoading(false);
        }
    };

    const handleCategoryClick = (categoryName) => {
        navigate(`/category/${categoryName}`);
    };

    if (loading) {
        return (
            <div className="loading-container">
                <p>Loading categories...</p>
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
        <div className="categories-page">
            <h1 className="categories-title">Recipe Categories</h1>
            <div className="categories-grid">
                {categories.map(category => (
                    <div
                        key={category.idCategory}
                        className={`category-card ${selectedCategory?.idCategory === category.idCategory ? 'selected' : ''}`}
                        onClick={() => handleCategoryClick(category.strCategory)}
                    >
                        <img src={category.strCategoryThumb} alt={category.strCategory}/>
                        <div className="category-content">
                            <h3>{category.strCategory}</h3>
                            <p>{category.strCategoryDescription}</p>
                        </div>
                    </div>
                ))}
            </div>

            {selectedCategory && meals && (
                <div className="category-meals">
                    <h2>Meals in {selectedCategory.strCategory}</h2>
                    <div className="meals-grid">
                        {meals.map(meal => (
                            <div key={meal.idMeal} className="meal-card">
                                <img src={meal.strMealThumb} alt={meal.strMeal}/>
                                <h4>{meal.strMeal}</h4>
                                <Button
                                    variant="primary"
                                    onClick={() => window.location.href = `/recipe/${meal.idMeal}`}
                                >
                                    View Recipe
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Categories;
