import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ComicsByCharacter = ({ comicsToDisplay }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const comicsData = await Promise.all(
          comicsToDisplay.map(async (comicId) => {
            const response = await axios.get(
              `https://site--marvel-backend--vcs8yyfznmn8.code.run/comic/${comicId}`
            );
            // console.log(data);
            return response.data;
          })
        );

        setData(comicsData);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [comicsToDisplay]);

  return isLoading ? (
    <span className="container">
      Great content loading, thank you for your patience...
    </span>
  ) : (
    <div className="container">
      <div className="list-container">
        <h2>Featured in the following comics</h2>
        <div className="list">
          {data.map((comic) => {
            return (
              <Link to={`/comic/${comic._id}`} key={comic._id}>
                <div className="card">
                  <img
                    src={`${comic.thumbnail.path}/portrait_uncanny.jpg`}
                    alt={comic.title}
                  />
                  <h3>{comic.title}</h3>
                  <p>{comic.description}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ComicsByCharacter;
