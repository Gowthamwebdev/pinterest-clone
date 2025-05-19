export type userType = {
  userId: string;
  name: string;
  email: string;
  password: string;
  profile_img: string;
  dateOfBirth: string;
};

export type userState = {
  user: userType;
  setUser: (user: Partial<userType>) => void;
  resetUser: () => void;
};

export type signupType = Pick<userType, 'email' | 'password' | 'dateOfBirth'>;

export type loginType = Pick<userType, 'email' | 'password'>;
