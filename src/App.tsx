import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css'
import Dashboard  from './pages/Dashboard/Dashboard'
import SignIn from './pages/SignPage/SignIn';
import { AuthProvider, useAuth } from './context/AuthContext';
import Table from './pages/Dashboard/Table/Table';
import PrivateRoutes from './routes/PrivateRoutes';
import UsersAmin from './pages/Dashboard/Users_admin/UsersAdmin';
import ProfilePage from './pages/Dashboard/Profile/ProfilePage';



function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider >
          <Routes>
            <Route path='/'  element={<Navigate to="/signin"  />} />
            <Route path='/signin' element={<SignIn/>} />
            <Route path = '/dashboard' element={<PrivateRoutes>
              <Dashboard/>
            </PrivateRoutes>}/>
            <Route path = '/dashboard/table' element={<PrivateRoutes>
              <Table/>
            </PrivateRoutes>}/>
            <Route path = '/dashboard/edituser' element={<PrivateRoutes>
              <ProfilePage/>
            </PrivateRoutes>}/>
            <Route path = '/dashboard/usersadmin' element={<PrivateRoutes>
              <UsersAmin/>
            </PrivateRoutes>}/>
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
