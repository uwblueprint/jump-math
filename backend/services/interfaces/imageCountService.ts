interface IImageCountService {
  /**
   * Initializes the reference count of an image
   * @param filePath file path of the image
   * @returns a reference count
   */
  initializeCount(filePath: string): Promise<number>;

  /**
   * Increments the reference count of an image
   * @param filePath file path of the image
   * @returns a reference count
   */
  incrementCount(filePath: string): Promise<number>;

  /**
   * Decrements the reference count of an image
   * @param filePath file path of the image
   * @returns a reference count
   */
  decrementCount(filePath: string): Promise<number>;
}

export default IImageCountService;
