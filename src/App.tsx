import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css'
import Dashboard from './pages/Dashboard/Dashboard'
import SignIn from './pages/SignPage/SignIn';
import { AuthProvider } from './context/AuthContext';
import Table from './pages/Dashboard/Table/Table';
import PrivateRoutes from './routes/PrivateRoutes';
import UsersAmin from './pages/Dashboard/Users_admin/UsersAdmin';
import ProfilePage from './pages/Dashboard/Profile/ProfilePage';
import PasswordChanger from './pages/SignPage/PasswordChanger';
import { CssBaseline } from '@mui/material';



function App() {
  return (
    <CssBaseline>
      <div className="App">
        <Router>
          <AuthProvider >
            <Routes>
              <Route path='/' element={<Navigate to="/signin" />} />
              <Route path='/signin' element={<SignIn />} />
              <Route path='/mudarsenha' element={<PasswordChanger />} />
              {/*coloque o componente aqui */}
              <Route path='/dashboard' element={<PrivateRoutes>
                <Dashboard />
              </PrivateRoutes>} />
              <Route path='/dashboard/table' element={<PrivateRoutes>
                <Table />
              </PrivateRoutes>} />
              <Route path='/dashboard/edituser' element={<PrivateRoutes>
                <ProfilePage />
              </PrivateRoutes>} />
              <Route path='/dashboard/usersadmin' element={<PrivateRoutes>
                <UsersAmin />
              </PrivateRoutes>} />
            </Routes>
          </AuthProvider>
        </Router>
      </div>
    </CssBaseline>
  );
}

export default App;
