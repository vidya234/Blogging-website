import   { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_URL } from '../components/config';
import { Appbar } from '../components/Appbar';
import { NameProvider, useName } from '../context/Usercontext';


export const Published  = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
const {name} = useName();


  const handleSubmit = async () => {
    // Check if title and content are not empty
    if (title.trim() && content.trim()) {
      try {
        const response = await axios.post(
          `${BACKEND_URL}/api/v1/blog`,
          {
            title: title,
            content: content
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token') || ''}`
            }
          }
        );
        // Assuming the backend response contains the id of the new blog post
        console.log('Blog post created:', response.data);
        navigate('/blogs');
      } catch (error) {
        console.error('Error submitting blog post:', error);
        // Handle error (e.g., show error message)
      }
    } else {
      console.warn('Title and content cannot be empty');
    }
  };

  const leftActions = (
    <>
      <div className="flex items-center space-x-2 text-gray-600 mx-4">
        <div>•</div>
        <div>Draft in Kirags</div>
        <div>•</div>
        <div>Saved</div>
      </div>

    </>
  );
  const rightActions = (
		<>
		<button
        type="button"
        className="bg-gray-600 hover:bg-slate-600 text-white font-bold px-5 py-2 rounded-full mr-5 mt-1"
        onClick={handleSubmit}
      >
        Publish
      </button>
		</>
  );

  return (
	<>
	<Appbar authorName={name} leftActions={leftActions} rightActions = {rightActions}></Appbar>
	<div className="min-h-screen flex flex-col justify-center px-8">
      <div className="max-w-2xl mx-auto">



        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full text-5xl font-bold text-gray-900 bg-transparent focus:outline-none flex justify-center items-center"
          placeholder="Title"
        />
		 <hr className="h-px my-8 border-t border-gray-400" />

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full text-2xl mt-4 text-gray-700 bg-transparent focus:outline-none"
          rows={10}
          placeholder="Tell your story..."
        />
      </div>
    </div>


	</>

  );
};

export const Publish = () => (
  <NameProvider>
    <Published/>
  </NameProvider>
)

