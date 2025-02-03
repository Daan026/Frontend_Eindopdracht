import React from 'react';
import './ProfileCard.css';

const ProfileCard = ({
                         name,
                         username,
                         collections,
                         followers,
                         profilePic,
                         recipeImages
                     }) => {
    const formatNumber = (num) => {
        return num.toLocaleString();
    };

    return (
        <div className="profile-card">
            <div className="profile-header">
                <div
                    className="profile-pic"
                    style={profilePic ? {backgroundImage: `url(${profilePic})`} : undefined}
                />
                <div className="profile-info">
                    <h3>{name}</h3>
                    <p>{username}</p>
                </div>
                <button className="follow-btn">Follow</button>
            </div>
            <div className="profile-stats">
                <div>Collections: {formatNumber(collections)}</div>
                <div>Followers: {formatNumber(followers)}</div>
            </div>
            <div className="recipe-gallery">
                {recipeImages.map((image, index) => (
                    <div
                        key={index}
                        className="gallery-item"
                        style={image ? {backgroundImage: `url(${image})`} : undefined}
                    />
                ))}
            </div>
        </div>
    );
};

export default ProfileCard;
