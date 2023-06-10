import { createBrowserRouter } from 'react-router-dom';
import About from '../components/pages/About';

import Home from '../components/pages/Home';
import Login from '../components/login/Login';
import NotFound from '../components/pages/NotFound';
import Recipes from '../components/pages/Recipes';
import Recipe from '../components/pages/Recipe';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <NotFound />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/about',
    element: <About />,
  },
  {
    path: '/recipes',
    element: <Recipes />,
  },
  {
    path: '/recipe/:id',
    element: <Recipe />,
  },
]);

export default router;
