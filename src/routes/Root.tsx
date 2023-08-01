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
            <div className="text-md main-container mb-0 mt-28 justify-center bg-recipecentral pb-10 text-base">
              <div className="paper-container container mx-4 mb-auto mt-10 rounded-2xl px-4 py-8 shadow-xl md:mx-10 lg:mx-20 xl:mx-40">
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
