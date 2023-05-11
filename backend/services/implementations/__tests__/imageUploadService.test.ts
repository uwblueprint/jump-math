import db from "../../../testUtils/testDb";
import {
  assertResponseMatchesExpected,
  imageMetadata,
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
      file: jest
        .fn()
        .mockReturnValueOnce(undefined)
        .mockReturnValue({
          exists: jest
            .fn()
            .mockReturnValueOnce([false]) // initial upload
            .mockReturnValue([true]), // retrieval of image
          getSignedUrl: jest
            .fn()
            .mockReturnValue([
              "https://storage.googleapis.com/jump-math-98edf.appspot.com/test-bucket/test.png",
            ]),
          delete: jest.fn().mockReturnValue({}),
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

  it("deleteImage - invalid filePath", async () => {
    await expect(async () => {
      await imageUploadService.deleteImage(imageMetadata);
    }).rejects.toThrowError(
      `File name ${imageMetadata.filePath} does not exist`,
    );
  });

  it("uploadImage and deleteImage", async () => {
    const uploadedImage = await imageUploadService.uploadImage(imageUpload);
    assertResponseMatchesExpected(uploadedImage);

    const res = await imageUploadService.deleteImage(uploadedImage);
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
    const res = await imageUploadService.getImage(imageMetadata.filePath);
    assertResponseMatchesExpected(res);
  });

  it("hydrateImage", async () => {
    const res = await imageUploadService.hydrateImage(imageMetadata);
    assertResponseMatchesExpected(res);
  });
});
