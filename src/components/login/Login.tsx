import { useState, ChangeEvent, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Signin } from '../../api/api';
import { UseAuth } from '../../contexts/authContext';

function Login() {
  const { setUser } = UseAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    username: '',
    password: '',
    submit: '',
  });

  const navigate = useNavigate();

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
    setErrors({ ...errors, username: '' });
    setErrors({ ...errors, submit: '' });
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setErrors({ ...errors, password: '' });
    setErrors({ ...errors, submit: '' });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validate form inputs
    let formIsValid = true;
    const newErrors = { username: '', password: '', submit: '' };

    if (!username) {
      formIsValid = false;
      newErrors.username = 'Username is required';
    }

    if (!password) {
      formIsValid = false;
      newErrors.password = 'Password is required';
    }

    if (formIsValid) {
      // Handle login logic here
      const user = {
        username,
        password,
      };

      const response = await Signin(user);

      if (response.Message === 'Bad credentials') {
        newErrors.submit = 'Username and password combo not found';
        setErrors(newErrors);
      } else {
        // Clear input fields
        setUsername('');
        setPassword('');
        setUser(response)
        navigate('/');
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="bg-white py-8 px-4 sm:px-6 lg:px-10 flex">
      <div className="flex flex-col justify-center w-full max-w-lg space-y-6 pr-2">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Login
        </h2>
        <p>
          Don't have an account yet?{' '}
          <Link to="../register" className="text-indigo-600 hover:underline">
            Sign Up
          </Link>
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username input */}
          {errors.submit && (
            <p className="text-red-500 text-xl mt-1">{errors.submit}</p>
          )}
          <div>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              required
              value={username}
              onChange={handleUsernameChange}
              placeholder="Welcome Back"
              className={`block w-full px-4 py-2 rounded-md bg-gray-200 border-black placeholder-gray-400 focus:ring-2 focus:ring-black focus:border-transparent ${
                errors.username ? 'border-red-500' : ''
              }`}
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username}</p>
            )}
          </div>

          {/* Password input */}
          <div>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter 8 Charters or more"
              className={`block w-full px-4 py-2 rounded-md bg-gray-200 border-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-indigo-600 focus:border-transparent ${
                errors.password ? 'border-red-500' : ''
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
            <Link
              to="forgotPassword"
              className="text-indigo-600 hover:underline"
            >
              Forgot Password
            </Link>
          </div>

          {/* Submit button */}
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-sm font-medium text-white bg-recipecentral rounded-md hover:bg-recipecentral-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:bg-recipecentral-dark"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
      <div className="flex-grow flex items-center justify-center">
        <img
          src="/assets/foodCollection.jpg"
          alt="Login photos"
          className="object-cover max-h-[32rem]"
        />
      </div>
    </div>
  );
}

export default Login;
