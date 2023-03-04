import React, { useContext } from "react";
import { Link } from "react-router-dom";

// Context API
import { ThemeContext } from "../context/ThemeContext";

// Styles
import "./Navbar.css";

// Components
import Searchbar from "./Searchbar";

function Navbar() {
  const { color } = useContext(ThemeContext);

  return (
    <div className="navbar" style={{ background: color }}>
      <nav>
        <Link to="/" className="brand">
          <h1>Cooking Recipe</h1>
        </Link>
        <Searchbar />
        <Link to="/create">Create Recipe</Link>
      </nav>
    </div>
  );
}

export default Navbar;
