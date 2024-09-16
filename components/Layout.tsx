import React from 'react';
import Sidebar from './Sidebar'; // Make sure the path is correct

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex border-2 border-red-500">
      <Sidebar />
      <div className="flex-grow border-2 border-blue-500 w-[80%] p-4 h-screen">
        {children}
      </div>
    </div>
  );
};

export default Layout;
