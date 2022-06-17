import mongoose, { Schema, Document } from "mongoose";

/**
 * This document contains information about a single school.
 */
export interface School extends Document {
  /** the unique identifier for the school */
  id: string;
  /** the name of the school */
  name: string;
  /** the country the school is located in */
  country: string;
  /** the sub-region the school is located in */
  subRegion: string;
  /** the city the school is located in */
  city: string;
  /** the address of the school */
  address: string;
  /** the teachers that teach at the school (reference to the IDs in the User table) */
  teachers: [string];
}

const SchoolSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  subRegion: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  teachers: {
    type: [String],
    required: true,
  },
});

export default mongoose.model<School>("School", SchoolSchema);
