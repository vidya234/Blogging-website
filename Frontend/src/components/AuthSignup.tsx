import { Label } from "./Input";
import { useState, useEffect } from "react"; // Import useEffect here
import { SignupType } from "@vidya_123/medium-common";
import { Authheader } from "./Authheader";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "./config";
import axios from "axios";

const Authup = () => {
  const navigate = useNavigate();
  const [postinputs, setpostinputs] = useState<SignupType>({
    email: "",
    password: "",
    name: ""
  });


  useEffect(() => {
    console.log("Updated name:", name);
  }, [name]); // This effect will run whenever 'name' changes

  const handleSignup = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      const res = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, postinputs);
      const jwt = res.data.jwt;
      
      localStorage.setItem("token", jwt);
      navigate("/blogs");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center flex-col">
      <div className="bg-white p-10 rounded-lg flex flex-col">
        <Authheader type={"signup"} />
        <div className="flex flex-col space-y-4">
          <Label type="text" label="Username" placeholder="Enter the username" onChange={(e) => { setpostinputs({ ...postinputs, name: e.target.value }) }} />
          <Label type="email" label="Email" placeholder="Enter the email" onChange={(e) => { setpostinputs({ ...postinputs, email: e.target.value }) }} />
          <Label type="password" label="Password" placeholder="Enter the password" onChange={(e) => { setpostinputs({ ...postinputs, password: e.target.value }) }} />
        </div>
        <button onClick={handleSignup} className="mt-4 py-2 px-4 bg-black text-white rounded-lg w-80">Signup</button>
      </div>
    </div>
  );
};
export const AuthSignup = () => (

	  <Authup />

  );