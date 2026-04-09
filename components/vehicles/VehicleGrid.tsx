"use client";

import { motion } from "framer-motion";
import { VehicleCard } from "./VehicleCard";

interface Vehicle {
  id: string;
  name: string;
  slug: string;
  category: "Economy" | "Standard" | "Premium" | "SUV" | "Microbus" | "Bus";
  seats: number;
  engine_cc?: number | null;
  rental_types: string[];
  description?: string;
  images?: string[];
  image_url?: string | null;
  starting_price?: number | null;
  price_label?: string;
  is_active: boolean;
  sort_order: number;
  is_featured: boolean;
}

interface VehicleGridProps {
  vehicles: Vehicle[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1], // Custom cubic-bezier for premium feel
    },
  },
};

export function VehicleGrid({ vehicles }: VehicleGridProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mb-24"
    >
      {vehicles.map((vehicle, index) => (
        <motion.div key={vehicle.id} variants={itemVariants}>
          <VehicleCard 
            vehicle={vehicle} 
            priority={index < 6} 
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
