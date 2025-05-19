import React from 'react';
import { TextField, Typography, Divider } from '@mui/material';
import { FiArrowUpCircle } from 'react-icons/fi';
import { Controller, Control } from 'react-hook-form';

interface AddPostFormProps {
  imagePreview: string | null;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  control: Control;
  disabled?: boolean;
}

const AddPostForm: React.FC<AddPostFormProps> = ({
  imagePreview,
  onImageChange,
  control,
  disabled,
}) => {
  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full">
      <div className="w-full lg:w-2/5 flex flex-col items-center gap-4 px-4 py-6 rounded-xl border border-gray-200">
        <div className="w-3/4 h-64 flex items-center justify-center rounded-3xl border-2 border-dashed border-gray-300 bg-gray-100">
          {!imagePreview ? (
            <label
              htmlFor="pin-image-upload"
              className="flex flex-col items-center justify-center h-full cursor-pointer text-gray-700"
            >
              <FiArrowUpCircle size={50} className="mb-2" />
              <span className="font-medium">
                Choose a file or drag and drop
              </span>
              <input
                id="pin-image-upload"
                type="file"
                accept="image/*"
                onChange={onImageChange}
                className="hidden"
              />
              <Typography
                variant="caption"
                className="mt-2 text-gray-500 text-center"
              >
                .jpg under 5MB or .mp4 under 20MB
              </Typography>
            </label>
          ) : (
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-full object-contain rounded-xl"
            />
          )}
        </div>
        <Divider className="w-4/5 my-2" />
      </div>
      <div className="w-full lg:w-3/5 flex flex-col gap-5">
        <Controller
          name="title"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Title"
              placeholder="Add a title"
              fullWidth
              disabled={disabled}
            />
          )}
        />
        <Controller
          name="description"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Description"
              placeholder="Add a detailed description"
              multiline
              rows={4}
              fullWidth
              disabled={disabled}
            />
          )}
        />
        <Controller
          name="tags"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Tags"
              placeholder="e.g. design, UX"
              fullWidth
              disabled={disabled}
            />
          )}
        />
        <Controller
          name="board"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Board"
              placeholder="Your board name"
              fullWidth
              disabled={disabled}
            />
          )}
        />
        <Typography variant="caption" color="textSecondary">
          Don't worry, tags and board won't be visible to users
        </Typography>
      </div>
    </div>
  );
};

export default AddPostForm;
