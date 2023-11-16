import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Comics = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-backend--vcs8yyfznmn8.code.run/comics?`
        );

        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [data]);

  return isLoading ? (
    <span className="container">
      Great content loading, thank you for your patience...
    </span>
  ) : (
    <main className="container">
      <div className="list-container">
        <h2>Read the comics</h2>
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
    </main>
  );
};

export default Comics;