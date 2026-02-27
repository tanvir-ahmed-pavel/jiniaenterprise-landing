"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ArrowLeft, Loader2, Plus, X } from "lucide-react";
import { vehicleService } from "@/lib/supabase/admin-service";

export default function AddVehiclePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [features, setFeatures] = useState<string[]>([""]);

  const handleAddFeature = () => {
    setFeatures([...features, ""]);
  };

  const handleRemoveFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    setFeatures(newFeatures);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const imageUrl = (formData.get("image_url") as string) || null;

    // Create base slug from name
    const rawName = formData.get("name") as string;
    const baseSlug = rawName
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
    // Add random suffix to ensure uniqueness
    const slug = `${baseSlug}-${Math.random().toString(36).substring(2, 7)}`;

    const vehicleData = {
      name: rawName,
      slug: slug,
      category: formData.get("category") as "Economy" | "Luxury" | "Bus",
      seats: parseInt(formData.get("seats") as string),
      engine_cc: formData.get("engine_cc")
        ? parseInt(formData.get("engine_cc") as string)
        : null,
      starting_price: formData.get("starting_price")
        ? parseFloat(formData.get("starting_price") as string)
        : null,
      price_label: (formData.get("price_label") as string) || "per day",
      description: formData.get("description") as string,
      features: features.filter((f) => f.trim() !== ""),
      rental_types: (formData.get("rental_types") as string)
        .split(",")
        .map((t) => t.trim()),
      is_active: formData.get("is_active") === "on",
      image_url: imageUrl,
      images: imageUrl ? [imageUrl] : [],
    };

    try {
      await vehicleService.create(vehicleData);
      alert("Vehicle created successfully!");
      router.push("/admin/vehicles"); // Redirect to vehicles list
    } catch (error) {
      console.error("Failed to create vehicle:", error);
      alert("Failed to create vehicle. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted/20">
      <header className="bg-primary text-primary-foreground py-4">
        <div className="container flex items-center gap-4">
          <Link href="/admin/vehicles">
            <Button variant="secondary" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back
            </Button>
          </Link>
          <div>
            <h1 className="text-xl font-bold">Add New Vehicle</h1>
            <p className="text-sm opacity-80">Add a vehicle to your fleet</p>
          </div>
        </div>
      </header>

      <div className="container py-8">
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle>Vehicle Details</CardTitle>
            <CardDescription>
              Fill in the details for the new vehicle
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Vehicle Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="e.g., Toyota Corolla"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <select
                    id="category"
                    name="category"
                    className="w-full h-10 px-3 rounded-md border border-input bg-background"
                    required
                  >
                    <option value="Economy">Economy</option>
                    <option value="Luxury">Luxury</option>
                    <option value="Bus">Bus</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="seats">Number of Seats *</Label>
                  <Input
                    id="seats"
                    name="seats"
                    type="number"
                    min="1"
                    max="60"
                    placeholder="5"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="engine_cc">Engine CC</Label>
                  <Input
                    id="engine_cc"
                    name="engine_cc"
                    type="number"
                    placeholder="e.g. 1500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="starting_price">Starting Price (BDT)</Label>
                  <Input
                    id="starting_price"
                    name="starting_price"
                    type="number"
                    placeholder="e.g. 3000"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="rental_types">Rental Types</Label>
                  <Input
                    id="rental_types"
                    name="rental_types"
                    placeholder="Daily, Weekly, Monthly"
                    defaultValue="Daily, Weekly"
                  />
                  <p className="text-xs text-muted-foreground">
                    Comma-separated values
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price_label">Price Label</Label>
                  <Input
                    id="price_label"
                    name="price_label"
                    placeholder="e.g. per day"
                    defaultValue="per day"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  className="w-full px-3 py-2 rounded-md border border-input bg-background resize-none"
                  placeholder="Describe the vehicle..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image_url">Image URL</Label>
                <Input
                  id="image_url"
                  name="image_url"
                  placeholder="/vehicles/vehicle-name.jpg or https://..."
                />
                <p className="text-xs text-muted-foreground">
                  Path to vehicle image (URL or local path)
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Features</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleAddFeature}
                  >
                    <Plus className="h-4 w-4 mr-1" /> Add Feature
                  </Button>
                </div>
                <div className="space-y-2">
                  {features.map((feature, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={feature}
                        onChange={(e) =>
                          handleFeatureChange(index, e.target.value)
                        }
                        placeholder="e.g., Air Conditioning"
                      />
                      {features.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveFeature(index)}
                          className="text-red-500"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="is_active"
                  name="is_active"
                  defaultChecked
                  className="h-4 w-4"
                />
                <Label htmlFor="is_active">Active (visible on website)</Label>
              </div>

              <div className="flex gap-4">
                <Button type="submit" className="flex-1" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Vehicle"
                  )}
                </Button>
                <Link href="/admin/vehicles">
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
