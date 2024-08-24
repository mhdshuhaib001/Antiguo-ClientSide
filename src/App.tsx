import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import LoginPage from './pages/Registration';

const App: React.FC = () =>{
  return(
<Router>
  <Routes>
    <Route path='/' element ={<LoginPage/>}/>
  </Routes>
</Router>
  )
}

export default App