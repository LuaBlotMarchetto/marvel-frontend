import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import Cookies from "js-cookie";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { faCircleRight } from "@fortawesome/free-solid-svg-icons";
library.add(faStar);
library.add(faCircleLeft);
library.add(faCircleRight);

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
  //mise en place des états pour recharger les données à afficher
  const [characterSearch, setCharacterSearch] = useState("");
  const [comicSearch, setComicSearch] = useState("");

  //récupération des cookies pour les favoris
  const storedFavoriteCharacters = Cookies.get("favoriteCharacters");
  const [favoriteCharacters, setFavoriteCharacters] = useState(
    storedFavoriteCharacters
      ? JSON.parse(Cookies.get("favoriteCharacters"))
      : []
  );

  const storedFavoriteComics = Cookies.get("favoriteComics");
  const [favoriteComics, setFavoriteComics] = useState(
    storedFavoriteComics ? JSON.parse(Cookies.get("favoriteComics")) : []
  );

  //mise à jour des cookies lors du changement de valeur des états des favoris
  useEffect(() => {
    Cookies.set("favoriteCharacters", JSON.stringify(favoriteCharacters), {
      expires: 20,
    });
    console.log("contenu des cookies", favoriteCharacters);
  }, [favoriteCharacters]);

  useEffect(() => {
    Cookies.set("favoriteComics", JSON.stringify(favoriteComics), {
      expires: 20,
    });
    console.log("contenu des cookies", favoriteComics);
  }, [favoriteComics]);

  //fonction de changement des états des favoris (ajout / suppression)
  const handleFavoriteCharacters = (characterId) => {
    if (!favoriteCharacters.includes(characterId)) {
      console.log("adding to favorites", favoriteCharacters);
      const updatedFavoriteCharacters = [...favoriteCharacters];
      updatedFavoriteCharacters.push(characterId);
      setFavoriteCharacters(updatedFavoriteCharacters);
    } else {
      console.log("deleting from favorite", favoriteCharacters);
      const updatedFavoriteCharacters = [...favoriteCharacters];
      const updatedFavoriteCharactersFiltered =
        updatedFavoriteCharacters.filter(
          (newElementId) => newElementId !== characterId
        );

      setFavoriteCharacters(updatedFavoriteCharactersFiltered);
    }
  };

  const handleFavoriteComics = (comicId) => {
    if (!favoriteComics.includes(comicId)) {
      console.log("adding to favorites", favoriteComics);
      const updatedFavoriteComics = [...favoriteComics];
      updatedFavoriteComics.push(comicId);
      setFavoriteComics(updatedFavoriteComics);
    } else {
      console.log("deleting from favorite", favoriteComics);
      const updatedFavoriteComics = [...favoriteComics];
      const updatedFavoriteComicsFiltered = updatedFavoriteComics.filter(
        (newElementId) => newElementId !== comicId
      );

      setFavoriteComics(updatedFavoriteComicsFiltered);
    }
  };

  //booleen pour gestion de la signalétique des favoris
  const isFavoriteCharacter = (characterId) => {
    if (favoriteCharacters.includes(characterId)) {
      return true;
    } else {
      return false;
    }
  };

  const isFavoriteComic = (comicId) => {
    if (favoriteComics.includes(comicId)) {
      return true;
    } else {
      return false;
    }
  };

  //fonction pour le scroll des caroussel
  const scroll = (direction, ref) => {
    console.log("inside the scroll function");
    const scrollAmount = 1000;
    const container = ref.current;

    if (direction === "left") {
      container.scrollLeft -= scrollAmount;
    } else {
      container.scrollLeft += scrollAmount;
    }
  };

  return (
    <Router>
      <Header
        characterSearch={characterSearch}
        setCharacterSearch={setCharacterSearch}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              handleFavoriteComics={handleFavoriteComics}
              isFavoriteComic={isFavoriteComic}
              handleFavoriteCharacters={handleFavoriteCharacters}
              isFavoriteCharacter={isFavoriteCharacter}
              scroll={(direction, ref) => scroll(direction, ref)}
              characterSearch={characterSearch}
            />
          }
        />
        <Route
          path="/character/:characterId"
          element={
            <Character
              handleFavoriteCharacters={handleFavoriteCharacters}
              isFavoriteCharacter={isFavoriteCharacter}
              handleFavoriteComics={handleFavoriteComics}
              isFavoriteComic={isFavoriteComic}
              scroll={(direction, ref) => scroll(direction, ref)}
            />
          }
        />
        <Route
          path="/comics"
          element={
            <Comics
              handleFavoriteComics={handleFavoriteComics}
              isFavoriteComic={isFavoriteComic}
              comicSearch={comicSearch}
              setComicSearch={setComicSearch}
            />
          }
        />
        <Route
          path="/comic/:comicId"
          element={
            <Comic
              handleFavoriteComics={handleFavoriteComics}
              isFavoriteComic={isFavoriteComic}
            />
          }
        />
        <Route
          path="/favorites"
          element={
            <Favorites
              handleFavoriteCharacters={handleFavoriteCharacters}
              isFavoriteCharacter={isFavoriteCharacter}
              favoriteCharacters={favoriteCharacters}
              handleFavoriteComics={handleFavoriteComics}
              isFavoriteComic={isFavoriteComic}
              favoriteComics={favoriteComics}
            />
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
