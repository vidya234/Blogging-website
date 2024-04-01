import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Signin } from './pages/Signin'
import {  BlogPage } from './pages/Blog'
import { Signup } from './pages/Signup';
import {Blogs} from "./pages/Blogs";
import { Publish } from './pages/Publish';
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blog/:id" element={<BlogPage />} />
          <Route path='/blogs' element = {<Blogs/>} />
          <Route path="/publish" element = {<Publish></Publish>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App