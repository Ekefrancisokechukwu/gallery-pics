type SingleImageData = {
  id: string;
  width: number;
  height: number;
  color: string;
  downloads: number;
  likes: number;
  description: string;
  urls: {
    raw: string;
    full: string;
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
    links: {
      self: string;
      html: string;
      photos: string;
      likes: string;
      portfolio: string;
    };
  };
};

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
  urls: {
    regular: string;
    small: string;
  };
  alt_description: string;
  user: {
    first_name: string;
    last_name: string;
    profile_image: { small: string };
  };
}

type ApiResponse = ImageDataProps | UnsplashImage[];
