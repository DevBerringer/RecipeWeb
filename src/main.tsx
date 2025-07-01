import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { CategoriesProvider } from './contexts/CategoriesContext';

import router from './routes/routes';

import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <CategoriesProvider>
      <RouterProvider router={router} />
    </CategoriesProvider>
  </React.StrictMode>
);
