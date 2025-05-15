import { useEffect, useState } from 'react';
import { FiHeart, FiShare } from 'react-icons/fi';
import { MoreHoriz } from '@mui/icons-material';
import { checkIfPostIsSaved, toggleSavePost } from '../../api/postApi';
import { toast } from 'react-hot-toast';
interface PostActionsProps {
  onDownload: () => void;
  postId: string;
}

const PostActions = ({ onDownload, postId }: PostActionsProps) => {
  const [showMenu, setShowMenu] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchSavedStatus = async () => {
      try {
        const isPostSaved = await checkIfPostIsSaved(postId);
        setIsSaved(isPostSaved);
      } catch (error) {
        console.error('Error fetching saved status:', error);
      }
    };

    fetchSavedStatus();
  }, [postId]);

  const handleSave = async () => {
    if (isSaving) return;
    setIsSaving(true);

    const savePromise = toggleSavePost(postId).then(({ isSaved: flag }) => {
      setIsSaved(flag);
      return flag;
    });

    toast
      .promise(savePromise, {
        loading: isSaved ? 'Removing from saved...' : 'Saving...',
        success: (flag) => (flag ? 'Post saved!' : 'Post unsaved!'),
        error: 'Failed to toggle save status',
      })
      .finally(() => setIsSaving(false));
  };

  return (
    <div className="flex gap-4 justify-between items-center">
      <div className="flex gap-4">
        <FiHeart fontSize={25} className="cursor-pointer hover:text-red-500" />
        <FiShare fontSize={25} className="cursor-pointer" />
        <div className="relative">
          <MoreHoriz
            fontSize="large"
            className="cursor-pointer"
            onClick={() => setShowMenu(!showMenu)}
          />
          {showMenu && (
            <div className="absolute left-0 mt-2 w-48 font-bold bg-white rounded-md shadow-lg text-2xl z-10 border border-gray-200">
              <div className="py-1">
                <button
                  className="block w-full text-left px-4 py-2 text-sm text-gray-950 hover:bg-gray-100"
                  onClick={onDownload}
                >
                  Download image
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div>
        <button className="px-4 py-3 text-gray-900 rounded-2xl text-lg font-medium cursor-pointer">
          Profile
        </button>
        <button
          className={`px-4 py-3 rounded-2xl text-sm font-medium cursor-pointer ${
            isSaved ? 'bg-gray-950 text-white' : 'bg-red-600 text-white'
          }`}
          onClick={handleSave}
          disabled={isSaving}
        >
          {isSaving ? 'Saving...' : isSaved ? 'Saved' : 'Save'}
        </button>
      </div>
    </div>
  );
};

export default PostActions;
