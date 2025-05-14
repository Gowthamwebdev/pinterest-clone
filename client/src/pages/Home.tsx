import { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';

interface HomeProps {
  children?: ReactNode;
}

const Home: React.FC<HomeProps> = () => {
  return (
    <>
      <Outlet />
    </>
  );
};
export default Home;
