import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ScrollCarousel from "scroll-carousel-react";

const Favorites = ({
  handleFavoriteCharacters,
  favoriteCharacters,
  isFavoriteCharacter,
  handleFavoriteComics,
  favoriteComics,
  isFavoriteComic,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [charactersData, setCharactersData] = useState();
  const [comicsData, setComicsData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const favoriteCharactersData = await Promise.all(
          favoriteCharacters.map(async (characterId) => {
            const response = await axios.get(
              `https://site--marvel-backend--vcs8yyfznmn8.code.run/character/${characterId}`
            );
            // console.log(data);
            return response.data;
          })
        );
        setCharactersData(favoriteCharactersData);
        const favoriteComicsData = await Promise.all(
          favoriteComics.map(async (comicId) => {
            const response = await axios.get(
              `https://site--marvel-backend--vcs8yyfznmn8.code.run/comic/${comicId}`
            );
            // console.log(data);
            return response.data;
          })
        );
        setComicsData(favoriteComicsData);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [favoriteCharacters, favoriteComics]);

  return isLoading ? (
    <span className="container">
      Great content loading, thank you for your patience...
    </span>
  ) : (
    <div className="container favorites-main">
      <div className="list-container">
        <h5>Favorite characters</h5>
        <ScrollCarousel autolay autoplaySpeed={1} speed={6}>
          <div className="carrousel">
            {charactersData.length > 0 &&
              charactersData.map((character) => {
                return (
                  <Link to={`/character/${character._id}`} key={character._id}>
                    <div className="card">
                      <img
                        src={`${character.thumbnail.path}/portrait_uncanny.jpg`}
                        alt={character.name}
                      />
                      <div className="card-content">
                        <div className="star-div-list">
                          <h3>{character.name}</h3>
                          <button
                            className={
                              isFavoriteCharacter(character._id)
                                ? "favorite"
                                : "not-favorite"
                            }
                            onClick={() => {
                              handleFavoriteCharacters(character._id);
                            }}
                          >
                            <FontAwesomeIcon icon="star" />
                          </button>
                        </div>
                        <p>{character.description}</p>
                      </div>
                    </div>
                  </Link>
                );
              })}
          </div>
        </ScrollCarousel>
      </div>
      <div className="list-container">
        <h5>Favorite comics</h5>
        <ScrollCarousel autoplay autoplaySpeed={1} speed={6}>
          <div className="carrousel">
            {comicsData.length > 0 &&
              comicsData.map((comic) => {
                return (
                  <Link to={`/comic/${comic._id}`} key={comic._id}>
                    <div className="card">
                      <img
                        src={`${comic.thumbnail.path}/portrait_uncanny.jpg`}
                        alt={comic.title}
                      />
                      <div className="card-content">
                        <div className="star-div-list">
                          <h3>{comic.title}</h3>
                          <button
                            className={
                              isFavoriteComic(comic._id)
                                ? "favorite"
                                : "not-favorite"
                            }
                            onClick={() => {
                              handleFavoriteComics(comic._id);
                            }}
                          >
                            <FontAwesomeIcon icon="star" />
                          </button>
                        </div>
                        <p>{comic.description}</p>
                      </div>
                    </div>
                  </Link>
                );
              })}
          </div>
        </ScrollCarousel>
      </div>
    </div>
  );
};

export default Favorites;
