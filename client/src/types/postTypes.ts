export type postType = {
  id: string;
  image_url: string;
  title: string;
  description: string;
  tags: string;
  board: string;
};

export type postState = {
  post: postType;
  setPost: (post: Partial<postType>) => void;
  reset: () => void;
};
