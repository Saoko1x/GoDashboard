import { authRouter } from './routers/auth';
import { boostRouter } from './routers/boost';
import { eventsRouter } from './routers/info';
import { onboardingRouter } from './routers/onboarding';
import { trainingRouter } from './routers/training';
import { trainingTaskRouter } from './routers/trainingTask';
import { usersRouter } from './routers/users';
import { weeksRouter } from './routers/week';
import { weekTaskRouter } from './routers/weekTask';
import { router } from './trpc';

export const appRouter = router({
  info: eventsRouter,
  onboarding: onboardingRouter,
  weeks: weeksRouter,
  weekTask: weekTaskRouter,
  boostTask: boostRouter,
  training: trainingRouter,
  trainingTask: trainingTaskRouter,
  auth: authRouter,
  users: usersRouter
});

export type AppRouter = typeof appRouter;
