import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LoginForm.module.css';

import { login } from '../../services/authService'; 
import { UserContext } from '../../contexts/UserContext'; 

const LoginForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [message, setMessage] = useState('');

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const handleChange = (evt) => {
    setMessage('');
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const user = await login(formData);
      setUser(user);
      navigate('/');
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <main className={styles.container}>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <h1>Log In</h1>
        <p>{message}</p>
        <div>
          <label htmlFor="email-input">Email:</label>
          <input
            type="email"
            autoComplete="off"
            id="email-input"
            value={email}
            name="email"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password-input">Password:</label>
          <input
            type="password"
            autoComplete="off"
            id="password-input"
            value={password}
            name="password"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button>Log In</button>
        </div>
      </form>
    </main>
  );
};

export default LoginForm;