import { useAuth } from '../contexts/AuthContext';

export default function HomePage() {
  const { user, login } = useAuth();

  const handleSimulateLogin = () => {
    login({
      user: { id: '1', email: 'test@user.com', name: 'Test User', role: 'PUBLIC' },
      accessToken: 'fake-access-token-initial',
      refreshToken: 'super-secret-refresh-token',
    });
  };

  return (
    <div>
      <h1>Home Page</h1>
      {user ? <p>Logat ca: {user.email}</p> : <p>Nu ești logat.</p>}
      <button onClick={handleSimulateLogin}>Simulare Login</button>
    </div>
  );
}