type ButtonVariant = "primary" | "destructive" | "secondary";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: ButtonVariant;
  loadingText?: string;
}

export function Button({
  children,
  className = "",
  loadingText = "Cargando...",
  isLoading = false,
  variant = "primary",
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    "w-full rounded-lg px-4 py-3 text-base font-semibold shadow-md transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.98] cursor-pointer";

  const variantStyles: Record<ButtonVariant, string> = {
    primary: `bg-teal-600 text-white hover:bg-teal-700 focus:ring-teal-500 focus:ring-offset-gray-800`,
    destructive: `bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 focus:ring-offset-gray-800`,
    secondary: `bg-gray-600 text-gray-100 hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-800`,
  };

  const loadingStyles = isLoading ? "opacity-70 cursor-not-allowed" : "";

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${loadingStyles} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? loadingText : children}
    </button>
  );
}
