import { NextResponse } from "next/server";
import axiosInstance from "@/lib/axios";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  try {
    const trackDownloadResponse = await axiosInstance.get(
      `/photos/${id}/download`
    );
    const downloadUrl = trackDownloadResponse.data.url;

    // Now, we fetch the image
    const imageResponse = await fetch(downloadUrl);
    const arrayBuffer = await imageResponse.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Set the appropriate headers for the download
    const headers = new Headers();
    headers.set(
      "Content-Disposition",
      `attachment; filename="unsplash-${id}.jpg"`
    );
    headers.set("Content-Type", "image/jpeg");

    // Return the image as a downloadable file
    return new NextResponse(buffer, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error("Download error:", error);
    return NextResponse.json(
      { error: "Failed to download image" },
      { status: 500 }
    );
  }
}
