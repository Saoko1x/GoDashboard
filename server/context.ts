import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createContext(ctx: trpcNext.CreateNextContextOptions) {
  const { req, res } = ctx;

  return {
    req,
    res,
    prisma
  };
}

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
