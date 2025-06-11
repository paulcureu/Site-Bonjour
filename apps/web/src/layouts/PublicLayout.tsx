import { Suspense } from 'react';
import { Outlet, Link } from 'react-router-dom';

export function PublicLayout() {
  return (
    <div>
      <nav className="p-4 bg-blue-800 text-white">
        <Link to="/" className="mr-4">Home</Link>
        <Link to="/menu">Meniu</Link>
      </nav>
      <main className="p-4">
        <Suspense fallback={<div>Încărcare pagină...</div>}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
}