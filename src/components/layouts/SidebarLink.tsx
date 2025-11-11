import { NavLink } from "react-router-dom";
import { useSettingsStore } from "@/store/useSettingsStore";

type SidebarLinkProps = {
  to: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  isCollapsed: boolean;
};

export function SidebarLink({
  to,
  icon: Icon,
  label,
  isCollapsed,
}: SidebarLinkProps) {
  const { closeSidebar } = useSettingsStore();

  const handleClick = () => {
    if (window.innerWidth < 768) {
      closeSidebar();
    }
  };
  return (
    <NavLink
      to={to}
      onClick={handleClick}
      className={({ isActive }) =>
        `flex items-center py-3 mt-4 rounded-lg transition-colors duration-200 
        ${!isCollapsed ? "px-4 justify-start w-full" : "px-3"}
        ${
          isActive
            ? "bg-primary/10 text-primary font-semibold"
            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
        }`
      }
    >
      <Icon className={`transition-all ${isCollapsed ? "w-6 h-6" : "w-6"}`} />

      <span
        className={`ml-4 transition-opacity duration-200 whitespace-nowrap ${
          isCollapsed
            ? "opacity-0 w-0 ml-0 invisible absolute"
            : "opacity-100 visible relative"
        }`}
      >
        {label}
      </span>
    </NavLink>
  );
}
