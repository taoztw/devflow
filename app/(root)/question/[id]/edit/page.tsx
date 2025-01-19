import { notFound, redirect } from "next/navigation";

import { auth } from "@/auth";
import QuestionForm from "@/components/forms/QuestionForm";
import ROUTES from "@/constants/routes";
import { getQuestion } from "@/lib/actions/question.actions";
import { RouteParams } from "@/types/global";
export const runtime = "edge";
async function page({ params }: RouteParams) {
  const { id } = await params;
  if (!id) return notFound();

  const session = await auth();
  if (!session?.user) redirect(ROUTES.SIGN_IN);

  const { data: question, success } = await getQuestion({ questionId: id });
  if (!success) return notFound();

  if (question?.author.toString() !== session.user.id) {
    redirect(ROUTES.QUESTION(id));
  }

  return (
    <main>
      <QuestionForm question={question!} isEdit={true} />
    </main>
  );
}

export default page;
