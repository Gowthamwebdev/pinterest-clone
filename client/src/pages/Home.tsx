import { ReactNode } from 'react';

interface HomeProps {
  children?: ReactNode;
}

const Home: React.FC<HomeProps> = ({ children }) => {
  return <>{children}</>;
};
export default Home;
