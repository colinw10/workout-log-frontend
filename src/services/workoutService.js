const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/workouts`;

function getToken() {
  return localStorage.getItem('token');
}

async function fetchWithToken(url, options = {}) {
  const token = getToken();
  options.headers = options.headers || {};
  
  if (token) {
    options.headers['Authorization'] = `Bearer ${token}`;
  }
  
  if (options.body) {
    options.headers['Content-Type'] = 'application/json';
  }

  const res = await fetch(url, options);
  
  if (res.ok) return res.json();
  
  const data = await res.json();
  throw new Error(data.err);
}

const getAll = async () => {
  return fetchWithToken(BASE_URL);
};

const create = async (workoutData) => {
  return fetchWithToken(BASE_URL, {
    method: 'POST',
    body: JSON.stringify(workoutData),
  });
};

const getOne = async (id) => {
  return fetchWithToken(`${BASE_URL}/${id}`);
};

const update = async (id, workoutData) => {
  return fetchWithToken(`${BASE_URL}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(workoutData),
  });
};

const deleteWorkout = async (id) => {
  return fetchWithToken(`${BASE_URL}/${id}`, { method: 'DELETE' });
};

const addExercise = async (workoutId, exerciseData) => {
  return fetchWithToken(`${BASE_URL}/${workoutId}/exercises`, {
    method: 'POST',
    body: JSON.stringify(exerciseData),
  });
};

export { getAll, create, getOne, update, deleteWorkout, addExercise };