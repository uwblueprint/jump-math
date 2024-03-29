import { storage } from "firebase-admin";

import type IFileStorageService from "../interfaces/fileStorageService";
import { getErrorMessage } from "../../utilities/errorUtils";
import logger from "../../utilities/logger";

const Logger = logger(__filename);

class FileStorageService implements IFileStorageService {
  bucketName: string;

  constructor(bucketName: string) {
    this.bucketName = bucketName;
  }

  async getFile(fileName: string, expirationTimeMinutes = 60): Promise<string> {
    const bucket = storage().bucket(this.bucketName);
    const expirationDate = new Date();
    expirationDate.setMinutes(
      expirationDate.getMinutes() + expirationTimeMinutes,
    );
    try {
      const currentBlob = await bucket.file(fileName);
      if (!(await currentBlob.exists())[0]) {
        throw new Error(`File name ${fileName} does not exist`);
      }
      const res = await currentBlob.getSignedUrl({
        action: "read",
        expires: expirationDate,
      });
      return res[0];
    } catch (error: unknown) {
      Logger.error(
        `Failed to retrieve file. Reason = ${getErrorMessage(error)}`,
      );
      throw error;
    }
  }

  async createFile(
    fileName: string,
    filePath: string,
    contentType: string | null = null,
  ): Promise<void> {
    try {
      const bucket = storage().bucket(this.bucketName);
      const currentBlob = await bucket.file(fileName);
      if ((await currentBlob.exists())[0]) {
        throw new Error(`File name ${fileName} already exists`);
      }
      await bucket.upload(filePath, {
        destination: fileName,
        metadata: { contentType },
      });
    } catch (error: unknown) {
      Logger.error(`Failed to upload file. Reason = ${getErrorMessage(error)}`);
      throw error;
    }
  }

  async updateFile(
    fileName: string,
    filePath: string,
    contentType: string | null = null,
  ): Promise<void> {
    try {
      const bucket = storage().bucket(this.bucketName);
      const currentBlob = await bucket.file(fileName);
      if (!(await currentBlob.exists())[0]) {
        throw new Error(`File name ${fileName} does not exist`);
      }
      await bucket.upload(filePath, {
        destination: fileName,
        metadata: { contentType },
      });
    } catch (error: unknown) {
      Logger.error(`Failed to update file. Reason = ${getErrorMessage(error)}`);
      throw error;
    }
  }

  async deleteFile(fileName: string): Promise<void> {
    try {
      const bucket = storage().bucket(this.bucketName);
      const currentBlob = await bucket.file(fileName);
      if (!currentBlob) {
        throw new Error(`File name ${fileName} does not exist`);
      }
      await currentBlob.delete();
    } catch (error: unknown) {
      Logger.error(`Failed to delete file. Reason = ${getErrorMessage(error)}`);
      throw error;
    }
  }
}

export default FileStorageService;
