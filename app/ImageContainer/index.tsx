"use client";

import Image from "next/image";
import Masonry from "react-masonry-css";

const images = [
  {
    id: "1",
    url: "https://images.unsplash.com/photo-1735641241204-44519d33651b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0fHx8ZW58MHx8fHx8",
    width: 300,
    height: 400,
    alt: "Random Image 1",
  },
  {
    id: "2",
    url: "https://images.unsplash.com/photo-1736092306049-d55fd016a88f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw4fHx8ZW58MHx8fHx8",
    width: 400,
    height: 500,
    alt: "Random Image 2",
  },
  {
    id: "3",
    url: "https://plus.unsplash.com/premium_photo-1733738032876-30004fa38291?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMHx8fGVufDB8fHx8fA%3D%3D",
    width: 350,
    height: 300,
    alt: "Random Image 3",
  },
  {
    id: "4",
    url: "https://images.unsplash.com/photo-1735722446871-14e93325f6d7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzOHx8fGVufDB8fHx8fA%3D%3D",
    width: 450,
    height: 600,
    alt: "Random Image 4",
  },
  {
    id: "5",
    url: "https://plus.unsplash.com/premium_photo-1736481629921-6834d7289d91?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzN3x8fGVufDB8fHx8fA%3D%3D",
    width: 300,
    height: 200,
    alt: "Random Image 5",
  },
  {
    id: "6",
    url: "https://images.unsplash.com/photo-1736443569819-27b16dea3a94?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzNHx8fGVufDB8fHx8fA%3D%3D",
    width: 500,
    height: 350,
    alt: "Random Image 6",
  },
  {
    id: "7",
    url: "https://images.unsplash.com/photo-1736477032333-ad90073f31d3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyOXx8fGVufDB8fHx8fA%3D%3D",
    width: 400,
    height: 450,
    alt: "Random Image 7",
  },
  {
    id: "8",
    url: "https://images.unsplash.com/photo-1736478771803-32a5c22645c9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyN3x8fGVufDB8fHx8fA%3D%3D",
    width: 350,
    height: 400,
    alt: "Random Image 8",
  },
  {
    id: "9",
    url: "https://plus.unsplash.com/premium_photo-1728510320088-0b89856e726e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyNHx8fGVufDB8fHx8fA%3D%3D",
    width: 600,
    height: 450,
    alt: "Random Image 9",
  },
  {
    id: "10",
    url: "https://images.unsplash.com/photo-1736346902577-756fd5d1b9eb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyM3x8fGVufDB8fHx8fA%3D%3D",
    width: 200,
    height: 300,
    alt: "Random Image 10",
  },
];

const ImageContainer = () => {
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <main className="px-8 pt-6 pb-11">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex w-auto -ml-4"
        columnClassName="pl-4 bg-background"
      >
        {images.map((image) => (
          <div
            key={image.id}
            className="mb-4 overflow-hidden rounded-lg shadow-md transition-transform duration-300 cursor-zoom-out ease-in-out hover:shadow-lg"
          >
            <div
              className="relative"
              style={{ paddingTop: `${(image.height / image.width) * 100}%` }}
            >
              <Image
                src={image.url}
                alt={image.alt}
                layout="fill"
                objectFit="cover"
                className="transition-opacity duration-300"
              />
            </div>
          </div>
        ))}
      </Masonry>
    </main>
  );
};
export default ImageContainer;
