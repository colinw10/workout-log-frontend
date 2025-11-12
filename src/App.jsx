import { useContext, useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

// Import Context & Services
import { UserContext } from './contexts/UserContext';
import * as workoutService from './services/workoutService';

// Import Components
import NavBar from './components/NavBar/NavBar.jsx';
import Landing from './components/Landing/Landing.jsx';
import SignUpForm from './components/SignUpForm/SignUpForm.jsx';
import LoginForm from './components/LoginForm/LoginForm.jsx';
import Dashboard from './components/Dashboard/Dashboard.jsx';
import WorkoutList from './components/WorkoutList/WorkoutList.jsx';
import WorkoutForm from './components/WorkoutForm/WorkoutForm.jsx';
import WorkoutDetails from './components/WorkoutDetails/WorkoutDetails.jsx';

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
          element={user ? <Dashboard /> : <Landing />}
        />
        {user ? (
          <>
            {/* --- Protected Routes (User Only) --- */}
            <Route
              path="/workouts"
              element={<WorkoutList workouts={workouts} />}
            />
            <Route
              path="/workouts/new"
              element={<WorkoutForm handleAddWorkout={handleAddWorkout} />}
            />
            <Route
              path="/workouts/:workoutId"
              element={<WorkoutDetails handleDeleteWorkout={handleDeleteWorkout} />}
            />
            <Route
              path="/workouts/:workoutId/edit"
              element={<WorkoutForm handleUpdateWorkout={handleUpdateWorkout} />}
            />
          </>
        ) : (
          <>
            {/* --- Guest-Only Routes --- */}
            <Route
              path="/signup"
              element={<SignUpForm />}
            />
            <Route
              path="/login"
              element={<LoginForm />}
            />
          </>
        )}
      </Routes>
    </>
  );
};

export default App;