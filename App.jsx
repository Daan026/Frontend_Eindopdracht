import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Navbar from '../untitled9/src/Components/Navbar/Navbar.jsx';
import Footer from '../untitled9/src/Components/Footer/Footer.jsx';
import Random from '../untitled9/src/pages/Random/Random.jsx';
import Categories from '../untitled9/src/pages/Categories/Categories.jsx';
import CategoryRecipes from '../untitled9/src/pages/CategoryRecipes/CategoryRecipes.jsx';
import Search from '../untitled9/src/pages/Search/Search.jsx';
import Areas from '../untitled9/src/pages/Areas/Areas.jsx';
import AreaRecipes from '../untitled9/src/pages/AreaRecipes/AreaRecipes.jsx';
import Ingredients from '../untitled9/src/pages/Ingredients/Ingredients.jsx';
import IngredientRecipes from '../untitled9/src/pages/IngredientRecipes/IngredientRecipes.jsx';
import RecipeDetail from '../untitled9/src/pages/RecipeDetail/RecipeDetail.jsx';
import Favorites from '../untitled9/src/pages/Favorites/Favorites.jsx';
import Home from '../untitled9/src/pages/Home/Home.jsx';
import Login from '../untitled9/src/pages/Auth/Login.jsx';
import Register from '../untitled9/src/pages/Auth/Register.jsx';
import ForgotPassword from '../untitled9/src/pages/ForgotPassword/ForgotPassword.jsx';
import Account from '../untitled9/src/pages/Account/Account.jsx';
import {FavoritesProvider} from '../untitled9/src/services/FavoritesContext.jsx';
import {AuthProvider} from '../untitled9/src/contexts/AuthContext.jsx';
import ProtectedRoute from '../untitled9/src/Components/ProtectedRoute/ProtectedRoute.jsx';
import './App.css';

const App = () => {
    return (
        <AuthProvider>
            <FavoritesProvider>
                <div className="app">
                    <Navbar/>
                    <main className="main-content">
                        <Routes>
                            <Route path="/" element={<Home/>}/>
                            <Route path="/random" element={<Random/>}/>
                            <Route path="/categories" element={<Categories/>}/>
                            <Route path="/category/:category" element={<CategoryRecipes/>}/>
                            <Route path="/search" element={<Search/>}/>
                            <Route path="/areas" element={<Areas/>}/>
                            <Route path="/areas/:area" element={<AreaRecipes/>}/>
                            <Route path="/ingredients" element={<Ingredients/>}/>
                            <Route path="/ingredient/:ingredient" element={<IngredientRecipes/>}/>
                            <Route path="/favorites" element={
                                <ProtectedRoute>
                                    <Favorites/>
                                </ProtectedRoute>
                            }/>
                            <Route path="/recipe/:id" element={<RecipeDetail/>}/>
                            <Route path="/login" element={<Login/>}/>
                            <Route path="/register" element={<Register/>}/>
                            <Route path="/forgot-password" element={<ForgotPassword/>}/>
                            <Route path="/account" element={
                                <ProtectedRoute>
                                    <Account/>
                                </ProtectedRoute>
                            }/>
                        </Routes>
                    </main>
                    <Footer/>
                </div>
            </FavoritesProvider>
        </AuthProvider>
    );
};

export default App;
