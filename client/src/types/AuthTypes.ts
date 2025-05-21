export type authType = {
  isAuthenticated: boolean;
  accessToken?: string;
};

export type authState = {
  auth: authType;
  setAuth: (auth: Partial<authType>) => void;
  resetAuth: () => void;
};
