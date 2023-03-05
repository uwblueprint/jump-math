import mongoose, { Schema, Document } from "mongoose";
import MgTestSession from "./testSession.model";
import MgSchool from "./school.model";

import { Grade, Role } from "../types";

export interface User extends Document {
  id: string;
  firstName: string;
  lastName: string;
  authId: string;
  role: Role;
  email: string;
  grades?: Grade[];
  currentlyTeachingJM?: boolean;
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
    enum: ["Admin", "Teacher"],
  },
  email: {
    type: String,
    required: true,
  },
  grades: {
    type: [
      {
        type: String,
        required: false,
        enum: [
          "K",
          "Grade 1",
          "Grade 2",
          "Grade 3",
          "Grade 4",
          "Grade 5",
          "Grade 6",
          "Grade 7",
          "Grade 8",
        ],
      },
    ],
    required: false,
    default: undefined,
  },
  currentlyTeachingJM: {
    type: Boolean,
    required: false,
  },
});

UserSchema.post("findOneAndDelete", async (doc) => {
  if (doc.role !== "Teacher") return;

  /* eslint-disable no-underscore-dangle */
  await MgTestSession.deleteMany({ teacher: doc._id });
  await MgSchool.findOneAndUpdate(
    { teachers: doc._id },
    { $pull: { teachers: doc._id } },
    { new: true },
  );
});

export default mongoose.model<User>("User", UserSchema);
