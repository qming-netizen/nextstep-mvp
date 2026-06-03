"use client";

interface FieldConfig {
  id: string;
  label: string;
  type?: "text" | "email";
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  autoComplete?: string;
  keyboard?: "default" | "email";
}

export function IOSTextFieldGroup({
  sectionTitle,
  fields,
}: {
  sectionTitle?: string;
  fields: FieldConfig[];
}) {
  return (
    <div>
      {sectionTitle && (
        <p className="ios-footnote mb-2 px-1 uppercase tracking-[0.02em] text-[var(--ios-label-secondary)]">
          {sectionTitle}
        </p>
      )}
      <div className="overflow-hidden rounded-[var(--ios-radius-group)] bg-[var(--ios-bg-elevated)] shadow-[0_1px_2px_rgba(0,0,0,0.06),0_0_0_0.5px_rgba(0,0,0,0.04)]">
        {fields.map((field, index) => (
          <div key={field.id}>
            {index > 0 && (
              <div className="ml-4 h-[0.5px] bg-[var(--ios-separator)]" aria-hidden />
            )}
            <label htmlFor={field.id} className="sr-only">
              {field.label}
            </label>
            <input
              id={field.id}
              type={field.type ?? "text"}
              inputMode={field.keyboard === "email" ? "email" : "text"}
              autoComplete={field.autoComplete}
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
              placeholder={field.placeholder}
              aria-label={field.label}
              className="flex min-h-[50px] w-full items-center border-0 bg-transparent px-4 text-[17px] font-normal leading-[22px] tracking-[-0.41px] text-[var(--ios-label)] outline-none placeholder:text-[var(--ios-label-tertiary)]"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
