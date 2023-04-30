import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import { resolve } from "path";
import {
  ImageMetadata,
  ImagePreviewMetadata,
} from "../types/questionMetadataTypes";

export const filename = "test.png";
export const uploadDir = "test-bucket";
export const signedUrl = `https://storage.googleapis.com/jump-math-98edf.appspot.com/${uploadDir}/${filename}`;
export const invalidImageType = "text/plain";

const filePath = `assets/${filename}`;
const createReadStream = () =>
  fs.createReadStream(resolve(__dirname, filePath));

export const imageUpload: ImagePreviewMetadata = {
  previewUrl: "data:image/png;base64,base64",
  file: new Promise((r) =>
    r({
      createReadStream,
      filename,
      mimetype: "image/png",
      encoding: "7bit",
    }),
  ),
};

export const invalidImageUpload: ImagePreviewMetadata = {
  previewUrl: "data:text/plain;base64,base64",
  file: new Promise((r) =>
    r({
      createReadStream,
      filename,
      mimetype: invalidImageType,
      encoding: "7bit",
    }),
  ),
};

export const imageMetadata: ImageMetadata = {
  filePath: `${uploadDir}/${filename}_${uuidv4()}`,
  url: signedUrl,
};

export const assertResponseMatchesExpected = (result: ImageMetadata): void => {
  expect(result.url).toEqual(signedUrl);
  expect(result.filePath).toMatch(new RegExp(`^${uploadDir}/${filename}.+`));
};
