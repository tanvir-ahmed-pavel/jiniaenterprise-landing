import { NextResponse } from "next/server";
import { uploadToStorage, deleteFromStorage, getStorageConfig } from "@/lib/storage/minio";

// Allowed MIME types for image uploads
const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/avif",
  "image/svg+xml",
  "image/gif",
];

// Max file size: 12MB
const MAX_FILE_SIZE = 12 * 1024 * 1024;

/**
 * GET /api/admin/upload
 * Returns storage configuration status (without exposing secrets)
 */
export async function GET() {
  try {
    const config = getStorageConfig();
    return NextResponse.json({
      isConfigured: config.isConfigured,
      bucket: config.bucketName,
      endpoint: config.endpoint ? config.endpoint.replace(/\/\/.*@/, "//") : null,
      publicUrl: config.publicUrl || null,
      region: config.region,
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Failed to load config";
    return NextResponse.json(
      { isConfigured: false, error: errorMsg },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/upload
 * Handles multipart/form-data file upload to MinIO/S3
 */
export async function POST(req: Request) {
  try {
    const config = getStorageConfig();
    if (!config.isConfigured) {
      return NextResponse.json(
        {
          success: false,
          error:
            "MinIO / S3 storage is not configured yet. Please configure MINIO_ENDPOINT, MINIO_ACCESS_KEY, MINIO_SECRET_KEY, and MINIO_BUCKET_NAME in .env",
          code: "NOT_CONFIGURED",
        },
        { status: 400 }
      );
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) || "vehicles";

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file provided" },
        { status: 400 }
      );
    }

    // Validate MIME type
    if (!ALLOWED_MIME_TYPES.includes(file.type.toLowerCase())) {
      return NextResponse.json(
        {
          success: false,
          error: `Unsupported file format: ${file.type}. Allowed formats: JPEG, PNG, WebP, AVIF, SVG, GIF.`,
        },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          success: false,
          error: `File size exceeds ${(MAX_FILE_SIZE / (1024 * 1024)).toFixed(0)}MB limit.`,
        },
        { status: 400 }
      );
    }

    // Convert file to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to MinIO/S3
    const result = await uploadToStorage({
      buffer,
      fileName: file.name,
      contentType: file.type,
      folder: folder.replace(/[^a-z0-9_-]/gi, ""),
    });

    return NextResponse.json({
      success: true,
      url: result.url,
      key: result.key,
      size: result.size,
      bucket: result.bucket,
    });
  } catch (error: unknown) {
    console.error("Upload error:", error);
    const errorMsg = error instanceof Error ? error.message : "Failed to upload file to storage.";
    return NextResponse.json(
      {
        success: false,
        error: errorMsg,
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/upload
 * Delete one or more uploaded objects by key or URL
 */
export async function DELETE(req: Request) {
  try {
    const config = getStorageConfig();
    if (!config.isConfigured) {
      return NextResponse.json(
        { success: false, error: "Storage is not configured." },
        { status: 400 }
      );
    }

    const body = await req.json();
    const targetItems: string[] = [];

    if (body.key) targetItems.push(body.key);
    if (body.url) targetItems.push(body.url);
    if (Array.isArray(body.keys)) targetItems.push(...body.keys);
    if (Array.isArray(body.urls)) targetItems.push(...body.urls);

    if (targetItems.length === 0) {
      return NextResponse.json(
        { success: false, error: "Object key or URL is required" },
        { status: 400 }
      );
    }

    // Helper to extract S3 key from URL or raw key
    const extractKey = (item: string): string => {
      const cleaned = item.trim();
      // If it's a full URL
      if (cleaned.startsWith("http://") || cleaned.startsWith("https://")) {
        try {
          const parsed = new URL(cleaned);
          const pathname = decodeURIComponent(parsed.pathname).replace(/^\/+/, "");

          // Remove bucket name prefix if present in path (e.g., 'jinia-enterprise/vehicles/...')
          if (config.bucketName && pathname.startsWith(`${config.bucketName}/`)) {
            return pathname.substring(config.bucketName.length + 1);
          }
          return pathname;
        } catch {
          // Fallback regex
          const match = cleaned.match(/(vehicles|blog|fleet|uploads)\/[^?#]+/i);
          if (match) return match[0];
        }
      }
      return cleaned;
    };

    const deletePromises = targetItems.map(async (item) => {
      const key = extractKey(item);
      if (!key) return false;
      return await deleteFromStorage(key);
    });

    const results = await Promise.all(deletePromises);
    const allSuccess = results.every(Boolean);

    return NextResponse.json({
      success: allSuccess,
      deletedCount: results.filter(Boolean).length,
    });
  } catch (error: unknown) {
    console.error("Delete error:", error);
    const errorMsg = error instanceof Error ? error.message : "Failed to delete file.";
    return NextResponse.json(
      { success: false, error: errorMsg },
      { status: 500 }
    );
  }
}
