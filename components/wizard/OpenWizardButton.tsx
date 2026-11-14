"use client";

/** Any button that should open the site-wide request wizard. */
export function OpenWizardButton({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <button type="button" onClick={() => window.dispatchEvent(new Event("jinia:open-wizard"))} className={className}>
      {children}
    </button>
  );
}
