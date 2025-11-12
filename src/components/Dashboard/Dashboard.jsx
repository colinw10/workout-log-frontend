import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext'; 
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const { user } = useContext(UserContext);

  return (
    <main className={styles.container}>
      <h1>Welcome, {user.name}</h1>
      <p>Select "My Workouts" to see your logs or "New Workout" to add one.</p>
    </main>
  );
};

export default Dashboard;