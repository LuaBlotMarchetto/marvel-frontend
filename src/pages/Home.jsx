import Hero from "../components/Hero";
import Characters from "../components/Characters";

const Home = ({
  handleFavoriteComics,
  isFavoriteComic,
  handleFavoriteCharacters,
  isFavoriteCharacter,
  characterSearch,
}) => {
  return (
    <main>
      <Hero></Hero>
      <Characters
        handleFavoriteComics={handleFavoriteComics}
        isFavoriteComic={isFavoriteComic}
        handleFavoriteCharacters={handleFavoriteCharacters}
        isFavoriteCharacter={isFavoriteCharacter}
        characterSearch={characterSearch}
      ></Characters>
    </main>
  );
};

export default Home;
