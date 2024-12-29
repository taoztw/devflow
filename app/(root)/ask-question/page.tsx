import QuestionForm from "@/components/forms/QuestionForm";

function page() {
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
