import { v4 as uuidv4 } from "uuid";
import db from "../../../testUtils/testDb";
import IImageStorageService from "../../interfaces/imageStorageService";
import ImageStorageService from "../imageStorageService";
import IFileStorageService from "../../interfaces/fileStorageService";
import FileStorageService from "../fileStorageService";
import {
  assertResponseMatchesExpected,
  filename,
  imageUpload,
  invalidImageType,
  invalidImageUpload,
  uploadDir,
} from "../../../testUtils/imageStorage";

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

describe("mongo imageStorageService", (): void => {
  const defaultBucket = process.env.FIREBASE_STORAGE_DEFAULT_BUCKET || "";
  let fileStorageService: IFileStorageService;
  let imageStorageService: IImageStorageService;

  beforeAll(async () => {
    await db.connect();
  });

  afterAll(async () => {
    await db.disconnect();
  });

  beforeEach(async () => {
    fileStorageService = new FileStorageService(defaultBucket);
    imageStorageService = new ImageStorageService(
      uploadDir,
      fileStorageService,
    );
  });

  afterEach(async () => {
    await db.clear();
  });

  it("uploadImage", async () => {
    const res = await imageStorageService.uploadImage(imageUpload);
    assertResponseMatchesExpected(res);
  });

  it("uploadImage - invalid image type", async () => {
    await expect(async () => {
      await imageStorageService.uploadImage(invalidImageUpload);
    }).rejects.toThrowError(
      `The image type ${invalidImageType} is not one of image/jpeg, image/png, image/gif`,
    );
  });

  it("getImage", async () => {
    const filePath = `${uploadDir}/${filename}_${uuidv4()}`;
    const res = await imageStorageService.getImage(filePath);
    assertResponseMatchesExpected(res);
  });
});
