import { Link, useLocation } from 'react-router-dom';
import pinterest from '/pinterest.svg';
import {
  FiHome,
  FiSearch,
  FiPlusSquare,
  FiBell,
  FiMessageSquare,
} from 'react-icons/fi';

const Sidebar = ({
  setNotification,
  setSetting,
}: {
  setNotification: (val: boolean) => void;
  setSetting: (val: boolean) => void;
}) => {
  const location = useLocation();
  const activeTab = location.pathname;

  const iconClasses = (tab: string) =>
    `relative group p-2 rounded-lg cursor-pointer flex items-center justify-center ${
      activeTab === tab
        ? 'bg-black text-white'
        : 'text-gray-950 hover:bg-gray-100'
    }`;

  const tooltip = (text: string) => (
    <span className="absolute left-12 top-1/2 -translate-y-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10000">
      {text}
    </span>
  );

  return (
    <div className="w-16 bg-white h-screen flex flex-col items-center justify-between py-4 gap-8 shadow-md sticky top-0 z-50">
      <div className="flex flex-col items-center justify-start py-4 gap-8">
        <img src={pinterest} alt="Pinterest Logo" className="w-6 h-6" />

        <Link to="/home" className={iconClasses('/home')}>
          <FiHome size={20} />
          {tooltip('Home')}
        </Link>

        <Link to="/today" className={iconClasses('/today')}>
          <FiSearch size={20} />
          {tooltip('Today')}
        </Link>

        <Link
          to="/pin-creation-tool"
          className={iconClasses('/pin-creation-tool')}
        >
          <FiPlusSquare size={20} />
          {tooltip('Create')}
        </Link>

        <div
          className={iconClasses('/notifications')}
          onClick={() => setNotification(true)}
        >
          <FiBell size={20} />
          {tooltip('Notifications')}
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] px-1 rounded-full">
            1
          </span>
        </div>

        <div className={iconClasses('/messages')}>
          <FiMessageSquare size={20} />
          {tooltip('Messages')}
        </div>
      </div>

      <div className="mb-4 text-center">
        <div className={iconClasses('/bolt')} onClick={() => setSetting(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            <circle cx="12" cy="12" r="4" />
          </svg>
          {tooltip('more options')}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
