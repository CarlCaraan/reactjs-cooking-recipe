import React, { useRef, useState } from "react";
// import React, { useEffect } from "react";

// import { useFetch } from "../../hooks/useFetch";
import { useHistory } from "react-router-dom";
import { projectFirestore } from "../../firebase/config";

import "./Create.css";
import { useTheme } from "../../hooks/useTheme";

function Create() {
  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [newIngredient, setNewIngredient] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const ingredientInput = useRef(null);

  // const { postData, data, error } = useFetch(
  //   "http://localhost:3000/recipes",
  //   "POST"
  // );

  const history = useHistory();
  const [error, setError] = useState("");

  // Dark Mode
  const { mode } = useTheme();

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(title, method, cookingTime, ingredients);
    const doc = {
      title,
      method,
      ingredients,
      cookingTime: cookingTime + " minutes",
    };

    try {
      await projectFirestore.collection("recipes").add(doc);
      history.push("/");
    } catch (err) {
      console.log(err);
      setError(err);
    }
  };

  // Handle Add
  const handleAdd = (e) => {
    e.preventDefault();
    const ing = newIngredient.trim();

    if (ing && !ingredients.includes(ing)) {
      setIngredients((prevIngredients) => [...prevIngredients, ing]);
    }
    setNewIngredient("");
    ingredientInput.current.focus();
  };

  // Redirect the user if we get data response
  // useEffect(() => {
  //   if (data) {
  //     history.push("/");
  //   }
  // }, [data, history]);

  return (
    <div className={`create ${mode}`}>
      <h2 className={`page-title ${mode}`}>Add a New Recipe</h2>
      {error && <p>{error}</p>}

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <label>
          <span>Recipe Title:</span>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
        </label>

        {/* Ingredients go here */}
        <label>
          <span>Recipe Ingredients:</span>
          <div className="ingredients">
            <input
              type="text"
              onChange={(e) => setNewIngredient(e.target.value)}
              value={newIngredient}
              ref={ingredientInput}
            />
            <button className="btn" onClick={handleAdd}>
              add
            </button>
          </div>
        </label>

        <p>
          Current ingredients:{" "}
          {ingredients.map((i) => (
            <em key={i}>{i},</em>
          ))}
        </p>

        <label>
          <span>Recipe Method:</span>
          <textarea
            onChange={(e) => setMethod(e.target.value)}
            value={method}
            required
          />
        </label>

        <label>
          <span>Cooking Time (minutes):</span>
          <input
            type="number"
            onChange={(e) => setCookingTime(e.target.value)}
            value={cookingTime}
            required
          />
        </label>

        <button className="btn">submit</button>
      </form>
    </div>
  );
}

export default Create;
