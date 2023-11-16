import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import Cookies from "js-cookie";
// import { useState } from "react";

//PAGES
import Home from "./pages/Home";
import Character from "./pages/Character";
import Comic from "./pages/Comic";
import Comics from "./pages/Comics";
import Favorites from "./pages/Favorites";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

//COMPOSANTS
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  const [favorites, setFavorites] = useState(
    JSON.parse(Cookies.get("favorites"))
  );
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavorites = (element) => {
    if (!favorites.includes(element)) {
      setIsFavorite(true);
      const updatedFavorites = [...favorites];
      updatedFavorites.push(element);
      setFavorites(updatedFavorites);
    } else {
      setIsFavorite(false);
      const updatedFavorites = favorites.filter(
        (newElement) => newElement._id !== element._id
      );
      setFavorites(updatedFavorites);
    }
  };

  useEffect(() => {
    Cookies.set("favorites", JSON.stringify(favorites));
  }, [favorites, isFavorite]);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/character/:characterId"
          element={
            <Character
              handleFavorites={handleFavorites}
              isFavorite={isFavorite}
            />
          }
        />
        <Route path="/comics" element={<Comics />} />
        <Route path="/comic/:comicId" element={<Comic />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
