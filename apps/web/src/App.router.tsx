// apps/web/src/App.router.tsx
import { lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { PublicLayout } from './layouts/PublicLayout';
import { AdminLayout } from './layouts/AdminLayout';
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

// (Lazy Loading)
const HomePage = lazy(() => import('./pages/HomePage'));
const MenuPage = lazy(() => import('./pages/MenuPage'));
const AdminDashboardPage = lazy(() => import('./pages/AdminDashboardPage'));
const AdminReservationsPage = lazy(() => import('./pages/AdminReservationsPage'));

export const router = createBrowserRouter([
  {
    // Public routes
    element: <PublicLayout />,
    errorElement: <NotFoundPage />, // O pagină de eroare generică
    children: [
      { path: '/', element: <HomePage /> },
      { path: 'menu', element: <MenuPage /> },
    ],
  },
  {
    // Admin routes
    path: 'admin',
    element: <AdminLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <AdminDashboardPage /> },
      { path: 'reservations', element: <AdminReservationsPage /> },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}