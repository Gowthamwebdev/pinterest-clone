import { useEffect, useState, useTransition } from 'react';
import { postType } from '../../types/postTypes';
import { fetchUserCreatedOrSavedPosts } from '../../api/userApi';
import MasonryGrid from '../home/MasonryGrid';
import { CircularProgress } from '@mui/material';

interface UserPinsProps {
  userId: string;
  activeTab: 'created' | 'saved';
  isOwnProfile: boolean;
}

const DisplayUserPosts = ({
  userId,
  activeTab,
  isOwnProfile,
}: UserPinsProps) => {
  const [posts, setPosts] = useState<postType[]>([]);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    startTransition(async () => {
      try {
        const data = await fetchUserCreatedOrSavedPosts(userId, activeTab);
        setPosts(data);
        setError(null);
      } catch (err) {
        console.error(`Error fetching ${activeTab} pins:`, err);
        setPosts([]);
        setError('Failed to load posts');
      }
    });
  }, [activeTab, userId]);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="w-full h-full">
      {isPending ? (
        <div className="flex items-center justify-center h-full">
          <CircularProgress />
        </div>
      ) : (
        <MasonryGrid posts={posts} isOwnProfile={isOwnProfile} />
      )}
    </div>
  );
};

export default DisplayUserPosts;
