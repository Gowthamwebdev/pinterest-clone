import { useEffect, useState, useTransition } from 'react';
import { postState } from '../../types/postTypes';
import { fetchUserCreatedOrSavedPosts } from '../../api/userApi';
import MasonryGrid from '../home/MasonryGrid';
import { CircularProgress } from '@mui/material';

interface UserPinsProps {
  userId: string;
  activeTab: 'created' | 'saved';
}

const DisplayUserPosts = ({ userId, activeTab }: UserPinsProps) => {
  const [posts, setPosts] = useState<postState[]>([]);
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
        <MasonryGrid posts={posts} />
      )}
    </div>
  );
};

export default DisplayUserPosts;
