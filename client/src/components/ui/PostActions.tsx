import { useState } from 'react';
import { FiHeart, FiShare } from 'react-icons/fi';
import { MoreHoriz } from '@mui/icons-material';
import { savePost } from '../../api/postApi';

interface PostActionsProps {
  onDownload: () => void;
  onHide: () => void;
  onReport: () => void;
  postId: string;
}

const PostActions = ({
  onDownload,
  onHide,
  onReport,
  postId,
}: PostActionsProps) => {
  const [showMenu, setShowMenu] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (isSaving) return;

    setIsSaving(true);
    try {
      await savePost(postId);
      setIsSaved(!isSaved);
    } catch (error) {
      console.error('Error saving post:', error);
    } finally {
      setIsSaving(false);
    }
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
                <button
                  className="block w-full text-left px-4 py-2 text-sm text-gray-950 hover:bg-gray-100"
                  onClick={onHide}
                >
                  Hide Pin
                </button>
                <button
                  className="block w-full text-left px-4 py-2 text-sm text-gray-950 hover:bg-gray-100"
                  onClick={onReport}
                >
                  Report Pin
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
            isSaved ? 'bg-gray-200 text-gray-800' : 'bg-red-600 text-white'
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
