"use client";

import * as React from "react";
import { Check, ChevronDown } from "lucide-react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { cn } from "@/lib/utils";

export type SelectOption = { value: string; label: string; disabled?: boolean; image?: string; description?: string };

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
    const triggerRef = React.useRef<HTMLButtonElement>(null);
    const menuRef = React.useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = React.useState(false);
    const [menuPosition, setMenuPosition] = React.useState<{
      left: number;
      top: number;
      width: number;
      maxHeight: number;
    } | null>(null);
    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const selectedValue = value ?? internalValue;
    const selected = options.find((option) => option.value === selectedValue);
    const controlLabel = buttonProps["aria-label"] ?? placeholder;
    const accessibleValueLabel = selected ? `${controlLabel}: ${selected.label}` : controlLabel;

    const setTriggerRefs = React.useCallback(
      (node: HTMLButtonElement | null) => {
        triggerRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      },
      [ref],
    );

    React.useEffect(() => {
      const closeOnOutsidePointer = (event: PointerEvent) => {
        const target = event.target as Node;
        if (!rootRef.current?.contains(target) && !menuRef.current?.contains(target)) setIsOpen(false);
      };
      document.addEventListener("pointerdown", closeOnOutsidePointer);
      return () => document.removeEventListener("pointerdown", closeOnOutsidePointer);
    }, []);

    React.useLayoutEffect(() => {
      if (!isOpen) {
        setMenuPosition(null);
        return;
      }

      const updateMenuPosition = () => {
        const trigger = triggerRef.current;
        if (!trigger) return;
        const rect = trigger.getBoundingClientRect();
        const gap = 8;
        const viewportPadding = 8;
        const availableBelow = window.innerHeight - rect.bottom - gap - viewportPadding;
        const availableAbove = rect.top - gap - viewportPadding;
        const opensAbove = availableBelow < 220 && availableAbove > availableBelow;
        const maxHeight = Math.max(96, Math.min(256, opensAbove ? availableAbove : availableBelow));
        const width = Math.min(rect.width, window.innerWidth - viewportPadding * 2);
        const left = Math.min(Math.max(viewportPadding, rect.left), window.innerWidth - width - viewportPadding);
        const unclampedTop = opensAbove ? rect.top - maxHeight - gap : rect.bottom + gap;
        const top = Math.min(Math.max(viewportPadding, unclampedTop), window.innerHeight - maxHeight - viewportPadding);

        setMenuPosition({
          left,
          top,
          width,
          maxHeight,
        });
      };

      updateMenuPosition();
      window.addEventListener("resize", updateMenuPosition);
      window.addEventListener("scroll", updateMenuPosition, true);
      return () => {
        window.removeEventListener("resize", updateMenuPosition);
        window.removeEventListener("scroll", updateMenuPosition, true);
      };
    }, [isOpen]);

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
          ref={setTriggerRefs}
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
          <span className={cn("flex min-w-0 items-center gap-3 truncate", !selected && "text-emerald-950/35")}>
            {selected?.image && <Image src={selected.image} alt="" width={42} height={30} className="h-7 w-10 shrink-0 object-contain mix-blend-multiply" />}
            <span className="truncate">{selected?.label ?? placeholder}</span>
          </span>
          <ChevronDown aria-hidden="true" className={cn("h-4 w-4 shrink-0 text-emerald-700 transition-transform duration-200", isOpen && "rotate-180")} />
        </button>

        {isOpen && menuPosition && typeof document !== "undefined" && createPortal(
          <div
            ref={menuRef}
            id={listboxId}
            role="listbox"
            aria-label={controlLabel}
            onPointerDown={(event) => event.stopPropagation()}
            style={{
              left: menuPosition.left,
              top: menuPosition.top,
              width: menuPosition.width,
              maxHeight: menuPosition.maxHeight,
            }}
            className={cn("fixed z-[9999] overflow-y-auto rounded-md border border-emerald-950/10 bg-white p-1.5 shadow-[0_18px_50px_-24px_rgba(6,52,38,.45)]", menuClassName)}
          >
            {options.map((option) => {
              const isSelected = option.value === selectedValue;
              return (
                <button key={option.value} type="button" role="option" aria-selected={isSelected} disabled={option.disabled} onClick={() => choose(option.value)} className={cn("flex min-h-14 w-full items-center justify-between gap-3 rounded-sm px-2.5 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 disabled:cursor-not-allowed disabled:opacity-40", isSelected ? "bg-emerald-50 text-emerald-950" : "text-emerald-950/70 hover:bg-emerald-50")}>
                  <span className="flex min-w-0 items-center gap-3">
                    {option.image && <Image src={option.image} alt="" width={58} height={42} className="h-10 w-14 shrink-0 object-contain mix-blend-multiply" />}
                    <span className="min-w-0"><span className="block truncate">{option.label}</span>{option.description && <span className="mt-0.5 block truncate text-xs text-emerald-950/45">{option.description}</span>}</span>
                  </span>
                  {isSelected && <Check aria-hidden="true" className="h-4 w-4 shrink-0 text-emerald-700" />}
                </button>
              );
            })}
          </div>,
          document.body,
        )}
      </div>
    );
  },
);
Select.displayName = "Select";

export { Select };
