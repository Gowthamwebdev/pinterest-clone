import { useEffect, useState } from 'react';
import Masonry from '@mui/lab/Masonry';
import { postState } from '../../types/postTypes';
import { IconButton } from '@mui/material';
import { MoreHoriz } from '@mui/icons-material';
import { FiShare } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { handleDownload, handleNavigate } from '../../utils/functions';
import { useUiStore } from '../../stores/UiStore';

interface MasonryGridProps {
  posts: postState[];
}

const MasonryGrid: React.FC<MasonryGridProps> = ({ posts }) => {
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const navigate = useNavigate();
  const { ownProfile } = useUiStore();

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
            <div className="flex justify-end items-end">
              {ownProfile && (
                <button className="bg-orange-500 hover:bg-red-700 text-white rounded-full px-4 py-2 text-sm font-medium flex items-center gap-1 transition-colors">
                  delete
                </button>
              )}
            </div>

            <div className="flex justify-end items-end gap-2 relative">
              <IconButton className="!bg-white">
                <FiShare className="text-black" size={20} />
              </IconButton>
              <IconButton
                className="!bg-white"
                onClick={(e) => {
                  e.stopPropagation();
                  handleMoreClick(e, post.id);
                }}
              >
                <MoreHoriz className="text-black" fontSize="small" />
              </IconButton>

              {activeMenuId === post.id && (
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
