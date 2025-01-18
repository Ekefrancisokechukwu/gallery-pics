import { NextResponse } from "next/server";
import axios from "axios";
import axiosInstance from "@/lib/axios";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query") || "";
  const orientation = searchParams.get("orientation") || "";
  const order_by = searchParams.get("order_by") || "";
  const page = parseInt(searchParams.get("page") || "1", 10);

  const params: Record<string, string | number> = {
    per_page: 30,
    page: page,
    order_by: order_by,
  };

  if (query) params.query = query;
  if (orientation) {
    params.orientation = orientation;
    params.query = query || "waterfall";
  }

  const endpoint = query || orientation ? "/search/photos" : "/photos";

  try {
    const response = await axiosInstance.get(`${endpoint}`, {
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
