import React from 'react';
import {Link, Route, Routes, BrowserRouter, Navigate} from 'react-router-dom';
import {HomePage} from './containers/home_page';
import {LoginPage} from './containers/login_page';
import {LogoutPage} from './containers/logout_page';
import {MainPage} from './containers/main_page';

function App() {

  return (
    <BrowserRouter>
      <Link to="/home">Home</Link>
      <span> </span>
      <Link to="/login">Login</Link>
      <span> </span>
      <Link to="/logout">Logout</Link>
      <span> </span>
      <Link to="/register">Register</Link>
      <span> </span>
      <Link to="/main">Main</Link>
      <span> </span>
      <Link to="/room">Room</Link>
      <span> </span>
      <Link to="/game">Game</Link>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/main" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
