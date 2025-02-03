import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;


function getHeaders(includeAuth = false) {
    const headers = {
        'Authorization': `Basic ${btoa(API_KEY)}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    };

    if (includeAuth) {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user?.accessToken) {
            headers['Authorization'] = `Bearer ${user.accessToken}`;
        }
    }

    return headers;
};

export const authService = {
    async register(username, email, password) {
        try {
            const response = await axios.post(
                `${API_URL}/users`,
                {username, email, password},
                {headers: getHeaders()}
            );

            if (response.data) {
                localStorage.setItem('user', JSON.stringify(response.data));
                return response.data;
            }
            return response.data;
        } catch (error) {
            console.error('Registration error:', error.response?.data || error.message);
            throw new Error(error.response?.data?.message || 'Registratie mislukt');
        }
    },

    async login(username, password) {
        try {
            console.log('Attempting login with:', {username});
            const response = await axios.post(
                `${API_URL}/users/authenticate`,
                {username, password},
                {
                    headers: {
                        'Authorization': `Basic ${btoa(API_KEY)}`,
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }
            );
            if (response.data) {
                localStorage.setItem('user', JSON.stringify(response.data));
                return response.data;
            }
            throw new Error('Login mislukt');
        } catch (error) {
            console.error('Login error:', error.response || error);
            if (error.response?.status === 403) {
                throw new Error('Ongeldige gebruikersnaam of wachtwoord');
            }
            throw new Error(error.response?.data?.message || 'Login mislukt. Controleer je gebruikersnaam en wachtwoord.');
        }
    },

    logout() {
        localStorage.removeItem('user');
    },

    getCurrentUser() {
        try {
            const userStr = localStorage.getItem('user');
            return userStr ? JSON.parse(userStr) : null;
        } catch (e) {
            console.error('Error parsing user from localStorage:', e);
            return null;
        }
    },

    async validateToken() {
        try {
            const user = this.getCurrentUser();
            if (!user) return null;

            console.log('Making request to:', `${API_URL}/auth/validate`);
            console.log('With headers:', getHeaders(true));

            const response = await axios.get(`${API_URL}/auth/validate`, {
                headers: getHeaders(true)
            });

            console.log('Response status:', response.status);
            console.log('Response headers:', response.headers);

            return user;
        } catch (error) {
            console.error('Validation error:', {
                message: error.message,
                status: error.response?.status,
                stack: error.stack
            });
            this.logout();
            return null;
        }
    },

    async updateProfile(email, password) {
        try {
            const user = this.getCurrentUser();
            if (!user) throw new Error('Niet ingelogd');

            const updateData = {
                email: email || user.email,
                password: password || undefined
            };

            console.log('Making request to:', `${API_URL}/users/${user.id}`);
            console.log('With headers:', getHeaders(true));
            console.log('With data:', updateData);

            const response = await axios.put(`${API_URL}/users/${user.id}`, updateData, {
                headers: getHeaders(true)
            });

            console.log('Response status:', response.status);
            console.log('Response headers:', response.headers);

            const responseText = response.data;
            console.log('Raw response text:', responseText);

            let data;
            try {
                data = responseText ? JSON.parse(responseText) : {};
                console.log('Parsed response data:', data);
            } catch (e) {
                console.log('Failed to parse JSON, using text as message');
                data = {message: responseText};
            }

            if (!response.data) {
                const error = new Error(data.message || responseText || 'Update mislukt');
                error.status = response.status;
                throw error;
            }

            const updatedUser = data;

            const currentUser = this.getCurrentUser();
            localStorage.setItem('user', JSON.stringify({
                ...currentUser,
                ...updatedUser
            }));

            return updatedUser;
        } catch (error) {
            console.error('Update error:', {
                message: error.message,
                status: error.response?.status,
                stack: error.stack
            });
            throw error;
        }
    },

    async getFavorites(userId) {
        try {
            const user = this.getCurrentUser();
            console.log('Making request to:', `${API_URL}/users/${userId}/favorites`);
            console.log('With headers:', getHeaders(true));

            const response = await axios.get(`${API_URL}/users/${userId}/favorites`, {
                headers: getHeaders(true)
            });

            console.log('Response status:', response.status);
            console.log('Response headers:', response.headers);

            const responseText = response.data;
            console.log('Raw response text:', responseText);

            let data;
            try {
                data = responseText ? JSON.parse(responseText) : {};
                console.log('Parsed response data:', data);
            } catch (e) {
                console.log('Failed to parse JSON, using text as message');
                data = {message: responseText};
            }

            if (!response.data) {
                const error = new Error(data.message || responseText || 'Ophalen van favorieten mislukt');
                error.status = response.status;
                throw error;
            }

            return data;
        } catch (error) {
            console.error('Get favorites error:', {
                message: error.message,
                status: error.response?.status,
                stack: error.stack
            });
            throw error;
        }
    },

    async addFavorite(userId, recipeId) {
        try {
            const user = this.getCurrentUser();
            console.log('Making request to:', `${API_URL}/users/${userId}/favorites`);
            console.log('With headers:', getHeaders(true));
            console.log('With data:', {recipeId});

            const response = await axios.post(`${API_URL}/users/${userId}/favorites`, {recipeId}, {
                headers: getHeaders(true)
            });

            console.log('Response status:', response.status);
            console.log('Response headers:', response.headers);

            const responseText = response.data;
            console.log('Raw response text:', responseText);

            let data;
            try {
                data = responseText ? JSON.parse(responseText) : {};
                console.log('Parsed response data:', data);
            } catch (e) {
                console.log('Failed to parse JSON, using text as message');
                data = {message: responseText};
            }

            if (!response.data) {
                const error = new Error(data.message || responseText || 'Toevoegen van favoriet mislukt');
                error.status = response.status;
                throw error;
            }

            return data;
        } catch (error) {
            console.error('Add favorite error:', {
                message: error.message,
                status: error.response?.status,
                stack: error.stack
            });
            throw error;
        }
    },

    async removeFavorite(userId, recipeId) {
        try {
            const user = this.getCurrentUser();
            console.log('Making request to:', `${API_URL}/users/${userId}/favorites/${recipeId}`);
            console.log('With headers:', getHeaders(true));

            const response = await axios.delete(`${API_URL}/users/${userId}/favorites/${recipeId}`, {
                headers: getHeaders(true)
            });

            console.log('Response status:', response.status);
            console.log('Response headers:', response.headers);

            const responseText = response.data;
            console.log('Raw response text:', responseText);

            let data;
            try {
                data = responseText ? JSON.parse(responseText) : {};
                console.log('Parsed response data:', data);
            } catch (e) {
                console.log('Failed to parse JSON, using text as message');
                data = {message: responseText};
            }

            if (!response.data) {
                const error = new Error(data.message || responseText || 'Verwijderen van favoriet mislukt');
                error.status = response.status;
                throw error;
            }

            return data;
        } catch (error) {
            console.error('Remove favorite error:', {
                message: error.message,
                status: error.response?.status,
                stack: error.stack
            });
            throw error;
        }
    }
};
