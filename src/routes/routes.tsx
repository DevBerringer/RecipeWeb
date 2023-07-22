import { createBrowserRouter } from 'react-router-dom';
import About from '../components/pages/About';

import Root from './Root';
import Home from '../components/pages/Home';
import Login from '../components/login/Login';
import NotFound from '../components/pages/NotFound';
import Recipes from '../components/pages/Recipes';
import Recipe from '../components/pages/Recipe';
import Contact from '../components/pages/Contact';
import Register from '../components/login/Register';
import NewRecipe from '../components/pages/NewRecipe';
import Categories from '../components/pages/Categories';
import UserPage from '../components/pages/UserPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'user/:id',
        element: <UserPage />,
      },
      {
        path: 'categories',
        element: <Categories />,
      },
      {
        path: 'recipes',
        element: <Recipes />,
      },
      {
        path: 'recipes/:id',
        element: <Recipe />,
      },
      {
        path: 'newRecipe',
        element: <NewRecipe />,
      },
      {
        path: 'contactUs',
        element: <Contact />,
      },
      {
        path: 'about',
        element: <About />,
      },
    ],
  },
]);

export default router;
