import { useParams } from 'react-router-dom';
import { useBlog } from '../hooks';
import { BlogP } from '../components/Blogpage';
import { Appbar } from '../components/Appbar';
import { NameProvider, useName } from '../context/Usercontext';

interface Blog {
	id: string;
	title: string;
	content: string;
	createdAt: string;
	author: {
	  name: string;
	};
}

 const BlogPager = () => {
  const { id } = useParams<{ id: string }>();
  const { loading, blog }: { loading: boolean; blog: Blog | null } = useBlog({ id });
  const { name } = useName(); // Ensure that the useName hook is used inside a component wrapped in NameProvider

  if (loading) {
    return <div>loading...</div>;
  } else {
    if (blog !== null) {
      return (
        <>
          <Appbar authorName={name}></Appbar>
          <div>
            <BlogP authorName={blog.author.name} title={blog.title} publishedDate={blog.createdAt} content={blog.content} id={''} />
          </div>
        </>
      );
    }
  }
};


export const BlogPage = () => (
	<NameProvider>
		<BlogPager />
	</NameProvider>
);



