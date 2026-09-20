export type Photo = {
  grade: 1 | 2;
  image: string;
};

export const photos: Photo[] = [
  {
    grade: 2,
    image: "/photos/2_yuuri.jpg",
  },
  {
    grade: 1,
    image: "/photos/1_ranko.jpeg",
  },
  {
    grade: 1,
    image: "/photos/1_rinka.jpg",
  },
  {
    grade: 1,
    image: "/photos/1_kenta.JPG",
  },
];
