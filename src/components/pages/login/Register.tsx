import { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Register } from '../../../api/api';

function RegisterForm() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    username: '',
    submit: '',
  });

  const navigate = useNavigate(); // Initialize the useHistory hook

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setErrors({ ...errors, email: '' });
    setErrors({ ...errors, submit: '' });
  };

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
    setErrors({ ...errors, username: '' });
    setErrors({ ...errors, submit: '' });
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setErrors({ ...errors, password: '' });
  };

  const handleConPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
    setErrors({ ...errors, password: '' });

    // Delay validation for a few seconds
    setTimeout(() => {
      if (password !== event.target.value) {
        setErrors({ ...errors, password: 'Passwords do not match' });
      }
    }, 3000); // Change the delay time as desired (in milliseconds)
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validate form inputs
    let formIsValid = true;
    const newErrors = { email: '', password: '', username: '', submit: '' };

    if (!email) {
      formIsValid = false;
      newErrors.email = 'Email is required';
    }

    if (!username) {
      formIsValid = false;
      newErrors.username = 'Username is required';
    } else if (username.length < 2 || username.length > 20) {
      formIsValid = false;
      newErrors.username = 'Username must be between 2 and 20 characters';
    }

    if (!password) {
      formIsValid = false;
      newErrors.password = 'Password is required';
    } else if (password.length < 8 || password.length > 20) {
      formIsValid = false;
      newErrors.password = 'Password must be between 8 and 20 characters';
    } else if (!/\d/.test(password) || !/[!@#$%^&*]/.test(password)) {
      formIsValid = false;
      newErrors.password =
        'Password must contain at least one number and one special character (!@#$%^&*)';
    }

    if (password !== confirmPassword) {
      formIsValid = false;
      newErrors.password = 'Passwords do not match';
    }

    if (formIsValid) {
      // Handle login logic here
      const user = {
        username,
        email,
        password,
        roles: [],
      };

      const response = await Register(user);

      if (response.message !== 'User registered successfully!') {
        newErrors.submit = response.message;
        setErrors(newErrors);
      } else {
        // Clear input fields
        setEmail('');
        setUsername('');
        setPassword('');
        setConfirmPassword('');

        navigate('/login');
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="flex bg-white px-4 py-8 sm:px-6 lg:px-10">
      <div className="mr-2 flex w-full max-w-lg flex-col justify-center space-y-6">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Register
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {errors.submit && (
            <p className="mt-1 text-xl text-red-500">{errors.submit}</p>
          )}
          {/* Email input */}
          <div>
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="off"
              value={email}
              onChange={handleEmailChange}
              placeholder="you@example.com"
              className={`block w-full rounded-md border bg-gray-100 px-4 py-2 
              ${
                errors.email ? 'border-red-500 outline-none' : 'border-gray-300'
              } placeholder-gray-400`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>
          <div>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              autoComplete="off"
              value={username}
              onChange={handleUsernameChange}
              placeholder="Enter Username"
              className={`block w-full rounded-md border bg-gray-100 px-4 py-2 
              ${
                errors.username
                  ? 'border-red-500 outline-none'
                  : 'border-gray-300'
              } placeholder-gray-400`}
            />
            {errors.username && (
              <p className="mt-1 text-sm text-red-500">{errors.username}</p>
            )}
          </div>
          {/* Password input */}
          <div>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter 8 Charters or more"
              className={`block w-full rounded-md border bg-gray-100 px-4 py-2 
              ${
                errors.password
                  ? 'border-red-500 outline-none'
                  : 'border-gray-300'
              } placeholder-gray-400`}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password}</p>
            )}
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              name="password"
              type="password"
              value={confirmPassword}
              onChange={handleConPasswordChange}
              placeholder="Enter 8 Charters or more"
              className={`block w-full rounded-md border bg-gray-100 px-4 py-2 
              ${
                errors.password
                  ? 'border-red-500 outline-none'
                  : 'border-gray-300'
              } placeholder-gray-400`}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password}</p>
            )}
          </div>

          {/* Submit button */}
          <div>
            <button
              type="submit"
              className="w-full rounded-md bg-recipecentral px-4 py-2 text-xl font-medium text-white hover:bg-recipecentral-dark focus:outline-none focus-visible:bg-recipecentral-dark focus-visible:ring-2 focus-visible:ring-offset-2"
            >
              Sign up!
            </button>
          </div>
        </form>
      </div>
      <div className="flex flex-grow items-center justify-center">
        <img
          src="/assets/register.jpg"
          alt="register"
          className="max-h-[32rem] object-cover"
        />
      </div>
    </div>
  );
}

export default RegisterForm;
