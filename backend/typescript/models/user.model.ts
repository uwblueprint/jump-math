import mongoose, { Schema, Document } from "mongoose";

import { Role } from "../types";

export interface User extends Document {
  id: string;
  firstName: string;
  lastName: string;
  authId: string;
  role: Role;
  email: string;
}

const UserSchema: Schema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  authId: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["ADMIN", "TEACHER"],
  },
  email: {
    type: String,
    required: true,
  }
});

export default mongoose.model<User>("User", UserSchema);
