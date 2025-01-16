import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query") || "";
  const orientation = searchParams.get("orientation") || "";
  const order_by = searchParams.get("order_by") || "";
  const page = parseInt(searchParams.get("page") || "1", 10);

  const BASE_URL = process.env.API_PHOTO_ENDPIONT;

  const params: Record<string, string | number> = {
    per_page: 30,
    page: page | 1,
    order_by: order_by,
  };

  if (query) params.query = query;
  if (orientation) {
    params.orientation = orientation;
    params.query = query || "waterfall";
  }

  const endpoint = query || orientation ? "/search/photos" : "/photos";

  try {
    const response = await axios.get(`${BASE_URL}${endpoint}`, {
      headers: {
        Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
      },
      params,
    });

    return NextResponse.json(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        { error: error.message || "Failed to fetch images" },
        { status: error.response?.status || 500 }
      );
    }
    return NextResponse.json(
      { error: "Failed to fetch images" },
      { status: 500 }
    );
  }
}
