import styles from './Landing.module.css';

const Landing = () => {
  return (
    <main className={styles.container}>
      <h1>Welcome to Your Workout Log</h1>
      <h3>Please log in or sign up to continue.</h3>
    </main>
  );
};

export default Landing;