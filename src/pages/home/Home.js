import React, { useEffect, useState } from "react";
import "./Home.css";

import { projectFirestore } from "../../firebase/config";

// import { useFetch } from "../../hooks/useFetch";

// Components
import RecipeList from "../../components/RecipeList";

// Context Api
import { useTheme } from "../../hooks/useTheme";

function Home() {
  // const { data, isPending, error } = useFetch("http://localhost:3000/recipes");

  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);

  const { mode } = useTheme();

  useEffect(() => {
    setIsPending(true);

    const unsub = projectFirestore.collection("recipes").onSnapshot(
      (snapshot) => {
        // console.log(snapshot);
        if (snapshot.empty) {
          setError("No recipes to load ");
          setIsPending(false);
        } else {
          let results = [];
          snapshot.docs.forEach((doc) =>
            results.push({ id: doc.id, ...doc.data() })
          );
          setData(results);
          setIsPending(false);
        }
      },
      (err) => {
        setError(err.message);
        setIsPending(false);
      }
    );
    return () => unsub();
    // .catch((err) => {
    //   setError(err.message);
    //   setIsPending(false);
    // });
  }, []);

  return (
    <div className="home">
      {error && <p className={`error ${mode}`}>{error}</p>}
      {isPending && <p className={`loading ${mode}`}>Loading...</p>}
      {data && <RecipeList recipes={data} />}
    </div>
  );
}

export default Home;
