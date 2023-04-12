import { FileUpload } from "graphql-upload";
import fs from "fs";
import { resolve } from "path";
import { ImageUpload } from "../services/interfaces/imageUploadService";

export const filename = "test.png";
export const uploadDir = "test-bucket";
export const signedUrl = `https://storage.googleapis.com/jump-math-98edf.appspot.com/${uploadDir}/${filename}`;
export const invalidImageType = "text/plain";

export const imageUpload: Promise<FileUpload> = new Promise((r) =>
  r({
    createReadStream: () =>
      fs.createReadStream(resolve(__dirname, `assets/${filename}`)),
    filename,
    mimetype: "image/png",
    encoding: "7bit",
  }),
);

export const invalidImageUpload: Promise<FileUpload> = new Promise((r) =>
  r({
    createReadStream: () =>
      fs.createReadStream(resolve(__dirname, `assets/${filename}`)),
    filename,
    mimetype: invalidImageType,
    encoding: "7bit",
  }),
);

export const assertResponseMatchesExpected = (result: ImageUpload): void => {
  expect(result.url).toEqual(signedUrl);
  expect(result.filePath).toMatch(new RegExp(`^${uploadDir}/${filename}.+`));
};
