import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { UseUser } from '../../contexts/userContext';
import { UseAuth } from '../../contexts/authContext';
import RecipeProfileList from './RecipeProfileList';
import { UseRecipe } from '../../contexts/recipesContext';
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

  return (
    <div className="container mx-auto py-10">
      <div className="grid grid-cols-6 gap-4">
        <div className="col-span-4">
          <h1
            key={currentProfile?.Username}
            className="text-4xl font-bold pb-2"
          >
            {currentProfile?.Username !== user?.Username
              ? `${currentProfile?.Username}'s Cookbook`
              : 'Your Cookbook'}
          </h1>
          <RecipeProfileList
            createdByFilter={currentProfile ? currentProfile.Id : ''}
          />
        </div>
        <div className="col-span-2 flex px-20 flex-col items-center justify-start">
          {currentProfile?.ImagePath ? (
            <img
              className="w-64 h-48 bg-cover bg-center rounded-2xl"
              src={currentProfile.ImagePath}
              alt="test"
            />
          ) : (
            <div className="w-48 h-36 bg-cover bg-black bg-center rounded-2xl" />
          )}
          <div className="text-center w-full">
            <div className="text-2xl pt-2">{currentProfile?.Username}</div>
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