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
    projectFirestore
      .collection("recipes")
      .doc(id)
      .get()
      .then((doc) => {
        // console.log(doc);
        if (doc.exists) {
          setIsPending(false);
          setRecipe(doc.data());
        } else {
          setIsPending(false);
          setError("Could not find that recipe");
        }
      });
  }, [id]);

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
          <p>{recipe.method}</p>
        </Fragment>
      )}
    </div>
  );
}

export default RecipeDetails;
