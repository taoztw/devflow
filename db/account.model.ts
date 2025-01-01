import { model, models, Schema, Types, Document } from "mongoose";

export interface IAccount {
  userId: Types.ObjectId;
  providerAccountId: string; // 登陆提供商的唯一标识符
  name: string;
  image?: string;
  password?: string;
  provider: string;
}
export interface IAccountDoc extends IAccount, Document {}
const accountSchema = new Schema<IAccount>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    providerAccountId: { type: String, required: true }, // 登陆提供商的唯一标识符
    name: { type: String, required: true },
    image: { type: String },
    password: { type: String },
    provider: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
const Account = models?.Account || model<IAccount>("Account", accountSchema);

export default Account;
