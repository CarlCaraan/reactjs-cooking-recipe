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

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* Navigation */}
        <Navbar />
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
