import axios from "axios";
import axiosInstance from "./axios";

export const fetchImages = async ({
  pageParam = 1,
  queryKey,
}: {
  pageParam?: number;
  queryKey: readonly [
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

// export async function downloadImage(image: UnsplashImage) {
//   try {
//     const trackDownloadResponse = await axios(
//       `https://api.unsplash.com/photos/${image.id}/download`,
//       {
//         headers: {
//           Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
//         },
//       }
//     );

//     const downloadUrl = trackDownloadResponse.data.url;

//     console.log(downloadUrl);

//     // Trigger download
//     // const response = await axios(downloadUrl, { responseType: "blob" });

//     // const blob = response.data;
//     // const url = window.URL.createObjectURL(blob);

//     // // Create link element
//     // const a = document.createElement("a");
//     // a.href = url;
//     // a.download = "image.jpg";
//     // document.body.appendChild(a);
//     // a.click();
//     // document.body.removeChild(a);

//     // window.URL.revokeObjectURL(url);

//     // const blob = await response.();
//   } catch (error) {
//     console.log(error, "yea am the error");
//   }
// }
