/* eslint-disable-next-line import/no-extraneous-dependencies */
import { ReadStream } from "fs-capacitor";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import { FileUpload } from "graphql-upload";
import IFileStorageService from "../interfaces/fileStorageService";
import logger from "../../utilities/logger";
import {
  getImageValidationError,
  validateImageType,
} from "../../middlewares/validators/util";
import { getErrorMessage } from "../../utilities/errorUtils";
import IImageUploadService, {
  ImageUpload,
} from "../interfaces/imageUploadService";
import FileStorageService from "./fileStorageService";

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

  constructor(uploadDir: string) {
    this.uploadDir = uploadDir;

    const defaultBucket = process.env.FIREBASE_STORAGE_DEFAULT_BUCKET || "";
    const storageService = new FileStorageService(defaultBucket);
    this.storageService = storageService;
  }

  /* eslint-disable class-methods-use-this */
  async uploadImage(file: Promise<FileUpload>): Promise<ImageUpload> {
    let filePath;
    try {
      const { createReadStream, mimetype, filename } = await file;
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

  async getImage(filePath: string): Promise<ImageUpload> {
    const signedUrl = await this.storageService.getFile(filePath);
    return { url: signedUrl, filePath };
  }

  private async createImage(
    filePath: string,
    fileContentType: string,
  ): Promise<ImageUpload> {
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
}

export default ImageUploadService;
