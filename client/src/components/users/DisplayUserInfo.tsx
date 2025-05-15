import { useNavigate } from 'react-router-dom';
import { postState } from '../../types/postTypes';
import { userState } from '../../types/userTypes';

interface PostUserProps {
  post: postState & {
    user: userState;
  };
}
const DisplayUserInfo = ({ post }: PostUserProps) => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center gap-3 mt-4">
      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
        {post.user.profile_img ? (
          <img
            src={post.user.profile_img}
            alt={post.user.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-gray-600 text-lg font-medium">
            {post.user.name.charAt(0).toUpperCase()}
          </span>
        )}
      </div>
      <div>
        <h2
          className="font-semibold cursor-pointer"
          onClick={() => navigate(`/profile/${post.user.id}`)}
        >
          {post.user.name}
        </h2>
      </div>
    </div>
  );
};

export default DisplayUserInfo;
