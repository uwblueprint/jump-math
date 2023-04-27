import fs from "fs";
import { resolve } from "path";
import {
  ImageMetadata,
  ImageMetadataRequest,
} from "../types/questionMetadataTypes";

export const filename = "test.png";
export const uploadDir = "test-bucket";
export const signedUrl = `https://storage.googleapis.com/jump-math-98edf.appspot.com/${uploadDir}/${filename}`;
export const invalidImageType = "text/plain";

const filePath = `/assets/${filename}`;

export const imageUpload: ImageMetadataRequest = {
  file: new Promise((r) =>
    r({
      createReadStream: () => fs.createReadStream(resolve(__dirname, filePath)),
      filename,
      mimetype: "image/png",
      encoding: "7bit",
    }),
  ),
};

export const invalidImageUpload: ImageMetadataRequest = {
  file: new Promise((r) =>
    r({
      createReadStream: () => fs.createReadStream(resolve(__dirname, filePath)),
      filename,
      mimetype: invalidImageType,
      encoding: "7bit",
    }),
  ),
};

export const imageMetadata: ImageMetadata = {
  filePath,
  url: signedUrl,
};

export const assertResponseMatchesExpected = (result: ImageMetadata): void => {
  expect(result.url).toEqual(signedUrl);
  expect(result.filePath).toMatch(new RegExp(`^${uploadDir}/${filename}.+`));
};
