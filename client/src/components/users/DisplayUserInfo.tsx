import { useNavigate } from 'react-router-dom';

interface PostUserProps {
  user: {
    id: string;
    name: string;
    profile_img: string | null;
  };
}

const DisplayUserInfo = ({ user }: PostUserProps) => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center gap-3 mt-4">
      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
        {user.profile_img ? (
          <img
            src={user.profile_img}
            alt={user.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-gray-600 text-lg font-medium">
            {/* {user.name.charAt(0).toUpperCase()} */}
          </span>
        )}
      </div>
      <div>
        <h2
          className="font-semibold cursor-pointer"
          onClick={() => navigate(`/profile/${user.id}`)}
        >
          {user.name}
        </h2>
      </div>
    </div>
  );
};

export default DisplayUserInfo;
