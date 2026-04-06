import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { UseUser } from '../../../contexts/userContext';
import { UseAuth } from '../../../contexts/authContext';
import RecipeProfileList from './RecipeProfileList';
import EditProfileModal from './EditProfileModal';

function UserPage() {
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
    <div className="mx-auto max-w-7xl py-6">
      {/* Profile Header */}
      <div className="rounded-2xl bg-white p-5">
        <div className="grid grid-cols-1 items-center gap-6 sm:grid-cols-[auto,1fr]">
          <div className="flex justify-center sm:justify-start">
            {currentProfile?.ImagePath ? (
              <img
                src={currentProfile.ImagePath}
                alt="Profile"
                className="h-48 w-64 rounded-2xl object-cover"
              />
            ) : (
              <div className="h-48 w-64 rounded-2xl bg-gray-200" />
            )}
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
              {currentProfile?.Username !== user?.Username
                ? `${currentProfile?.Username}'s Cookbook`
                : 'Your Cookbook'}
            </h1>
            <p className="max-w-3xl text-gray-700">
              {currentProfile?.Description || 'No bio yet.'}
            </p>
            {currentProfile?.Username === user?.Username && (
              <div className="pt-1">
                <button
                  type="button"
                  onClick={handleEditProfileClick}
                  className="rounded-md bg-white text-sm font-medium hover:text-amber-950 hover:underline"
                >
                  Edit Profile
                </button>
                {renderEditProfileModal()}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recipes Section */}
      <div className="m-4">
        <div className="rounded-2xl bg-white p-4">
          <RecipeProfileList
            createdByFilter={currentProfile ? currentProfile.Id : ''}
          />
        </div>
      </div>
    </div>
  );
}

export default UserPage;
