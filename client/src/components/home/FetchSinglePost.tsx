import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPostById } from '../../api/postApi';
import { postState } from '../../types/postTypes';
import MasonryGrid from './MasonryGrid';
import DisplayUserInfo from '../users/DisplayUserInfo';
import PostActions from '../ui/PostActions';
import { userState } from '../../types/userTypes';
import { handleDownload } from '../../utils/functions';

const FetchSinglePost = () => {
  const { id } = useParams();
  const [currentPost, setCurrentPost] = useState<
    (postState & { user: userState }) | null
  >(null);
  const [recommendedPosts, setRecommendedPosts] = useState<postState[]>([]);

  useEffect(() => {
    const getPost = async () => {
      try {
        const data = await getPostById(id as string);
        setCurrentPost(data.currentPin);
        setRecommendedPosts(data.recommendedPins || []);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };
    getPost();
  }, [id]);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-4xl flex flex-col rounded-3xl md:flex-row gap-8 border border-gray-300">
        <div className="w-full md:w-[40vw]">
          {currentPost && (
            <div className="bg-white rounded-3xl overflow-hidden">
              <img
                src={currentPost.image_url}
                alt={currentPost.title}
                className="w-full h-auto max-h-[80vh] object-contain"
              />
            </div>
          )}
        </div>

        {currentPost && (
          <div className="w-full md:w-[60vw] flex flex-col gap-1 p-2 relative">
            <PostActions
              onDownload={() =>
                handleDownload(currentPost.id, currentPost.image_url)
              }
              postId={currentPost.id}
            />
            <DisplayUserInfo post={currentPost} />

            <div className="flex flex-col gap-2 mt-4">
              <h1 className="text-2xl font-bold mb-2">{currentPost.title}</h1>
              {currentPost.description && (
                <p className="text-gray-700">{currentPost.description}</p>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="w-full mt-8">
        <MasonryGrid posts={recommendedPosts} />
      </div>
    </div>
  );
};

export default FetchSinglePost;
