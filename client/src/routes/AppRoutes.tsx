import { lazy, Suspense } from 'react';
import { Route, Routes, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Layout from '@components/layout/Layout';
import SpinningLoader from '@components/ui/loader/SpinningLoader';
import ResetPasswordPage from '@pages/auth/ResetPasswordPage';
import ForgetPasswordPage from '@pages/auth/ForgetPasswordPage';

const LandingPage = lazy(() => import('@pages/LandingPage'));
const Home = lazy(() => import('@pages/Home'));
const DisplayPosts = lazy(() => import('@components/home/DisplayPosts'));
const FetchSinglePost = lazy(() => import('@components/home/FetchSinglePost'));
const Explore = lazy(() => import('@pages/Explore'));
const CreatePost = lazy(() => import('@pages/CreatePost'));
const UserProfile = lazy(() => import('@pages/UserProfile'));
const SearchResults = lazy(() => import('@components/SearchResults'));
const Settings = lazy(() => import('@pages/Settings'));
const EditProfile = lazy(
  () => import('@components/settings/profile/EditProfile'),
);
const HomeFeedTuner = lazy(() => import('@pages/HomeFeedTuner'));
const NotFoundPage = lazy(() => import('@components/not-found/NotFoundPage'));

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  const ProtectedRoute = () => {
    return isAuthenticated ? (
      <Layout>
        <Suspense fallback={<SpinningLoader />}>
          <Outlet />
        </Suspense>
      </Layout>
    ) : (
      <Navigate to="/" replace state={{ from: window.location.pathname }} />
    );
  };

  const PublicRoute = () => {
    return isAuthenticated ? (
      <Navigate to="/home" replace />
    ) : (
      <Suspense fallback={<SpinningLoader />}>
        <Outlet />
      </Suspense>
    );
  };

  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth/reset-password" element={<ResetPasswordPage />} />
        <Route path="/password/forgot" element={<ForgetPasswordPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/home" element={<Home />}>
          <Route index element={<DisplayPosts />} />
        </Route>

        <Route path="post/:id" element={<FetchSinglePost />} />
        <Route path="/today" element={<Explore />} />
        <Route path="/pin-creation-tool" element={<CreatePost />} />
        <Route path="/search" element={<SearchResults />} />

        <Route path="/profile" element={<UserProfile />} />
        <Route path="/profile/:id" element={<UserProfile />} />

        <Route path="/settings" element={<Settings />}>
          <Route index element={<EditProfile />} />
          <Route path="edit-profile" element={<EditProfile />} />
          <Route path="home-feed" element={<HomeFeedTuner />} />
        </Route>

        <Route path="/messages" element={<Home />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
