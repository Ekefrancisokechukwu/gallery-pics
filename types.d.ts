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
  location: {
    city: string | null;
    country: string | null;
  };
  likes: number;
  description: string | null;
  alt_description: string;
  alternative_slugs: { en: string };
  downloads: number;
  slug: string;

  blur_hash: string;
  tags: [{ title: string }];
  views: number;
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
    first_name: string;
    last_name: string;
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
