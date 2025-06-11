import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div>
      <nav className="p-4 bg-gray-800 text-white">
        App Navigation - <a href="/menu">Menu</a> - <a href="/admin">Admin</a>
      </nav>

      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
