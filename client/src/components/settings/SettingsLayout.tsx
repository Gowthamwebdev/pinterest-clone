import React, { ReactNode } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

interface SettingsLayoutProps {
  children: ReactNode;
}

const SettingsLayout: React.FC<SettingsLayoutProps> = () => {
  return (
    <div className="flex w-full mx-auto p-4 gap-8">
      <div className="w-64 border-r border-gray-200 pr-4">
        <h1 className="text-2xl font-bold mb-8">Settings</h1>

        <nav className="space-y-1">
          <h2 className="text-sm font-semibold text-gray-500 uppercase mb-2">
            Account Management
          </h2>

          <NavLink
            to="edit-profile"
            className={({ isActive }) =>
              `block px-3 py-2 font-bold rounded-md ${isActive ? 'bg-gray-100 font-medium' : 'hover:bg-gray-50'}`
            }
          >
            Edit Profile
          </NavLink>

          <NavLink
            to="home-feed"
            className={({ isActive }) =>
              `block px-3 py-2 font-bold rounded-md ${isActive ? 'bg-gray-100 font-medium' : 'hover:bg-gray-50'}`
            }
          >
            Home Feed Tuner
          </NavLink>
        </nav>
      </div>

      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default SettingsLayout;
