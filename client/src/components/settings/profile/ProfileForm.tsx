import { useEffect, useState } from 'react';
import {
  TextField,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
} from '@mui/material';
import { updateUserProfile } from '../../../api/userApi';
import { toast } from 'react-hot-toast';
import { fetchUserProfileApi } from '../../../api/authApi';

const ProfileForm = () => {
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const data = await fetchUserProfileApi();
        setFormData((prev) => ({
          ...prev,
          user_name: data.name || '',
        }));
        console.log(data.name);
      } catch (error) {
        console.error('error fetching user', error);
      }
    };
    fetchUserProfile();
  }, []);
  const [formData, setFormData] = useState({
    user_name: '',
    first_name: '',
    last_name: '',
    bio: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await toast.promise(
        updateUserProfile({
          name: formData.user_name,
          first_name: formData.first_name,
          last_name: formData.last_name,
          bio: formData.bio,
        }),
        {
          loading: 'Updating profile...',
          success: 'Profile data updated!',
          error: 'Failed to update profile.',
        },
      );
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Update failed');
    } finally {
      setLoading(false);
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
          color="primary"
          disabled={loading}
          startIcon={loading ? <CircularProgress size={20} /> : null}
        >
          Save Changes
        </Button>
      </div>

      <Snackbar open={!!error} onClose={() => setError('')}>
        <Alert severity="error" onClose={() => setError('')}>
          {error}
        </Alert>
      </Snackbar>

      <Snackbar
        open={success}
        autoHideDuration={6000}
        onClose={() => setSuccess(false)}
      >
        <Alert severity="success">Profile updated successfully!</Alert>
      </Snackbar>
    </form>
  );
};

export default ProfileForm;
