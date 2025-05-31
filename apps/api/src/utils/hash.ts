// src/utils/hash.ts
import bcrypt from 'bcrypt';

export const hashPassword = (pwd: string) => bcrypt.hash(pwd, 10);
export const comparePasswords = (pwd: string, hash: string) => bcrypt.compare(pwd, hash);
