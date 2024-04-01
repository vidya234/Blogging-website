
import { Avatar } from "./Avatar";

interface Blogprops {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
  id : string;
}

export const BlogP = ({
   
  authorName,
  title,
  content,
  publishedDate,
}: Blogprops) => {

  return (
	<div className="m-4 w-screen grid grid-cols-4 gap-4 p-6 space-x-4">
  <div className="flex flex-col col-span-4 space-y-4 md:col-span-3">
    <div className="text-5xl font-bold">{title}</div>
    <div className="text-slate-500">Published on {publishedDate.slice(0,10)}</div>
    <div className="text-slate-700 font-serif text-xl">{content}</div>
   <br></br>
    <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-300"/>
  </div>
  <div className="invisible md:visible flex flex-col col-span-1 justify-start items-start space-y-2 ">
    <div className="font-semibold text-lg">Author</div>
    <div className="flex flex-row justify-center items-center space-x-1">
      <Avatar authorName ="df" size="small"/>
      <div className="p-1">
		<p className=" px-2">{authorName}</p>
		<p className=" px-2">he is good at is work jh0ihhygbgfcgth</p>

		</div>
    </div>
  </div>
</div>

  );
};

