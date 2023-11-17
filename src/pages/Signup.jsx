import { Link } from "react-router-dom";
const Signup = () => {
  return (
    <main>
      <div className="container connexion-content">
        <h2>Sign up</h2>
        <form>
          <input type="text" placeholder="Name" />
          <input type="text" placeholder="email" />
          <input type="text" placeholder="password" />
          <p className="error-message"></p>

          <button type="Submit">
            <h3>Sign up!</h3>
          </button>
        </form>
        <Link to="/login">
          <p className="connexion-redirection">
            Already have an account? Login!
          </p>
        </Link>
      </div>
    </main>
  );
};

export default Signup;
