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
      // We want to include virtuals when we convert documents to objects primarily because
      // we use virtuals to populate the "id" field. This would also be useful if we wanted to
      // define other virtuals in the future.
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
