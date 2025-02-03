import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {api} from '../../services/api.jsx';
import Button from '../../Components/Button/Button.jsx';
import './Areas.css';

const Areas = () => {
    const [areas, setAreas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchAreas();
    }, []);

    const fetchAreas = async () => {
        try {
            const response = await api.getAreas();
            setAreas(response.meals);
            setLoading(false);
        } catch (err) {
            setError('Er ging iets mis bij het ophalen van de landen');
            setLoading(false);
        }
    };

    const handleAreaClick = (area) => {
        navigate(`/areas/${area}`);
    };

    if (loading) return <div className="loading">Laden...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="areas-page">
            <div className="page-header">
                <h1>Ontdek Landelijke Recepten</h1>
            </div>
            <div className="areas-grid">
                {areas.map((area) => (
                    <Button
                        key={area.strArea}
                        onClick={() => handleAreaClick(area.strArea)}
                        className="area-button"
                    >
                        {area.strArea}
                    </Button>
                ))}
            </div>
        </div>
    );
};

export default Areas;
