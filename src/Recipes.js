import {useState, useEffect} from 'react';
import uuid from 'react-uuid';
import './Recipes.css';

function Recipes() {
    const [response, setResponse] = useState();

    // uncomment useEffect below when testing on localhost
    
    // useEffect(() => {
    //     const testJson = {"data":[{"directions":["Dice tomatoes until desired size","Add basil leaves, olive oil, salt and pepper as desired","Put a layer of mozzarella cheese on top","Place in oven and heat at 400 degrees Celsius until the cheese is melted."],"image":"https://firebasestorage.googleapis.com/v0/b/kazumirecipe.appspot.com/o/tomato_basil.jpg?alt=media&token=ee87ddd5-e194-46fe-80c0-bf9251b4df4a","ingredients":["tomato","basil","mozzarella cheese","olive oil"],"name":"Oven Cooked Tomato with Basil and Melted Cheese"},{"directions":["Direction 1","Direction 2","Finished!"],"image":"https://firebasestorage.googleapis.com/v0/b/kazumirecipe.appspot.com/o/gapaorice.jpg?alt=media&token=299d6027-9463-4697-bb44-e21f83f10836","ingredients":["rice","green pepper","onion"],"name":"Gapao Rice"}]};
    //     setResponse(testJson);
    // }, []);

    // comment out useEffect below when testing on localhost
    
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