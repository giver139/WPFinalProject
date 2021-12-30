import React from 'react';
import {Link, Route, Routes, BrowserRouter, Navigate} from 'react-router-dom';
import {HomePage} from './containers/home_page';
import {LoginPage} from './containers/login_page';
import {RegisterPage} from './containers/register_page';
import {LogoutPage} from './containers/logout_page';
import {MainPage} from './containers/main_page';
import {RoomPage} from './containers/room_page';
import {usePage} from './hooks/use_page';

function App() {

  const {user, relogin} = usePage();

  if(user) {
    return (
      <BrowserRouter>
        <Link to="/home">Home</Link>
        <span> </span>
        <Link to="/logout">Logout</Link>
        <span> </span>
        <Link to="/main">Main</Link>
        <span> </span>
        <Link to="/room">Room</Link>
        <span> </span>
        <Link to="/game">Game</Link>
        <h1>{`Hi, ${user}`}</h1>
        <Routes>
          <Route index element={<Navigate to="/home" />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/logout" element={<LogoutPage />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/room" element={<RoomPage />} />
        </Routes>
      </BrowserRouter>
    );

  }
  else {
    return (
      <BrowserRouter>
        <Link to="/login">Login</Link>
        <span> </span>
        <Link to="/register">Register</Link>
        <Routes>
          <Route index element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </BrowserRouter>

    );
  }
}

export default App;
