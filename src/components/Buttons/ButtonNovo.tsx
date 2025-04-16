import { User } from '../../types/types';
import ModalAddData from '../Modals/DataTableModals/ModalAddDataTable';

export interface ButtonNovoProps {
    dataType: string;
    closeModal: () => void;
    user: User;
}




const ButtonNovo:React.FC<ButtonNovoProps> = ({dataType, user}) => {
   
    if(dataType === 'achado'){
        dataType = 'tema'
    }
    
    if (dataType === 'beneficio') {
        dataType = 'achado'
    }

    return (
        <ModalAddData dataType={dataType} user={user} />
    )
}

export default ButtonNovo