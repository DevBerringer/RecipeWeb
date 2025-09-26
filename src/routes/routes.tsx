import { createBrowserRouter } from 'react-router-dom';

import Root from './Root';
import Home from '../components/pages/Home';
import Login from '../components/pages/login/Login';
import ForgotPassword from '../components/pages/login/ForgotPassword';
import Register from '../components/pages/login/Register';
import AuthLayout from '../components/pages/login/AuthLayout';
import UserPage from '../components/pages/UserPage/UserPage';
import Contact from '../components/static/Contact';
import NotFound from '../components/static/NotFound';
import About from '../components/static/About';
import Recipes from '../components/pages/recipes/Recipes';
import Recipe from '../components/pages/recipes/Recipe';
import NewRecipe from '../components/pages/recipes/forms/NewRecipe';
import PreviewRecipe from '../components/pages/recipes/forms/PreviewRecipe';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      {
        path: 'login',
        element: <AuthLayout />,
        children: [
          { index: true, element: <Login /> },
          { path: 'forgotPassword', element: <ForgotPassword /> },
          { path: 'register', element: <Register /> },
        ],
      },
      { path: 'user/:id', element: <UserPage /> },
      { path: 'recipes/*', element: <Recipes /> },
      { path: 'recipes/recipe/:id', element: <Recipe /> },
      { path: 'newRecipe', element: <PreviewRecipe /> },
      { path: 'newRecipe/forms', element: <NewRecipe /> },
      { path: 'newRecipe/Preview', element: <PreviewRecipe /> },
      { path: 'contactUs', element: <Contact /> },
      { path: 'about', element: <About /> },
    ],
  },
]);

export default router;
