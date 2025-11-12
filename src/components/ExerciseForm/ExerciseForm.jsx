import { useState } from 'react';
import styles from './ExerciseForm.module.css';

const ExerciseForm = (props) => {
  const [formData, setFormData] = useState({
    name: '',
    sets: '',
    reps: '',
    weight: '',
  });

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.handleAddExercise(formData);
    setFormData({ name: '', sets: '', reps: '', weight: '' }); 
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div>
        <label htmlFor="name-input">Exercise</label>
        <input
          required
          type="text"
          name="name"
          id="name-input"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="sets-input">Sets</label>
        <input
          required
          type="number"
          name="sets"
          id="sets-input"
          value={formData.sets}
          onChange={handleChange}
          min="0"
        />
      </div>
      <div>
        <label htmlFor="reps-input">Reps</label>
        <input
          required
          type="number"
          name="reps"
          id="reps-input"
          value={formData.reps}
          onChange={handleChange}
          min="0"
        />
      </div>
      <div>
        <label htmlFor="weight-input">Weight</label>
        <input
          type="number"
          name="weight"
          id="weight-input"
          value={formData.weight}
          onChange={handleChange}
          min="0"
        />
      </div>
      <button type="submit">Add</button>
    </form>
  );
};

export default ExerciseForm;