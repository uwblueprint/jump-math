type GraphQLUploadExpressFunctionType =
  typeof import("graphql-upload/graphqlUploadExpress.mjs").default;
export declare const graphqlUploadExpress: (
  ...args: Parameters<GraphQLUploadExpressFunctionType>
) => Promise<ReturnType<GraphQLUploadExpressFunctionType>>;

export declare const GraphQLUpload: () => Promise<
  typeof import("graphql-upload/GraphQLUpload.mjs").default
>;

export type { FileUpload } from "graphql-upload/Upload.mjs";
