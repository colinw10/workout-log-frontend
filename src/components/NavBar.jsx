import { useContext } from 'react';
import { Link } from 'react-router-dom';
import styles from './NavBar.module.css';
import { UserContext } from '../contexts/UserContext'; 

const NavBar = () => {
  const { user, setUser } = useContext(UserContext);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <nav className={styles.container}>
      <Link to="/">
        <h2>Workout Log</h2>
      </Link>

      {user ? (
        // --- Logged In User Links ---
        <ul>
          <li>Welcome, {user.name}</li> 
          <li>
            <Link to="/workouts">My Workouts</Link>
          </li>
          <li>
            <Link to="/workouts/new">New Workout</Link>
          </li>
          <li>
            <Link to="/" onClick={handleSignOut}>
              Sign Out
            </Link>
          </li>
        </ul>
      ) : (
        // --- Guest Links ---
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Log In</Link> 
          </li>
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default NavBar;