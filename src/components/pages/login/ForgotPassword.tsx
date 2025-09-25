import { useState, FormEvent, ChangeEvent } from 'react';
import { ForgotPassword } from '../../../api/api';

function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setError('');
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email.');
      return;
    }
    await ForgotPassword(email);
    setSubmitted(true);
  };

  return (
    <>
      <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
        Forgot Password
      </h2>
      {!submitted ? (
        <form onSubmit={onSubmit} className="space-y-6 mt-4">
          {error && <p className="mt-1 text-xl text-red-500">{error}</p>}
          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={onChange}
              placeholder="you@example.com"
              className={`block w-full rounded-md border-black bg-gray-200 px-4 py-2 placeholder-gray-400 focus:border-transparent focus:ring-2 focus:ring-black ${error ? 'border-red-500' : ''}`}
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full rounded-md bg-recipecentral px-4 py-2 text-sm font-medium text-white hover:bg-recipecentral-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            >
              Send reset link
            </button>
          </div>
        </form>
      ) : (
        <div className="mt-4">
          <p className="text-l text-gray-900">
            If an account exists for that email, we will send a reset link shortly.
          </p>
        </div>
      )}
    </>
  );
}

export default ForgotPasswordForm;