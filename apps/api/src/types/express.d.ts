// apps/api/src/types/express.d.ts

// Definește cum arată payload-ul pe care îl pui tu în token
interface JwtPayload {
  sub: string;
  email: string;
  role: 'ADMIN' | 'PUBLIC';
}

declare global {
  namespace Express {
    export interface Request {
      user?: JwtPayload; // proprietatea 'user' este opțională și are tipul JwtPayload
    }
  }
}
