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
        enum: Object.values(Grade),
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

/* eslint-disable func-names */
UserSchema.pre("findOneAndDelete", async function (next) {
  const doc = await this.findOne(this.getQuery());
  if (doc.role !== "Teacher") return;

  /* eslint-disable no-underscore-dangle */
  await MgSchool.findOneAndUpdate(
    { teachers: doc._id },
    { $pull: { teachers: doc._id } },
    { new: true },
  );
  await MgTestSession.deleteMany({ teacher: doc._id });

  next();
});

export default mongoose.model<User>("User", UserSchema);
