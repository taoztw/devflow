import { redirect } from "next/navigation";

import { auth } from "@/auth";
import QuestionForm from "@/components/forms/QuestionForm";
import ROUTES from "@/constants/routes";
export const runtime = "edge";
async function page() {
  const session = await auth();

  if (!session?.user) redirect(ROUTES.SIGN_IN);
  return (
    <>
      <h1 className="h1-bold text-dark100_light900">All Questions</h1>

      <div className="mt-9">
        <QuestionForm />
      </div>
    </>
  );
}

export default page;
