import { FileUpload } from "graphql-upload";

export interface ImageUpload {
  url: string;
  filePath: string;
}

interface IImageUploadService {
  /**
   * Upload an image to Firebase
   * @param file the file to upload
   * @returns a url and file path for the requested image
   */
  uploadImage(file: Promise<FileUpload>): Promise<ImageUpload>;

  /**
   * Get an image stored in Firebase
   * @param file the file path to get
   * @returns a url and file path for the requested image
   */
  getImage(filePath: string): Promise<ImageUpload>;
}

export default IImageUploadService;
