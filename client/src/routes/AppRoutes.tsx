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
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import DisplayPosts from '../components/home/DisplayPosts';
import FetchSinglePost from '../components/home/FetchSinglePost';
import { UserProfile } from '../components/users/UserProfile';
import SearchResults from '../components/SearchResults';
import { CircularProgress } from '@mui/material';

const AppRoutes = () => {
  const token = useAuth();
  const { setIsAuthenticated, setAccessToken, isAuthenticated } =
    useAuthStore();
  const [authChecker, setAuthChecker] = useState(false);
  useEffect(() => {
    const token = Cookies.get('token');

    if (token) {
      setIsAuthenticated(true);
      setAccessToken(token);
    }
    setAuthChecker(true);
  }, [setIsAuthenticated, setAccessToken]);
  const ProtectedRoute = () => {
    if (!authChecker) {
      return <CircularProgress />;
    }
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
    if (!authChecker) {
      return <CircularProgress />;
    }
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
        <Route path="/password/reset" element={<ResetPasswordForm />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/home" element={<Home />}>
          <Route index element={<DisplayPosts />} />
        </Route>
        <Route path="/search" element={<SearchResults />} />
        <Route path="/post/:id" element={<FetchSinglePost />} />
        <Route path="/today" element={<Explore />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/pin-creation-tool" element={<CreatePost />} />
        <Route path="/messages" element={<Home />} />
        <Route path="/profile/:id" element={<UserProfile />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
