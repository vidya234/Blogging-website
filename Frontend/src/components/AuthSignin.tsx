import {  useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SigninType } from "@vidya_123/medium-common";
import { Authheader } from "./Authheader";
import { Label } from "./Input";

import { BACKEND_URL } from "./config";

const Authin = () => {
  const navigate = useNavigate();
  const [postinputs, setPostInputs] = useState<SigninType>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);


  const handleSignup = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      const res = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, postinputs);
      const jwt = res.data.jwt;

      localStorage.setItem('token', jwt);
      navigate("/blogs");
    } catch (error) {
      console.error(error);
      setError("Failed to sign in. Please check your credentials.");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center flex-col">
      <div className="bg-white p-10 rounded-lg flex flex-col">
        <Authheader type={"signin"} />
        <div className="flex flex-col space-y-4">
          <Label type="email" label="Email" placeholder="Enter the email" onChange={(e) => setPostInputs({ ...postinputs, email: e.target.value })} />
          <Label type="password" label="Password" placeholder="Enter the password" onChange={(e) => setPostInputs({ ...postinputs, password: e.target.value })} />
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <button onClick={handleSignup} className="mt-4 py-2 px-4 bg-black text-white rounded-lg w-80">Signin</button>
      </div>
    </div>
  );
};

export const Authsignin = () => (

    <Authin />

);
