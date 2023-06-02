module.exports.graphqlUploadExpress = async (...args) =>
  (await import("graphql-upload/graphqlUploadExpress.mjs")).default(...args);

module.exports.GraphQLUpload = async () =>
  (await import("graphql-upload/GraphQLUpload.mjs")).default;
