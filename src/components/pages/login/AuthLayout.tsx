import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div className="flex flex-col bg-white px-4 py-8 sm:flex-row sm:gap-x-12 sm:px-6 lg:px-10">
      <div className="flex w-full flex-col justify-center [@media(min-width:1100px)]:flex-1">
        <Outlet />
      </div>
      <div className="mt-8 flex flex-grow items-center justify-center sm:mt-0 sm:flex-1">
        <img
          src="/assets/foodCollection.jpg"
          alt="Auth"
          className="h-full w-full rounded-md object-cover"
        />
      </div>
    </div>
  );
}


