import axios from 'axios';

const BASE_URL = 'https://novi.datavortex.nl/daanreceptje';

export const noviApi = {
    async uploadImage(file, token) {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post(`${BASE_URL}users/{username}/upload`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            return response.data;
        } catch (error) {
            console.error('Error uploading image:', error);
            throw error;
        }
    },

    async getImage(imageId, token) {
        try {
            const response = await axios.get(`${BASE_URL}/images/${imageId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            return response.data;
        } catch (error) {
            console.error('Error getting image:', error);
            throw error;
        }
    }
};
