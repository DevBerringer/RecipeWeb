import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { UseUser } from '../../contexts/userContext';
import { UseAuth } from '../../contexts/authContext';
import RecipeProfileList from './RecipeProfileList';
import { UseRecipe } from '../../contexts/recipesContext';

function UserPage() {
  const { recipe } = UseRecipe();
  const { user } = UseAuth();
  const { users } = UseUser();
  const { id: userIdFromURL } = useParams();
  const [currentProfile, setCurrentProfile] = useState<User | null>(null);

  useEffect(() => {
    const filteredUser = users.find((r) => r.id === userIdFromURL);
    setCurrentProfile(filteredUser || null);
  }, [users, userIdFromURL]);

  return (
    <div className="container mx-auto py-10">
      <div className="grid grid-cols-5 gap-4">
        <div className="col-span-4">
          <h1
            key={currentProfile?.username}
            className="text-4xl font-bold pb-2"
          >
            {currentProfile?.username !== user?.username
              ? `${currentProfile?.username}'s Cookbook`
              : 'Your Cookbook'}
          </h1>
          <RecipeProfileList />
        </div>
        <div className="col-span-1 flex flex-col items-center justify-start">
          <div
            className="w-36 h-36 bg-cover bg-black bg-center rounded-full"
            style={{
              backgroundImage: `url('profile-picture-url')`,
            }}
          />
          <div className="text-2xl pt-2">{currentProfile?.username}</div>
          <div className="text-2xl pt-2">{recipe?.length}</div>

        </div>
      </div>
    </div>
  );
}

export default UserPage;
