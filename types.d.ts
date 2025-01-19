// type SingleImageData = {
//   id: string;
//   width: number;
//   height: number;
//   color: string;
//   downloads: number;
//   likes: number;
//   description: string;
//   alt_description: string;
//   urls: {
//     raw: string;
//     full: string;
//     regular: string;
//   };
//   links: {
//     self: string;
//     html: string;
//     download: string;
//     download_location: string;
//   };

//   user: {
//     username: string;
//     name: string;
//     profile_image: { small: string };
//     links: {
//       self: string;
//       html: string;
//       photos: string;
//       likes: string;
//       portfolio: string;
//     };
//   };
// };

interface ImageDataProps {
  total: number;
  total_pages: number;
  results: UnsplashImage[];
}

interface UnsplashImage {
  id: string;
  width: number;
  height: number;
  color: string;
  downloads: number;
  likes: number;
  description: string;
  alt_description: string;
  urls: {
    raw: string;
    full: string;
    regular: string;
  };
  links: {
    self: string;
    html: string;
    download: string;
    download_location: string;
  };

  user: {
    username: string;
    name: string;
    profile_image: { small: string };
    links: {
      self: string;
      html: string;
      photos: string;
      likes: string;
      portfolio: string;
    };
  };
}

type ApiResponse = ImageDataProps | UnsplashImage[];
