import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import './LoginPage.css';

const LoginPage = ({ setIsLoggedIn }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loginError, setLoginError] = useState(null);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      const response = await axios.post('http://localhost:3001/api/auth/login', {
        email,
        password,
      });

      if (response.status === 200) {
        setLoginSuccess(true);
        setLoginError(null);
        setIsLoggedIn(true);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('username', response.data.username);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      if (error.response && error.response.status === 401) {
        setLoginError('Invalid email or password');
      } else {
        setLoginError('An unexpected error occurred');
      }
    }
  };

  return (
    <div className="login-page">
      <div className={`login-form ${loginSuccess ? 'fade-in' : ''}`}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>Login</h2>
          {loginError && <span className="error">{loginError}</span>}
          {loginSuccess && <span className="success">Login successful!</span>}
          <input
            {...register('email', { required: 'Email is required' })}
            placeholder="Email"
          />
          {errors.email && <span className="error">{errors.email.message}</span>}
          <input
            {...register('password', { required: 'Password is required' })}
            type="password"
            placeholder="Password"
          />
          {errors.password && <span className="error">{errors.password.message}</span>}
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;