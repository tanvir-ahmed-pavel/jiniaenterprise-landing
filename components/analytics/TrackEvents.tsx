"use client";

import {
  useEffect,
  type ReactNode,
} from "react";
import { detectAiReferrer } from "@/lib/analytics/ai-referrer";
import type { AnalyticsEventName } from "@/lib/analytics/events";

type TrackPayload = Record<string, string | number | boolean | null | undefined>;

declare global {
  interface Window {
    umami?: {
      track: (name: string, data?: Record<string, unknown>) => void;
    };
  }
}

function trackClientEvent(name: string, data?: TrackPayload) {
  const cleaned = Object.fromEntries(
    Object.entries(data ?? {}).filter(([, value]) => value !== undefined),
  );

  try {
    window.umami?.track(name, cleaned);
  } catch {
    // Analytics must never break UX
  }
}

type TrackClickProps = {
  event: AnalyticsEventName | string;
  data?: TrackPayload;
  children: ReactNode;
  className?: string;
};

/**
 * Wraps children and fires a custom analytics event on click.
 */
export function TrackClick({
  event,
  data,
  children,
  className,
}: TrackClickProps) {
  const handleClick = () => {
    trackClientEvent(event, data);
  };

  return (
    <span className={className} onClick={handleClick}>
      {children}
    </span>
  );
}

const STORAGE_KEY = "jinia_ai_referral";

/**
 * Captures AI / UTM referral context on mount and optionally posts to the analytics API.
 */
export function AiReferralCapture() {
  useEffect(() => {
    try {
      if (typeof window === "undefined") return;
      if (sessionStorage.getItem(STORAGE_KEY)) return;

      const params = new URLSearchParams(window.location.search);
      const utmSource = params.get("utm_source");
      const utmMedium = params.get("utm_medium");
      const utmCampaign = params.get("utm_campaign");
      const referrer = document.referrer || "";
      const aiSource = detectAiReferrer(referrer, utmSource);

      const payload = {
        referrer: referrer || null,
        utm_source: utmSource,
        utm_medium: utmMedium,
        utm_campaign: utmCampaign,
        ai_source: aiSource,
        path: window.location.pathname,
        captured_at: new Date().toISOString(),
      };

      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(payload));

      if (aiSource || utmSource) {
        trackClientEvent("ai_referral", payload);

        void fetch("/api/analytics/event", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: "ai_referral",
            properties: payload,
          }),
          keepalive: true,
        }).catch(() => {
          // Endpoint may be unavailable in some environments
        });
      }
    } catch {
      // Ignore storage / network failures
    }
  }, []);

  return null;
}
