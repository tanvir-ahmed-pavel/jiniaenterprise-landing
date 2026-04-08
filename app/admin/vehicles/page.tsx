"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/client";
import { Plus, Pencil, Trash2, Car, Users, Loader2, Copy, Star, Eye, EyeOff, Hash } from "lucide-react";

interface Vehicle {
  id: string;
  name: string;
  slug: string;
  category: "Economy" | "Standard" | "Premium" | "SUV" | "Microbus" | "Bus";
  seats: number;
  engine_cc?: number | null;
  rental_types?: string[];
  image_url?: string | null;
  images?: string[];
  starting_price?: number | null;
  is_active: boolean;
  sort_order: number;
  is_featured: boolean;
}

export default function VehiclesListPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchVehicles() {
    setIsLoading(true);
    const supabase = createClient();
    const { data, error } = await supabase
      .from("vehicles")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) {
      console.error("Error fetching vehicles:", error);
    } else {
      setVehicles((data as Vehicle[]) || []);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchVehicles();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this vehicle?")) return;

    const supabase = createClient();
    const { error } = await supabase.from("vehicles").delete().eq("id", id);

    if (error) {
      console.error("Error deleting vehicle:", error);
      alert("Failed to delete vehicle");
    } else {
      setVehicles(vehicles.filter((v) => v.id !== id));
    }
  };

  const handleClone = async (vehicle: Vehicle) => {
    if (!confirm("Are you sure you want to clone this vehicle?")) return;
    
    setIsLoading(true);
    const supabase = createClient();
    
    // Fetch full vehicle details
    const { data: fullVehicleData, error: fetchError } = await supabase
      .from("vehicles")
      .select("*")
      .eq("id", vehicle.id)
      .single();

    const fullVehicle = fullVehicleData as any;

    if (fetchError || !fullVehicle) {
      console.error("Error fetching full vehicle details:", fetchError);
      alert("Failed to fetch vehicle details for cloning.");
      setIsLoading(false);
      return;
    }

    const newName = `${fullVehicle.name} (Copy)`;
    const baseSlug = newName.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    const slug = `${baseSlug}-${Math.random().toString(36).substring(2, 7)}`;
    
    const clonedData = { ...fullVehicle };
    delete clonedData.id;
    delete clonedData.created_at;
    delete clonedData.updated_at;
    clonedData.name = newName;
    clonedData.slug = slug;
    clonedData.is_active = false; // Set to inactive by default so they can review it

    const { data: newVehicle, error: createError } = await supabase
      .from("vehicles")
      .insert(clonedData)
      .select()
      .single();

    if (createError) {
      console.error("Error cloning vehicle:", createError);
      alert("Failed to clone vehicle");
    } else if (newVehicle) {
      setVehicles([newVehicle as Vehicle, ...vehicles]);
      alert("Vehicle cloned successfully! The clone is inactive by default.");
    }
    setIsLoading(false);
  };

  const handleToggleFeatured = async (vehicle: Vehicle) => {
    const supabase = createClient();
    const newValue = !vehicle.is_featured;
    const { error } = await supabase
      .from("vehicles")
      .update({ is_featured: newValue } as never)
      .eq("id", vehicle.id);
    if (!error) {
      setVehicles(vehicles.map((v) =>
        v.id === vehicle.id ? { ...v, is_featured: newValue } : v
      ));
    }
  };

  const handleToggleActive = async (vehicle: Vehicle) => {
    const supabase = createClient();
    const newValue = !vehicle.is_active;
    const { error } = await supabase
      .from("vehicles")
      .update({ is_active: newValue } as never)
      .eq("id", vehicle.id);
    if (!error) {
      setVehicles(vehicles.map((v) =>
        v.id === vehicle.id ? { ...v, is_active: newValue } : v
      ));
    }
  };

  const handleUpdatePosition = async (vehicle: Vehicle, newPosition: number) => {
    const supabase = createClient();
    const { error } = await supabase
      .from("vehicles")
      .update({ sort_order: newPosition } as never)
      .eq("id", vehicle.id);
    if (!error) {
      setVehicles(
        vehicles
          .map((v) => (v.id === vehicle.id ? { ...v, sort_order: newPosition } : v))
          .sort((a, b) => a.sort_order - b.sort_order)
      );
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Premium":
        return "bg-amber-500";
      case "Economy":
        return "bg-green-500";
      case "Standard":
        return "bg-blue-500";
      case "SUV":
        return "bg-purple-500";
      case "Microbus":
        return "bg-teal-500";
      case "Bus":
        return "bg-indigo-500";
      default:
        return "bg-gray-500";
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-green-600" />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Vehicle Management</h1>
          <p className="text-muted-foreground">Manage your vehicle fleet</p>
        </div>
        <Link href="/admin/vehicles/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" /> Add Vehicle
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Car className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{vehicles.length}</p>
                <p className="text-sm text-muted-foreground">Total Vehicles</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-amber-100 rounded-lg">
                <Star className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {vehicles.filter((v) => v.is_featured).length}
                </p>
                <p className="text-sm text-muted-foreground">Featured</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Car className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {vehicles.filter((v) => v.is_active).length}
                </p>
                <p className="text-sm text-muted-foreground">Active</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {vehicles.filter((v) => !v.is_active).length}
                </p>
                <p className="text-sm text-muted-foreground">Inactive</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Vehicles Grid */}
      {vehicles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {vehicles.map((vehicle) => (
            <Card key={vehicle.id} className="overflow-hidden hover:transform-none! hover:shadow-(--glass-shadow) hover:bg-(--glass-bg)! transition-none">
              <div className="aspect-video bg-gray-100 relative">
                {vehicle.images?.[0] || vehicle.image_url ? (
                  <img
                    src={vehicle.images?.[0] || vehicle.image_url || ""}
                    alt={vehicle.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Car className="h-16 w-16 text-gray-300" />
                  </div>
                )}
                <Badge
                  className={`absolute top-2 right-2 ${getCategoryColor(
                    vehicle.category
                  )}`}
                >
                  {vehicle.category}
                </Badge>
                {!vehicle.is_active && (
                  <Badge className="absolute top-2 left-2 bg-red-500">
                    Inactive
                  </Badge>
                )}
                {vehicle.is_featured && (
                  <Badge className="absolute bottom-2 left-2 bg-amber-500 gap-1">
                    <Star className="h-3 w-3" /> Featured
                  </Badge>
                )}
              </div>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-lg truncate">{vehicle.name}</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  {vehicle.seats} seats
                  {vehicle.engine_cc && ` • ${vehicle.engine_cc} CC`}
                  {vehicle.starting_price &&
                    ` • ৳${vehicle.starting_price.toLocaleString()}/day`}
                </p>

                {/* Quick Edit Row */}
                <div className="flex items-center gap-2 mb-3 p-2 bg-gray-50 rounded-lg border border-gray-100">
                  {/* Featured Toggle */}
                  <button
                    onClick={() => handleToggleFeatured(vehicle)}
                    title={vehicle.is_featured ? "Remove from Featured" : "Mark as Featured"}
                    className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium transition-all ${
                      vehicle.is_featured
                        ? "bg-amber-100 text-amber-700 hover:bg-amber-200"
                        : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                    }`}
                  >
                    <Star className={`h-3 w-3 ${vehicle.is_featured ? "fill-amber-500 text-amber-500" : ""}`} />
                    Featured
                  </button>

                  {/* Active Toggle */}
                  <button
                    onClick={() => handleToggleActive(vehicle)}
                    title={vehicle.is_active ? "Deactivate" : "Activate"}
                    className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium transition-all ${
                      vehicle.is_active
                        ? "bg-green-100 text-green-700 hover:bg-green-200"
                        : "bg-red-100 text-red-600 hover:bg-red-200"
                    }`}
                  >
                    {vehicle.is_active
                      ? <><Eye className="h-3 w-3" /> Visible</>
                      : <><EyeOff className="h-3 w-3" /> Hidden</>
                    }
                  </button>

                  {/* Position Input */}
                  <div className="ml-auto flex items-center gap-1">
                    <Hash className="h-3 w-3 text-gray-400" />
                    <input
                      type="number"
                      min="1"
                      defaultValue={vehicle.sort_order}
                      className="w-14 text-xs text-center border border-gray-200 rounded-md px-1 py-1 bg-white focus:outline-none focus:ring-1 focus:ring-green-400"
                      onBlur={(e) => {
                        const val = parseInt(e.target.value);
                        if (!isNaN(val) && val !== vehicle.sort_order) {
                          handleUpdatePosition(vehicle, val);
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") (e.target as HTMLInputElement).blur();
                      }}
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Link
                    href={`/admin/vehicles/${vehicle.id}/edit`}
                    className="flex-1"
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full gap-1"
                    >
                      <Pencil className="h-3 w-3" /> Edit
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-blue-600 hover:bg-blue-50"
                    onClick={() => handleClone(vehicle)}
                    title="Clone Vehicle"
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:bg-red-50"
                    onClick={() => handleDelete(vehicle.id)}
                    title="Delete Vehicle"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-12 text-center">
          <Car className="h-16 w-16 mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Vehicles Yet</h3>
          <p className="text-muted-foreground mb-4">
            Add your first vehicle to get started
          </p>
          <Link href="/admin/vehicles/new">
            <Button>Add Vehicle</Button>
          </Link>
        </Card>
      )}
    </div>
  );
}
