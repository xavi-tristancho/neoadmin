export type postsStatistics = {
  posts: number;
  views: number;
  viewsPerMonth: {
    month: string;
    views: number;
  }[];
};
