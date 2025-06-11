import HeroSection from '@/components/HeroSection';
import { useAuth } from '@/contexts/AuthContext';

export default function HomePage() {
  const { user, login } = useAuth();

  const handleSimulateLogin = () => {
    login({
      user: {
        id: '1',
        email: 'test@user.com',
        name: 'Test User',
        role: 'PUBLIC',
      },
      accessToken: 'fake-access-token-initial',
      refreshToken: 'super-secret-refresh-token',
    });
  };

  return (
    <>
      {/* 🖼️ Hero with background image, headline & CTA */}
      <HeroSection />

      {/* 🔐 Auth demo section */}
      <div className="mx-auto max-w-5xl px-4 py-12">
        <h1 className="text-2xl font-semibold">Home Page</h1>

        {user ? (
          <p className="mt-4 text-green-600">Logat ca: {user.email}</p>
        ) : (
          <p className="mt-4 text-red-600">Nu ești logat.</p>
        )}

        <button
          onClick={handleSimulateLogin}
          className="mt-6 rounded-lg bg-primary-500 px-6 py-3 font-medium text-white shadow hover:bg-primary-600"
        >
          Simulare Login
        </button>
      </div>
    </>
  );
}
