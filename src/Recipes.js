import {useState, useEffect} from 'react';
import uuid from 'react-uuid';
import './Recipes.css';

function Recipes() {
    const [response, setResponse] = useState();

    useEffect(() => {
        async function fetchRecipes() {
            const res = await fetch("https://api.kazumirecipe.com/"); // CORS restricted - edit kazumirecipeapi to test API call locally
            const json = await res.json();
            setResponse(json);
        }
        fetchRecipes();
    }, []);
    if(response !== undefined) {
        return (
            <div className='recipes-container'>
                {response['data'].map((recipe) => 
                    <div key={uuid()} className='recipe'>
                        <img src={recipe['image']} alt={recipe['name']}/>
                        <h2>{recipe['name']}</h2>
                        <h3 className='ingredients'>Ingredients: {makeIngredients(recipe['ingredients'])}</h3>
                        <ol className='directions'>
                            {recipe['directions'].map((direction) => <li key={uuid()}>{direction}</li>)}
                        </ol>
                        
                    </div>
                )}
            </div>
        );
    }

    function makeIngredients(ary) {
        let ingredients = "";
        for(let i = 0; i < ary.length - 1; i++) {
            ingredients += ary[i] + ", ";
        }
        ingredients += ary[ary.length - 1];
        return ingredients;
    }

    return (
        <>
            <div>Downloading Response...</div>
        </>
    );
}

export default Recipes;