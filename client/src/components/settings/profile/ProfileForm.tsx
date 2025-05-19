import { useEffect, useState, useTransition } from 'react';
import { TextField, Button, CircularProgress } from '@mui/material';
import { updateUserProfile } from '../../../api/userApi';
import { fetchUserProfile } from '../../../api/authApi';
import useSnackBar from '../../../context/SnackBarContext';

const ProfileForm = () => {
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await fetchUserProfile();
        setFormData((prev) => ({
          ...prev,
          user_name: data.name || '',
        }));
      } catch (error) {
        console.error('error fetching user', error);
      }
    };
    fetchProfile();
  }, []);
  const [formData, setFormData] = useState({
    user_name: '',
    first_name: '',
    last_name: '',
    bio: '',
  });
  const [isPending, startTransition] = useTransition();
  const showSnackBar = useSnackBar();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      startTransition(async () => {
        const response = await updateUserProfile({
          name: formData.user_name,
          first_name: formData.first_name,
          last_name: formData.last_name,
          bio: formData.bio,
        });
        showSnackBar(`${response}`, 'success');
      });
    } catch (err) {
      if (err instanceof Error) {
        showSnackBar(`${err.message}`);
      } else {
        showSnackBar('An unexpected error occurred');
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TextField
          label="First name"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Last name"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          fullWidth
        />
      </div>
      <div className="flex flex-col gap-4">
        <TextField
          label="Bio"
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="User name"
          name="user_name"
          value={formData.user_name}
          onChange={handleChange}
          fullWidth
          disabled
        />
      </div>

      <div className="flex justify-end gap-4 mt-6">
        <Button
          type="submit"
          variant="contained"
          color="error"
          disabled={isPending}
          startIcon={isPending ? <CircularProgress size={20} /> : null}
        >
          Save Changes
        </Button>
      </div>
    </form>
  );
};

export default ProfileForm;
