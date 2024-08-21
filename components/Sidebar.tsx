import React, { useState } from 'react';
import Link from 'next/link';

interface SidebarItemProps {
  title: string;
  icon: React.ReactNode;
  link?: string;
  children?: React.ReactNode;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ title, icon, link, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <li>
      {link ? (
        <a href={link} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
          {icon}
          <span className="ms-3">{title}</span>
        </a>
      ) : (
        <button
          type="button"
          onClick={handleToggle}
          className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
          aria-expanded={isOpen}
        >
          {icon}
          <span className="flex-1 ms-3 text-left whitespace-nowrap">{title}</span>
          {children && (
            <svg className={`w-3 h-3 transform ${isOpen ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1l4 4 4-4" />
            </svg>
          )}
        </button>
      )}
      {children && isOpen && <ul className="py-2 space-y-2">{children}</ul>}
    </li>
  );
};

const Sidebar: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className='border-2 border-red-500'>
      <button
        type="button"
        onClick={toggleSidebar}
        aria-controls="sidebar-multi-level-sidebar"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z" />
        </svg>
      </button>

      <aside
        id="sidebar-multi-level-sidebar border-2 border-red-500"
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full border-2  border-green-500 px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-2 font-medium border-2 border-red-500">
            <div className='flex justify-between items-center'>
            <SidebarItem
              title="Dashboard"
              icon={
                <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                </svg>
              }
              link="#"
            />
            <button
        type="button"
        onClick={toggleSidebar}
        aria-controls="sidebar-multi-level-sidebar"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z" />
        </svg>
      </button>
            </div>

            <div>
              <Link href="/createworkspace">Add Workspace</Link>
            </div>

            <SidebarItem
              title="E-commerce"
              icon={
                <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 21">
                  <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
                </svg>
              }
            >
              <SidebarItem title="Products" icon={null} link="#" />
              <SidebarItem title="Billing" icon={null} link="#" />
              <SidebarItem title="Invoice" icon={null} link="#" />
            </SidebarItem>

            <SidebarItem
              title="Kanban"
              icon={
                <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                  <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                </svg>
              }
              link="#"
            />

            <SidebarItem
              title="Inbox"
              icon={
                <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                  <path d="M15 11.5a1 1 0 0 0-1 1 3 3 0 0 1-3 3H7a3 3 0 0 1-3-3 1 1 0 1 0-2 0 5 5 0 0 0 5 5h4a5 5 0 0 0 5-5 1 1 0 0 0-1-1Zm2-8h-1V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v1H1a1 1 0 0 0-1 1v4a5 5 0 0 0 5 5h8a5 5 0 0 0 5-5V4.5a1 1 0 0 0-1-1ZM4 2h10v1H4V2Zm12 6.5a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V5h14v3.5Z" />
                </svg>
              }
              link="#"
            />

            <SidebarItem
              title="Users"
              icon={
                <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10c1.1 0 2-.9 2-2V2c0-1.1-.9-2-2-2H2C.9 0 0 .9 0 2v6c0 1.1.9 2 2 2v4H0v4h20v-4h-2v-4h0ZM2 8h16V2H2v6Zm2 10v-2h12v2H4Zm1-7v1h10v-1H5Z" clipRule="evenodd" />
                </svg>
              }
              link="#"
            />

            <SidebarItem
              title="Auth"
              icon={
                <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 3a3 3 0 1 1 6 0v3H8V3a1 1 0 1 0-2 0v3H4V3Zm6 4V3a5 5 0 1 0-10 0v4a2 2 0 0 0-2 2v5a3 3 0 0 0 3 3v1a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-1a3 3 0 0 0 3-3v-5a2 2 0 0 0-2-2Zm-8 2h10v5a1 1 0 0 1-1 1H9v2H5v-2H3a1 1 0 0 1-1-1v-5Zm11-1v1h2v-1h-2Zm1-3h2v-2h-2v2Zm-1 0h-1v-2h1v2Z" clipRule="evenodd" />
                </svg>
              }
            >
              <SidebarItem title="Sign In" icon={null} link="#" />
              <SidebarItem title="Sign Up" icon={null} link="#" />
            </SidebarItem>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
