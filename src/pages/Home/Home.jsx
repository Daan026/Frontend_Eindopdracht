import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import SearchBar from '../../Components/SearchBar/SearchBar.jsx';
import Button from '../../Components/Button/Button.jsx';
import './Home.css';
import {context} from "../../services/Context.jsx";
import imgchecker from "../../services/imgchecker.jsx";

const Home = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const recipes = [];
                for (let i = 0; i < 3; i++) {
                    const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
                    const data = await response.json();
                    if (data.meals && data.meals[0]) {
                        recipes.push(data.meals[0]);
                    }
                }
                const formattedRecipes = recipes.map(meal => ({
                    id: meal.idMeal,
                    title: meal.strMeal,
                    image: meal.strMealThumb,
                    category: meal.strCategory,
                    area: meal.strArea
                }));

                setRecipes(formattedRecipes);
                setError(null);
            } catch (error) {
                console.error('Error fetching recipes:', error);
                setError('Er ging iets mis bij het laden van de recepten. Probeer het opnieuw.');
            } finally {
                setLoading(false);
            }
        };

        fetchRecipes();
    }, []);

    const handleRetry = () => {
        setLoading(true);
        setError(null);
        fetchRecipes();
    };

    const handleSearch = (query) => {
        navigate(`/search?q=${encodeURIComponent(query)}`);
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>{context.loadingRecipes}</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-container">
                <p>{error}</p>
                <Button onClick={handleRetry}>Opnieuw Proberen</Button>
            </div>
        );
    }

    return (
        <div className="home">
            <div className="hero">
                <h1>{context.findRecipe}</h1>
                <p>{context.discoverRecipes}</p>
                <div className="search-container">
                    <SearchBar onSearch={handleSearch} placeholder={context.searchPlaceholder}/>
                </div>
            </div>

            <section className="featured">
                <h2>{context.featuredRecipes}</h2>
                <div className="featured-grid">
                    {recipes.map(recipe => (
                        <div key={recipe.id} className="featured-card" onClick={() => navigate(`/recipe/${recipe.id}`)}>
                            <imgchecker src={recipe.image} alt={recipe.title}/>
                            <div className="featured-content">
                                <h3>{recipe.title}</h3>
                                <span className="category">{recipe.category} • {recipe.area}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;
