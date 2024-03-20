import Auth from "../utils/auth";
import { Link } from "react-router-dom";

function Nav() {

  // Function to display nav links based on user authentication
  function showNavigation() {
    // If user is logged in it shows logout nav link
    if (Auth.loggedIn()) {
      return (
        <ul className="flex-row">
          <li className="mx-1">
            <a href="/" onClick={() => Auth.logout()}>
              Logout
            </a>
          </li>
          <li>
            <a href="/profile">My Profile</a>
          </li>
        </ul>
      );
    } else {
      // If user is not logged in, show signup and login links
      return (
        <ul className="flex-row">
          <li className="mx-1">
            <Link to="/signup">
              Signup
            </Link>
          </li>
          <li className="mx-1">
            <Link to="/login">
              Login
            </Link>
          </li>
        </ul>
      );
    }
  }

  // Nav component
  return (
    <header className="flex-row px-1">
      {/* Title */}
      <h1 className="logo">
        <Link to="/">
          BEE-PORTER
        </Link>
      </h1>

      {/* Nav links that call the showNavigation function to show appropriate links */}
      <nav>
        {showNavigation()}
        {/* Logo image */}
        <img src="/assets/Bee-Logo.png " className="bee-logo-img"/> 
      </nav>
    </header>
  );
}

export default Nav;