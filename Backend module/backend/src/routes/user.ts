import { Hono } from 'hono';
import { Prisma, PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { sign, verify } from 'hono/jwt';
import { signinInput, signupInput } from '@vidya_123/medium-common';
import { cors } from 'hono/cors';



const userRouter = new Hono<{
	Bindings: {
	  DATABASE_URL: string;
	  JWT_SECRET: string;
	};
  }>();
  userRouter.use(cors());
  userRouter.post('/signup', async (c) => {


  const body = await c.req.json();
  const {success} = signupInput.safeParse(body);
  if(!success){
     c.status(411);
     return c.json({message : "invalid input!"})
  }

  const prisma = new PrismaClient({
	datasources: {
	  db: {
		url: c.env.DATABASE_URL,
	  },
	},
  }).$extends(withAccelerate());

  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name : body.name
      },
    });

    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);


    return c.json({ jwt  });
  } catch (e) {
    c.status(403);
    console.log(e);
    return c.json({ error: 'Error while signing up' });
  }
});


userRouter.post('/signin', async (c) => {

  const prisma = new PrismaClient({
    datasources: {
      db: {
      url: c.env.DATABASE_URL,
      },
    },
    }).$extends(withAccelerate());


  const body = await c.req.json();
 // console.log(body);
  const {success} = signinInput.safeParse(body);
  if(!success){
     c.status(411);
     return c.json({message : "invalid input!"})
  }
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (!user) {
      c.status(403);
      return c.json({ error: 'User not found' });
    }

    // Check if password is correct

    if (body.password != user.password) {
      c.status(403);
      return c.json({ error: 'Invalid password' });
    }

    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);

    return c.json({ jwt });
  } catch (e) {
    c.status(403);
    return c.json({ error: 'Error while signing in' });
  }
});


export default userRouter;