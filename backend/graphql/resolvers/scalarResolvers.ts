import { GraphQLUpload } from "../../lib/graphql-upload";

const scalarResolvers = async () => ({
  FileUpload: await GraphQLUpload(),
  GradeEnum: {
    KINDERGARTEN: "K",
  },
});

export default scalarResolvers;
