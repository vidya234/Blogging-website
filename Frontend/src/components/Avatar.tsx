export const Avatar = ({ authorName, size }: { authorName: string, size: "big" | "small" }) => {
	// Ensure that authorName is a non-empty string
	const initial = authorName && authorName.length > 0 ? authorName[0].toUpperCase() : '?';

	return (
	  <div className={`flex items-center justify-center rounded-full dark:bg-gray-600 mt-1 ${size === "big" ? "w-12 h-12" : "w-9 h-9"}`}>
		<span className="font-medium text-white dark:text-gray-300">
		  {initial}
		</span>
	  </div>
	);
  };
