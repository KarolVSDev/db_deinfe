import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css'
import Home from './pages/Home/Home';
import Dashboard  from './pages/Dashboard/Dashboard'
import SignIn from './pages/SignPage/SignIn';
import SignUp from './pages/SignPage/SignUp';
import { AuthProvider, useAuth } from './context/AuthContext';
import Table from './pages/Dashboard/Table/Table';
import PrivateRoutes from './routes/PrivateRoutes';
import UpdateUserForm from './components/Forms/UpdateUserForm';



function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider >
          <Routes>
            <Route path='/'  element={<Navigate to="/signin"  />} />
            <Route path='/signup' element={<PrivateRoutes>
              <SignUp/>
            </PrivateRoutes>} />
            <Route path='/signin' element={<SignIn/>} />
            <Route path = '/dashboard' element={<PrivateRoutes>
              <Dashboard/>
            </PrivateRoutes>}/>
            <Route path = '/dashboard/table' element={<PrivateRoutes>
              <Table/>
            </PrivateRoutes>}/>
            <Route path = '/dashboard/edituser' element={<PrivateRoutes>
              <UpdateUserForm/>
            </PrivateRoutes>}/>
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
