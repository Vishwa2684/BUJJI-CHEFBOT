import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { FaLocationArrow, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Card from './Card';
import axios from 'axios';
import ChatComponent from './ChatComponent'; 

const Bot = ({ tags }) => {
    const [prompt, setPrompt] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [currentRecipeIndex, setCurrentRecipeIndex] = useState(0);
    const [useLLM, setUseLLM] = useState(false);
    const [loading, setLoading] = useState(false);
    const [UserInfo, setUserInfo] = useState({});
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (tags && tags.length > 0) {
            setPrompt(tags.join(', '));
        }
    }, [tags]);

    const apiCall = async () => {
        setLoading(true);
        try {
            const response = await fetch(`https://api.edamam.com/search?q=${prompt}&app_id=7aa516a5&app_key=dc836a223fb788b11ae390504d9e97ce&from=0&to=10`);
            if (response.ok) {
                const data = await response.json();
                const randomRecipes = getRandomRecipes(data.hits, 3);
                setRecipes(randomRecipes);
                setCurrentRecipeIndex(0);
            } else {
                console.error('API call failed:', response.statusText);
            }
        } catch (error) {
            console.error('Error during API call:', error);
        } finally {
            setLoading(false);
        }
    };


    const GeminiCall = async () => {
        setLoading(true);
        try {
            const response = await axios.post(
                'http://localhost:5000/api/user/gemini',
                {
                    uid: UserInfo?.id,
                    text: prompt,
                    max_length: 50,
                    role: 'user',
                    timestamp: new Date().toISOString(),
                },
                { headers: { 'Authorization': `Bearer ${user?.token}` } }
            );
            if (response.status === 200 || response.status === 201) {
                const data = response.data;
                console.log('fetched', data);
            } else {
                console.error('LLM call failed:', response.statusText);
            }
        } catch (error) {
            console.error('Error during LLM call:', error);
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    const LLMCall = async () => {
        setLoading(true);
        try {
            const response = await axios.post(
                'http://localhost:5000/api/user/generate',
                {
                    uid: UserInfo?.id,
                    text: prompt,
                    max_length: 50,
                    role: 'user',
                    timestamp: new Date().toISOString(),
                },
                { headers: { 'Authorization': `Bearer ${user?.token}` } }
            );
            if (response.status === 200 || response.status === 201) {
                const data = response.data;
                console.log('fetched', data);
            } else {
                console.error('LLM call failed:', response.statusText);
            }
        } catch (error) {
            console.error('Error during LLM call:', error);
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    const getRandomRecipes = (recipes, count) => {
        const shuffled = recipes.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count).map(hit => hit.recipe);
    };

    const handlePrevious = () => {
        setCurrentRecipeIndex((prevIndex) => 
            prevIndex > 0 ? prevIndex - 1 : recipes.length - 1
        );
    };

    const handleNext = () => {
        setCurrentRecipeIndex((prevIndex) => 
            prevIndex < recipes.length - 1 ? prevIndex + 1 : 0
        );
    };

    const handleSubmit = () => {
        if (useLLM) {
            LLMCall();
        } else {
            apiCall();
        }
    };

    return (
        <div className="bot-div">
            {useLLM ? (
                <ChatComponent />
            ) : (
                <div className="recipe-container">
                    {loading ? (
                        <div className='loading'>Loading...</div>
                    ) : (
                        recipes.length > 0 && (
                            <>
                                <button className="nav-button prev" onClick={handlePrevious}>
                                    <FaChevronLeft />
                                </button>
                                <Card recipe={recipes[currentRecipeIndex]} />
                                <button className="nav-button next" onClick={handleNext}>
                                    <FaChevronRight />
                                </button>
                            </>
                        )
                    )}
                </div>
            // <ChatComponent/>
            )}
            <div className="bot-input-container">
                <input 
                    type="text"
                    className="bot-input"
                    value={prompt}
                    placeholder={`Hey ${user.username}!! Let's Cook`}
                    onChange={(e) => setPrompt(e.target.value)}
                    title={prompt} // This will show the full text on hover
                />
                <div className="toggle-container">
                    <label className="toggle-switch">
                        <input 
                            type="checkbox" 
                            checked={useLLM} 
                            onChange={() => setUseLLM(!useLLM)} 
                        />
                        <span className="slider"></span>
                    </label>
                    <span className="toggle-label">{useLLM ? 'LLM' : 'API'}</span>
                </div>
                <button 
                    className="send-button"
                    onClick={handleSubmit}
                >
                    <FaLocationArrow />
                </button>
            </div>
        </div>
    );
};

export default Bot;
