import React, { useState, useContext, useTransition, useEffect } from 'react';
import { FiHeart, FiShare } from 'react-icons/fi';
import { MoreHoriz } from '@mui/icons-material';
import { checkIfPostIsSaved, toggleSavePost } from '../../api/postApi';
import { SnackBarContext } from '../../context/SnackBarContext';
import { Menu, MenuItem } from '@mui/material';

interface PostActionsProps {
  postId: string;
  onDownload?: () => void;
}

const PostActions = ({ postId, onDownload }: PostActionsProps) => {
  const [isSaved, setIsSaved] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isPending, startTransition] = useTransition();
  const showSnackBar = useContext(SnackBarContext);
  const open = Boolean(anchorEl);

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

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSave = async () => {
    startTransition(async () => {
      try {
        const response = await toggleSavePost(postId);
        setIsSaved(response.isSaved);
        showSnackBar(
          response.isSaved ? 'Post saved' : 'Post unsaved',
          response.isSaved ? 'success' : 'info',
        );
      } catch (error) {
        console.error('Error saving post:', error);
        showSnackBar('Error saving post', 'error');
      }
    });
  };

  const handleDownloadClick = () => {
    if (onDownload) {
      onDownload();
    }
    handleMenuClose();
    handleMenuClose();
  };

  return (
    <div className="flex gap-4 justify-between items-center">
      <div className="flex gap-4">
        <FiHeart fontSize={25} className="cursor-pointer hover:text-red-500" />
        <FiShare fontSize={25} className="cursor-pointer" />
        <div>
          <button
            aria-label="more actions"
            onClick={handleMenuClick}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <MoreHoriz fontSize="large" />
          </button>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem onClick={handleDownloadClick}>Download</MenuItem>
          </Menu>
        </div>
      </div>
      <div className="flex gap-2">
        <button className="px-4 py-3 text-gray-900 rounded-2xl text-lg font-medium cursor-pointer hover:bg-gray-100">
          Profile
        </button>
        <button
          className={`px-4 py-3 rounded-2xl text-sm font-medium cursor-pointer transition-colors ${
            isSaved ? 'bg-gray-950 text-white' : 'bg-red-600 text-white'
          } ${isPending ? 'opacity-70' : ''}`}
          onClick={handleSave}
          disabled={isPending}
        >
          {isPending ? 'Processing...' : isSaved ? 'Saved' : 'Save'}
        </button>
      </div>
    </div>
  );
};

export default PostActions;
