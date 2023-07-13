import { useState, ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setErrors({ ...errors, email: '' });
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setErrors({ ...errors, password: '' });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validate form inputs
    let formIsValid = true;
    const newErrors = { email: '', password: '' };

    if (!email) {
      formIsValid = false;
      newErrors.email = 'Email is required';
    }

    if (!password) {
      formIsValid = false;
      newErrors.password = 'Password is required';
    }

    if (formIsValid) {
      // Handle login logic here
      console.log('Email:', email);
      console.log('Password:', password);

      // Clear input fields
      setEmail('');
      setPassword('');
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
          {/* Email input */}
          <div>
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={handleEmailChange}
              placeholder="you@example.com"
              className={`block w-full px-4 py-2 rounded-md bg-gray-200 border-black placeholder-gray-400 focus:ring-2 focus:ring-black focus:border-transparent ${
                errors.email ? 'border-red-500' : ''
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
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
              disabled={!email || !password}
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
