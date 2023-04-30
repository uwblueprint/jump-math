/* eslint-disable-next-line import/no-extraneous-dependencies */
import { ReadStream } from "fs-capacitor";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import IFileStorageService from "../interfaces/fileStorageService";
import logger from "../../utilities/logger";
import {
  getImageValidationError,
  validateImageType,
} from "../../middlewares/validators/util";
import { getErrorMessage } from "../../utilities/errorUtils";
import IImageUploadService from "../interfaces/imageUploadService";
import FileStorageService from "./fileStorageService";
import {
  ImageMetadata,
  ImagePreviewMetadata,
} from "../../types/questionMetadataTypes";

const Logger = logger(__filename);

const writeFile = (readStream: ReadStream, filePath: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const out = fs.createWriteStream(filePath);
    readStream.pipe(out);
    out.on("finish", () => {
      resolve();
    });
    out.on("error", (err: Error) => reject(err));
  });
};

class ImageUploadService implements IImageUploadService {
  uploadDir: string;

  storageService: IFileStorageService;

  googleStorageUploadUrl: string;

  constructor(uploadDir: string) {
    this.uploadDir = uploadDir;

    const defaultBucket = process.env.FIREBASE_STORAGE_DEFAULT_BUCKET || "";
    const storageService = new FileStorageService(defaultBucket);
    this.storageService = storageService;

    this.googleStorageUploadUrl = `https://storage.googleapis.com/${defaultBucket}/${uploadDir}/`;
  }

  /* eslint-disable class-methods-use-this */
  async uploadImage(image: ImagePreviewMetadata): Promise<ImageMetadata> {
    let filePath = this.getFilePath(image);

    try {
      if (filePath)
        return await this.hydrateImage({
          filePath,
          url: image.previewUrl,
        });

      const { createReadStream, mimetype, filename } = await image.file;
      if (!fs.existsSync(this.uploadDir)) {
        fs.mkdirSync(this.uploadDir);
      }

      filePath = `${this.uploadDir}/${filename}_${uuidv4()}`;
      const fileContentType = mimetype;
      if (!validateImageType(fileContentType)) {
        throw new Error(getImageValidationError(fileContentType));
      }
      await writeFile(createReadStream(), filePath);
      return await this.createImage(filePath, fileContentType);
    } finally {
      if (filePath && fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
  }

  async hydrateImage(image: ImageMetadata): Promise<ImageMetadata> {
    if (parseInt(this.getExpirationDate(image), 10) > Date.now()) {
      return image;
    }

    const { filePath } = image;
    try {
      return await this.getImage(filePath);
    } catch (error: unknown) {
      Logger.error(
        `Failed to hydrate image with filePath "${filePath}". Reason = ${getErrorMessage(
          error,
        )}`,
      );
      throw error;
    }
  }

  async getImage(filePath: string): Promise<ImageMetadata> {
    try {
      const signedUrl = await this.storageService.getFile(filePath);
      return { url: signedUrl, filePath };
    } catch (error: unknown) {
      Logger.error(
        `Failed to get image for filePath "${filePath}". Reason = ${getErrorMessage(
          error,
        )}`,
      );
      throw error;
    }
  }

  private async createImage(
    filePath: string,
    fileContentType: string,
  ): Promise<ImageMetadata> {
    try {
      await this.storageService.createFile(filePath, filePath, fileContentType);
      return await this.getImage(filePath);
    } catch (error: unknown) {
      Logger.error(
        `Failed to create image. Reason = ${getErrorMessage(error)}`,
      );
      throw error;
    }
  }

  private getExpirationDate(image: ImageMetadata): string {
    const { url } = image;
    const regex = `^${this.googleStorageUploadUrl}.+?GoogleAccessId=.+?&Expires=([0-9]+)?&Signature=.+?$`;
    const match = url.match(regex);

    return match ? match[1] : "";
  }

  private getFilePath(image: ImagePreviewMetadata): string {
    const { previewUrl } = image;
    const regex = `^${this.googleStorageUploadUrl}(.+)?GoogleAccessId=.+?&Expires=[0-9]+?&Signature=.+?$`;
    const match = previewUrl.match(regex);

    return match ? match[1] : "";
  }
}

export default ImageUploadService;
