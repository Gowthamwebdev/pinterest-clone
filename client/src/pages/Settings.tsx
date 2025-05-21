import SettingsLayout from '@components/settings/SettingsLayout';
import { Outlet } from 'react-router-dom';

const Settings = () => {
  return (
    <SettingsLayout>
      <Outlet />
    </SettingsLayout>
  );
};

export default Settings;
