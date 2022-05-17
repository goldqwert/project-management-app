import React from 'react';
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import WelcomePage from './Pages/WelcomePage/index';
import MainPage from './Pages/MainPage/MainPage';
import Login from './Pages/AuthorizationPage/LoginPage/index';
import SignUp from './Pages/AuthorizationPage/SignUpPage/index';
import { RequireAuth } from './components/hok/RequireAuth';
import Error from './Pages/ErrorPage/index';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/" element={<Navigate to="/" />} />
        <Route element={<RequireAuth />}>
          <Route path="/main" element={<MainPage />} />
        </Route>
        <Route to="/error" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
