import { GraphQLUpload } from "../../lib/graphql-upload";

const scalarResolvers = async () => ({
  FileUpload: await GraphQLUpload(),
  GradeEnum: {
    KINDERGARTEN: "K",
  },
  SortDirection: {
    ASC: "asc",
    DESC: "desc",
  },
});

export default scalarResolvers;
