import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import { lazy, Suspense } from "react";
import AuthLayout from "@/components/layouts/AuthLayout";
import AppLayout from "@/components/layouts/AppLayout";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { AuthListener } from "@/components/auth/AuthListener";
import { Spinner } from "@/components/ui/Spinner";

const LoginPage = lazy(() => import("@/pages/auth/LoginPage"));
const DashboardPage = lazy(() => import("@/pages/DashboardPage"));
const InventoryPage = lazy(() => import("@/pages/InventoryPage"));
const SalesPage = lazy(() => import("@/pages/SalesPage"));
const CustomersPage = lazy(() => import("@/pages/CustomersPage"));
const ReportsPage = lazy(() => import("@/pages/ReportsPage"));
const SettingsPage = lazy(() => import("@/pages/SettingsPage"));

const PageLoader = () => (
  <div className="flex h-full items-center justify-center">
    <Spinner size="lg" className="text-primary" />
  </div>
);

const Root = () => (
  <>
    <AuthListener />
    <Outlet />
  </>
);

export const router = createBrowserRouter([
  {
    element: <Root />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          {
            path: "/login",
            element: (
              <Suspense fallback={<PageLoader />}>
                <LoginPage />
              </Suspense>
            ),
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
                element: <Navigate to="/tablero" replace />,
              },
              {
                path: "tablero",
                element: (
                  <Suspense fallback={<PageLoader />}>
                    <DashboardPage />
                  </Suspense>
                ),
              },
              {
                path: "inventario",
                element: (
                  <Suspense fallback={<PageLoader />}>
                    <InventoryPage />
                  </Suspense>
                ),
              },
              {
                path: "ventas",
                element: (
                  <Suspense fallback={<PageLoader />}>
                    <SalesPage />
                  </Suspense>
                ),
              },
              {
                path: "clientes",
                element: (
                  <Suspense fallback={<PageLoader />}>
                    <CustomersPage />
                  </Suspense>
                ),
              },
              {
                path: "reportes",
                element: (
                  <Suspense fallback={<PageLoader />}>
                    <ReportsPage />
                  </Suspense>
                ),
              },
              {
                path: "ajustes",
                element: (
                  <Suspense fallback={<PageLoader />}>
                    <SettingsPage />
                  </Suspense>
                ),
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/dashboard" replace />,
  },
]);
