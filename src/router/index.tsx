import { createBrowserRouter, Outlet } from "react-router-dom";
import AppLayout from "@/components/layouts/AppLayout";
import AuthLayout from "@/components/layouts/AuthLayout";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import DashboardPage from "@/pages/DashboardPage";
import SalesPage from "@/pages/SalesPage";
import InventoryPage from "@/pages/InventoryPage";
import CustomersPage from "@/pages/CustomersPage";
import ReportsPage from "@/pages/ReportsPage";
import SettingsPage from "@/pages/SettingsPage";
import LoginPage from "@/pages/auth/LoginPage";
import { AuthListener } from "@/components/auth/AuthListener";

function Root() {
  return (
    <>
      <AuthListener />
      <Outlet />
    </>
  );
}
export const router = createBrowserRouter([
  {
    element: <Root />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          {
            path: "/login",
            element: <LoginPage />,
          },
        ],
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/",
            element: <AppLayout />,
            children: [
              {
                index: true,
                element: <DashboardPage />,
              },
              {
                path: "ventas",
                element: <SalesPage />,
              },
              {
                path: "inventario",
                element: <InventoryPage />,
              },
              {
                path: "clientes",
                element: <CustomersPage />,
              },
              {
                path: "reportes",
                element: <ReportsPage />,
              },
              {
                path: "configuracion",
                element: <SettingsPage />,
              },
            ],
          },
        ],
      },
    ],
  },
]);
