import { exampleRouter } from "~/server/api/routers/example";
import { createTRPCRouter } from "~/server/api/trpc";
import {irregularVerbsRouter} from "~/server/api/routers/irregularVerbs";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  irregularVerbs: irregularVerbsRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
