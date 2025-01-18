import axios from "axios";

export const fetchSingleImage = async (
  id: string
): Promise<SingleImageData> => {
  const { data } = await axios.get(`/api/unsplash/${id}`);
  return data;
};
