export type Post = {
  id: number;
  image: string;
  title: string;
  date: string;
  content: string;
  category: Category;
  visible: boolean;
};

export type Category = {
  id: number;
  name: string;
};