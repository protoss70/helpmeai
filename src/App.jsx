import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth';
import fire from "./api/firebase";
import Nav from './Components/Nav/Nav';
import Register from './Components/Auth/Register';
import Sign from "./Components/Auth/Sign";
import { useEffect, useState } from 'react';
import Forgot from './Components/Auth/Forgot';

fire.initApp();

function App() {

  const [user] = useAuthState(fire.authUser());
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    
    if (user){
      fire.getUserData(user.email).then(data => {
        setUserData(data);
        console.log("auth user: ", data);
      })
    }

  }, [user])

  return (
  <>
    <BrowserRouter>
    <Nav user={user} fire={fire}/>
      <Routes>
        <Route path="/signin" element={<Sign user={user} fire={fire} />} />
        <Route path="/register" element={<Register user={user} fire={fire} />} />
        <Route path="/forgot" element={<Forgot fire={fire}/>} />
      </Routes>
    </BrowserRouter>
  </>
  );
}

export default App;
