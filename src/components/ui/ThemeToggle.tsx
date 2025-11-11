import { RiSunLine, RiMoonLine } from "react-icons/ri";
import { useTheme } from "@/hooks/useTheme";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="text-muted-foreground hover:text-foreground rounded-full hover:bg-accent cursor-pointer"
      aria-label={
        theme === "light" ? "Activar modo oscuro" : "Activar modo claro"
      }
    >
      {theme === "light" ? (
        <RiMoonLine className="h-6 w-6" />
      ) : (
        <RiSunLine className="h-6 w-6" />
      )}
    </button>
  );
}
