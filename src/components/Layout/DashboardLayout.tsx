import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';


const DashboardLayout = ({ children}:{children:React.ReactNode}) => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  // Verifica se o usuário está autenticado ao montar o componente
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/signin'); // Redireciona para a página de login se o usuário não estiver autenticado
    }
  }, [isLoggedIn, navigate]);

  // Renderiza o conteúdo da dashboard se o usuário estiver autenticado
  return (
    <>
      {isLoggedIn && children}
    </>
  );
};

export default DashboardLayout;