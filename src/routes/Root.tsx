import { Outlet } from 'react-router-dom';
import Footer from '../components/footer/Footer';
import Navbar from '../components/navbar/Navbar';

export default function Root() {
  return (
    <div className="App">
      <Navbar />
      {/* all the other elements */}
      <div className="bg-recipecentral main-container mt-28 mb-0 pb-10 justify-center">
        <div className="container mt-10 mb-auto mx-40 px-4 py-8 paper-container shadow-xl rounded-2xl">
          <main id="detail">
            <Outlet />
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}
