import { getTags } from "@/lib/actions/tag.actions";

async function page() {
  const { success, data, error } = await getTags({
    page: 1,
    pageSize: 10,
    // query: "test",
  });

  const { tags } = data || {};

  console.log("TAGS", JSON.stringify(tags, null, 2));

  return <div>Tags</div>;
}

export default page;
