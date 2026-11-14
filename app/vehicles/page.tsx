import { PageHeader } from "@/components/layout/PageHeader";
import { DarkPanel, GhostAction, PrimaryAction } from "@/components/layout/Section";
import { RequestProvider } from "@/components/trip/RequestProvider";
import { FleetStore } from "@/components/trip/FleetStore";
import { createMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/lib/config";
import { getFleetRows, toStoreVehicles } from "@/lib/vehicles/store";

export const revalidate = 60;

export const metadata = createMetadata({
  title: "Car Rental Fleet in Dhaka",
  description:
    "Browse sedans, SUVs, microbuses, and coaches for chauffeur-driven daily, weekly, and monthly rental in Dhaka.",
  path: "/vehicles",
});

export default async function VehiclesPage() {
  const rows = await getFleetRows();
  const vehicles = toStoreVehicles(rows);

  return (
    <RequestProvider>
      <div className="bg-white text-ink">
        <PageHeader
          title="Every car, with a driver."
          subtitle={`The fleet · ${vehicles.length || 16} models`}
          description="Sedans for one, SUVs for protocol, vans and coaches for teams. Every car comes with a vetted driver, fuel plan and air-conditioning. Choose one and the desk quotes that exact car."
          breadcrumbs={[{ label: "Fleet" }]}
        />

        <section className="container py-10 sm:py-16">
          <FleetStore vehicles={vehicles} />
        </section>

        <DarkPanel className="mt-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">Standing arrangements</p>
            <h2 className="type-display mt-4 font-heading text-[clamp(2.3rem,6vw,4rem)]">
              A fleet for months, <span className="type-accent text-gold">not a day.</span>
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-white/60">
              Companies, NGOs and embassies run monthly arrangements with us: a named coordinator,
              monthly billing, and a backup vehicle held for the days one is needed.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <PrimaryAction
                href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent("Hi Jinia Enterprise, I would like a quote for a long-term fleet arrangement.")}`}
                external
                tone="dark"
              >
                WhatsApp the desk
              </PrimaryAction>
              <GhostAction href="/monthly-car-rental" tone="dark">How monthly works</GhostAction>
            </div>
          </div>
        </DarkPanel>
      </div>
    </RequestProvider>
  );
}
