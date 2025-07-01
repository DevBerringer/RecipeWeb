import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { UseUser } from '../../../contexts/userContext';
import { UseAuth } from '../../../contexts/authContext';
import RecipeProfileList from './RecipeProfileList';
import { UseRecipe } from '../../../contexts/recipesContext';
import EditProfileModal from './EditProfileModal';

function UserPage() {
  const { recipe } = UseRecipe();
  const { user, refetchUserData } = UseAuth();
  const { users, refetchUsersData } = UseUser();
  const { id: userIdFromURL } = useParams();
  const [currentProfile, setCurrentProfile] = useState<User | null>(null);

  useEffect(() => {
    const filteredUser = users.find((r) => r.Id === userIdFromURL);
    setCurrentProfile(filteredUser || null);
  }, [users, userIdFromURL]);
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  const handleEditProfileClick = () => {
    setIsEditingProfile(true);
  };

  const handleEditProfileClose = () => {
    setIsEditingProfile(false);
  };

  const reloadUsersContext = () => {
    refetchUsersData();
    refetchUserData();
  };

  // Define the modal content as a function to be called conditionally
  const renderEditProfileModal = () => {
    if (isEditingProfile) {
      return (
        <EditProfileModal
          onClose={handleEditProfileClose}
          onProfileUpdated={reloadUsersContext} // Step 4: Pass the reloadUsersContext function as a prop
        />
      );
    }
    return null;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container mx-auto py-10">
      <div className="grid grid-cols-6 gap-4">
        <div className="col-span-4">
          <h1
            key={currentProfile?.Username}
            className="pb-2 text-4xl font-bold"
          >
            {currentProfile?.Username !== user?.Username
              ? `${currentProfile?.Username}'s Cookbook`
              : 'Your Cookbook'}
          </h1>

          <RecipeProfileList
            createdByFilter={currentProfile ? currentProfile.Id : ''}
          />
        </div>
        <div className="col-span-2 flex flex-col items-center justify-start px-20">
          {currentProfile?.ImagePath ? (
            <img
              className="h-48 w-64 rounded-2xl bg-cover bg-center"
              src={currentProfile.ImagePath}
              alt="test"
            />
          ) : (
            <div className="h-36 w-48 rounded-2xl bg-black bg-cover bg-center" />
          )}
          <div className="w-full text-center">
            <div className="pt-2 text-2xl">{currentProfile?.Username}</div>
            <div>
              {currentProfile?.Username !== user?.Username ? (
                ''
              ) : (
                <>
                  <button
                    type="button"
                    className="mt-1 hover:underline"
                    onClick={handleEditProfileClick}
                  >
                    Edit Profile
                  </button>
                  {renderEditProfileModal()}
                </>
              )}
              <div className="mt-5 text-left">
                {currentProfile?.Description}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserPage;
