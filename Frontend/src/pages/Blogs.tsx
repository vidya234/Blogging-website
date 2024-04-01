

import { Appbar } from "../components/Appbar";
import { Blogcard } from "../components/Blogcard";
import { AppbarSkel, Blogskel } from "../components/BlogsSkeleton";
import { useBlogs } from "../hooks";
import { NameProvider, useName } from "../context/Usercontext";

interface Blog {
  content: string;
  title: string;
  id: string;
  createdAt: string;
  author: {
    name: string;
  };
}

export const BlogsInner = () => {
  const { loading, blogs} = useBlogs();
  const { name } = useName();

  console.log(name);
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' };
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };

  if (loading) {
    return (
      <div>
        <AppbarSkel />
        <Blogskel />
        <Blogskel />
        <Blogskel />
      </div>
    );
  }

  else {


  return (
    <div className="flex flex-col justify-center items-center">
      <Appbar authorName={name} />
      <br />
      {blogs.map((b: Blog) => (
        <Blogcard
          key={b.id}
          id={b.id}
          authorName={b.author.name}
          title={b.title}
          content={b.content}
          publishedDate={formatDate(b.createdAt)}
        />
      ))}
    </div>
  );
};
}
export const Blogs = () => (
  <NameProvider>
    <BlogsInner />
  </NameProvider>
);
