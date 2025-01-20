import axios from "axios";

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

export const fetchSingleImage = async (id: string): Promise<UnsplashImage> => {
  const { data } = await axios.get(`/api/unsplash/${id}`);
  return data;
};
