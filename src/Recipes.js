import {useState, useEffect} from 'react';

function Recipes() {
    const [response, setResponse] = useState({});

    useEffect(() => {
        console.log('hiya');
        async function fetchRecipes() {
            const res = await fetch("https://kazumirecipeapi.uw.r.appspot.com/");
            const json = await res.json();
            console.log(json);
        }
        fetchRecipes();
    }, []);
    console.log(response);
    return (
        <>
            <div>hello</div>
        </>
    );
}

export default Recipes;