import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { useFetch } from "../../hooks/useFetch";

import "./RecipeDetails.css";
import { useTheme } from "../../hooks/useTheme";

// Project FireStore
import { projectFirestore } from "../../firebase/config";

function RecipeDetails() {
  const { id } = useParams();
  // const url = "http://localhost:3000/recipes/" + id;
  // const { error, isPending, data: recipe } = useFetch(url);
  const { mode } = useTheme();

  const [recipe, setRecipe] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsPending(true);

    // Firestore Function
    // Fetching Data
    const unsub = projectFirestore
      .collection("recipes")
      .doc(id)
      .onSnapshot((doc) => {
        // console.log(doc);
        if (doc.exists) {
          setIsPending(false);
          setRecipe(doc.data());
        } else {
          setIsPending(false);
          setError("Could not find that recipe");
        }
      });
    return () => unsub();
  }, [id]);

  // Update Function
  const handleClick = () => {
    projectFirestore.collection("recipes").doc(id).update({
      title: "lorem ipsum...",
    });
  };

  return (
    <div className={`recipe ${mode}`}>
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {recipe && (
        <Fragment>
          <h2 className={`page-title ${mode}`}>{recipe.title}</h2>
          <p>Takes {recipe.cookingTime} to cook.</p>
          <ul>
            {recipe.ingredients.map((ingredient) => (
              <li key={ingredient}>{ingredient}</li>
            ))}
          </ul>
          <p className="method">{recipe.method}</p>
          <button onClick={handleClick}>Update me</button>
        </Fragment>
      )}
    </div>
  );
}

export default RecipeDetails;
