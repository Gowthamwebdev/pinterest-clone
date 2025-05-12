import React, { useState } from 'react';
import { Divider, Typography, Button } from '@mui/material';
import { usePinStore } from '../stores/pinStore';
import AddPostForm from '../components/form/AddPinForm';
import { createPost } from '../api/postApi';

const CreatePost: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const {
    title,
    desc,
    tags,
    board,
    setImgUrl,
    setTitle,
    setDesc,
    setTags,
    setBoard,
  } = usePinStore();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (!file) return;
    setImageFile(file);
    const url = URL.createObjectURL(file);
    setImagePreview(url);
    setImgUrl(url);
  };

  const handlePublish = async () => {
    if (!imageFile) {
      alert('Please upload an image before publishing.');
      return;
    }

    const postPayload = {
      title,
      desc,
      tags,
      board,
      image: imageFile,
    };

    try {
      const data = await createPost(postPayload);
      console.log('response:', data);

      setTitle('');
      setDesc('');
      setTags('');
      setBoard('');
      setImgUrl('');
      setImageFile(null);
      setImagePreview(null);
    } catch (err) {
      console.error('Publish failed:', err);
      alert('Failed to publish post. Try again.');
    }
  };

  return (
    <div className="flex flex-col w-full h-full border-t border-t-gray-300 rounded-lg p-4 gap-4 bg-white">
      <div className="w-full flex justify-between items-center border-b border-gray-200 pb-3">
        <Typography variant="h5" fontWeight="bold">
          Create Pin
        </Typography>
        <Button
          variant="contained"
          color="error"
          onClick={handlePublish}
          sx={{
            px: 4,
            py: 1.5,
            boxShadow: 'none',
            borderRadius: 6,
            textTransform: 'none',
            '&:hover': { boxShadow: 'none' },
          }}
        >
          Publish
        </Button>
      </div>
      <Divider className="w-full my-4" />
      <AddPostForm
        imagePreview={imagePreview}
        onImageChange={handleImageChange}
      />
    </div>
  );
};

export default CreatePost;
