import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div className="container">
        <nav>
          <div>
            <Link to="/">
              <button>CHARACTERS</button>
            </Link>
            <Link to="/comics">
              <button>COMICS</button>
            </Link>
          </div>

          <Link to="/">
            <img src="src/assets/images/logo.png" alt="" />
          </Link>

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
