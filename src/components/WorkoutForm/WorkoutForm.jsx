import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import * as workoutService from '../../services/workoutService'; 
import styles from './WorkoutForm.module.css';

const WorkoutForm = (props) => {
  const { workoutId } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    durationInMinutes: '',
  });

  useEffect(() => {
    const fetchWorkout = async () => {
      try {
        const workoutData = await workoutService.getOne(workoutId);
        const formattedDate = workoutData.date.split('T')[0];
        setFormData({
          title: workoutData.title,
          date: formattedDate,
          durationInMinutes: workoutData.durationInMinutes || '',
        });
      } catch (err) {
        console.log(err);
      }
    };

    if (workoutId) fetchWorkout();
  }, [workoutId]);

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (workoutId) {
      props.handleUpdateWorkout(workoutId, formData);
    } else {
      props.handleAddWorkout(formData);
    }
  };

  return (
    <main className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1>{workoutId ? 'Edit Workout' : 'New Workout'}</h1>
        
        <div>
          <label htmlFor="title-input">Title</label>
          <input
            required
            type="text"
            name="title"
            id="title-input"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        
        <div>
          <label htmlFor="date-input">Date</label>
          <input
            required
            type="date"
            name="date"
            id="date-input"
            value={formData.date}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="duration-input">Duration (in minutes)</label>
          <input
            type="number"
            name="durationInMinutes"
            id="duration-input"
            value={formData.durationInMinutes}
            onChange={handleChange}
            min="0"
          />
        </div>
        
        <button type="submit">SUBMIT</button>
      </form>
    </main>
  );
};

export default WorkoutForm;