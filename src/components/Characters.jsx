import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Characters = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const [search, setSearch] = useState(1);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(100);
  const [skip, setSkip] = useState();
  const [name, setName] = useState();
  const [sort, setSort] = useState("price-asc");

  console.log(setLimit, setSkip, setName, setSort, setSearch);

  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-backend--vcs8yyfznmn8.code.run/characters?` +
            (search !== undefined ? `&title=${name}` : "") +
            (page !== undefined ? `&page=${page}` : "") +
            (limit !== undefined ? `&limit=${limit}` : "") +
            (sort !== undefined ? `&skip=${skip}` : "")
        );
        setData(response.data);
        setIsLoading(false);
        setTotalPages(Math.ceil(response.data.count / limit));
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [page, limit, skip, name]);

  const pageNumber = [];
  for (let index = 0; index < totalPages; index++) {
    const number = index + 1;
    pageNumber.push(number);
  }

  console.log(page);

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
            {data.map((character) => {
              return (
                <Link to={`/character/${character._id}`} key={character._id}>
                  <div className="card">
                    <img
                      src={`${character.thumbnail.path}/portrait_medium.jpg`}
                      alt={character.name}
                    />
                    <h3>{character.name}</h3>
                    <p>{character.description}</p>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="pagination">
            {pageNumber.map((number) => (
              <button
                key={number}
                onClick={() => {
                  setPage(number);
                }}
                className={number === page ? "current-page" : ""}
              >
                {number}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Characters;
