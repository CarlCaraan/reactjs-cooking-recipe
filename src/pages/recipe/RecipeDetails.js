import React, { Fragment } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";

import "./RecipeDetails.css";
import { useTheme } from "../../hooks/useTheme";

function RecipeDetails() {
  const { id } = useParams();
  const url = "http://localhost:3000/recipes/" + id;
  const { error, isPending, data: recipe } = useFetch(url);
  const { mode } = useTheme();

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
