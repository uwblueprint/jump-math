import type { CallbackError, Document } from "mongoose";
import mongoose, { Schema } from "mongoose";
import MgSchool from "./school.model";
// eslint-disable-next-line import/no-cycle
import MgClass from "./class.model";
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
  class?: string[];
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
  class: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Class" }],
    required: true,
  },
});

/* eslint-disable func-names */
UserSchema.pre("findOneAndDelete", async function (next) {
  try {
    const doc = await this.findOne(this.getQuery()).clone();
    if (doc && doc.role === "Teacher") {
      /* eslint-disable no-underscore-dangle */
      // Delete teacher reference from associated school
      await MgSchool.findOneAndUpdate(
        { teachers: doc._id },
        { $pull: { teachers: doc._id } },
        { new: true },
      );

      // Delete classes associated with teacher
      await MgClass.deleteMany({ teacher: doc._id });
    }
  } catch (error) {
    return next(error as CallbackError | undefined);
  }

  return next();
});

export default mongoose.model<User>("User", UserSchema);
