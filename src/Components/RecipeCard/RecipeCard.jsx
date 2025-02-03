import React from 'react';
import './RecipeCard.css';

const RecipeCard = ({image, tags, prepTime, isFeatured = false}) => {
    return (
        <div className={`recipe-card ${isFeatured ? 'featured' : ''}`}>
            <div
                className="recipe-image"
                style={image ? {backgroundImage: `url(${image})`} : undefined}
            />
            <div className="recipe-info">
                <div className="recipe-tags">
                    {isFeatured && <span className="tag">Featured</span>}
                    {tags.map((tag, index) => (
                        <span key={index} className="tag">{tag}</span>
                    ))}
                </div>
                <div className="recipe-meta">
                    <span>Preparation time</span>
                    <span>{prepTime}</span>
                </div>
                <div className="recipe-actions">
                    <button className="save-btn">Save</button>
                    <button className="view-btn">View recipe</button>
                </div>
            </div>
        </div>
    );
};

export default RecipeCard;
