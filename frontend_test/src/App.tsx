import React from 'react';
import {Link, Route, Routes, BrowserRouter, Navigate} from 'react-router-dom';
import {usePage} from './hooks/use_page';
import {HomePage} from './containers/home_page';
import {LoginPage} from './containers/login_page';

function App() {
  const {page} = usePage();

  return (
    <BrowserRouter>
      <Link to="/home">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
      <Link to="/main">Main</Link>
      <Link to="/find">Find</Link>
      <Link to="/room">Room</Link>
      <Link to="/game">Game</Link>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
