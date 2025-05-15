import { useEffect, useState } from 'react';
import { postState } from '../../types/postTypes';
import { fetchUserCreatedOrSavedPosts } from '../../api/userApi';
import MasonryGrid from '../home/MasonryGrid';

interface UserPinsProps {
  userId: string;
  activeTab: 'created' | 'saved';
}

const DisplayUserPosts = ({ userId, activeTab }: UserPinsProps) => {
  const [posts, setPosts] = useState<postState[]>([]);

  useEffect(() => {
    const fetchPins = async () => {
      try {
        const data = await fetchUserCreatedOrSavedPosts(userId, activeTab);
        setPosts(data);
      } catch (error) {
        console.error(`Error fetching ${activeTab} pins:`, error);
        setPosts([]);
      }
    };
    fetchPins();
  }, [activeTab, userId]);

  return (
    <>
      <MasonryGrid posts={posts} />
    </>
  );
};

export default DisplayUserPosts;
