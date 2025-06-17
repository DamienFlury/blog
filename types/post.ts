export type Post = {
  slug: string;
  title: string;
  position: [number, number]
  date: string;
  coverImage: string;
  excerpt: string;
  ogImage: {
    url: string;
  };
  content: string;
  preview?: boolean;
};
