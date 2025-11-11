import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useSettingsStore } from "@/store/useSettingsStore";

export default function AppLayout() {
  const { isSidebarOpen, closeSidebar, isCollapsed } = useSettingsStore();

  return (
    <div className="relative min-h-screen bg-background">
      <div className="hidden md:block">
        <Sidebar />
      </div>
      {isSidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
            onClick={closeSidebar}
          ></div>
          <div className="fixed top-0 left-0 h-screen z-40 md:hidden">
            <Sidebar />
          </div>
        </>
      )}
      <div
        className={`flex flex-col overflow-hidden transition-all duration-300 ease-in-out ${
          isCollapsed ? "md:ml-20" : "md:ml-64"
        }`}
      >
        <Header />
        <main className="flex-1 overflow-y-auto p-6 bg-canvas">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
