import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css'
import Home from './pages/Home/Home';
import Dashboard  from './pages/Dashboard/Dashboard'
import SignIn from './pages/SignPage/SignIn';
import SignUp from './pages/SignPage/SignUp';
import { AuthProvider, useAuth } from './context/AuthContext';
import Cookies from 'universal-cookie';
import { useEffect } from 'react';


function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>
           <Route path="/dashboard" element={<Dashboard />} />
            <Route path='/signin' element={<SignIn/>} />
            <Route path='/' element={<Home/>} />
            <Route path='/signup' element={<SignUp/>} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
