import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  fullName: string;
  username: string;
  email: string;
  password: string;
  profileImage?: string;
}

const UserSchema: Schema = new Schema({
  fullName: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profileImage: { type: String, required: false },
},
{ timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);
