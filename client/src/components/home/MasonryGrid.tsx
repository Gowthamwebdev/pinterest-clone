import { useEffect, useState, useTransition } from 'react';
import Masonry from '@mui/lab/Masonry';
import { postType } from '@type/postTypes';
import { IconButton, CircularProgress } from '@mui/material';
import { MoreHoriz } from '@mui/icons-material';
import { FiShare } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { handleDownload, handleNavigate } from '@utils/functions';
import { deletePostById } from '@api/postApi';
import useSnackBar from '@context/SnackBarContext';

interface MasonryGridProps {
  posts: postType[];
  isOwnProfile: boolean;
  onPostDeleted?: (postId: string) => void;
}

const MasonryGrid: React.FC<MasonryGridProps> = ({
  posts,
  isOwnProfile,
  onPostDeleted,
}) => {
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const navigate = useNavigate();
  const showSnackbar = useSnackBar();

  const handleMoreClick = (e: React.MouseEvent, postId: string) => {
    e.stopPropagation();
    setActiveMenuId(activeMenuId === postId ? null : postId);
  };

  useEffect(() => {
    const handleClickOutside = () => {
      if (activeMenuId) {
        setActiveMenuId(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [activeMenuId]);

  const handlePostAction = (postId: string, action: 'delete' | 'edit') => {
    startTransition(async () => {
      try {
        if (action === 'delete') {
          await deletePostById(postId);
          showSnackbar('Post deleted successfully', 'success');
          onPostDeleted?.(postId);
        } else {
          navigate(`/edit-post/${postId}`);
        }
      } catch (error) {
        console.error(`Error ${action}ing post:`, error);
        showSnackbar(`Failed to ${action} post`, 'error');
      } finally {
        setActiveMenuId(null);
      }
    });
  };

  return (
    <Masonry
      columns={{ xs: 2, sm: 2, md: 3, lg: 5, xl: 6 }}
      spacing={2}
      className="hover:cursor-pointer"
    >
      {posts.map((post) => (
        <div
          key={post.id}
          className="relative group rounded-lg overflow-hidden"
          onClick={() => handleNavigate(navigate, `/post/${post.id}`)}
        >
          <img
            className="w-full h-full object-cover transition-transform duration-300 group-hover:brightness-90"
            src={post.image_url}
            alt={post.title}
            loading="lazy"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-between p-3">
            <div className="flex justify-end items-end">
              <button className="bg-red-600 hover:bg-red-700 text-white rounded-full px-4 py-2 text-sm font-medium flex items-center gap-1 transition-colors">
                Save
              </button>
            </div>

            <div className="flex justify-end items-end gap-2 relative">
              <IconButton className="!bg-white">
                <FiShare className="text-black" size={20} />
              </IconButton>
              <IconButton
                className="!bg-white"
                onClick={(e) => handleMoreClick(e, post.id)}
                disabled={isPending}
              >
                {isPending && activeMenuId === post.id ? (
                  <CircularProgress size={20} />
                ) : (
                  <MoreHoriz className="text-black" fontSize="small" />
                )}
              </IconButton>

              {activeMenuId === post.id && !isPending && (
                <div
                  className="absolute bottom-10 right-0 w-48 font-bold bg-white rounded-md shadow-lg text-sm z-30 border border-gray-200"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    className="block w-full text-left px-4 py-2 cursor-pointer text-gray-950 hover:bg-gray-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownload(post.id, post.image_url);
                    }}
                  >
                    Download image
                  </button>
                  {isOwnProfile && (
                    <>
                      <button
                        className="block w-full text-left px-4 py-2 cursor-pointer text-gray-950 hover:bg-gray-100"
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePostAction(post.id, 'edit');
                        }}
                      >
                        Edit post
                      </button>
                      <button
                        className="block w-full text-left px-4 py-2 cursor-pointer text-gray-950 hover:bg-gray-100"
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePostAction(post.id, 'delete');
                        }}
                      >
                        Delete post
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </Masonry>
  );
};

export default MasonryGrid;
