import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import ComicsByCharacter from "../components/ComicsByCharacter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Character = ({
  handleFavoriteCharacters,
  isFavoriteCharacter,
  handleFavoriteComics,
  isFavoriteComic,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const { characterId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-backend--vcs8yyfznmn8.code.run/character/${characterId}`
        );

        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [characterId, data]);

  let character = data;

  return isLoading ? (
    <span className="container">
      Great content loading, thank you for your patience...
    </span>
  ) : (
    <main>
      <div className="individual-display container">
        <div className="content">
          <img
            src={`${character.thumbnail.path}/portrait_uncanny.jpg`}
            alt={character.title}
          />
          <div className="content-info">
            <div className="star-div-individual">
              <h2>{character.name}</h2>
              <div className="star">
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
            </div>
            <p>{character.description}</p>
            <button className="main-button">
              <a
                href={`https://www.google.com/search?q=${encodeURIComponent(
                  character.name
                )}`}
                target="_blank"
                rel="noreferrer"
              >
                I want to know more !
              </a>
            </button>
          </div>
        </div>
      </div>
      <div className="overlay">
        <img
          src={`${character.thumbnail.path}/standard_fantastic.jpg`}
          alt={character.title}
          className="image-for-background "
        />
      </div>
      <ComicsByCharacter
        comicsToDisplay={character.comics}
        handleFavoriteComics={handleFavoriteComics}
        isFavoriteComic={isFavoriteComic}
      />
    </main>
  );
};

export default Character;
