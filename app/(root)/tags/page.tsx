import TagCard from "@/components/cards/TagCard";
import DataRenderer from "@/components/DataRender";
import LocalSearch from "@/components/search/LocalSearch";
import ROUTES from "@/constants/routes";
import { EMPTY_TAGS } from "@/constants/states";
import { ITagDoc } from "@/db/tag.model";
import { getTags } from "@/lib/actions/tag.actions";
import { RouteParams } from "@/types/global";

export const runtime = "edge";

async function page({ searchParams }: RouteParams) {
  console.log(await searchParams, "seachParams");
  const { page, pageSize, query, filter } = await searchParams;

  const { success, data, error } = await getTags({
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 10,
    query,
    filter,
  });

  const { tags } = data || {};

  return (
    <>
      <h1 className="h1-bold text-dark100_light900 text-3xl">Tags</h1>

      <section className="mt-10">
        <LocalSearch
          route={ROUTES.TAGS}
          imgSrc="/icons/search.svg"
          placeholder="Search tags..."
          otherClasses="flex-1"
        />
      </section>

      <DataRenderer
        success={success}
        error={error}
        data={tags}
        empty={EMPTY_TAGS}
        render={(tags) => (
          <div className="mt-10 flex w-full flex-wrap gap-4">
            {tags.map((tag: ITagDoc) => (
              <TagCard
                key={tag._id as string}
                _id={tag._id as string}
                name={tag.name}
                compact={false}
                questions={tag.questions}
              />
            ))}
          </div>
        )}
      />
    </>
  );
}

export default page;
