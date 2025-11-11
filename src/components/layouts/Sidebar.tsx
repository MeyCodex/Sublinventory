import {
  RiHome3Line,
  RiFileList3Line,
  RiBox3Line,
  RiTeamLine,
  RiBarChartLine,
  RiSettings3Line,
} from "react-icons/ri";
import { SidebarLink } from "./SidebarLink";
import { useSettingsStore } from "@/store/useSettingsStore";
import { siteConfig } from "@/config/site";

const navLinks = [
  { to: "/", label: "Inicio", icon: RiHome3Line },
  { to: "/ventas", label: "Ventas", icon: RiFileList3Line },
  { to: "/inventario", label: "Inventario", icon: RiBox3Line },
  { to: "/clientes", label: "Clientes", icon: RiTeamLine },
  { to: "/reportes", label: "Reportes", icon: RiBarChartLine },
];

export default function Sidebar() {
  const { isCollapsed } = useSettingsStore();

  return (
    <aside
      className={`fixed h-full z-20 flex flex-col bg-card border-r border-border transition-all duration-300 ease-in-out ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      <div
        className={`p-6 text-center transition-all duration-200 ${
          isCollapsed ? "opacity-0 h-0 p-0 invisible" : "opacity-100 visible"
        }`}
      >
        <h1 className="text-2xl font-bold text-foreground tracking-wider">
          {siteConfig.name.main}
        </h1>
        <p className="text-xs text-primary tracking-widest">
          {siteConfig.name.secondary}
        </p>
      </div>
      <nav
        className={`mt-8 px-4 flex-1 ${
          isCollapsed ? "pt-10 flex flex-col items-center px-0" : ""
        }`}
      >
        {navLinks.map((link) => (
          <SidebarLink
            key={link.to}
            to={link.to}
            label={link.label}
            icon={link.icon}
            isCollapsed={isCollapsed}
          />
        ))}
      </nav>
      <div
        className={`mt-auto p-4 border-t border-border ${
          isCollapsed ? "flex justify-center" : ""
        }`}
      >
        <SidebarLink
          to="/configuracion"
          label="Configuración"
          icon={RiSettings3Line}
          isCollapsed={isCollapsed}
        />
      </div>
    </aside>
  );
}
