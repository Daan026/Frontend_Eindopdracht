import React, {createContext, useState, useContext, useEffect} from 'react';
import PropTypes from 'prop-types';
import {authService} from '../services/auth';

export const AuthContext = createContext(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth moet binnen een AuthProvider gebruikt worden');
    }
    return context;
};

export const AuthProvider = ({children}) => {
    const [state, setState] = useState({
        user: null,
        loading: true,
        error: null
    });

    useEffect(() => {
        const initializeAuth = async () => {
            try {
                const storedUser = authService.getCurrentUser();
                setState(prev => ({
                    ...prev,
                    user: storedUser,
                    loading: false
                }));
            } catch (error) {
                setState(prev => ({
                    ...prev,
                    error: error.message,
                    loading: false
                }));
            }
        };

        initializeAuth();
    }, []);

    const login = async (username, password) => {
        if (!username || !password) {
            throw new Error('Username en password zijn verplicht');
        }

        setState(prev => ({...prev, loading: true, error: null}));
        try {
            const response = await authService.login(username, password);
            setState(prev => ({
                ...prev,
                user: response,
                loading: false
            }));
            return response;
        } catch (error) {
            setState(prev => ({
                ...prev,
                error: error.message,
                loading: false
            }));
            throw error;
        }
    };

    const logout = async () => {
        setState(prev => ({...prev, loading: true}));
        try {
            await authService.logout();
            setState({user: null, loading: false, error: null});
        } catch (error) {
            setState(prev => ({
                ...prev,
                error: error.message,
                loading: false
            }));
        }
    };

    const value = {
        user: state.user,
        loading: state.loading,
        error: state.error,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export default AuthProvider;
