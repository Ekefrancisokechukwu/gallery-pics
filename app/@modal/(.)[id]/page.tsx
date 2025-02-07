import { Modal } from "@/components/ui/Modal";
import ImageInfo from "./ImageInfo";
import { notFound } from "next/navigation";
import { getPhoto } from "@/lib/dataAsync";
import { Suspense } from "react";

export default async function PreviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const slug = (await params).id;
  const id = slug.split("_id").pop();

  if (!id) {
    notFound();
  }

  const data = await getPhoto(id!);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Modal>
        <ImageInfo data={data} />
      </Modal>
    </Suspense>
  );
}
