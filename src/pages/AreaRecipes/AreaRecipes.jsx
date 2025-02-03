import React, {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {api} from '../../services/api.jsx';
import Button from '../../Components/Button/Button.jsx';
import './AreaRecipes.css';

const AreaRecipes = () => {
    const {area} = useParams();
    const navigate = useNavigate();
    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAreaRecipes = async () => {
            try {
                setLoading(true);
                const response = await api.filterByArea(area);
                setMeals(response.meals || []);
                setError(null);
            } catch (err) {
                setError('Er ging iets mis bij het ophalen van de recepten');
            } finally {
                setLoading(false);
            }
        };

        fetchAreaRecipes();
    }, [area]);

    if (loading) return <div className="loading">Laden...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="area-recipes-page">
            <div className="page-header">
                <Button
                    onClick={() => navigate('/areas')}
                    variant="text"
                    className="back-button"
                >
                    ← Terug naar Landen
                </Button>
                <h1>Recepten uit {area}</h1>
            </div>

            <div className="recipes-grid">
                {meals.length === 0 ? (
                    <div className="no-recipes">
                        <p>Geen recepten gevonden voor {area}</p>
                    </div>
                ) : (
                    meals.map(meal => (
                        <div
                            key={meal.idMeal}
                            className="recipe-card"
                            onClick={() => navigate(`/recipe/${meal.idMeal}`)}
                        >
                            <img src={meal.strMealThumb} alt={meal.strMeal}/>
                            <div className="recipe-content">
                                <h3>{meal.strMeal}</h3>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default AreaRecipes;
