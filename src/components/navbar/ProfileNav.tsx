import { Fragment } from 'react';

import { Menu, Transition } from '@headlessui/react';
import { Link, useNavigate } from 'react-router-dom';

import { ReactComponent as ProfileIcon } from '../../assets/ProfileIcon.svg';
import { ReactComponent as GroupIcon } from '../../assets/groupIcon.svg';
import { ReactComponent as LogoutIcon } from '../../assets/logoutIcon.svg';

import { SignOut } from '../../api/api';

import { UseAuth } from '../../contexts/authContext';

export default function ProfileNav() {
  const { user, setUser } = UseAuth();
  const navigate = useNavigate();

  async function handleProfileClick() {
    navigate(`/user/${user?.Id}`);
  }

  async function logout() {
    const response = await SignOut();

    if (response.message === 'User Logged Out successfully!') {
      console.log('here');
      setUser(null);
      navigate('/');
    } else {
      // Clear input fields
    }
  }

  return (
    <div>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="rounded-lg px-5 py-2 hover:outline hover:outline-recipecentral">
            <div className="py-auto flex">
              {user?.ImagePath ? (
                <img
                  className="h-12 w-16 rounded-2xl bg-cover bg-center"
                  src={user.ImagePath}
                  alt="test"
                />
              ) : (
                <div className=" h-12 w-16 rounded-2xl bg-black bg-cover bg-center" />
              )}
              <div className="ml-3 mt-3">{user?.Username}</div>
            </div>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <button
                    type="button"
                    onClick={() => handleProfileClick()}
                    className={`${
                      active ? 'bg-recipecentral text-white' : 'text-black'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    <ProfileIcon className="mr-2 h-5 w-5" aria-hidden="true" />
                    Profile
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    type="button"
                    className={`${active ? 'bg-recipecentral text-white' : ''}
                       group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    <GroupIcon className="mr-2 h-5 w-5" aria-hidden="true" />
                    Your Families
                  </button>
                )}
              </Menu.Item>
            </div>
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => logout()}
                    type="button"
                    className={`${
                      active ? 'bg-recipecentral text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    <LogoutIcon
                      className="mr-2 h-5 w-5 text-violet-400"
                      aria-hidden="true"
                    />
                    Logout
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
