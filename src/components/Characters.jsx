import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Characters = ({ handleFavoriteCharacters, isFavoriteCharacter }) => {
  const [charactersData, setCharactersData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-backend--vcs8yyfznmn8.code.run/characters?`
        );
        setCharactersData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <span className="container">
      Great content loading, thank you for your patience...
    </span>
  ) : (
    <div className="container hero-margin" id="characters">
      <div className="list-container">
        <div>
          <h2>DISCOVER THE CHARACTERS</h2>
        </div>
        <div>
          <div className="list">
            {charactersData.map((character) => {
              return (
                <div key={character._id} className="card">
                  <Link to={`/character/${character._id}`}>
                    <div>
                      <img
                        src={`${character.thumbnail.path}/portrait_medium.jpg`}
                        alt={character.name}
                      />
                      <div className="star-div">
                        <h3>{character.name}</h3>
                        <button
                          className={
                            isFavoriteCharacter(character._id) ? "favorite" : ""
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
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Characters;
