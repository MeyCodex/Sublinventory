type ButtonVariant = "primary" | "destructive" | "secondary" | "brand";

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
    "w-full rounded-lg px-4 py-3 text-base font-semibold shadow-md transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.98] cursor-pointer focus:ring-offset-background";

  const variantStyles: Record<ButtonVariant, string> = {
    primary:
      "bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-ring",
    brand: "bg-teal-600 text-white hover:bg-teal-700 focus:ring-teal-500",
    destructive:
      "bg-destructive text-destructive-foreground hover:bg-destructive/90 focus:ring-destructive",
    secondary:
      "bg-secondary text-secondary-foreground hover:bg-secondary/80 focus:ring-ring",
  };

  const ringOffset =
    variant === "brand"
      ? "focus:ring-offset-gray-800"
      : "focus:ring-offset-background";

  const loadingStyles = isLoading ? "opacity-70 cursor-not-allowed" : "";

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${loadingStyles} ${ringOffset} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? loadingText : children}
    </button>
  );
}
