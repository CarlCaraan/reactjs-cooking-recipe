// Page Components
import Home from "./pages/home/Home";
import Create from "./pages/create/Create";
import Search from "./pages/search/Search";
import RecipeDetails from "./pages/recipe/RecipeDetails";

// Components
import Navbar from "./components/Navbar";

// Styles
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ThemeSelector from "./components/ThemeSelector";
import { useTheme } from "./hooks/useTheme";

function App() {
  const { mode } = useTheme();

  return (
    <div className={`App ${mode}`}>
      <BrowserRouter>
        {/* Navigation */}
        <Navbar />
        <ThemeSelector />
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/create">
            <Create />
          </Route>
          <Route path="/search">
            <Search />
          </Route>
          <Route path="/recipes/:id">
            <RecipeDetails />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
