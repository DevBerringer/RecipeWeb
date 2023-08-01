import React, { useState, useEffect, useMemo } from 'react';
import { UseUser } from '../../contexts/userContext';
import { UseAuth } from '../../contexts/authContext';
import { updateProfile } from '../../api/api';

interface EditProfileModalProps {
  onClose: () => void;
  onProfileUpdated: () => void; // Step 1: Add onProfileUpdated prop
}

function EditProfileModal({
  onClose,
  onProfileUpdated,
}: EditProfileModalProps) {
  const { user } = UseAuth();
  const { setUsers } = UseUser();
  const [newAbout, setNewAbout] = useState('');
  const [selectedProfilePicture, setSelectedProfilePicture] = useState<
    string | null
  >(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        onProfileUpdated(); // Step 2: Notify the parent component that the profile was updated
        onClose();
      })
      .catch((error) => {
        // Handle error if needed
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
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white p-8 rounded shadow-lg flex flex-col">
        <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
        <div className="flex mb-4">
          <div className="mr-4">
            <p className="font-bold mb-2">Choose your profile picture:</p>
            <div className="grid grid-cols-4 gap-2">
              {profilePictures.map((imageSrc) => (
                <div key={imageSrc} className="flex">
                  <img
                    role="gridcell"
                    src={imageSrc}
                    alt={`Profile ${imageSrc}`}
                    className={`w-54 h-48 cursor-pointer rounded-2xl ${
                      selectedProfilePicture === imageSrc
                        ? 'border-2 border-blue-500'
                        : ''
                    }`}
                    onClick={() => handleProfilePictureClick(imageSrc)}
                    onKeyDown={(e) => handleProfilePictureKeyPress(e, imageSrc)} // Keyboard listener
                    tabIndex={0}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex-col w-96 text-lg">
            <div className="block">
              <p className="block mb-2 font-bold">Account Status</p>
              <p className="text-right">Member</p>
            </div>
            <label className="block mb-2 font-bold pt-4">About Yourself</label>
            <textarea
              className="w-full border border-gray-300 rounded p-2 mb-4"
              name="newAbout"
              value={newAbout}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            className="bg-blue-500 text-white py-2 px-4 rounded mr-2 hover:bg-blue-600"
            onClick={handleSaveChanges}
          >
            Save Changes
          </button>
          <button
            type="button"
            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditProfileModal;
