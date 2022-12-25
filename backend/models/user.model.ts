import mongoose, { Schema, Document } from "mongoose";

import { Grade, Role } from "../types";

export interface User extends Document {
  id: string;
  firstName: string;
  lastName: string;
  authId: string;
  role: Role;
  email: string;
  gradesTeaching?: Grade[];
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
  gradesTeaching: {
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

export default mongoose.model<User>("User", UserSchema);
