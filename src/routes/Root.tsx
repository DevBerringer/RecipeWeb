import { Outlet } from 'react-router-dom';

import { RecipeProvider } from '../contexts/recipesContext';
import { UserProvider } from '../contexts/userContext';
import { AuthProvider } from '../contexts/authContext';

import Footer from '../components/footer/Footer';
import Navbar from '../components/navbar/Navbar';

export default function Root() {
  return (
    <AuthProvider>
      <UserProvider>
        <div className="App">
          <Navbar />
          {/* all the other elements */}
          <RecipeProvider>
            <div className="bg-recipecentral text-base text-md main-container mt-28 mb-0 pb-10 justify-center">
              <div className="container mt-10 mb-auto mx-4 md:mx-10 lg:mx-20 xl:mx-40 px-4 py-8 paper-container shadow-xl rounded-2xl">
                <main id="detail">
                  <Outlet />
                </main>
              </div>
            </div>
          </RecipeProvider>
          <Footer />
        </div>
      </UserProvider>
    </AuthProvider>
  );
}
