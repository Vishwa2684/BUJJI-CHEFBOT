import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import Navbar from './Navbar.js';
import axios from 'axios';
import Card from './Card.js';

export default function LikedRecipes() {
    const { user } = useContext(AuthContext);
    const [likedRecipes, setLikedRecipes] = useState([]);

    useEffect(() => {
        const fetchLikedRecipes = async () => {
            if (!user) return;

            try {
                const response = await axios.get('http://localhost:5000/api/user/liked-recipes', {
                    headers: {
                        Authorization: `Bearer ${user?.token}`
                    }
                });
                setLikedRecipes(response?.data); // Store the fetched recipes
            } catch (error) {
                console.error('Error fetching liked recipes:', error);
            }
        };

        fetchLikedRecipes();
    }, [user]);
    console.log('data is',likedRecipes.map((i)=>i))
    return (
        <>
            <Navbar />
            <div className="liked-recipes">
                <h1 className='liked-h1'>Liked Recipes</h1>
                <div className="recipe-cards">
                    {likedRecipes?.length > 0 ? (
                        likedRecipes?.map((recipe) => (
                            <Card key={recipe.uri} recipe={recipe.recipe} />
                        ))
                    ) : (
                        <p>No liked recipes found.</p>
                    )}
                </div>
            </div>
        </>
    );
}
