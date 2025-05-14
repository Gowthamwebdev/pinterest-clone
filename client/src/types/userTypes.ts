export type userType = {
  userId: string;
  name: string;
  email: string;
  password: string;
  profileImg: string;
  dateOfBirth: string;
};

export type userState = {
  userId: string;
  name: string;
  email: string;
  password: string;
  profile_img: string;

  setUserId: (userId: string) => void;
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setProfileImg: (profile_img: string) => void;

  resetUser: () => void;
};

export type signupType = Pick<userType, 'email' | 'password' | 'dateOfBirth'>;

export type loginType = Pick<userType, 'email' | 'password'>;
