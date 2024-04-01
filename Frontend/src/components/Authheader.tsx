import { Link } from "react-router-dom";

interface AuthheaderProps {
  type: "signup" | "signin";
}

export const Authheader = ({ type }: AuthheaderProps) => {
  const isSigningIn = type === "signin";
  const linkTo = isSigningIn ? "/signup" : "/signin";
  const linkText = isSigningIn ? "Signup" : "Login";
  const promptText = isSigningIn ? "Don't have an account?" : "Already have an account?";

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold text-left mb-2">
        {isSigningIn ? "Sign in to your account" : "Create an account"}
      </h1>
      <div>
        <p className="text-lg text-gray-500 font-medium mb-5">
          {promptText}{" "}
          <span className="underline cursor-pointer">
            <Link to={linkTo}>{linkText}</Link>
          </span>
        </p>
      </div>
    </div>
  );
};
