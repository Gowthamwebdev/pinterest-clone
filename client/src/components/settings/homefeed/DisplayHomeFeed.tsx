import { useEffect, useState, useTransition } from 'react';
import { deleteUserTags, fetchUserTags } from '@api/userApi';
import SpinningLoader from '../../ui/loader/SpinningLoader';
import { CancelRounded } from '@mui/icons-material';
import useSnackBar from '@context/SnackBarContext';

interface Pin {
  image_url: string;
}

interface Tag {
  id: string;
  name: string;
  pin_tags: Array<{
    pin: Pin;
  }>;
}

interface UserTag {
  user_id: string;
  tag_id: string;
  tag: Tag;
}

const DisplayHomeFeed = () => {
  const [userTags, setUserTags] = useState<UserTag[]>([]);
  const [isPending, startTransition] = useTransition();
  const [isRemoving, setIsRemoving] = useState<Record<string, boolean>>({});
  const showSnackBar = useSnackBar();

  useEffect(() => {
    startTransition(async () => {
      try {
        const data = await fetchUserTags();
        setUserTags(data);
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    });
  }, []);

  const handleRemoveTag = async (tagId: string) => {
    setIsRemoving((prev) => ({ ...prev, [tagId]: true }));
    try {
      const response = await deleteUserTags(tagId);
      showSnackBar(response, 'success');
      setUserTags((prevTags) => prevTags.filter((tag) => tag.tag_id !== tagId));
    } catch (error) {
      console.error('Error removing tag:', error);
    } finally {
      setIsRemoving((prev) => ({ ...prev, [tagId]: false }));
    }
  };

  const handleTagClick = (tagId: string) => {
    console.log('Tag clicked:', tagId);
  };

  if (isPending && userTags.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <SpinningLoader />
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">Your Tags</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {userTags.map((userTag) => (
          <div
            key={userTag.tag_id}
            className="relative group rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
            onClick={() => handleTagClick(userTag.tag_id)}
          >
            <div className="aspect-square bg-gray-100">
              {userTag.tag.pin_tags[0]?.pin?.image_url ? (
                <img
                  src={userTag.tag.pin_tags[0].pin.image_url}
                  alt={userTag.tag.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                  <span className="text-gray-500">No image</span>
                </div>
              )}
            </div>

            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
              <span className="text-white font-medium truncate">
                {userTag.tag.name}
              </span>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveTag(userTag.tag_id);
              }}
              className="absolute top-2 right-2 p-1 bg-white/80 rounded-full hover:bg-white transition-colors cursor-pointer"
              aria-label="Remove tag"
              disabled={isRemoving[userTag.tag_id]}
            >
              {isRemoving[userTag.tag_id] ? (
                <SpinningLoader />
              ) : (
                <CancelRounded
                  style={{
                    color: 'red',
                    fontSize: '1.25rem',
                  }}
                />
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayHomeFeed;
