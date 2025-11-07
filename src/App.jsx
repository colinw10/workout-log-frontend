import { useContext, useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

// Import Context & Services
import { UserContext } from './contexts/UserContext';
import * as workoutService from './services/workoutService';

import NavBar from './components/NavBar.jsx'; 

const App = () => {
  const { user } = useContext(UserContext);
  const [workouts, setWorkouts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllWorkouts = async () => {
      try {
        const workoutData = await workoutService.getAll();
        setWorkouts(workoutData);
      } catch (err) {
        console.log(err);
      }
    };
    if (user) fetchAllWorkouts();
  }, [user]);

  // --- CRUD Handler Functions ---

  const handleAddWorkout = async (workoutFormData) => {
    try {
      const newWorkout = await workoutService.create(workoutFormData);
      setWorkouts([newWorkout, ...workouts]);
      navigate('/workouts');
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteWorkout = async (workoutId) => {
    try {
      const deletedWorkout = await workoutService.deleteWorkout(workoutId);
      setWorkouts(workouts.filter((workout) => workout._id !== deletedWorkout._id));
      navigate('/workouts');
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateWorkout = async (workoutId, workoutFormData) => {
    try {
      const updatedWorkout = await workoutService.update(workoutId, workoutFormData);
      setWorkouts(workouts.map((w) => (workoutId === w._id ? updatedWorkout : w)));
      navigate(`/workouts/${workoutId}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <NavBar /> 
      <Routes>
        <Route
          path="/"
          element={user ? <h1>My Dashboard</h1> : <h1>Landing Page</h1>}
        />
        {user ? (
          <>
            <Route
              path="/workouts"
              element={<h1>Workout List Page</h1>}
              // element={<WorkoutList workouts={workouts} />}
            />
            <Route
              path="/workouts/new"
              element={<h1>New Workout Form</h1>}
              // element={<WorkoutForm handleAddWorkout={handleAddWorkout} />}
            />
            <Route
              path="/workouts/:workoutId"
              element={<h1>Workout Details Page</h1>}
              // element={<WorkoutDetails handleDeleteWorkout={handleDeleteWorkout} />}
            />
            <Route
              path="/workouts/:workoutId/edit"
              element={<h1>Edit Workout Form</h1>}
              // element={<WorkoutForm handleUpdateWorkout={handleUpdateWorkout} />}
            />
          </>
        ) : (
          <>
            <Route
              path="/signup"
              element={<h1>Sign Up Form</h1>}
              // element={<SignUpForm />}
            />
            <Route
              path="/login"
              element={<h1>Login Form</h1>}
              // element={<LoginForm />}
            />
          </>
        )}
      </Routes>
    </>
  );
};

export default App;