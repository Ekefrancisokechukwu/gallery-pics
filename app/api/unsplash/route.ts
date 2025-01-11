import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");
  const page = parseInt(searchParams.get("page") || "1", 10);

  const BASE_URL = process.env.API_PHOTO_ENDPIONT;
  const url =
    query !== ""
      ? `/search/photos?per_page=30&query=${query}&page=${page}`
      : `/photos?per_page=40&page=${page}`;

  try {
    const response = await axios.get(`${BASE_URL}${url}`, {
      headers: {
        Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
      },
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
