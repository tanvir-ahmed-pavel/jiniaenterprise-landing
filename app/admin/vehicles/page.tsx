"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/client";
import { Plus, Pencil, Trash2, Car, Users, Loader2 } from "lucide-react";

interface Vehicle {
  id: string;
  name: string;
  slug: string;
  category: "Economy" | "Luxury" | "Bus";
  seats: number;
  engine_cc?: number | null;
  rental_types?: string[];
  image_url?: string | null;
  images?: string[];
  starting_price?: number | null;
  is_active: boolean;
}

export default function VehiclesListPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    setIsLoading(true);
    const supabase = createClient();
    const { data, error } = await supabase
      .from("vehicles")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching vehicles:", error);
    } else {
      setVehicles((data as Vehicle[]) || []);
    }
    setIsLoading(false);
  };

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

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Luxury":
        return "bg-amber-500";
      case "Economy":
        return "bg-green-500";
      case "Bus":
        return "bg-blue-500";
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
    <div className="p-6">
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
                <Car className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {vehicles.filter((v) => v.category === "Luxury").length}
                </p>
                <p className="text-sm text-muted-foreground">Luxury</p>
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
                  {vehicles.filter((v) => v.category === "Economy").length}
                </p>
                <p className="text-sm text-muted-foreground">Economy</p>
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
                  {vehicles.filter((v) => v.category === "Bus").length}
                </p>
                <p className="text-sm text-muted-foreground">Buses</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Vehicles Grid */}
      {vehicles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {vehicles.map((vehicle) => (
            <Card key={vehicle.id} className="overflow-hidden">
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
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg">{vehicle.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {vehicle.seats} seats
                  {vehicle.engine_cc && ` • ${vehicle.engine_cc} CC`}
                  {vehicle.starting_price &&
                    ` • ৳${vehicle.starting_price.toLocaleString()}/day`}
                </p>
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
                    className="text-red-600 hover:bg-red-50"
                    onClick={() => handleDelete(vehicle.id)}
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
