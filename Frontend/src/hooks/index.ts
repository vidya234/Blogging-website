import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../components/config";


export const useBlogs = () => {
	const [loading, setLoading] = useState(true);
	const [blogs, setBlogs] = useState([]);

	useEffect(() => {
	  const fetchBlogs = async () => {
		try {
		  const res = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {headers : {
			Authorization :`Bearer ${localStorage.getItem('token')}`
		  }});
		  console.log(res.data);
		  setBlogs(res.data);
		  setLoading(false);
		} catch (e) {
		  console.error(e);
		  setLoading(false); // Ensure loading is set to false even if there is an error
		}
	  };

	  fetchBlogs();
	}, []);

	return { loading, blogs };
  };
  interface Blog {
	id: string;
	title: string;
	content: string;
	createdAt: string;
	author: {
	  name: string;
	};
  }

 export const useBlog = ({id} : {id : string | undefined}) =>{
	const [loading, setLoading] = useState(true);
	const [blog, setBlog] = useState<Blog | null>(null);


	useEffect(() => {
	  const fetchBlogs = async () => {
		try {
		  const res = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {headers : {
			Authorization :`Bearer ${localStorage.getItem('token')}`
		  }});
		  console.log(res.data);
		  setBlog(res.data);
		  setLoading(false);
		} catch (e) {
		  console.error(e);
		  setLoading(false); // Ensure loading is set to false even if there is an error
		}
	  };

	  fetchBlogs();
	}, []);

	return { loading, blog };
 }