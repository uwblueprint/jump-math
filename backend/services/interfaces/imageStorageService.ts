import { FileUpload } from "graphql-upload";
import { ImageMetadata } from "../../models/test.model";

interface IImageStorageService {
  /**
   * Upload an image to Firebase
   * @param file the file to upload
   * @returns a url and file path for the requested image
   */
  uploadImage(file: Promise<FileUpload>): Promise<ImageMetadata>;

  /**
   * Get an image stored in Firebase
   * @param file the file path to get
   * @returns a url to the requested image
   */
  getImage(filePath: string): Promise<ImageMetadata>;
}

export default IImageStorageService;
