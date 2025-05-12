import { useEffect, useState } from 'react';
import { getPosts } from '../../api/postApi';
import { postState } from '../../types/postTypes';
import MasonryGrid from './MasonryGrid';
import { MasonryLoader } from '../ui/loader/MasonryLoader';

const DisplayPosts: React.FC = () => {
  const [posts, setPosts] = useState<postState[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const response = await getPosts();

        const allPosts = [
          ...(response.preferredPosts || []),
          ...(response.remainingPosts || []),
        ];
        setPosts(allPosts);
      } catch (err) {
        console.error('Fetch posts error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return isLoading ? (
    <MasonryLoader count={12} />
  ) : (
    <MasonryGrid posts={posts} />
  );
};

export default DisplayPosts;
