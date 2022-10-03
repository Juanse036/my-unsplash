
import Photos from './components/photos/Photos'
import Login from "./components/login/Login";
import SignIn from "./components/signin/SignIn";
import Navbar from './components/navbar/Navbar';

import { Routes, Route, Navigate } from "react-router-dom";





function App() {
  
  return (
    <div className="App font-noto_sans ml-[98px] mr-[98px]">
      <Routes>
        <Route path="/photos" element={<Navbar />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<SignIn />} />
        <Route exact path="/" element={<Login />} />  
      </Routes>
    </div>
  )
}

export default App
