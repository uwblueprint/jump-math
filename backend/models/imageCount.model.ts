import type { Document } from "mongoose";
import mongoose, { Schema } from "mongoose";

/**
 * This document contains information about a single image.
 */
export interface ImageCount extends Document {
  /** the unique identifier for the image */
  id: string;
  /** the unique file path of the image */
  filePath: string;
  /** the number of tests that reference this image */
  referenceCount: number;
}

const ImageCountSchema: Schema = new Schema({
  filePath: {
    type: String,
    required: true,
  },
  referenceCount: {
    type: Number,
    required: true,
  },
});

export default mongoose.model<ImageCount>("ImageCount", ImageCountSchema);
