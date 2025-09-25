import React, { useState, useMemo } from 'react';
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
      className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-black/60"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex flex-col rounded bg-white p-8 shadow-lg">
        <h2 className="mb-4 text-2xl font-bold">Edit Profile</h2>
        <div className="mb-4 flex">
          <div className="mr-4">
            <p className="mb-2 font-bold">Choose your profile picture:</p>
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
          <div className="w-96 flex-col text-lg">
            <div className="block">
              <p className="mb-2 block font-bold">Account Status</p>
              <p className="text-right">Member</p>
            </div>
            <label className="mb-2 block pt-4 font-bold">About Yourself</label>
            <textarea
              className="mb-4 w-full rounded border border-gray-300 p-2"
              name="newAbout"
              value={newAbout}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            className="mr-2 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            onClick={handleSaveChanges}
          >
            Save Changes
          </button>
          <button
            type="button"
            className="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
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
