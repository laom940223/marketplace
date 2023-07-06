
import { createTRPCRouter } from "y/server/api/trpc";
import { listingsRouter } from "./routers/listingsRouter";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  listings: listingsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
