import React from 'react';
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import WelcomePage from './WelcomePage/WelcomePage';
import MainPage from './MainPage/MainPage';
import Login from './AuthorizationPage/Login/Login';
import SignUp from './AuthorizationPage/SignUp/SignUp';
import { RequireAuth } from "./components/hok/RequireAuth";
import Error from './ErrorPage/Error';
import './App.css';

function App() {
  return (
   <BrowserRouter>
     <Routes>
       <Route path="/" element={ <WelcomePage />}/>
       <Route path="/login" element={<Login/>}/>
       <Route path="/sign-up" element={<SignUp />}/>
       <Route path="/" element={<Navigate to="/" />}/>
       <Route element={<RequireAuth />}>
         <Route path="/main" element={
             <MainPage />
         }/>
       </Route>
         <Route to="/error" element={<Error />}/>
     </Routes>
   </BrowserRouter>
  );
}

export default App;
