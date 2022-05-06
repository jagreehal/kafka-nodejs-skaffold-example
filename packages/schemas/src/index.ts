import { z } from 'zod';

export const AnExampleEvent = z.object({
  id: z.string(),
  username: z.string()
});
