import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import ComicsByCharacter from "../components/ComicsByCharacter";

const Character = ({ handleFavorites, isFavorite }) => {
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
            <h2>{character.name}</h2>
            <p>{character.description}</p>
            <button>
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
            <button
              className={isFavorite ? "favorite" : ""}
              onClick={() => {
                handleFavorites(character._id);
              }}
            >
              add to favorites
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
      <ComicsByCharacter comicsToDisplay={character.comics} />
    </main>
  );
};

export default Character;
