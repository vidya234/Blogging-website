import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMedium } from "@fortawesome/free-brands-svg-icons";  
import { Avatar } from "./Avatar";
import { Link } from "react-router-dom";
interface AppbarProps {
  authorName: string;
  leftActions?: React.ReactNode;
  rightActions?: React.ReactNode;
}

export const Appbar = ({ authorName, leftActions= null, rightActions= null } : AppbarProps) => {
  return (
    <div>
      <div className="w-screen h-14 flex justify-between items-center p-6 mt-3 md:px-6">
        <div className="flex flex-row justify-center items-center">
          <Link to={'/blogs'}>
          <FontAwesomeIcon icon={faMedium} className="w-12 h-12 flex justify-center items-center" />
        </Link>
        <div className="flex items-center">
        {leftActions}
      </div>
        </div>

        <div className="flex flex-row justify-center items-center">
        <div className="flex items-center">
        {rightActions}
         </div>
          <Link to={'/publish'}>
            <button className="bg-gray-600 hover:bg-slate-600 text-white font-bold px-5 py-2 rounded-full mr-5 mt-1">
              New Blog
            </button>
          </Link>

          <Avatar authorName={authorName} size="big" />
        </div>
      </div>
      <hr className="h-px my-8 border-t border-gray-400" />
    </div>
  );
};
