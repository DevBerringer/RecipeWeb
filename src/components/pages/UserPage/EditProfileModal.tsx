import React, { useState, useMemo, useEffect } from 'react';
import { UseAuth } from '../../../contexts/authContext';
import { updateProfile } from '../../../api/api';

interface EditProfileModalProps {
  onClose: () => void;
  onProfileUpdated: () => void; // Step 1: Add onProfileUpdated prop
}

function EditProfileModal({
  onClose,
  onProfileUpdated,
}: EditProfileModalProps) {
  const { user } = UseAuth();
  const [newAbout, setNewAbout] = useState('');
  const [selectedProfilePicture, setSelectedProfilePicture] = useState<
    string | null
  >(null);

  // Auto-populate with current user data
  useEffect(() => {
    if (user) {
      setNewAbout(user.Description || '');
      setSelectedProfilePicture(user.ImagePath || null);
    }
  }, [user]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === 'newAbout') {
      setNewAbout(value);
    }
  };

  const handleProfilePictureClick = (imageSrc: string) => {
    setSelectedProfilePicture(imageSrc);
  };

  const handleProfilePictureKeyPress = (
    e: React.KeyboardEvent<HTMLImageElement>,
    imageSrc: string
  ) => {
    if (e.key === 'Enter') {
      handleProfilePictureClick(imageSrc);
    }
  };

  function handleSaveChanges(event: { preventDefault: () => void }) {
    event.preventDefault();

    // Create the recipe object
    const userUpdate = {
      Id: user?.Id,
      ImagePath: selectedProfilePicture,
      Description: newAbout,
    };

    updateProfile(userUpdate)
      .then(() => {
        onProfileUpdated();
        onClose();
      })
      .catch((error) => {
        console.error('Error Updating user', error);
      });
  }

  // List of profile picture options
  const profilePictures = useMemo(
    () => [
      '/assets/stickSoup.jpg',
      '/assets/eggTartBig.jpg',
      '/assets/dumpling.jpg',
      '/assets/burgerBig.jpg',
      '/assets/sushiSnackBig.jpg',
      '/assets/drinksBig.jpg',
      '/assets/croissantBig.jpg',
      '/assets/watermelonBig.jpg',
      '/assets/cakeBig.jpeg',
      '/assets/spicyNoodle.jpg',
    ],
    []
  );

  return (
    <div
      className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-black/60 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
    >
      <div className="handWritten mx-4 w-full max-w-4xl rounded-3xl bg-white shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="border-b border-gray-200 px-8 py-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold text-gray-900">Edit Profile</h2>
            <button
              onClick={onClose}
              className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors duration-200"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Profile Picture Selection */}
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Select Profile Picture</h3>
                <div className="grid grid-cols-3 gap-3">
                  {profilePictures.map((imageSrc) => (
                    <div key={imageSrc} className="relative group">
                      <img
                        role="gridcell"
                        src={imageSrc}
                        alt={`Profile ${imageSrc}`}
                        className={`w-full h-24 object-cover cursor-pointer rounded-xl transition-all duration-200 group-hover:scale-105 ${
                          selectedProfilePicture === imageSrc
                            ? 'ring-4 ring-recipecentral ring-offset-2 shadow-lg'
                            : 'hover:shadow-md'
                        }`}
                        onClick={() => handleProfilePictureClick(imageSrc)}
                        onKeyDown={(e) => handleProfilePictureKeyPress(e, imageSrc)}
                        tabIndex={0}
                      />
                      {selectedProfilePicture === imageSrc && (
                        <div className="absolute inset-0 flex items-center justify-center bg-recipecentral/20 rounded-xl">
                          <div className="bg-recipecentral text-white rounded-full p-1">
                            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Profile Details */}
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Profile Details</h3>
                
                {/* Account Status */}
                <div className="mb-6 p-4 bg-gradient-to-r from-recipecentral to-recipecentral-light rounded-xl border border-recipecentral-dark">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Account Status</span>
                    <span className="handWritten px-3 py-1 bg-recipecentral text-sm font-semibold rounded-full">
                      Member
                    </span>
                  </div>
                </div>

                {/* About Section */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    About Yourself
                  </label>
                  <textarea
                    className="handWritten w-full h-32 rounded-xl border-2 border-dashed border-recipecentral-dark bg-recipecentral-light px-4 py-3 text-base resize-none focus:outline-none focus:ring-2 focus:ring-recipecentral focus:border-recipecentral transition-colors duration-200"
                    name="newAbout"
                    value={newAbout}
                    onChange={handleInputChange}
                    placeholder="Tell us about yourself, your cooking style, favorite cuisines..."
                  />
                  <p className="mt-2 text-xs text-gray-500">
                    {newAbout.length}/500 characters
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 px-8 py-6 bg-gray-50 rounded-b-3xl">
          <div className="flex justify-end gap-4">
            <button
              type="button"
              className="handWritten px-6 py-3 text-gray-700 bg-white border-2 border-gray-300 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="handWritten px-6 py-3 bg-recipecentral text-white rounded-xl font-semibold shadow-sm hover:bg-recipecentral-dark transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-recipecentral focus:ring-offset-2"
              onClick={handleSaveChanges}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfileModal;
