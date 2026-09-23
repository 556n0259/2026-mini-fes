export type Photo = {
  grade: 1 | 2;
  image: string;
};

export const photos: Photo[] = [
  {
    grade: 2,
    image: "/photos/2_01.jpg",
  },
  {
    grade: 2,
    image: "/photos/2_02.jpg",
  },
  {
    grade: 1,
    image: "/photos/1_01.JPG",
  },
  {
    grade: 1,
    image: "/photos/1_02.jpeg",
  },
  {
    grade: 1,
    image: "/photos/1_03.jpg",
  },
];
