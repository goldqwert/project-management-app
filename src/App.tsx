import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import WelcomePage from './Pages/WelcomePage/index';
import MainPage from './Pages/MainPage/index';
import Login from './Pages/AuthorizationPage/LoginPage/index';
import SignUp from './Pages/AuthorizationPage/SignUpPage/index';
import { RequireAuth } from './components/hok/RequireAuth';
import Error from './Pages/ErrorPage/index';
import EditProfile from './Pages/EditProfile';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route
          path="/main"
          element={
            <RequireAuth>
              <MainPage />
            </RequireAuth>
          }
        />
        <Route path="/edit" element={<EditProfile />}/>
        <Route path="/error" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
