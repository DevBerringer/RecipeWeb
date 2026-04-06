import { Outlet } from 'react-router-dom';

import { UserProvider } from '../contexts/userContext';
import { AuthProvider } from '../contexts/authContext';
import { RecipeDraftProvider } from '../contexts/RecipeDraftContext';
import { CategoriesProvider } from '../contexts/CategoriesContext';

import Navbar from '../components/pages/navbar/Navbar';
import Footer from '../components/pages/footer/Footer';

export default function Root() {
  return (
    <AuthProvider>
      <UserProvider>
        <RecipeDraftProvider>
          <CategoriesProvider>
            <div className="App">
              <Navbar />
              <div className="text-md main-container mb-0 mt-28 justify-center bg-recipecentral pb-10 text-base">
                <div className="paper-container container mx-4 mb-auto mt-10 flex min-h-60 flex-col rounded-2xl px-4 py-8 shadow-xl md:mx-10 lg:mx-20 xl:mx-40">
                  <main id="detail">
                    <Outlet />
                  </main>
                </div>
              </div>
              <Footer />
            </div>
          </CategoriesProvider>
        </RecipeDraftProvider>
      </UserProvider>
    </AuthProvider>
  );
}
