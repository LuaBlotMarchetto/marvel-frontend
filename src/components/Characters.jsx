import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Characters = ({
  handleFavoriteCharacters,
  isFavoriteCharacter,
  scroll,
  characterSearch,
}) => {
  const [charactersData, setCharactersData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [skip, setSkip] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-backend--vcs8yyfznmn8.code.run/characters?` +
            (characterSearch !== undefined ? `&name=${characterSearch}` : "") +
            (skip !== undefined ? `&skip=${skip}` : "") +
            (page !== undefined ? `&page=${page}` : "")
        );
        setCharactersData(response.data.results);
        console.log(response.data);
        setIsLoading(false);
        setTotalPages(Math.ceil(response.data.count / response.data.limit));
        console.log(totalPages);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [characterSearch, page]);

  const pageNumber = [];
  for (let index = 0; index < totalPages; index++) {
    const number = index + 1;
    pageNumber.push(number);
  }

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
                  <Link
                    to={`/character/${character._id}`}
                    scroll={(direction, ref) => scroll(direction, ref)}
                  >
                    <div>
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
                </div>
              );
            })}
          </div>
        </div>
        <div className="pagination">
          {pageNumber.map((number) => (
            <button
              key={number}
              onClick={() => {
                setPage(number);
                setSkip(100 * (number - 1));
              }}
              className={number === page ? "pagination-active" : ""}
            >
              {number}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Characters;
