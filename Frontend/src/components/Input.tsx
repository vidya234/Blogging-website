import { ChangeEvent } from "react";

interface labelled {
	type: string;
	label : string;
	placeholder : string;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Label= ({label, placeholder,onChange, type} : labelled) => {
  return (
    <div>
      <label className="flex flex-col space-y-1">
        <span className="text-lg font-medium">{label}</span>
        <input
          type= {type}
          placeholder={placeholder}
          className="shadow-lg border-black w-80 h-9 p-2 "
		  onChange={onChange}
        />
      </label>
    </div>
  );
};
