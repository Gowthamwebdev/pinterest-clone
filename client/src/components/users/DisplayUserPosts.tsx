import { useEffect, useState } from 'react';
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPins = async () => {
      setIsLoading(true);
      try {
        const data = await fetchUserCreatedOrSavedPosts(userId, activeTab);
        setPosts(data);
      } catch (error) {
        console.error(`Error fetching ${activeTab} pins:`, error);
        setPosts([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPins();
  }, [activeTab, userId]);

  return (
    <div className="w-full h-full">
      {isLoading ? (
        <div className="flex items-center justify-center">
          <CircularProgress />
        </div>
      ) : (
        <MasonryGrid posts={posts} />
      )}
    </div>
  );
};

export default DisplayUserPosts;
