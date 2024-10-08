// AWS Uploaded Object Response Structure
const AWSUploadedObjectResponse = {
  ETag: "",      // string
  Location: "",  // string
  key: "",       // string
  Key: "",       // string
  Bucket: "",    // string
};

// Example usage of AWSUploadedObjectResponse structure
const exampleResponse = {
  ETag: "some-etag",
  Location: "https://example.com/file",
  key: "example-key",
  Key: "example-key",
  Bucket: "example-bucket",
};

export { AWSUploadedObjectResponse, exampleResponse };