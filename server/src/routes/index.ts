import { PrismaClient } from '@prisma/client';
export const prisma = new PrismaClient();

export * from './ads.routes';
export * from './games.routes';