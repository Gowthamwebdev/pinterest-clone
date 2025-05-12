import { ReactNode } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Notifications from '../ui/Notifications';
import SidebarOptions from './SidebarOptions';
import { useUiStore } from '../../stores/UiStore';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { notification, setting, setNotification, setSetting } = useUiStore();

  return (
    <div className="flex h-screen fixed w-[100vw]">
      <div className="w-[5vw] bg-white border-r mt-5 border-gray-200">
        <Sidebar setNotification={setNotification} setSetting={setSetting} />
      </div>
      <div className="flex flex-col flex-1">
        <Navbar />
        <div className="flex-1 p-4 overflow-auto">{children}</div>
      </div>
      {notification && <Notifications setNotification={setNotification} />}
      {setting && <SidebarOptions setSetting={setSetting} />}
    </div>
  );
};

export default Layout;
