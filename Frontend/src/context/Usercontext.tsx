import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios"; // Import axios for making HTTP requests
import { BACKEND_URL } from "../components/config";
interface NameContextType {
  name: string;
}


const NameContext = createContext<NameContextType | null>(null);

export const NameProvider = ({ children }: { children: React.ReactNode }) => {
  const [name, setName] = useState<string>("");

  useEffect(() => {
    const fetchName = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/blog/username`, {headers : {
          Authorization : `Bearer ${localStorage.getItem('token')}`
        }}); // Adjust the endpoint as needed
        setName(response.data.username);
      } catch (error) {
        console.error("Error fetching name:", error);
      }
    };

    fetchName();
  }, []);

  return (
    <NameContext.Provider value={{ name }}>
      {children}
    </NameContext.Provider>
  );
};

export const useName = (): NameContextType => {
  const context = useContext(NameContext);
  if (!context) {
    throw new Error("useName must be used within a NameProvider");
  }
  return context;
};

