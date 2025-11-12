import { Link } from 'react-router-dom';
import styles from './WorkoutList.module.css';

const WorkoutList = (props) => {
  return (
    <main className={styles.container}>
      {props.workouts.map((workout) => {
        return (
          <Link key={workout._id} to={`/workouts/${workout._id}`}>
            <article>
              <header>
                <h2>{workout.title}</h2>
                <p>
                  {new Date(workout.date).toLocaleDateString()}
                </p>
              </header>
              <p>
                {workout.durationInMinutes
                  ? `${workout.durationInMinutes} minutes`
                  : 'Duration not logged'}
              </p>
            </article>
          </Link>
        );
      })}
    </main>
  );
};

export default WorkoutList;