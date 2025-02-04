import React, { useState } from 'react';

const ImageChecker = ({ imageUrl }) => {
    const [error, setError] = useState(null);

    const handleError = (e) => {
        setError(`Fout bij het laden van de afbeelding: ${e?.message || 'Onbekende fout'}`);
        console.error('Foutdetails:', e);
    };

    return (
        <div className="p-4 max-w-md mx-auto">
            <h1 className="text-xl font-bold mb-4">Image Checker</h1>
            {error ? (
                <div className="text-red-500 bg-red-100 p-2 rounded-md">
                    {error}
                </div>
            ) : (
                <img
                    src={imageUrl}
                    alt="Gecontroleerde afbeelding"
                    onError={handleError}
                    className="border rounded-md shadow-md"
                />
            )}
        </div>
    );
};

export default ImageChecker;