import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { verify } from 'hono/jwt';
import { createPostInput, updatePostInput } from '@vidya_123/medium-common';
import { cors } from 'hono/cors';
const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  },
  Variables: {
    userId: string;
  };
}>();
blogRouter.use(cors()); //
blogRouter.use('/*', async (c, next) => {
  const header = c.req.header('Authorization') || '';
  const token = header.split(' ')[1];
  try {
    const res = await verify(token, c.env.JWT_SECRET);
    if (res.id) {
      c.set('userId', res.id);
      await next();
    } else {
      return c.json({ error: 'Unauthorized' }, 403);
    }
  } catch (e) {
    return c.json({ error: 'Unauthorized' }, 403);
  }
});

blogRouter.post('/', async (c) => {
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: c.env.DATABASE_URL,
      },
    },
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();
    const {success} = createPostInput.safeParse(body);
    if (!success) {
      c.status(411);
      return c.json({message: "Invalid input!"});
    }

    // Retrieve the user's information based on the userId
    const userId = c.get('userId');
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return c.json({ error: 'User not found' }, 404);
    }


    const blog = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: userId,
        createdAt: new Date().toISOString()
      },
      include: {
        author: true,
      },
    });



    return c.json({ id: blog.id});
  } catch (e) {
    return c.json({ error: 'Error creating blog post' }, 500);
  }
});


blogRouter.put('/', async (c) => {
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: c.env.DATABASE_URL,
      },
    },
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();
    const {success} = updatePostInput.safeParse(body);
    if(!success){
      c.status(411)
      return c.json({message : "Invalid input!"})
    }
    const blog = await prisma.post.update({
      where: {
        id: body.id,
      },
      data: {
        title: body.title,
        content: body.content,
      },
    });
    return c.json({ id: blog.id });
  } catch (e) {
    return c.json({ error: 'Error updating blog post' }, 500);
  }
});

blogRouter.get('/username', async (c) => {
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: c.env.DATABASE_URL,
      },
    },
  }).$extends(withAccelerate());

  // Retrieve the userId set by the authMiddleware
  const userId = c.get('userId');

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return c.json({ error: 'User not found' }, 404);
    }

    return c.json({ username: user.name });
  } catch (e) {
    console.error(e);
    return c.json({ error: 'Error fetching username' }, 500);
  }
});

blogRouter.get('/bulk', async (c) => {
	const prisma = new PrismaClient({
	  datasources: {
		db: {
		  url: c.env.DATABASE_URL,
		},
	  },
	}).$extends(withAccelerate());

	try {
	  const blogs = await prisma.post.findMany({
      select : {
        content :true,
        title:true,
        id:true,
        createdAt :true,

          author: {
            select: {
              name: true,
            },
          },

      }
    });

	  return c.json(blogs);
	} catch (e) {
	  return c.json({ error: 'Error fetching blog posts' }, 500);
	}
  });




blogRouter.get('/:id', async (c) => {
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: c.env.DATABASE_URL,
      },
    },
  }).$extends(withAccelerate());

  try {
    const id = c.req.param('id');
    const blog = await prisma.post.findUnique({
      where: {
        id,
      },
      select : {
        id : true,
        title : true,
        content : true,
        createdAt:true,
        author :{
         select : { name : true}
        }
      }
    });

    if (blog) {
      return c.json(blog);
    } else {
      return c.json({ error: 'Blog not found' }, 404);
    }
  } catch (e) {
    return c.json({ error: 'Error fetching blog post' }, 500);
  }
});





export default blogRouter;
