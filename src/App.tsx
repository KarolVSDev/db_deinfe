import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css'
import Home from './pages/Home/Home';
import Dashboard  from './pages/Dashboard/Dashboard'
import SignIn from './pages/SignPage/SignIn';
import SignUp from './pages/SignPage/SignUp';
import { AuthProvider } from './context/AuthContext';
import Table from './pages/Dashboard/Table/Table';


function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>
            <Route path='/'  element={<Navigate to="/signin"  />} />
            <Route path='/signup' element={<SignUp/>} />
            <Route path='/signin' element={<SignIn/>} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/table" element={<Table />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
