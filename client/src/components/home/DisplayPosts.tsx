import { useEffect, useState, useTransition } from 'react';
import { getPosts } from '../../api/postApi';
import { postType } from '../../types/postTypes';
import MasonryGrid from './MasonryGrid';
import { MasonryLoader } from '../ui/loader/CardLoader';

const DisplayPosts: React.FC = () => {
  const [posts, setPosts] = useState<postType[]>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        startTransition(async () => {
          const response = await getPosts();
          const allPosts = [
            ...(response.preferredPosts || []),
            ...(response.remainingPosts || []),
          ];
          setPosts(allPosts);
        });
      } catch (err) {
        console.error('Fetch posts error:', err);
      }
    };

    fetchPosts();
  }, []);

  return isPending ? (
    <MasonryLoader count={12} />
  ) : (
    <MasonryGrid posts={posts} isOwnProfile={false} />
  );
};

export default DisplayPosts;
