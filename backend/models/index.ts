import mongoose from "mongoose";

/* eslint-disable-next-line import/prefer-default-export */
export const mongo = {
  connect: async (): Promise<void> => {
    if (!process.env.MG_DATABASE_URL) {
      // eslint-disable-next-line no-console
      console.error("MG_DATABASE_URL is not defined");
      return;
    }
    try {
      mongoose.set("toObject", { virtuals: true });
      await mongoose.connect(encodeURI(process.env.MG_DATABASE_URL));
      // eslint-disable-next-line no-console
      console.info("Successfully connected to MongoDB!");
    } catch (error) {
      if (!(error instanceof Error)) throw error;
      // eslint-disable-next-line no-console
      console.error(`Error connecting to MongoDB: ${error.message}`);
    }
  },
};
