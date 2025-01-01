import { model, models, Schema, Document } from "mongoose";

export interface IInteraction {
  user: Schema.Types.ObjectId;
  action: string; // 赞成，反对，查看，提问...
  actionId: Schema.Types.ObjectId;
  actionType: "question" | "answer"; // 问题，回答...
}
export interface IInteractionDoc extends IInteraction, Document {}
const interactionSchema = new Schema<IInteraction>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    action: { type: String, required: true },
    actionId: { type: Schema.Types.ObjectId, required: true }, // 问题id，回答id，用户id...
    actionType: { type: String, enum: ["question", "answer"], required: true },
  },
  {
    timestamps: true,
  }
);

const Interaction =
  models?.Interaction || model<IInteraction>("Interaction", interactionSchema);

export default Interaction;
