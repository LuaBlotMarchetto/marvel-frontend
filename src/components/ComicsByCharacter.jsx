import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ScrollCarousel from "scroll-carousel-react";
// import Slider from "react-slick";

const ComicsByCharacter = ({
  comicsToDisplay,
  handleFavoriteComics,
  isFavoriteComic,
}) => {
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
      <div className="list-container ">
        <h4>Featured in the following comics</h4>
        <ScrollCarousel autoplay autoplaySpeed={1} speed={6}>
          <div className="carrousel">
            {/* <FontAwesomeIcon
              icon="circle-left"
              className="arrow"
              onClick={() => scroll("left")}
            /> */}
            <div>
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
            {/* <FontAwesomeIcon
              icon="circle-right"
              className="arrow"
              onClick={() => scroll("right")}
            /> */}
          </div>
        </ScrollCarousel>
        {/* </Slider> */}
      </div>
    </div>
  );
};

export default ComicsByCharacter;
