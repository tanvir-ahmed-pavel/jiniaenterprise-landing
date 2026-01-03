"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { sampleVehicles } from "@/lib/config";
import { Plus, Pencil, Trash2, Car, Users } from "lucide-react";

export default function VehiclesListPage() {
  const [vehicles, setVehicles] = useState(sampleVehicles);

  const handleDelete = (slug: string) => {
    if (confirm("Are you sure you want to delete this vehicle?")) {
      setVehicles(vehicles.filter((v) => v.slug !== slug));
      // TODO: Delete from Supabase
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {vehicles.map((vehicle) => (
          <Card key={vehicle.slug} className="overflow-hidden">
            <div className="aspect-video bg-gray-100 relative">
              {vehicle.image_url ? (
                <img
                  src={vehicle.image_url}
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
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg">{vehicle.name}</h3>
              <p className="text-sm text-muted-foreground mb-3">
                {vehicle.seats} seats • {vehicle.rental_types?.join(", ")}
              </p>
              <div className="flex gap-2">
                <Link
                  href={`/admin/vehicles/${vehicle.slug}/edit`}
                  className="flex-1"
                >
                  <Button variant="outline" size="sm" className="w-full gap-1">
                    <Pencil className="h-3 w-3" /> Edit
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:bg-red-50"
                  onClick={() => handleDelete(vehicle.slug)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {vehicles.length === 0 && (
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
