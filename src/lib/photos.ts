export type Photo = {
  id: string;
  title: string;
  grade: 1 | 2 | 3;
  description: string;
  image: string;
};

export const photos: Photo[] = [
  {
    id: "001",
    title: "タイトル01",
    grade: 1,
    description: "説明文説明文説明文",
    image: "/photos/001.JPG",
  },
  {
    id: "002",
    title: "タイトル02",
    grade: 2,
    description: "説明文説明文説明文",
    image: "/photos/002.JPG",
  },
  {
    id: "003",
    title: "タイトル03",
    grade: 3,
    description: "説明文説明文説明文",
    image: "/photos/003.JPG",
  },
];
