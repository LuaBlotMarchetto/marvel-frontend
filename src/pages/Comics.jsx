import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Comics = ({
  handleFavoriteComics,
  isFavoriteComic,
  comicSearch,
  setComicSearch,
}) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [skip, setSkip] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-backend--vcs8yyfznmn8.code.run/comics?` +
            (comicSearch !== undefined ? `&title=${comicSearch}` : "") +
            (skip !== undefined ? `&skip=${skip}` : "") +
            (page !== undefined ? `&page=${page}` : "")
        );

        setData(response.data.results);
        setIsLoading(false);
        setTotalPages(Math.ceil(response.data.count / response.data.limit));
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [comicSearch, page]);

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
    <main className="container">
      <div className="list-container">
        <input
          type="text"
          placeholder="Looking for a specific comic? "
          className="comic-search-input"
          value={comicSearch}
          onChange={(event) => {
            setComicSearch(event.target.value);
          }}
        />
        <h2>Discover the whole comics galaxy </h2>
        <div className="list">
          {data.map((comic) => {
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
    </main>
  );
};

export default Comics;
