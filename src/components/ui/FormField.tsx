import type { FieldError, UseFormRegisterReturn } from "react-hook-form";

type FormFieldProps = {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
  className?: string;
};

export function FormField({
  id,
  label,
  type = "text",
  placeholder,
  register,
  error,
  className = "",
}: FormFieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-400 mb-1"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        {...register}
        className={`mt-1 block w-full rounded-lg border-gray-600 bg-gray-700 px-4 py-2.5 text-gray-100 shadow-sm transition-all duration-200
                    focus:border-teal-500 focus:ring-1 focus:ring-teal-500 focus:outline-none
                    placeholder:text-gray-500 text-sm ${
                      error ? "border-red-500 ring-red-500" : ""
                    } ${className}`}
        placeholder={placeholder}
        aria-invalid={error ? "true" : "false"}
      />
      {error && (
        <p className="mt-1 text-xs text-red-400 font-medium">{error.message}</p>
      )}
    </div>
  );
}
