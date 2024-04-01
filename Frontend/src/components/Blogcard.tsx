import { Link } from "react-router-dom";
import { Avatar } from "./Avatar";

interface Blogprops {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
  id : string;
}

export const Blogcard = ({
  id,
  authorName,
  title,
  content,
  publishedDate,
}: Blogprops) => {
  return (
	<Link to={`/blog/${id}`} className="m-4 md:w-1/2">

	<div className="flex items-center space-x-2">
	  <Avatar authorName = {authorName} size="small"/>
	  <span className="inline-block align-middle font-normal">
		{authorName}
	  </span>
	  <span className="inline-block align-middle">
		&middot;
	  </span>
	  <span className="inline-block align-middle text-slate-500">
		{publishedDate}
	  </span>
	</div>

	<div className="text-3xl font-bold my-2">{title}</div>
	<div className="text-slate-700 font-serif text-xl mb-4">{content.slice(0, 100) + "..."}</div>

	<div className=" text-slate-500">{`${Math.ceil(content.length / 100)} min read`}</div>
	<hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-300"/>

  
</Link>
  );
};
