"use client";

import { forwardRef, useCallback, useRef, useState, useSyncExternalStore } from "react";
import { CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDisplayDate } from "@/lib/forms/date";

const subscribeNoop = () => () => {};

type Props = Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> & {
  placeholderText?: string;
};

/**
 * A native date input (so phones get their own picker and the value stays
 * ISO yyyy-mm-dd for the API) that *shows* the date as "12 Nov 2026".
 * Browsers set the native display from the device locale, which for many
 * visitors is mm/dd/yyyy. Without JavaScript it falls back to the native look.
 */
export const DateField = forwardRef<HTMLInputElement, Props>(function DateField(
  { className, placeholderText = "dd/mm/yyyy", onChange, defaultValue, value, ...props },
  forwardedRef,
) {
  const innerRef = useRef<HTMLInputElement | null>(null);
  const [typed, setTyped] = useState<string>(String(defaultValue ?? ""));
  // True only after hydration: the server HTML keeps the plain native input.
  const enhanced = useSyncExternalStore(subscribeNoop, () => true, () => false);
  const display = value !== undefined ? String(value) : typed;

  const setRefs = useCallback(
    (node: HTMLInputElement | null) => {
      innerRef.current = node;
      if (typeof forwardedRef === "function") forwardedRef(node);
      else if (forwardedRef) forwardedRef.current = node;
    },
    [forwardedRef],
  );

  return (
    <div className="relative">
      <input
        {...props}
        ref={setRefs}
        type="date"
        value={value}
        defaultValue={defaultValue}
        onChange={(event) => {
          setTyped(event.target.value);
          onChange?.(event);
        }}
        onClick={(event) => {
          // Open the picker from anywhere in the field, not only the icon.
          try {
            event.currentTarget.showPicker?.();
          } catch {
            /* showPicker throws when not user-activated; the native UI still works */
          }
        }}
        className={cn(className, enhanced && "jinia-date-native")}
      />
      {enhanced && (
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-y-0 left-0 right-10 flex items-center truncate pl-[inherit] text-sm tabular-nums",
            display ? "text-emerald-950" : "text-emerald-950/40",
          )}
          style={{ paddingLeft: "0.875rem" }}
        >
          {display ? formatDisplayDate(display) : placeholderText}
        </span>
      )}
      {enhanced && (
        <CalendarDays aria-hidden className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-emerald-950/45" />
      )}
    </div>
  );
});
