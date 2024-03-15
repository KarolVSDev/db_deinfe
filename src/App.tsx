import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Home from './pages/Home/Home';
import Dashboard  from './pages/Dashboard/Dashboard'
import SignIn from './pages/SignPage/SignIn';
import SignUp from './pages/SignPage/SignUp';
import { AuthProvider } from './context/AuthContext';

import PessoaFisica from './pages/Dashboard/Pessoa Física/PessoaFisica';


function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/signup' element={<SignUp/>} />
            <Route path='/signin' element={<SignIn/>} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/pessoafisica" element={<PessoaFisica />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
