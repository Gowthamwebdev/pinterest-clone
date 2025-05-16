import { useEffect, useState } from 'react';
import { deleteUserTags, fetchUserTags } from '../../../api/userApi';
import SpinningLoader from '../../ui/loader/SpinningLoader';
import { CancelRounded } from '@mui/icons-material';
import { toast } from 'react-hot-toast';

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserTags = async () => {
      try {
        setLoading(true);
        const data = await fetchUserTags();
        setUserTags(data);
      } catch (err) {
        console.error('Error fetching tags:', err);
      } finally {
        setLoading(false);
      }
    };
    loadUserTags();
  }, []);

  const handleRemoveTag = async (tagId: string) => {
    try {
      await toast.promise(deleteUserTags(tagId), {
        loading: 'Removing tag...',
        success: () => {
          setUserTags((prevTags) =>
            prevTags.filter((tag) => tag.tag_id !== tagId),
          );
          return 'Tag removed!';
        },
        error: 'Failed to remove tag.',
      });
    } catch (error) {
      console.error('Error removing tag:', error);
    }
  };

  const handleTagClick = (tagId: string) => {
    console.log('Tag clicked:', tagId);
  };

  if (loading) {
    return (
      <>
        <SpinningLoader />
      </>
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
              onClick={() => handleRemoveTag(userTag.tag_id)}
              className="absolute top-2 right-2 p-1 bg-white/80 rounded-full hover:bg-white transition-colors cursor-pointer"
              aria-label="Remove tag"
            >
              <CancelRounded
                style={{
                  color: 'red',
                  fontSize: '1.25rem',
                }}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayHomeFeed;
