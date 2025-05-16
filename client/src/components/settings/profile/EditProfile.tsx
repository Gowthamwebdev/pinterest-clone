import ProfileForm from './ProfileForm';

const EditProfile = () => {
  return (
    <div className="max-w-2xl">
      <h2 className="text-xl font-semibold mb-2">Edit profile</h2>
      <p className="text-gray-600 mb-6">
        Keep your personal details private. Information you add here is visible
        to anyone who can view your profile.
      </p>
      <ProfileForm />
    </div>
  );
};

export default EditProfile;
