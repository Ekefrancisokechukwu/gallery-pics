import { Suspense } from "react";
import { getPhoto } from "@/lib/dataAsync";
import ActionHeader from "./ActionHeader";
import ImageInfos from "./ImageInfos";
import { notFound } from "next/navigation";

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
      <div className="max-w-[80rem] w-full px-8  mx-auto pb-10">
        <ActionHeader data={data} />
        <div className="mt-5">
          <ImageInfos data={data} />
        </div>
      </div>
    </Suspense>
  );
}
