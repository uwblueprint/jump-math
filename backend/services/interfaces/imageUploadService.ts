import { ImageMetadata, ImagePreviewMetadata } from "../../models/test.model";

interface IImageUploadService {
  /**
   * Upload an image to Firebase
   * @param image the image to upload
   * @returns a url and file path for the requested image
   */
  uploadImage(image: ImagePreviewMetadata): Promise<ImageMetadata>;

  /**
   * Get an image stored in Firebase
   * @param file the file path to get
   * @returns a url and file path for the requested image
   */
  getImage(filePath: string): Promise<ImageMetadata>;

  /**
   * Hydrate an image stored in Firebase
   * @param image the image to hydrate
   * @returns a url and file path for the requested image
   */
  hydrateImage(image: ImageMetadata): Promise<ImageMetadata>;
}

export default IImageUploadService;
