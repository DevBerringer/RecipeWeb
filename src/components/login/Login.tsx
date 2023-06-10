import { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

function Login() {
  const [showRegister, setShowRegister] = useState(false);

  const handleShowRegister = () => {
    setShowRegister(true);
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      {!showRegister ? (
        <div>
          <LoginForm />
          <button
            type="button"
            onClick={handleShowRegister}
            className="block w-full py-2 text-sm font-medium text-indigo-600 bg-white border border-transparent rounded-md hover:bg-indigo-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-600"
          >
            Register
          </button>
        </div>
      ) : (
        <div>
          <RegisterForm />
        </div>
      )}
    </div>
  );
}

export default Login;
