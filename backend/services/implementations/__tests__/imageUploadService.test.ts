import db from "../../../testUtils/testDb";
import {
  assertResponseMatchesExpected,
  imageMetadata,
  imageUpload,
  invalidImageType,
  invalidImageUpload,
  uploadDir,
} from "../../../testUtils/imageUpload";
import type IImageUploadService from "../../interfaces/imageUploadService";
import ImageUploadService from "../imageUploadService";
import ImageCountService from "../imageCountService";
import type { FileUpload } from "../../../lib/graphql-upload";
import MgImageCount from "../../../models/imageCount.model";

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
              "https://storage.googleapis.com/test-url/test-bucket/test.png",
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
  let imageCountService: ImageCountService;

  beforeAll(async () => {
    await db.connect();
  });

  afterAll(async () => {
    await db.disconnect();
  });

  beforeEach(async () => {
    imageCountService = new ImageCountService();
    imageUploadService = new ImageUploadService(uploadDir, imageCountService);
  });

  afterEach(async () => {
    await db.clear();
  });

  it("deleteImage - invalid filePath", async () => {
    await imageCountService.initializeCount(imageMetadata.filePath);

    await expect(async () => {
      await imageUploadService.deleteImage(imageMetadata);
    }).rejects.toThrowError(
      `File name ${imageMetadata.filePath} does not exist`,
    );
  });

  it("uploadImage and deleteImage", async () => {
    const uploadedImage = await imageUploadService.uploadImage(imageUpload);
    assertResponseMatchesExpected(uploadedImage);

    // check that the reference count is 1
    let referenceCount = await MgImageCount.findOne({
      filePath: uploadedImage.filePath,
    });
    expect(referenceCount?.referenceCount).toEqual(1);

    // upload same image and check that the reference count is 2
    const id = uploadedImage.filePath.split("_")[1];
    await imageUploadService.uploadImage({
      file: undefined as unknown as Promise<FileUpload>,
      previewUrl: `${uploadedImage.url}_${id}?GoogleAccessId=fi&Expires=1698622126&Signature=gV`,
    });
    referenceCount = await MgImageCount.findOne({
      filePath: uploadedImage.filePath,
    });
    expect(referenceCount?.referenceCount).toEqual(2);

    // delete image and check that the reference count is 1
    let res = await imageUploadService.deleteImage(uploadedImage);
    assertResponseMatchesExpected(res);
    referenceCount = await MgImageCount.findOne({
      filePath: uploadedImage.filePath,
    });
    expect(referenceCount?.referenceCount).toEqual(1);

    // delete same image and check that the reference count is 0
    res = await imageUploadService.deleteImage(uploadedImage);
    assertResponseMatchesExpected(res);
    referenceCount = await MgImageCount.findOne({
      filePath: uploadedImage.filePath,
    });
    expect(referenceCount).toBeNull();
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
