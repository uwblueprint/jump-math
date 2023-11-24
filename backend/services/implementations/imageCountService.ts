import MgImage from "../../models/imageCount.model";
import { getErrorMessage } from "../../utilities/errorUtils";
import logger from "../../utilities/logger";
import type IImageCountService from "../interfaces/imageCountService";

const Logger = logger(__filename);

class ImageCountService implements IImageCountService {
  /* eslint-disable class-methods-use-this */
  async initializeCount(filePath: string): Promise<number> {
    try {
      const image = new MgImage({
        filePath,
        referenceCount: 1,
      });
      await image.save();
      return image.referenceCount;
    } catch (error: unknown) {
      Logger.error(
        `Failed to increment count. Reason = ${getErrorMessage(error)}`,
      );
      throw error;
    }
  }

  async incrementCount(filePath: string): Promise<number> {
    try {
      const image = await MgImage.findOneAndUpdate(
        { filePath },
        { $inc: { referenceCount: 1 } },
        { new: true },
      );
      if (!image) {
        throw new Error(`Image ${filePath} not found`);
      }
      return image.referenceCount;
    } catch (error: unknown) {
      Logger.error(
        `Failed to increment count. Reason = ${getErrorMessage(error)}`,
      );
      throw error;
    }
  }

  async decrementCount(filePath: string): Promise<number> {
    try {
      const image = await MgImage.findOneAndUpdate(
        { filePath, referenceCount: { $gt: 0 } },
        { $inc: { referenceCount: -1 } },
        { new: true },
      );
      if (!image) {
        throw new Error(`Image ${filePath} not found`);
      }

      if (image.referenceCount === 0) {
        await MgImage.deleteOne({ filePath });
      }

      return image.referenceCount;
    } catch (error: unknown) {
      Logger.error(
        `Failed to decrement count. Reason = ${getErrorMessage(error)}`,
      );
      throw error;
    }
  }
}

export default ImageCountService;
