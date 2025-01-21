import { getPhoto } from "@/lib/dataAsync";
import ActionHeader from "./ActionHeader";
import ImageInfos from "./ImageInfos";
// import ImageInfos from "./ImageInfo";

export default async function PreviewPage({
  params,
}: {
  params: { id: string };
}) {
  const { id: slug } = await params;
  const id = slug.split("_id").pop();

  const data = await getPhoto(id!);

  return (
    <div className="max-w-[80rem] w-full px-8  mx-auto pb-10">
      <ActionHeader data={data} />
      <div className="mt-5">
        <ImageInfos data={data} />
      </div>
    </div>
  );
}
