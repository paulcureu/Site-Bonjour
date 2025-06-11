// apps/web/src/layouts/AdminLayout.tsx
import { Suspense } from 'react';
import { Outlet, Link } from 'react-router-dom';

export function AdminLayout() {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h2 className="font-bold text-xl mb-4">Admin Panel</h2>
        <nav className="flex flex-col">
          <Link to="/admin" className="py-2">Dashboard</Link>
          <Link to="/admin/reservations" className="py-2">Rezervări</Link>
          <Link to="/admin/menu-items" className="py-2">Management Meniu</Link>
        </nav>
      </aside>
      <main className="flex-1 p-6 bg-gray-100">
        <Suspense fallback={<div>Încărcare secțiune admin...</div>}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
}