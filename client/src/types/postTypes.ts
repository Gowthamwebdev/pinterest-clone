export type postState = {
  id: string;
  image_url: string;
  title: string;
  description: string;
  tags: string;
  board: string;

  setImgUrl: (imgUrl: string) => void;
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  setTags: (tags: string) => void;
  setBoard: (board: string) => void;
};
