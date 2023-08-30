import type { CallbackError, Document } from "mongoose";
import mongoose, { Schema, model } from "mongoose";
// eslint-disable-next-line import/no-cycle
import { Grade } from "../types";
import MgUser from "./user.model";
import MgTestSession from "./testSession.model";

/**
 * This document contains information about a single class.
 */
export interface Class extends Document {
  /** the unique identifier for the class */
  id: string;
  /** the name of the class */
  className: string;
  /** the start date of the class */
  startDate: Date;
  /** the grade level of the class */
  gradeLevel: Grade;
  /** the id of the teacher that teaches the class  */
  teacher: string;
  /** the ids of the test sessions assigned to the class */
  testSessions: string[];
  /** the students of the class */
  students: Student[];
  /** whether the class is active or archived */
  isActive: boolean;
}

export interface Student {
  /** the unique identifier for the student */
  id: string;
  /** the first name of the student */
  firstName: string;
  /** the last name of the student */
  lastName: string;
  /** an optional identifier provided by the teacher */
  studentNumber?: string;
}

const StudentSchema: Schema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  studentNumber: {
    type: String,
    required: false,
  },
});

const ClassSchema: Schema = new Schema(
  {
    className: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    gradeLevel: {
      type: String,
      enum: Object.values(Grade),
      required: true,
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    testSessions: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "TestSession" }],
      required: true,
    },
    students: {
      type: [StudentSchema],
      required: false,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  { timestamps: true },
);

/* eslint-disable func-names */
ClassSchema.pre("findOneAndDelete", async function (next) {
  try {
    const doc = await this.findOne(this.getQuery()).clone();

    /* eslint-disable no-underscore-dangle */
    if (doc) {
      // Delete class reference from associated teacher
      await MgUser.findOneAndUpdate(
        { _id: doc.teacher },
        { $pull: { class: doc._id } },
        { new: true },
      );

      // Delete all test sessions associated with class
      await MgTestSession.deleteMany({ _id: { $in: doc.testSessions } });
    }
  } catch (error) {
    return next(error as CallbackError | undefined);
  }

  return next();
});

ClassSchema.pre("deleteMany", async function (next) {
  try {
    const docs = await this.find((this as any)._conditions).clone();

    /* eslint-disable no-underscore-dangle */
    if (docs.length) {
      // Delete class references from associated teachers
      const teacherIds = docs.map((doc) => doc.teacher);
      const classIds = docs.map((doc) => doc._id);
      await MgUser.updateMany(
        { _id: { $in: teacherIds } },
        { $pull: { class: { $in: classIds } } },
        { new: true },
      );

      // Delete all test sessions associated with class
      await MgTestSession.deleteMany({ class: { $in: classIds } });
    }
  } catch (error) {
    return next(error as CallbackError | undefined);
  }

  return next();
});

export default model<Class>("Class", ClassSchema);
