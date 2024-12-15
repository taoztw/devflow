import { ChevronRight } from "lucide-react";
import Link from "next/link";

import ROUTES from "@/constants/routes";

import TagCard from "../cards/TagCard";

const hotQuestions = [
  { _id: "1", title: "How to create a custom hook in React?", votes: 10 },
  { _id: "2", title: "How to use React Query?", votes: 5 },
  { _id: "3", title: "How to use Next.js?", votes: 3 },
  { _id: "4", title: "How to use Tailwind CSS?", votes: 2 },
  { _id: "5", title: "How to use React?", votes: 1 },
];
const popularTags = [
  { _id: "1", name: "React", questions: 10 },
  { _id: "2", name: "React Query", questions: 5 },
  { _id: "3", name: "Next.js", questions: 3 },
  { _id: "4", name: "Tailwind CSS", questions: 2 },
  { _id: "5", name: "React", questions: 1 },
];

function RightSidebar() {
  return (
    <section className="custom-scrollbar background-light900_dark200 light-border sticky right-0 top-0 flex h-screen w-[350px] flex-col overflow-y-auto border-l p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden">
      <div>
        <h3 className="h3-bold text-dark200_light900">Top Questions</h3>

        <div className="mt-7 flex w-full flex-col gap-[30px]">
          {hotQuestions.map((question) => (
            <Link
              href={ROUTES.QUESTION(question._id)}
              key={question._id}
              className="flex items-center justify-between"
            >
              <p className="body-medium text-dark500_light700">
                {question.title}
              </p>
              <ChevronRight />
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-16">
        <h3 className="h3-bold text-dark200_light900">Popular Tags</h3>

        <div className="mt-7 flex flex-col gap-4">
          {popularTags.map(({ _id, name, questions }) => (
            <TagCard
              key={_id}
              name={name}
              questions={questions}
              _id={_id}
              showCount
              compact
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default RightSidebar;
