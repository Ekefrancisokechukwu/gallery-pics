import { Modal } from "@/components/ui/Modal";
import axiosInstance from "@/lib/axios";
import { ImageModal } from "./ImageModal";
import { notFound } from "next/navigation";

async function getPhoto(id: string) {
  try {
    const res = await axiosInstance.get(`/photos/${id}`);
    return res.data;
  } catch (error) {
    console.error(`Failed to fetch photo with id ${id}:`, error);
    // throw new Error(`Failed to fetch photo with id ${id}`);
  }
}

export default async function PreviewPage({
  params,
}: {
  params: { id: string };
}) {
  const { id: slug } = await params;
  const id = slug.split("_id").pop();

  const data = await getPhoto(id!);

  if (!id) {
    notFound();
  }

  return (
    <Modal>
      <ImageModal data={data} />
    </Modal>
  );
}
