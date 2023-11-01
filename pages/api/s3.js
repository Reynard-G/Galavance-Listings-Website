const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

export default async function handler(req, res) {
  const { method, body } = req;

  if (method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  if (!body.filename) {
    return res.status(400).json({ message: "Missing filename" });
  }

  // Initialize the S3 client with your AWS credentials
  const s3Client = new S3Client({
    region: "auto",
    endpoint: process.env.R2_ENDPOINT,
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    },
  });

  // Define the S3 bucket and object key for the upload
  const bucketName = process.env.R2_BUCKET_NAME;
  const objectKey = body.filename;

  // Define the expiration time for the pre-signed URL (in seconds)
  const expirationTime = 300; // 5 minutes

  // Generate the pre-signed URL for non-multipart upload
  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: objectKey,
  });
  const url = await getSignedUrl(s3Client, command, { expiresIn: expirationTime });

  // Return the pre-signed URL to the client
  res.status(200).json({ url });
}