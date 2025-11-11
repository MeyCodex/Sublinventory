import {
  RiNotification3Line,
  RiArrowDownSLine,
  RiMenuLine,
  RiUserLine,
  RiLogoutBoxRLine,
} from "react-icons/ri";
import { useSettingsStore } from "@/store/useSettingsStore";
import { ThemeToggle } from "../ui/ThemeToggle";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useAuthStore } from "@/store/useAuthStore";
import { ROLE_DISPLAY_NAMES } from "@/config/constants";

type Props = {};

function Header({}: Props) {
  const { toggleSidebar, toggleCollapse } = useSettingsStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { logout, isButtonLoading: isAuthLoading } = useAuth();
  const { user, role, fullName } = useAuthStore();

  const handleLogout = async () => {
    setIsMenuOpen(false);
    await logout();
  };

  const userInitial =
    fullName?.[0]?.toUpperCase() ?? user?.email?.[0]?.toUpperCase() ?? "?";
  const displayName = fullName ?? user?.email?.split("@")[0] ?? "Usuario";
  const displayRole = role ? ROLE_DISPLAY_NAMES[role] : "Cargando rol...";

  return (
    <header className="h-16 w-full flex items-center justify-between px-4 md:px-6 bg-background border-b border-border">
      <div className="flex">
        <button
          onClick={toggleSidebar}
          className="md:hidden text-muted-foreground hover:text-foreground"
        >
          <RiMenuLine className="h-6 w-6" />
        </button>
        <button
          onClick={toggleCollapse}
          className="hidden md:block text-muted-foreground hover:text-foreground cursor-pointer"
        >
          <RiMenuLine className="h-6 w-6" />
        </button>
      </div>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <button className="relative text-muted-foreground hover:text-foreground rounded-full hover:bg-accent cursor-pointer">
          <RiNotification3Line className="h-6 w-6" />
          <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs rounded-full h-4 w-4 flex items-center justify-center">
            2
          </span>
        </button>
        {/* Menú desplegable */}
        <div className="relative">
          <button
            className="flex items-center gap-2 cursor-pointer p-1 rounded-md hover:bg-accent"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="h-9 w-9 rounded-full bg-primary/20 text-primary flex items-center justify-center font-semibold">
              {userInitial}
            </div>
            <div className="hidden md:block text-sm text-left">
              <p className="font-semibold text-foreground">{displayName}</p>
              <p className="text-xs text-muted-foreground">{displayRole}</p>
            </div>
            <RiArrowDownSLine
              className={`hidden md:block text-muted-foreground transition-transform duration-200 ${
                isMenuOpen ? "rotate-180" : ""
              }`}
            />
          </button>
          {isMenuOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-card border border-border rounded-md shadow-lg py-1 z-50">
              <a
                href="#"
                className="flex items-center px-4 py-2 text-sm text-foreground hover:bg-accent"
              >
                <RiUserLine className="mr-2" /> Perfil
              </a>
              <button
                onClick={handleLogout}
                disabled={isAuthLoading}
                className={`w-full flex items-center px-4 py-2 text-sm text-destructive hover:bg-destructive/10 cursor-pointer ${
                  isAuthLoading ? "cursor-not-allowed opacity-70" : ""
                }`}
              >
                <RiLogoutBoxRLine className="mr-2" /> Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
