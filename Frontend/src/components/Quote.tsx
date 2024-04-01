export const Quote = () =>{
	return (
		<div className="bg-slate-200 h-screen flex flex-col shadow-lg rounded-lg border-black justify-center items-center p-20 space-y-8">
		  <div className=" p-4 max-w-prose text-center items-baseline  rounded-lg shadow-md">
			<div className="text-3xl font-medium">"The customer service I received was exceptional. The support team went above and beyond to address my concerns."</div>
			<div className="flex flex-col items-baseline text-center m-4">
			<span className="text-lg text-gray-700 font-medium ">
			  - Jules Winnfield
			</span>
			<span className="text-lg text-gray-500 font-medium">
			  CEO | acme corp
			</span>
		  </div>
		  </div>

		</div>
	  );



}