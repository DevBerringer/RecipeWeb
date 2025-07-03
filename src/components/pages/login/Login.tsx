import { useState, ChangeEvent, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Signin } from '../../../api/api';
import { UseAuth } from '../../../contexts/authContext';

function Login() {
  const { refetchUserData } = UseAuth();
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
        refetchUserData();
        navigate('/');
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="flex flex-col bg-white px-4 py-8 sm:flex-row sm:gap-x-12 sm:px-6 lg:px-10">
      {/* Form Section */}
      <div className="flex w-full flex-col justify-center sm:flex-1">
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
          {errors.submit && (
            <p className="mt-1 text-xl text-red-500">{errors.submit}</p>
          )}

          {/* Username */}
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
              className={`block w-full rounded-md border-black bg-gray-200 px-4 py-2 placeholder-gray-400 focus:border-transparent focus:ring-2 focus:ring-black ${
                errors.username ? 'border-red-500' : ''
              }`}
            />
            {errors.username && (
              <p className="mt-1 text-sm text-red-500">{errors.username}</p>
            )}
          </div>

          {/* Password */}
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
              placeholder="Enter 8 characters or more"
              className={`block w-full rounded-md border-gray-300 bg-gray-200 px-4 py-2 placeholder-gray-400 focus:border-transparent focus:ring-2 focus:ring-indigo-600 ${
                errors.password ? 'border-red-500' : ''
              }`}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password}</p>
            )}
            <Link
              to="forgotPassword"
              className="text-indigo-600 hover:underline"
            >
              Forgot Password
            </Link>
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              className="w-full rounded-md bg-recipecentral px-4 py-2 text-sm font-medium text-white hover:bg-recipecentral-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
      {/* Image Section */}
      <div className="mt-8 flex flex-grow items-center justify-center sm:mt-0 sm:flex-1">
        <img
          src="/assets/foodCollection.jpg"
          alt="Login photos"
          className="h-full w-full rounded-md object-cover"
        />
      </div>
    </div>
  );
}

export default Login;
