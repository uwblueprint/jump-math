/* eslint-disable-next-line import/no-extraneous-dependencies */
import { ReadStream } from "fs-capacitor";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import { FileUpload } from "graphql-upload";
import IFileStorageService from "../interfaces/fileStorageService";
import IImageStorageService, {
  UploadedImage,
} from "../interfaces/imageStorageService";
import logger from "../../utilities/logger";
import {
  getImageValidationError,
  validateImageType,
} from "../../middlewares/validators/util";
import { getErrorMessage } from "../../utilities/errorUtils";

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

class ImageStorageService implements IImageStorageService {
  uploadDir: string;

  storageService: IFileStorageService;

  constructor(uploadDir: string, storageService: IFileStorageService) {
    this.uploadDir = uploadDir;
    this.storageService = storageService;
  }

  /* eslint-disable class-methods-use-this */
  async uploadImage(file: Promise<FileUpload>): Promise<UploadedImage> {
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

  async getImage(fileName: string): Promise<string> {
    return this.storageService.getFile(fileName);
  }

  private async createImage(
    localFilePath: string,
    fileContentType: string,
  ): Promise<UploadedImage> {
    const fileName = uuidv4();
    try {
      await this.storageService.createFile(
        fileName,
        localFilePath,
        fileContentType,
      );
      const signedUrl = await this.getImage(fileName);
      return { url: signedUrl, path: fileName };
    } catch (error: unknown) {
      Logger.error(
        `Failed to create image. Reason = ${getErrorMessage(error)}`,
      );
      throw error;
    }
  }
}

export default ImageStorageService;
