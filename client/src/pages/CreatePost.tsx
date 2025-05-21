import React, { useState } from 'react';
import { Divider, Typography, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import AddPostForm from '@components/form/AddPinForm';
import { createPost } from '@api/postApi';
import useSnackBar from '@context/SnackBarContext';

type FormValues = {
  title: string;
  description: string;
  tags: string;
};

const CreatePost: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const showSnackbar = useSnackBar();

  const {
    control,
    handleSubmit,
    reset: resetForm,
    formState: { isSubmitting },
  } = useForm<FormValues>();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (!file) return;

    setImageFile(file);
    const url = URL.createObjectURL(file);
    setImagePreview(url);
  };

  const onSubmit = async (data: FormValues) => {
    if (!imageFile) {
      showSnackbar('Image is required', 'error');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('tags', data.tags);
      formData.append('image', imageFile);

      await createPost(formData);
      showSnackbar('Post created successfully!', 'success');
      resetForm();
      setImagePreview(null);
      setImageFile(null);
    } catch (err) {
      console.error('Publish failed:', err);
      showSnackbar('Failed to publish post', 'error');
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
          onClick={handleSubmit(onSubmit)}
          disabled={!imagePreview || isSubmitting}
          sx={{
            px: 4,
            py: 1.5,
            boxShadow: 'none',
            borderRadius: 6,
            textTransform: 'none',
            '&:hover': { boxShadow: 'none' },
          }}
        >
          {isSubmitting ? 'Publishing...' : 'Publish'}
        </Button>
      </div>
      <Divider className="w-full my-4" />
      <AddPostForm
        imagePreview={imagePreview}
        onImageChange={handleImageChange}
        control={control}
        disabled={!imagePreview || isSubmitting}
      />
    </div>
  );
};

export default CreatePost;
