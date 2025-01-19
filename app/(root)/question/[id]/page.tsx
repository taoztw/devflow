import React from "react";

import { RouteParams } from "@/types/global";
export const runtime = "edge";
const QuestionDetails = async ({ params }: RouteParams) => {
  const { id } = await params;

  return <div>QuestionDetails {id}</div>;
};

export default QuestionDetails;
