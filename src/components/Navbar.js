import React from "react";
import { Link } from "react-router-dom";

// Styles
import "./Navbar.css";

// Components
import Searchbar from "./Searchbar";

// Custom Context
import { useTheme } from "../hooks/useTheme";

function Navbar() {
  const { color } = useTheme();

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
