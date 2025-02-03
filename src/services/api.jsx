import axios from 'axios';

const basislink = 'https://www.themealdb.com/api/json/v1/1';

export const api = {
    async getRandomMeal() {
        const response = await axios.get(`${basislink}/random.php`);
        return response.data;
    },

    async searchMeals(query) {
        const response = await axios.get(`${basislink}/search.php?s=${query}`);
        return response.data;
    },

    async getMealById(id) {
        const response = await axios.get(`${basislink}/lookup.php?i=${id}`);
        return response.data;
    },

    async getCategories() {
        const response = await axios.get(`${basislink}/categories.php`);
        return response.data;
    },

    async filterByCategory(category) {
        const response = await axios.get(`${basislink}/filter.php?c=${category}`);
        return response.data;
    },

    async getAreas() {
        const response = await axios.get(`${basislink}/list.php?a=list`);
        return response.data;
    },

    async filterByArea(area) {
        const response = await axios.get(`${basislink}/filter.php?a=${area}`);
        return response.data;
    },

    async getIngredients() {
        const response = await axios.get(`${basislink}/list.php?i=list`);
        return response.data;
    },

    async filterByIngredient(ingredient) {
        if (!ingredient) {
            throw new Error('Ingredient is not defined');
        }

        const response = await axios.get(`${basislink}/filter.php?i=${ingredient}`);
        return response.data;
    },
};
