import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import userRouter from './routes/user';
import blogRouter from './routes/blog';
import { cors } from 'hono/cors'; // Import cors

const router = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  }
}>();

router.use('/api/v1/*', cors()); // Use cors middleware for all routes under '/api/v1'

router.route('api/v1/user', userRouter);
router.route('api/v1/blog', blogRouter);

export default router;
