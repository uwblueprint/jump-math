import { GraphQLUpload } from "../../lib/graphql-upload";

const scalarResolvers = async () => ({
  FileUpload: await GraphQLUpload(),
});

export default scalarResolvers;
