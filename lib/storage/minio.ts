import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";

// Read configuration from environment variables with multiple naming aliases
export const getStorageConfig = () => {
  const endpoint =
    process.env.AWS_ENDPOINT ||
    process.env.AWS_ENDPOINT_URL ||
    process.env.MINIO_ENDPOINT ||
    process.env.S3_ENDPOINT ||
    "";

  const accessKey =
    process.env.AWS_ACCESS_KEY_ID ||
    process.env.MINIO_ACCESS_KEY ||
    process.env.S3_ACCESS_KEY_ID ||
    "";

  const secretKey =
    process.env.AWS_SECRET_ACCESS_KEY ||
    process.env.MINIO_SECRET_KEY ||
    process.env.S3_SECRET_ACCESS_KEY ||
    "";

  const bucketName =
    process.env.AWS_BUCKET ||
    process.env.AWS_BUCKET_NAME ||
    process.env.MINIO_BUCKET_NAME ||
    process.env.S3_BUCKET_NAME ||
    process.env.S3_BUCKET ||
    "jiniaenterprise";

  const region =
    process.env.AWS_DEFAULT_REGION ||
    process.env.AWS_REGION ||
    process.env.MINIO_REGION ||
    process.env.S3_REGION ||
    "us-east-1";

  const publicUrl =
    process.env.AWS_URL ||
    process.env.MINIO_PUBLIC_URL ||
    process.env.NEXT_PUBLIC_STORAGE_URL ||
    "";

  const useSSL =
    process.env.MINIO_USE_SSL !== undefined
      ? process.env.MINIO_USE_SSL === "true"
      : endpoint.startsWith("https://");

  const isConfigured = Boolean(endpoint && accessKey && secretKey);

  return {
    endpoint,
    accessKey,
    secretKey,
    bucketName,
    region,
    publicUrl,
    useSSL,
    isConfigured,
  };
};

let cachedClient: S3Client | null = null;

export const getStorageClient = (): S3Client => {
  if (cachedClient) return cachedClient;

  const config = getStorageConfig();
  if (!config.isConfigured) {
    throw new Error(
      "MinIO / S3 Storage is not configured. Please set MINIO_ENDPOINT, MINIO_ACCESS_KEY, MINIO_SECRET_KEY, and MINIO_BUCKET_NAME in your environment variables."
    );
  }

  // Format endpoint URL properly
  let endpointUrl = config.endpoint;
  if (!endpointUrl.startsWith("http://") && !endpointUrl.startsWith("https://")) {
    endpointUrl = `${config.useSSL ? "https" : "http"}://${endpointUrl}`;
  }

  cachedClient = new S3Client({
    endpoint: endpointUrl,
    region: config.region,
    credentials: {
      accessKeyId: config.accessKey,
      secretAccessKey: config.secretKey,
    },
    forcePathStyle: true, // Necessary for MinIO and path-style S3 buckets
  });

  return cachedClient;
};

export interface UploadOptions {
  buffer: Buffer;
  fileName: string;
  contentType: string;
  folder?: string;
}

export interface UploadResult {
  url: string;
  key: string;
  bucket: string;
  size: number;
}

/**
 * Upload a file to MinIO / S3 storage
 */
export async function uploadToStorage(options: UploadOptions): Promise<UploadResult> {
  const config = getStorageConfig();
  const s3 = getStorageClient();

  const { buffer, fileName, contentType, folder = "uploads" } = options;

  // Clean filename: remove special characters, keep extension
  const ext = fileName.includes(".") ? fileName.substring(fileName.lastIndexOf(".")) : "";
  const nameWithoutExt = fileName.replace(ext, "").toLowerCase().replace(/[^a-z0-9_-]/g, "-");
  const timestamp = Date.now();
  const randomSuffix = Math.random().toString(36).substring(2, 7);
  const cleanKey = `${folder}/${nameWithoutExt}-${timestamp}-${randomSuffix}${ext}`.replace(/\/+/g, "/");

  const command = new PutObjectCommand({
    Bucket: config.bucketName,
    Key: cleanKey,
    Body: buffer,
    ContentType: contentType,
    ACL: "public-read",
    // Add cache control for optimized image delivery
    CacheControl: "public, max-age=31536000, immutable",
  });

  await s3.send(command);

  // Construct public URL
  let fileUrl = "";
  if (config.publicUrl) {
    const baseUrl = config.publicUrl.replace(/\/+$/, "");
    fileUrl = `${baseUrl}/${cleanKey}`;
  } else {
    // Standard MinIO path-style URL: endpoint/bucketName/key
    const endpoint = config.endpoint.replace(/\/+$/, "");
    const formattedEndpoint =
      endpoint.startsWith("http://") || endpoint.startsWith("https://")
        ? endpoint
        : `${config.useSSL ? "https" : "http"}://${endpoint}`;
    fileUrl = `${formattedEndpoint}/${config.bucketName}/${cleanKey}`;
  }

  return {
    url: fileUrl,
    key: cleanKey,
    bucket: config.bucketName,
    size: buffer.length,
  };
}

/**
 * Delete a file from MinIO / S3 storage by key
 */
export async function deleteFromStorage(key: string): Promise<boolean> {
  try {
    const config = getStorageConfig();
    const s3 = getStorageClient();

    const command = new DeleteObjectCommand({
      Bucket: config.bucketName,
      Key: key,
    });

    await s3.send(command);
    return true;
  } catch (error) {
    console.error("Error deleting file from storage:", error);
    return false;
  }
}
