import { v4 as uuidv4 } from "uuid";
import db from "../../../testUtils/testDb";
import {
  assertResponseMatchesExpected,
  filename,
  imageUpload,
  invalidImageType,
  invalidImageUpload,
  uploadDir,
} from "../../../testUtils/imageUpload";
import IImageUploadService from "../../interfaces/imageUploadService";
import ImageUploadService from "../imageUploadService";

jest.mock("firebase-admin", () => {
  const storage = jest.fn().mockReturnValue({
    bucket: jest.fn().mockReturnValue({
      file: jest.fn().mockReturnValue({
        exists: jest
          .fn()
          .mockReturnValueOnce([false]) // initial upload
          .mockReturnValue([true]), // retrieval of image
        getSignedUrl: jest
          .fn()
          .mockReturnValue([
            "https://storage.googleapis.com/jump-math-98edf.appspot.com/test-bucket/test.png",
          ]),
      }),
      upload: jest.fn(),
    }),
  });
  return { storage };
});

describe("mongo imageUploadService", (): void => {
  let imageUploadService: IImageUploadService;

  beforeAll(async () => {
    await db.connect();
  });

  afterAll(async () => {
    await db.disconnect();
  });

  beforeEach(async () => {
    imageUploadService = new ImageUploadService(uploadDir);
  });

  afterEach(async () => {
    await db.clear();
  });

  it("uploadImage", async () => {
    const res = await imageUploadService.uploadImage(imageUpload);
    assertResponseMatchesExpected(res);
  });

  it("uploadImage - invalid image type", async () => {
    await expect(async () => {
      await imageUploadService.uploadImage(invalidImageUpload);
    }).rejects.toThrowError(
      `The image type ${invalidImageType} is not one of image/jpeg, image/png, image/gif`,
    );
  });

  it("getImage", async () => {
    const filePath = `${uploadDir}/${filename}_${uuidv4()}`;
    const res = await imageUploadService.getImage(filePath);
    assertResponseMatchesExpected(res);
  });
});
