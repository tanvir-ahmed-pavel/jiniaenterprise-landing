"use client";

import * as React from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export type SelectOption = { value: string; label: string; disabled?: boolean };

interface SelectProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "defaultValue" | "onChange" | "value"> {
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  name?: string;
  placeholder?: string;
  triggerClassName?: string;
  menuClassName?: string;
}

/** The public site's one select treatment: a form-compatible value behind a
 * keyboard-friendly listbox, instead of the browser's native select chrome. */
const Select = React.forwardRef<HTMLButtonElement, SelectProps>(
  ({ className, triggerClassName, menuClassName, options, value, defaultValue = "", onValueChange, name, placeholder = "Select an option", disabled, ...buttonProps }, ref) => {
    const generatedId = React.useId();
    const listboxId = `${generatedId}-listbox`;
    const rootRef = React.useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = React.useState(false);
    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const selectedValue = value ?? internalValue;
    const selected = options.find((option) => option.value === selectedValue);
    const controlLabel = buttonProps["aria-label"] ?? placeholder;
    const accessibleValueLabel = selected ? `${controlLabel}: ${selected.label}` : controlLabel;

    React.useEffect(() => {
      const closeOnOutsidePointer = (event: PointerEvent) => {
        if (!rootRef.current?.contains(event.target as Node)) setIsOpen(false);
      };
      document.addEventListener("pointerdown", closeOnOutsidePointer);
      return () => document.removeEventListener("pointerdown", closeOnOutsidePointer);
    }, []);

    const choose = (nextValue: string) => {
      if (value === undefined) setInternalValue(nextValue);
      onValueChange?.(nextValue);
      setIsOpen(false);
    };

    const chooseRelativeOption = (direction: 1 | -1) => {
      const available = options.filter((option) => !option.disabled);
      if (available.length === 0) return;
      const index = available.findIndex((option) => option.value === selectedValue);
      choose(available[(index + direction + available.length) % available.length].value);
    };

    return (
      <div ref={rootRef} className={cn("relative", className)}>
        {name && <input type="hidden" name={name} value={selectedValue} />}
        <button
          {...buttonProps}
          ref={ref}
          type="button"
          disabled={disabled}
          aria-haspopup="listbox"
          aria-controls={listboxId}
          aria-expanded={isOpen}
          aria-label={accessibleValueLabel}
          onClick={(event) => {
            buttonProps.onClick?.(event);
            if (!event.defaultPrevented) setIsOpen((open) => !open);
          }}
          onKeyDown={(event) => {
            buttonProps.onKeyDown?.(event);
            if (event.defaultPrevented) return;
            if (event.key === "ArrowDown" || event.key === "ArrowUp") {
              event.preventDefault();
              if (isOpen) chooseRelativeOption(event.key === "ArrowDown" ? 1 : -1);
              else setIsOpen(true);
            }
            if (event.key === "Escape") setIsOpen(false);
          }}
          className={cn(
            "flex h-12 w-full items-center justify-between gap-3 rounded-md border border-emerald-950/15 bg-white px-3 text-left text-sm font-normal text-emerald-950 transition-colors outline-none hover:border-emerald-950/30 focus-visible:border-amber-400 focus-visible:ring-2 focus-visible:ring-amber-400/20 disabled:cursor-not-allowed disabled:opacity-50",
            triggerClassName,
          )}
        >
          <span className={cn("min-w-0 truncate", !selected && "text-emerald-950/35")}>{selected?.label ?? placeholder}</span>
          <ChevronDown aria-hidden="true" className={cn("h-4 w-4 shrink-0 text-emerald-700 transition-transform duration-200", isOpen && "rotate-180")} />
        </button>

        {isOpen && (
          <div id={listboxId} role="listbox" aria-label={controlLabel} className={cn("absolute z-30 mt-2 max-h-64 w-full overflow-y-auto rounded-md border border-emerald-950/10 bg-white p-1.5 shadow-[0_18px_50px_-24px_rgba(6,52,38,.45)]", menuClassName)}>
            {options.map((option) => {
              const isSelected = option.value === selectedValue;
              return (
                <button key={option.value} type="button" role="option" aria-selected={isSelected} disabled={option.disabled} onClick={() => choose(option.value)} className={cn("flex min-h-11 w-full items-center justify-between gap-3 rounded-sm px-3 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 disabled:cursor-not-allowed disabled:opacity-40", isSelected ? "bg-emerald-50 text-emerald-950" : "text-emerald-950/70 hover:bg-emerald-50")}>
                  <span>{option.label}</span>
                  {isSelected && <Check aria-hidden="true" className="h-4 w-4 shrink-0 text-emerald-700" />}
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  },
);
Select.displayName = "Select";

export { Select };
