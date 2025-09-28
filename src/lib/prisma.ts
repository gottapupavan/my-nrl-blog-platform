// src/lib/prisma.ts
import { PrismaClient } from '@prisma/client';

// This function creates a new instance of Prisma Client.
const prismaClientSingleton = () => {
  return new PrismaClient();
};

// We declare a global variable to store the Prisma client instance.
// This prevents multiple client instances from being created during hot-reloads in development.
declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

// Get the existing global instance or create a new one.
const prisma = globalThis.prisma ?? prismaClientSingleton();

export default prisma;

// Only assign the client to globalThis in non-production environments.
if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma;