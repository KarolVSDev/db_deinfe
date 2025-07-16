import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css'
import SignIn from './pages/SignPage/SignIn';
import { AuthProvider } from './context/AuthContext';
import Table from './pages/Dashboard/Table/Table';
import PrivateRoutes from './routes/PrivateRoutes';
import UsersAmin from './pages/Dashboard/Users_admin/UsersAdmin';
import ProfilePage from './pages/Dashboard/Profile/ProfilePage';
import PasswordChanger from './pages/SignPage/PasswordChanger';
import { CssBaseline } from '@mui/material';
import PasswordUpdater from './pages/SignPage/PasswordUpdater';
import { ThemeProvider as MuiThemeProvider} from '@mui/material';
import { lightTheme, darkTheme } from './theme/GlobalTheme';
import { ThemeProvider as CustomThemeProvider, useThemeContext } from './context/ThemeContext';

function AppContent() {

  const { isDark } = useThemeContext();

  return (
    <MuiThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <CssBaseline />
      <div className="App">
        <Router>
          <AuthProvider >
            <Routes>
              <Route path='/' element={<Navigate to="/signin" />} />
              <Route path='/signin' element={<SignIn />} />
              <Route path='/mudarsenha' element={<PasswordChanger />} />
              <Route path='/reset-password' element={<PasswordUpdater />} />
              {/*coloque o componente aqui */}
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
    </MuiThemeProvider>
  );
}

function App() {
  return (
    <CustomThemeProvider>
      <AppContent />
    </CustomThemeProvider>
  );
}

export default App;
