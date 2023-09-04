import type { CallbackError, Document } from "mongoose";
import mongoose, { Schema } from "mongoose";
import MgSchool from "./school.model";
import MgClass from "./class.model";
import MgTestSession from "./testSession.model";
import type { Role } from "../types";
import { Grade } from "../types";

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
/* eslint-disable no-underscore-dangle */
UserSchema.pre("findOneAndDelete", async function (next) {
  try {
    const doc = await this.findOne(this.getQuery()).clone();
    if (doc && doc.role === "Teacher") {
      // Delete teacher reference from associated school
      await MgSchool.findOneAndUpdate(
        { teachers: doc._id },
        { $pull: { teachers: doc._id } },
        { new: true },
      );

      // Delete classes associated with teacher
      await MgClass.deleteMany({ teacher: doc._id });

      // Delete test sessions associated with teacher
      await MgTestSession.deleteMany({ teacher: doc._id });
    }
  } catch (error) {
    return next(error as CallbackError | undefined);
  }

  return next();
});

export default mongoose.model<User>("User", UserSchema);
