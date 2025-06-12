// În src/layouts/PublicLayout.tsx

import { Suspense } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { ThemeToggle } from '@/components/ThemeToggle';

export function PublicLayout() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <nav className="p-4 bg-primary text-primary-foreground flex justify-between items-center">
        <div className="space-x-4">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/menu" className="hover:underline">
            Meniu
          </Link>
          <Link to="/gallery" className="hover:underline">
            Galerie
          </Link>
          {/* --- Adaugă linkul aici --- */}
          <Link to="/rezervari" className="hover:underline">
            Rezervări
          </Link>
        </div>
        <ThemeToggle />
      </nav>
      <main className="p-4">
        <Suspense fallback={<div>Încărcare pagină...</div>}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
}
