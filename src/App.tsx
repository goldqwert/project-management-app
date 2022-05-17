import React from 'react';
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import WelcomePage from './components/WelcomePage/WelcomePage';
import MainPage from './components/MainPage/MainPage';
import Login from './components/Authorization/Login/Login';
import SignUp from './components/Authorization/SignUp/SignUp';
import { RequireAuth } from "./components/hok/RequireAuth";
import Error from './components/ErrorPage/Error';
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
