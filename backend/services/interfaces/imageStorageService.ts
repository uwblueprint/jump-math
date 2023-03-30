import { FileUpload } from "graphql-upload";

export interface UploadedImage {
  url: string;
  path: string;
}

interface IImageStorageService {
  /**
   * Upload an image to Firebase
   * @param file the file to upload
   * @returns a url and file path for the requested image
   */
  uploadImage(file: Promise<FileUpload>): Promise<UploadedImage>;

  /**
   * Get an image stored in Firebase
   * @param file the file path to get
   * @returns a url to the requested image
   */
  getImage(filePath: string): Promise<string>;
}

export default IImageStorageService;
