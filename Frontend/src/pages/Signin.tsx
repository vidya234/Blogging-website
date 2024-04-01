 
import { Authsignin } from "../components/AuthSignin";
import { Quote } from "../components/Quote"

export const Signin = () => {
	return (
	  <div className="grid grid-cols-1 md:grid-cols-2">
		<div className="grid grid-cols-1"><Authsignin /></div>
		<div className="invisible lg:visible">
		  <Quote></Quote>
		</div>
	  </div>
	);
  }
