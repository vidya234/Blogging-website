
import { AuthSignup } from "../components/AuthSignup";
import { Quote } from "../components/Quote"

export const Signup = () => {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2">
		<div className="grid grid-cols-1"><AuthSignup /></div>
		<div className="invisible lg:visible">
		  <Quote></Quote>
		</div>
	  </div>
	);
  }
