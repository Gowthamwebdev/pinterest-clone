import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const SidebarOptions = ({
  setSetting,
}: {
  setSetting: (val: boolean) => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [fadeOut, setFadeOut] = useState(false);

  // Outside click logic
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        triggerFadeOut();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const triggerFadeOut = () => {
    setFadeOut(true);
    setTimeout(() => setSetting(false), 200);
  };

  const handleLinkClick = () => {
    triggerFadeOut();
  };

  return (
    <div
      ref={ref}
      className={`absolute bottom-6 left-24 z-50 w-96 h-inherit m-2 bg-white border font-semibold border-gray-200 rounded-lg shadow-lg p-4 flex flex-col gap-1 transition-opacity duration-200 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <Link
        to="/settings"
        className="cursor-pointer hover:bg-gray-200 p-2 rounded-lg"
        onClick={handleLinkClick}
      >
        Settings
      </Link>
      <Link
        to="/settings/home-feed"
        className="cursor-pointer hover:bg-gray-200 p-2 rounded-lg "
        onClick={handleLinkClick}
      >
        Home feed tuner
      </Link>
      <Link
        to={'/'}
        className="cursor-pointer hover:bg-gray-200 p-2 rounded-lg"
      >
        Clain external accounts
      </Link>
      <Link
        to={'/'}
        className="cursor-pointer hover:bg-gray-200 p-2 rounded-lg"
      >
        Install the windows app
      </Link>
      <Link
        to={'/'}
        className="cursor-pointer hover:bg-gray-200 p-2 rounded-lg"
      >
        Reports and violation centre
      </Link>
      <Link
        to={'/'}
        className="cursor-pointer hover:bg-gray-200 p-2 rounded-lg"
      >
        Your privacy rights
      </Link>
      <Link
        to={'/'}
        className="cursor-pointer hover:bg-gray-200 p-2 rounded-lg"
      >
        <div className="flex flex-row justify-between">
          <p>Help centre</p>
          <p className="pt-2">
            <svg
              className="Hn_ Uvi gUZ"
              height="12"
              role="img"
              viewBox="0 0 24 24"
              width="12"
            >
              <title>, Opens a new tab</title>
              <path d="M20.97 12a2 2 0 0 1-1.99-2V7.81l-7.07 7.1a2 2 0 1 1-2.83-2.83L16.16 5h-2.17a2 2 0 0 1 0-4H23l-.03 9a2 2 0 0 1-2 2M6.75 4a1.25 1.25 0 0 1 0 2.5H3.5v14h14v-3.26a1.25 1.25 0 1 1 2.5 0v4.51c0 .7-.56 1.25-1.25 1.25H2.25C1.56 23 1 22.44 1 21.75V5.25C1 4.56 1.56 4 2.25 4z"></path>
            </svg>
          </p>
        </div>
      </Link>
      <Link
        to={'/'}
        className="cursor-pointer hover:bg-gray-200 p-2 rounded-lg"
      >
        <div className="flex flex-row justify-between">
          <p>Terms of service</p>
          <p className="pt-2">
            <svg
              className="Hn_ Uvi gUZ"
              height="12"
              role="img"
              viewBox="0 0 24 24"
              width="12"
            >
              <title>, Opens a new tab</title>
              <path d="M20.97 12a2 2 0 0 1-1.99-2V7.81l-7.07 7.1a2 2 0 1 1-2.83-2.83L16.16 5h-2.17a2 2 0 0 1 0-4H23l-.03 9a2 2 0 0 1-2 2M6.75 4a1.25 1.25 0 0 1 0 2.5H3.5v14h14v-3.26a1.25 1.25 0 1 1 2.5 0v4.51c0 .7-.56 1.25-1.25 1.25H2.25C1.56 23 1 22.44 1 21.75V5.25C1 4.56 1.56 4 2.25 4z"></path>
            </svg>
          </p>
        </div>
      </Link>
      <Link
        to={'/'}
        className="cursor-pointer hover:bg-gray-200 p-2 rounded-lg"
      >
        <div className="flex flex-row justify-between">
          <p>Privacy policy</p>
          <p className="pt-2">
            <svg
              className="Hn_ Uvi gUZ"
              height="12"
              role="img"
              viewBox="0 0 24 24"
              width="12"
            >
              <title>, Opens a new tab</title>
              <path d="M20.97 12a2 2 0 0 1-1.99-2V7.81l-7.07 7.1a2 2 0 1 1-2.83-2.83L16.16 5h-2.17a2 2 0 0 1 0-4H23l-.03 9a2 2 0 0 1-2 2M6.75 4a1.25 1.25 0 0 1 0 2.5H3.5v14h14v-3.26a1.25 1.25 0 1 1 2.5 0v4.51c0 .7-.56 1.25-1.25 1.25H2.25C1.56 23 1 22.44 1 21.75V5.25C1 4.56 1.56 4 2.25 4z"></path>
            </svg>
          </p>
        </div>
      </Link>
      <Link
        to={'/'}
        className="cursor-pointer hover:bg-gray-200 p-2 rounded-lg"
      >
        <div className="flex flex-row justify-between">
          <p>Be a tester</p>
          <p className="pt-2">
            <svg
              className="Hn_ Uvi gUZ"
              height="12"
              role="img"
              viewBox="0 0 24 24"
              width="12"
            >
              <title>, Opens a new tab</title>
              <path d="M20.97 12a2 2 0 0 1-1.99-2V7.81l-7.07 7.1a2 2 0 1 1-2.83-2.83L16.16 5h-2.17a2 2 0 0 1 0-4H23l-.03 9a2 2 0 0 1-2 2M6.75 4a1.25 1.25 0 0 1 0 2.5H3.5v14h14v-3.26a1.25 1.25 0 1 1 2.5 0v4.51c0 .7-.56 1.25-1.25 1.25H2.25C1.56 23 1 22.44 1 21.75V5.25C1 4.56 1.56 4 2.25 4z"></path>
            </svg>
          </p>
        </div>
      </Link>
    </div>
  );
};

export default SidebarOptions;
