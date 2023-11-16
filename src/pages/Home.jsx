import Hero from "../components/Hero";
import Characters from "../components/Characters";

const Home = ({
  handleFavoriteComics,
  isFavoriteComic,
  handleFavoriteCharacters,
  isFavoriteCharacter,
}) => {
  return (
    <main>
      <Hero></Hero>
      <Characters
        handleFavoriteComics={handleFavoriteComics}
        isFavoriteComic={isFavoriteComic}
        handleFavoriteCharacters={handleFavoriteCharacters}
        isFavoriteCharacter={isFavoriteCharacter}
      ></Characters>
    </main>
  );
};

export default Home;
