import { useParams, Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import * as workoutService from '../../services/workoutService'; 
import { UserContext } from '../../contexts/UserContext'; 
import styles from './WorkoutDetails.module.css';
import ExerciseForm from '../exerciseform/ExerciseForm.jsx'; 

const WorkoutDetails = (props) => {
  const { workoutId } = useParams();
  const [workout, setWorkout] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchWorkout = async () => {
      try {
        const workoutData = await workoutService.getOne(workoutId);
        setWorkout(workoutData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchWorkout();
  }, [workoutId]);

  const handleAddExercise = async (exerciseFormData) => {
    try {
      const newExercise = await workoutService.addExercise(workoutId, exerciseFormData);
      setWorkout({ ...workout, exercises: [...workout.exercises, newExercise] });
    } catch (err) {
      console.log(err);
    }
  };

  if (!workout) return <main><h1>Loading...</h1></main>;

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerTop}>
          <h1>{workout.title}</h1>
          {workout.author._id === user._id && (
            <div className={styles.buttonContainer}>
              <Link to={`/workouts/${workoutId}/edit`} className={styles.edit}>
                Edit
              </Link>
              <button
                className={styles.delete}
                onClick={() => props.handleDeleteWorkout(workoutId)}
              >
                Delete
              </button>
            </div>
          )}
        </div>
        <p>
          {new Date(workout.date).toLocaleDateString()}
          {workout.durationInMinutes && ` - ${workout.durationInMinutes} minutes`}
        </p>
      </header>

      <section className={styles.exercisesSection}>
        <h2>Exercises</h2>
        {workout.exercises.length ? (
          <ul className={styles.exerciseList}>
            {workout.exercises.map((exercise) => (
              <li key={exercise._id}>
                <span>{exercise.name}</span>
                <span>{exercise.sets} sets</span>
                <span>{exercise.reps} reps</span>
                <span>{exercise.weight} lbs</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No exercises added yet.</p>
        )}

        <ExerciseForm handleAddExercise={handleAddExercise} />
      </section>
    </main>
  );
};

export default WorkoutDetails;