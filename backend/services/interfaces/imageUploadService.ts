import {
  ImageMetadata,
  ImageMetadataRequest,
} from "../../types/questionMetadataTypes";

interface IImageUploadService {
  /**
   * Upload an image to Firebase
   * @param image the file to upload
   * @returns a url and file path for the requested image
   */
  uploadImage(image: ImageMetadataRequest): Promise<ImageMetadata>;

  /**
   * Get an image stored in Firebase
   * @param file the file path to get
   * @returns a url and file path for the requested image
   */
  getImage(filePath: string): Promise<ImageMetadata>;
}

export default IImageUploadService;
