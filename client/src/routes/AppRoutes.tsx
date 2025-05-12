import { Route, Routes, Navigate, Outlet } from 'react-router-dom';
import CreatePost from '../pages/CreatePost';
import Explore from '../pages/Explore';
import Home from '../pages/Home';
import Settings from '../pages/Settings';
import ResetPasswordForm from '../components/form/ResetPasswordForm';
import LandingPage from '../pages/LandingPage';
import Layout from '../components/layout/Layout';
import { useAuth } from '../hooks/useAuth';
import { useAuthStore } from '../stores/AuthStore';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import DisplayPosts from '../components/home/DisplayPosts';

const AppRoutes = () => {
  const token = useAuth();
  const { setIsAuthenticated, setAccessToken, isAuthenticated } =
    useAuthStore();
  useEffect(() => {
    const token = Cookies.get('token');

    if (token) {
      setIsAuthenticated(true);
      setAccessToken(token);
    }
  }, [setIsAuthenticated, setAccessToken]);
  console.log('isAuthenticated', isAuthenticated);
  console.log('token', token);
  const ProtectedRoute = () => {
    if (!isAuthenticated || !token) {
      return (
        <Navigate to="/" replace state={{ from: window.location.pathname }} />
      );
    }
    return (
      <Layout>
        <Outlet />
      </Layout>
    );
    // return <Outlet/>
  };

  const PublicRoute = () => {
    if (isAuthenticated && token) {
      return <Navigate to="/home" replace />;
    }
    // return <Layout><Outlet /></Layout>;
    return <Outlet />;
  };

  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/reset-password" element={<ResetPasswordForm />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route
          path="/home"
          element={
            <Home>
              <DisplayPosts />
            </Home>
          }
        />
        <Route path="/today" element={<Explore />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/pin-creation-tool" element={<CreatePost />} />
        <Route path="/messages" element={<Home />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
