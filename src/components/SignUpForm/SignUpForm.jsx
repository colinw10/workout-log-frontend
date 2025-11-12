import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SignUpForm.module.css';

import { signup } from '../../services/authService'; 
import { UserContext } from '../../contexts/UserContext'; 

const SignUpForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [message, setMessage] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConf: '',
  });

  const { name, email, password, passwordConf } = formData;

  const handleChange = (evt) => {
    setMessage('');
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const newUser = await signup(formData); 
      setUser(newUser);
      navigate('/');
    } catch (err) {
      setMessage(err.message);
    }
  };

  const isFormInvalid = () => {
    return !(name && email && password && password === passwordConf);
  };

  return (
    <main className={styles.container}>
      <form onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        <p>{message}</p>
        <div>
          <label htmlFor="name-input">Name:</label>
          <input
            type="text"
            id="name-input"
            value={name}
            name="name"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email-input">Email:</label>
          <input
            type="email"
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
            id="password-input"
            value={password}
            name="password"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="confirm-input">Confirm Password:</label>
          <input
            type="password"
            id="confirm-input"
            value={passwordConf}
            name="passwordConf"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button disabled={isFormInvalid()}>Sign Up</button>
        </div>
      </form>
    </main>
  );
};

export default SignUpForm;