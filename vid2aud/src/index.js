import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LeftNavBar } from './components/LeftNavBar';
import './index.css';
import { About } from './Pages/About';
import { Auth } from './Pages/Auth';
import { Contact } from './Pages/Contact';
import { Developers } from './Pages/Developers';
import { Home } from './Pages/Home';
import { Play } from './Pages/User/Play';
import { UserApp } from './Pages/User/UserAppPage';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/auth/*' element={<Auth />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/developers' element={<Developers />} />
        <Route path='/about' element={<About />} />

        <Route path='/play' element={<Play />} />
        <Route path='/main/*' element={<UserApp />} />
      </Routes>
        
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
