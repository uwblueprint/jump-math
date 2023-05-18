import { GraphQLUpload } from "../../lib/graphqlUpload.cjs";

const scalarResolvers = async () => ({
  FileUpload: await GraphQLUpload(),
});

export default scalarResolvers;
