"use client";

import { useState, useRef, useEffect, DragEvent, ChangeEvent } from "react";
import {
  UploadCloud,
  Image as ImageIcon,
  X,
  Star,
  ArrowLeft,
  ArrowRight,
  Copy,
  Check,
  Link as LinkIcon,
  AlertCircle,
  Loader2,
  Plus,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ImageUploaderProps {
  value?: string | string[];
  onChange: (value: string | string[]) => void;
  multiple?: boolean;
  maxFiles?: number;
  folder?: "vehicles" | "blog" | "general" | "clients";
  label?: string;
  helperText?: string;
}

export function ImageUploader({
  value,
  onChange,
  multiple = false,
  maxFiles = 8,
  folder = "vehicles",
  label,
  helperText,
}: ImageUploaderProps) {
  // Normalize value into an array of non-empty strings
  const imageList: string[] = Array.isArray(value)
    ? value.filter((v) => typeof v === "string" && v.trim() !== "")
    : typeof value === "string" && value.trim() !== ""
    ? [value.trim()]
    : [];

  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [showManualUrl, setShowManualUrl] = useState(false);
  const [manualUrlInput, setManualUrlInput] = useState("");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [storageStatus, setStorageStatus] = useState<{
    isConfigured: boolean;
    bucket?: string;
  } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Check if MinIO storage is configured
  useEffect(() => {
    async function checkStorage() {
      try {
        const res = await fetch("/api/admin/upload");
        if (res.ok) {
          const data = await res.json();
          setStorageStatus({
            isConfigured: Boolean(data.isConfigured),
            bucket: data.bucket,
          });
        } else {
          setStorageStatus({ isConfigured: false });
        }
      } catch {
        setStorageStatus({ isConfigured: false });
      }
    }
    checkStorage();
  }, []);

  const updateImages = (newImages: string[]) => {
    if (multiple) {
      onChange(newImages);
    } else {
      onChange(newImages[0] || "");
    }
  };

  const uploadFile = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);

    const res = await fetch("/api/admin/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.error || "Failed to upload image");
    }

    return data.url;
  };

  const handleFiles = async (files: FileList | File[]) => {
    const fileArray = Array.from(files).filter((file) =>
      file.type.startsWith("image/")
    );

    if (fileArray.length === 0) {
      setUploadError("Please select valid image files (JPEG, PNG, WebP, etc.).");
      return;
    }

    if (multiple && imageList.length + fileArray.length > maxFiles) {
      setUploadError(`You can upload a maximum of ${maxFiles} images.`);
      return;
    }

    setIsUploading(true);
    setUploadError(null);

    try {
      const uploadedUrls: string[] = [];
      for (const file of fileArray) {
        const url = await uploadFile(file);
        if (url) uploadedUrls.push(url);
        if (!multiple) break; // In single mode, take only the first one
      }

      if (uploadedUrls.length > 0) {
        if (multiple) {
          updateImages([...imageList, ...uploadedUrls]);
        } else {
          updateImages([uploadedUrls[0]]);
        }
      }
    } catch (err: unknown) {
      console.error("Upload error:", err);
      const errorMessage = err instanceof Error ? err.message : "An error occurred during upload. Please check MinIO settings or try direct URL.";
      setUploadError(errorMessage);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const handleRemoveImage = async (indexToRemove: number) => {
    const targetUrl = imageList[indexToRemove];
    const next = imageList.filter((_, idx) => idx !== indexToRemove);
    updateImages(next);

    // If it's an uploaded file from MinIO / S3, delete the object in the background
    if (targetUrl) {
      try {
        await fetch("/api/admin/upload", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: targetUrl }),
        });
      } catch (err) {
        console.warn("Failed to delete object from storage:", err);
      }
    }
  };

  const handleSetPrimary = (index: number) => {
    if (index === 0 || index >= imageList.length) return;
    const target = imageList[index];
    const rest = imageList.filter((_, idx) => idx !== index);
    updateImages([target, ...rest]);
  };

  const handleMove = (index: number, direction: "left" | "right") => {
    const targetIndex = direction === "left" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= imageList.length) return;

    const newArr = [...imageList];
    const temp = newArr[index];
    newArr[index] = newArr[targetIndex];
    newArr[targetIndex] = temp;
    updateImages(newArr);
  };

  const handleAddManualUrl = () => {
    const trimmed = manualUrlInput.trim();
    if (!trimmed) return;

    if (multiple) {
      if (imageList.length >= maxFiles) {
        setUploadError(`Maximum of ${maxFiles} images allowed.`);
        return;
      }
      updateImages([...imageList, trimmed]);
    } else {
      updateImages([trimmed]);
    }

    setManualUrlInput("");
    setUploadError(null);
  };

  const handleCopyUrl = (url: string, index: number) => {
    navigator.clipboard.writeText(url);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Header Info */}
      <div className="flex items-center justify-between">
        <div>
          {label && (
            <label className="block text-sm font-semibold text-gray-900">
              {label}
            </label>
          )}
          {helperText && (
            <p className="text-xs text-muted-foreground mt-0.5">{helperText}</p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setShowManualUrl(!showManualUrl)}
            className="text-xs text-muted-foreground hover:text-gray-900"
          >
            <LinkIcon className="h-3.5 w-3.5 mr-1" />
            {showManualUrl ? "Hide URL Input" : "Add by URL"}
          </Button>
        </div>
      </div>

      {/* Storage Not Configured Info Banner */}
      {storageStatus && !storageStatus.isConfigured && (
        <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-800 flex items-start gap-2">
          <AlertCircle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold">MinIO / S3 Storage Not Configured</p>
            <p className="text-amber-700 leading-relaxed">
              To enable 1-click drag & drop uploads to your MinIO project, add{" "}
              <code className="bg-amber-100 px-1 py-0.5 rounded font-mono">
                MINIO_ENDPOINT
              </code>
              ,{" "}
              <code className="bg-amber-100 px-1 py-0.5 rounded font-mono">
                MINIO_ACCESS_KEY
              </code>
              , and{" "}
              <code className="bg-amber-100 px-1 py-0.5 rounded font-mono">
                MINIO_SECRET_KEY
              </code>{" "}
              to your <code className="font-mono">.env</code> file. In the meantime, you can still paste image URLs directly below!
            </p>
          </div>
        </div>
      )}

      {/* Manual URL Input Form */}
      {showManualUrl && (
        <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl space-y-2 animate-in fade-in duration-200">
          <label className="text-xs font-medium text-gray-700">
            Paste Direct Image URL
          </label>
          <div className="flex gap-2">
            <Input
              type="url"
              value={manualUrlInput}
              onChange={(e) => setManualUrlInput(e.target.value)}
              placeholder="https://images.unsplash.com/... or https://minio.domain/..."
              className="text-xs bg-white"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddManualUrl();
                }
              }}
            />
            <Button
              type="button"
              size="sm"
              onClick={handleAddManualUrl}
              disabled={!manualUrlInput.trim()}
              className="bg-emerald-600 hover:bg-emerald-700 text-white shrink-0 text-xs"
            >
              <Plus className="h-3.5 w-3.5 mr-1" /> Add
            </Button>
          </div>
        </div>
      )}

      {/* Drag & Drop Upload Zone */}
      {(!multiple && imageList.length === 0) ||
      (multiple && imageList.length < maxFiles) ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-2xl p-6 transition-all duration-200 text-center cursor-pointer group flex flex-col items-center justify-center ${
            isDragging
              ? "border-emerald-500 bg-emerald-50/50 scale-[0.99]"
              : "border-gray-300 hover:border-emerald-500 hover:bg-gray-50/80 bg-white"
          } ${isUploading ? "pointer-events-none opacity-60" : ""}`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif,image/gif,image/svg+xml"
            multiple={multiple}
            onChange={handleFileInputChange}
            className="hidden"
          />

          {isUploading ? (
            <div className="py-4 flex flex-col items-center gap-2 text-emerald-700">
              <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
              <p className="text-sm font-medium">Uploading to MinIO / S3...</p>
              <p className="text-xs text-muted-foreground">Optimizing and storing object</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 py-2">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 group-hover:scale-110 group-hover:bg-emerald-100 transition-all duration-200">
                <UploadCloud className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">
                  <span className="text-emerald-700 underline underline-offset-2">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  WebP, PNG, JPG, AVIF or SVG (Max 12MB)
                  {multiple && ` • Up to ${maxFiles} photos`}
                </p>
              </div>
            </div>
          )}
        </div>
      ) : null}

      {/* Upload Error Banner */}
      {uploadError && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{uploadError}</span>
          </div>
          <button
            type="button"
            onClick={() => setUploadError(null)}
            className="text-red-500 hover:text-red-700"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Gallery / Image Preview Grid */}
      {imageList.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>
              {imageList.length} {imageList.length === 1 ? "image" : "images"} attached
              {multiple && ` (max ${maxFiles})`}
            </span>
            {multiple && imageList.length > 1 && (
              <span>First image is the primary cover</span>
            )}
          </div>

          <div
            className={`grid gap-4 ${
              multiple
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1 max-w-md"
            }`}
          >
            {imageList.map((url, index) => {
              const isPrimary = index === 0;
              return (
                <div
                  key={`${url}-${index}`}
                  className="group relative bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden transition-all duration-200 hover:shadow-md hover:border-gray-300"
                >
                  {/* Image Preview Box */}
                  <div className="aspect-16/10 bg-gray-100 relative overflow-hidden flex items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={url}
                      alt={`Vehicle image ${index + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        // Fallback placeholder on broken link
                        (e.target as HTMLElement).style.display = "none";
                      }}
                    />

                    {/* Primary Badge */}
                    {isPrimary && (
                      <div className="absolute top-2 left-2 bg-emerald-600 text-white text-[11px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                        <Star className="h-3 w-3 fill-white" /> Primary Cover
                      </div>
                    )}

                    {/* Hover Overlay Actions */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2 p-2">
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 bg-white/90 hover:bg-white text-gray-800 rounded-lg shadow-sm transition-transform hover:scale-110"
                        title="View Full Image"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopyUrl(url, index);
                        }}
                        className="p-1.5 bg-white/90 hover:bg-white text-gray-800 rounded-lg shadow-sm transition-transform hover:scale-110"
                        title="Copy Image URL"
                      >
                        {copiedIndex === index ? (
                          <Check className="h-4 w-4 text-emerald-600" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveImage(index);
                        }}
                        className="p-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-sm transition-transform hover:scale-110"
                        title="Remove Image"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Bottom Controls Strip */}
                  <div className="p-2.5 bg-white flex items-center justify-between text-xs gap-2 border-t border-gray-100">
                    <p className="truncate text-gray-500 font-mono text-[11px] flex-1" title={url}>
                      {url.split("/").pop()}
                    </p>

                    {multiple && (
                      <div className="flex items-center gap-1 shrink-0">
                        {/* Reorder Left */}
                        <button
                          type="button"
                          disabled={index === 0}
                          onClick={() => handleMove(index, "left")}
                          className="p-1 rounded hover:bg-gray-100 text-gray-600 disabled:opacity-30 disabled:hover:bg-transparent"
                          title="Move Left"
                        >
                          <ArrowLeft className="h-3.5 w-3.5" />
                        </button>

                        {/* Set Primary if not primary */}
                        {!isPrimary && (
                          <button
                            type="button"
                            onClick={() => handleSetPrimary(index)}
                            className="px-1.5 py-0.5 rounded text-[10px] font-medium text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200"
                            title="Make Primary"
                          >
                            Set Cover
                          </button>
                        )}

                        {/* Reorder Right */}
                        <button
                          type="button"
                          disabled={index === imageList.length - 1}
                          onClick={() => handleMove(index, "right")}
                          className="p-1 rounded hover:bg-gray-100 text-gray-600 disabled:opacity-30 disabled:hover:bg-transparent"
                          title="Move Right"
                        >
                          <ArrowRight className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
