import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Comic = ({ handleFavoriteComics, isFavoriteComic }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { comicId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-backend--vcs8yyfznmn8.code.run/comic/${comicId}`
        );

        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [comicId, data]);

  let comic = data;

  return isLoading ? (
    <span className="container">
      Great content loading, thank you for your patience...
    </span>
  ) : (
    <main className="">
      <div className="individual-display container">
        <div className="content">
          <img
            src={`${comic.thumbnail.path}/portrait_uncanny.jpg`}
            alt={comic.title}
          />
          <div className="content-info">
            <div className="star-div-individual">
              <h2>{comic.title}</h2>
              <div className="star">
                <button
                  className={
                    isFavoriteComic(comic._id) ? "favorite" : "not-favorite"
                  }
                  onClick={() => {
                    handleFavoriteComics(comic._id);
                  }}
                >
                  <FontAwesomeIcon icon="star" />
                </button>
              </div>
            </div>
            <p>{comic.description}</p>
            <button className="main-button">
              <a
                href={`https://www.google.com/search?q=${encodeURIComponent(
                  comic.title
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
          src={`${comic.thumbnail.path}/standard_fantastic.jpg`}
          alt={comic.title}
          className="image-for-background "
        />
      </div>
    </main>
  );
};

export default Comic;
