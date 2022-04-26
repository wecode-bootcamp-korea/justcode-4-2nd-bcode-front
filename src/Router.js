import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Nav from './components/Nav/Nav';
import Footer from './components/Footer/Footer';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Main from './pages/Main/Main';
import List from './pages/List/List';
import Detail from './pages/Detail/Detail';

import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';

function Router() {
  return (
   <ThemeProvider theme={theme}>
       <BrowserRouter>
         <Nav />
         <Routes>
           <Route path="/login" element={<Login />} />
           <Route path="/signup" element={<Signup />} />
           <Route path="/" element={<Main />} />
           <Route path="/list" element={<List />} />
           <Route path="/detail/:product_id" element={<Detail />} />
         </Routes>
         <Footer />
       </BrowserRouter>
    </ThemeProvider>
  );
}

export default Router;
