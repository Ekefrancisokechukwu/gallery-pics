import axios from "axios";
import axiosInstance from "./axios";

export const fetchImages = async ({
  pageParam = 1,
  queryKey,
}: {
  pageParam: number;
  queryKey: [
    string,
    { query: string; orientation?: string; order_by?: string }
  ];
}) => {
  const [, { query, orientation, order_by }] = queryKey as [
    string,
    { query: string; orientation?: string; order_by?: string }
  ];

  const { data } = await axios.get(`/api/unsplash`, {
    params: {
      query: query || "",
      orientation: orientation || "",
      page: pageParam,
      order_by: order_by || "",
    },
  });

  return data;
};

export async function getPhoto(id: string) {
  try {
    const res = await axiosInstance.get(`/photos/${id}`);
    return res.data;
  } catch (error) {
    console.error(`Failed to fetch photo with id ${id}:`, error);
  }
}

export const fetchSingleImage = async (id: string): Promise<UnsplashImage> => {
  const { data } = await axios.get(`/api/unsplash/${id}`);
  return data;
};
