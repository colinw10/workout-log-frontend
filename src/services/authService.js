const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/auth`;

const getUser = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;
  return JSON.parse(atob(token.split('.')[1])).payload;
};

// Signup function
const signup = async (formData) => {
  try {
    const res = await fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (data.err) {
      throw new Error(data.err);
    }
    if (data.token) {
      localStorage.setItem('token', data.token);
      return getUser();
    }
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
};

// Login function
const login = async (formData) => {
  try {
    const res = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (data.err) {
      throw new Error(data.err);
    }
    if (data.token) {
      localStorage.setItem('token', data.token);
      return getUser();
    }
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
};

export { signup, login, getUser };
