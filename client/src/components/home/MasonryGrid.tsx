import Masonry from '@mui/lab/Masonry';
import { postState } from '../../types/postTypes';
import { IconButton } from '@mui/material';
import { MoreHoriz } from '@mui/icons-material';
import { FiShare } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

interface MasonryGridProps {
  posts: postState[];
}

const MasonryGrid: React.FC<MasonryGridProps> = ({ posts }) => {
  const navigate = useNavigate();
  const handlePostClick = (postId: string) => {
    navigate(`/post/${postId}`);
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
          onClick={() => handlePostClick(post.id)}
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

            <div className="flex justify-end items-end gap-2">
              <IconButton className="!bg-white">
                <FiShare className="rounded-2xl text-black" size={20} />
              </IconButton>
              <IconButton className="!bg-white">
                <MoreHoriz
                  className="rounded-4xl text-black"
                  fontSize="small"
                />
              </IconButton>
            </div>
          </div>
        </div>
      ))}
    </Masonry>
  );
};

export default MasonryGrid;
