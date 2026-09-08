"use client";

import { useState } from "react";

const updates = [
  {
    vehicleId: "32966b9e-9c0f-4c14-a383-b918ec554fa5",
    files: ["images/vehicles/variants/hyundai-h1-2019-20-front.png", "images/vehicles/variants/hyundai-h1-2019-20-side.png", "images/vehicles/variants/hyundai-h1-2019-20-rear.png"],
  },
  { vehicleId: "7779b03f-c96c-4fb8-88e7-078ad00f8f38", files: ["images/vehicles/variants/toyota-alphard-2017-19-front.png", "images/vehicles/variants/toyota-alphard-2017-19-side.png", "images/vehicles/variants/toyota-alphard-2017-19-rear.png"] },
  { vehicleId: "c098f8b4-6e6b-4b3d-a1c1-bb630f5b301c", files: ["images/vehicles/variants/toyota-land-cruiser-prado-2016-20-front.png", "images/vehicles/variants/toyota-land-cruiser-prado-2016-20-side.png", "images/vehicles/variants/toyota-land-cruiser-prado-2016-20-rear.png"] },
  { vehicleId: "f3687e2f-faef-4894-90d7-85b2a2f94b71", files: ["images/vehicles/variants/toyota-land-cruiser-prado-2012-15-front.png", "images/vehicles/variants/toyota-land-cruiser-prado-2012-15-side.png", "images/vehicles/variants/toyota-land-cruiser-prado-2012-15-rear.png"] },
  { vehicleId: "8cdee46f-6c58-4c9b-92f3-6966d92b961b", files: ["images/vehicles/variants/hyundai-h1-2017-18-front.png", "images/vehicles/variants/hyundai-h1-2017-18-side.png", "images/vehicles/variants/hyundai-h1-2017-18-rear.png"] },
  { vehicleId: "6d238d4f-e267-4773-8a59-0311af57d5c7", files: ["images/vehicles/variants/nissan-x-trail-2017-front.png", "images/vehicles/variants/nissan-x-trail-2017-side.png", "images/vehicles/variants/nissan-x-trail-2017-rear.png"] },
  { vehicleId: "1636de9d-532a-4798-8be3-d12e0233c2bf", files: ["images/vehicles/variants/toyota-f-premio-2012-15-front.png", "images/vehicles/variants/toyota-f-premio-2012-15-side.png", "images/vehicles/variants/toyota-f-premio-2012-15-rear.png"] },
  { vehicleId: "7d92100c-6d9a-4499-936e-49625b35770f", files: ["images/vehicles/variants/toyota-x-noah-2015-18-front.png", "images/vehicles/variants/toyota-x-noah-2015-18-side.png", "images/vehicles/variants/toyota-x-noah-2015-18-rear.png"] },
  { vehicleId: "12396aa8-2e17-4bb8-8264-54001130a480", files: ["images/vehicles/variants/toyota-hiace-2012-15-front.png", "images/vehicles/variants/toyota-hiace-2012-15-side.png", "images/vehicles/variants/toyota-hiace-2012-15-rear.png"] },
  { vehicleId: "9b48f1cd-634b-4c82-a047-e621a96bf720", files: ["images/vehicles/variants/toyota-allion-2012-15-front.png", "images/vehicles/variants/toyota-allion-2012-15-side.png", "images/vehicles/variants/toyota-allion-2012-15-rear.png"] },
  { vehicleId: "fa8e18b9-59d6-4e60-b4b3-f91e89765ce5", files: ["images/vehicles/variants/toyota-axio-2012-15-front.png", "images/vehicles/variants/toyota-axio-2012-15-side.png", "images/vehicles/variants/toyota-axio-2012-15-rear.png"] },
  { vehicleId: "6f632312-82ac-4519-a991-7297f55ae99b", files: ["images/vehicles/variants/toyota-corolla-2001-06-front.png", "images/vehicles/variants/toyota-corolla-2001-06-side.png", "images/vehicles/variants/toyota-corolla-2001-06-rear.png"] },
  { vehicleId: "549a98d0-c769-4bfc-9b2a-865ba4fe1ad9", files: ["images/vehicles/variants/hilux-double-cabin-2016-front.png", "images/vehicles/variants/hilux-double-cabin-2016-side.png", "images/vehicles/variants/hilux-double-cabin-2016-rear.png"] },
  { vehicleId: "cfa003be-ed7c-481c-95a0-be2a043c3830", files: ["images/vehicles/variants/toyota-x-noah-2012-14-front.png", "images/vehicles/variants/toyota-x-noah-2012-14-side.png", "images/vehicles/variants/toyota-x-noah-2012-14-rear.png"] },
  { vehicleId: "d501dbb3-22b7-476f-ba8a-83a144dbf209", files: ["images/vehicles/variants/nissan-civilian-29-seater-front.png", "images/vehicles/variants/nissan-civilian-29-seater-side.png", "images/vehicles/variants/nissan-civilian-29-seater-rear.png"] },
];
const creates = [
  { name: "BMW Executive Sedan (2017–20)", slug: "bmw-executive-sedan-2017-20", category: "Premium", seats: 5, engine_cc: 2000, description: "A discreet executive sedan for private, corporate, and diplomatic travel.", files: ["images/vehicles/variants/bmw-executive-2017-20-front.webp", "images/vehicles/variants/bmw-executive-2017-20-side.webp", "images/vehicles/variants/bmw-executive-2017-20-rear.webp"] },
  { name: "Mercedes Executive Sedan (2020–22)", slug: "mercedes-executive-sedan-2020-22", category: "Premium", seats: 5, engine_cc: 2000, description: "A refined executive sedan with a quiet cabin and polished chauffeur service.", files: ["images/vehicles/variants/mercedes-executive-2020-22-front.webp", "images/vehicles/variants/mercedes-executive-2020-22-side.webp", "images/vehicles/variants/mercedes-executive-2020-22-rear.webp"] },
];

export default function BulkVehicleImageImport() {
  const [status, setStatus] = useState("Ready");
  async function run(payload: { updates?: typeof updates; creates?: typeof creates }) {
    setStatus("Uploading variants…");
    const response = await fetch("/api/admin/vehicle-image-import", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    const raw = await response.text();
    let data: { updated?: number; created?: number; error?: string } = {};
    try { data = JSON.parse(raw); } catch { data.error = raw || "Importer timed out"; }
    setStatus(response.ok ? `Updated ${data.updated} vehicle(s) and added ${data.created} executive vehicle(s).` : data.error || "Import failed");
  }
  return <main className="mx-auto max-w-xl space-y-6 p-10"><h1 className="text-2xl font-semibold">Vehicle image import</h1><p className="text-gray-600">Uploads the generated white-studio variants and updates the authenticated catalog records.</p><div className="flex flex-wrap gap-3"><button onClick={() => run({ updates: updates.slice(1, 2) })} className="rounded-md bg-green-700 px-5 py-3 font-medium text-white">Fix Alphard</button><button onClick={() => run({ creates })} className="rounded-md bg-green-700 px-5 py-3 font-medium text-white">Add BMW + Mercedes</button></div><p>{status}</p></main>;
}
