import fs from "fs";
import type { ReadStream } from "fs-capacitor";
import { v4 as uuidv4 } from "uuid";
import { resolve } from "path";
import type {
  ImageMetadata,
  ImageMetadataRequest,
} from "../types/questionMetadataTypes";

export const filename = "test.png";
export const uploadDir = "test-bucket";
export const signedUrl = `https://storage.googleapis.com/jump-math-98edf.appspot.com/${uploadDir}/${filename}`;
export const invalidImageType = "text/plain";

const createReadStream = (): ReadStream =>
  fs.createReadStream(
    resolve(__dirname, `assets/${filename}`),
  ) as unknown as ReadStream;

export const imageUpload: ImageMetadataRequest = {
  previewUrl: "data:image/png;base64,base64",
  file: new Promise((r) =>
    /* eslint-disable-next-line no-promise-executor-return */
    r({
      createReadStream,
      filename,
      mimetype: "image/png",
      encoding: "7bit",
    }),
  ),
};

export const invalidImageUpload: ImageMetadataRequest = {
  previewUrl: "data:text/plain;base64,base64",
  file: new Promise((r) =>
    /* eslint-disable-next-line no-promise-executor-return */
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
  expect(result.filePath).toMatch(new RegExp(`^${uploadDir}/${filename}_.+`));
};
