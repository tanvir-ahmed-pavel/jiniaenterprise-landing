import type { Metadata } from "next";
import { businessIdentity } from "@/lib/business/identity";
import { getCanonicalUrl, SITE_URL } from "@/lib/seo/canonical";

type CreateMetadataInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  noIndex?: boolean;
  keywords?: string[];
};

export function createMetadata({
  title,
  description,
  path,
  image = "/og-image.jpg",
  noIndex = false,
  keywords,
}: CreateMetadataInput): Metadata {
  const url = getCanonicalUrl(path);
  const absoluteImage = image.startsWith("http")
    ? image
    : `${SITE_URL}${image.startsWith("/") ? image : `/${image}`}`;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      locale: "en_BD",
      url,
      siteName: businessIdentity.brandName,
      title,
      description,
      images: [
        {
          url: absoluteImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteImage],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
  };
}

export function getSiteMetadata(): Metadata {
  return createMetadata({
    title: "Car Rental in Dhaka with Driver",
    description:
      "Book chauffeur-driven car and bus rental in Dhaka. Daily, monthly, corporate, and airport transfer service from Jinia Enterprise.",
    path: "/",
    keywords: [
      "car rental Dhaka",
      "car rental with driver Dhaka",
      "airport transfer Dhaka",
      "corporate car rental Bangladesh",
      "monthly car rental Dhaka",
      "Jinia Enterprise",
    ],
  });
}
