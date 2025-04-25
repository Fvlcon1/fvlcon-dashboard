import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

declare global {
  // Prevent multiple instances of Prisma Client in development mode
  var prisma: PrismaClient | undefined;
}

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    }
  });
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient({
      datasources: {
        db: {
          url: process.env.DATABASE_URL,
        },
      }
    });
  }
  prisma = global.prisma;
}

export default prisma;
