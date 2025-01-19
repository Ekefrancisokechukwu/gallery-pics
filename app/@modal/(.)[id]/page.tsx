import { Modal } from "@/components/ui/Modal";
import axiosInstance from "@/lib/axios";
import { ImageModal } from "./ImageModal";

async function getPhoto(id: string) {
  const res = await axiosInstance.get(`/photos/${id}`);
  return res.data;
}

export default async function PreviewPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const data = await getPhoto(id);

  // console.log(response);

  return (
    <Modal>
      <ImageModal data={data} />
    </Modal>
  );
}
