import { Link } from "react-router-dom";
const Login = () => {
  return (
    <main>
      <div className="container connexion-content">
        <h2>Login</h2>
        <form>
          <input type="text" placeholder="email" />
          <input type="text" placeholder="password" />
          <p className="error-message"></p>

          <button type="Submit">
            <h3>Login!</h3>
          </button>
        </form>
        <Link to="/signup">
          <p className="connexion-redirection">
            Don't have an account yet?{"  "} Sign up!
          </p>
        </Link>
      </div>
    </main>
  );
};

export default Login;
