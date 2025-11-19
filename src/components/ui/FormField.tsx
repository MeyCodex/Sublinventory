import type { UseFormRegisterReturn } from "react-hook-form";

type FormFieldVariant = "default" | "brand";

type FormFieldProps = {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  register: UseFormRegisterReturn;
  error?: any;
  className?: string;
  variant?: FormFieldVariant;
};

const labelStyles: Record<FormFieldVariant, string> = {
  default: "text-muted-foreground",
  brand: "text-gray-400",
};

const inputStyles: Record<FormFieldVariant, string> = {
  default:
    "border-border bg-input text-foreground placeholder:text-muted-foreground",
  brand: "border-gray-600 bg-gray-700 text-gray-100 placeholder:text-gray-500",
};

const focusStyles: Record<FormFieldVariant, string> = {
  default: "focus:border-primary focus:ring-ring",
  brand: "focus:border-teal-500 focus:ring-teal-500",
};

const errorRingStyles: Record<FormFieldVariant, string> = {
  default: "border-destructive ring-destructive",
  brand: "border-red-500 ring-red-500",
};

const errorTextStyles: Record<FormFieldVariant, string> = {
  default: "text-destructive",
  brand: "text-red-400",
};

export function FormField({
  id,
  label,
  type = "text",
  placeholder,
  register,
  error,
  className = "",
  variant = "default",
}: FormFieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className={`block text-sm font-medium mb-1 ${labelStyles[variant]}`}
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        {...register}
        className={`mt-1 block w-full rounded-lg px-4 py-2.5 shadow-sm transition-all duration-200
                    focus:ring-1 focus:outline-none text-sm
                    ${inputStyles[variant]}
                    ${focusStyles[variant]}
                    ${error ? errorRingStyles[variant] : ""} 
                    ${className}`}
        placeholder={placeholder}
        aria-invalid={error ? "true" : "false"}
      />
      {error && (
        <p className={`mt-1 text-xs font-medium ${errorTextStyles[variant]}`}>
          {error.message}
        </p>
      )}
    </div>
  );
}
