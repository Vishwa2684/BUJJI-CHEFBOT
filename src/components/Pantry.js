

// import React from 'react';
// import Data from '../Dataset/pantrydata';

// const Pantry = () => {

//     const PantryData = Data.map((eachset) => {

//         const ingredients = eachset.items.map(i => {
//             return (
//                 <button key={eachset.id} className='pantry-button'>{i}</button>
//             )
//         });

//         return (
//             <div className='pantry-category' key={eachset.id}>
//                 <h5>{eachset.category}</h5>
//                 {ingredients}
//             </div>
//         );
//     });

//     return (
//         <div className="pantry">
//             <h2>Pantry</h2>
//             <div className="scrollbar" id="style-5">
//                 <div className="force-overflow">
//                     {PantryData}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Pantry;









import React, { useState} from 'react';
import { Link,useNavigate } from 'react-router-dom';
import Data from '../Dataset/pantrydata';

const Pantry = ({ onTagClick }) => {
    const nav =useNavigate()

    const navigate = ()=>{
        nav('/liked-recipes')
    }
    const PantryData = Data.map((eachset) => {
        const ingredients = eachset.items.map(i => (
            <button 
                key={i} 
                className='pantry-button'
                onClick={() => onTagClick(i)}
            >
                {i}
            </button>
        ));

        return (
            <div className='pantry-category' key={eachset.id}>
                <h4>{eachset.category}</h4>
                {ingredients}
            </div>
        );
    });

    return (
        <div className="pantry">
            <div className='side-nav'>
                <button onClick={navigate}>
                    favourites
                </button>
            </div>
            
            <h2>Pantry</h2>
            <div className="scrollbar" id="style-5">
                <div className="force-overflow">
                    {PantryData}
                </div>
            </div>
        </div>
    );
};

export default Pantry;
