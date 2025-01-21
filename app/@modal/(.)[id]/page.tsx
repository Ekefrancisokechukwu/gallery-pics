import { Modal } from "@/components/ui/Modal";
import ImageInfo from "./ImageInfo";
import { notFound } from "next/navigation";
import { getPhoto } from "@/lib/dataAsync";

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
      <ImageInfo data={data} />
    </Modal>
  );
}
