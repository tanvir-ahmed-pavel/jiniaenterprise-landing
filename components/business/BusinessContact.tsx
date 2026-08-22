import {
  businessIdentity,
  getFormattedAddress,
  getTelHref,
  getWhatsAppHref,
} from "@/lib/business/identity";
import { cn } from "@/lib/utils";

type BusinessContactProps = {
  compact?: boolean;
  className?: string;
};

export function BusinessContact({
  compact = false,
  className,
}: BusinessContactProps) {
  const { brandName, phone, phoneSecondary, phoneLandline, email } =
    businessIdentity;
  const phones = [phone, phoneSecondary, phoneLandline].filter(
    (value): value is string => Boolean(value),
  );

  return (
    <address
      className={cn(
        "not-italic text-sm text-emerald-950",
        compact ? "space-y-1.5" : "space-y-3",
        className,
      )}
    >
      <p className={cn("font-heading font-bold", compact ? "text-base" : "text-lg")}>
        {brandName}
      </p>

      <ul className={cn("space-y-1", compact && "space-y-0.5")}>
        {phones.map((number) => (
          <li key={number}>
            <a
              href={getTelHref(number)}
              className="font-semibold text-emerald-800 hover:text-emerald-600 transition-colors"
            >
              {number}
            </a>
          </li>
        ))}
      </ul>

      <p>
        <a
          href={`mailto:${email}`}
          className="font-medium text-emerald-800 hover:text-emerald-600 transition-colors"
        >
          {email}
        </a>
      </p>

      <p className="text-emerald-900/80 leading-relaxed">{getFormattedAddress()}</p>

      <p>
        <a
          href={getWhatsAppHref()}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-emerald-700 hover:text-emerald-500 transition-colors"
        >
          WhatsApp
        </a>
      </p>
    </address>
  );
}
