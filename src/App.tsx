import { RouterProvider } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import Footer from './components/footer/Footer';
import router from './routes/routes';
import Navbar from './components/navbar/NavBar';

import './App.css';

function App() {
  return (
    <div className="App">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Navbar />
        <div className="bg-recipecentral main-container mt-24 mb-0 justify-center">
          <RouterProvider router={router} />
        </div>
        <Footer />
      </LocalizationProvider>
    </div>
  );
}

export default App;
