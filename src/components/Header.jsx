import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";

const Header = ({ characterSearch, setCharacterSearch }) => {
  const navigate = useNavigate();
  return (
    <header>
      <div className="">
        <nav>
          <div>
            <input
              type="text"
              placeholder="search for a character"
              className="search-input"
              value={characterSearch}
              onChange={(event) => {
                setCharacterSearch(event.target.value);
                navigate("/");
              }}
            />

            <Link to="/">
              <button>CHARACTERS</button>
            </Link>
            <Link to="/comics">
              <button>COMICS</button>
            </Link>
          </div>
          <div>
            <Link to="/">
              <img src={logo} alt=" Marvellogo" />
            </Link>
          </div>

          <div>
            <Link to="/favorites">
              <button>FAVORITES</button>
            </Link>
            <Link to="/signup">
              <button>SIGNUP</button>
            </Link>
            <Link to="/login">
              <button>LOGIN</button>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
