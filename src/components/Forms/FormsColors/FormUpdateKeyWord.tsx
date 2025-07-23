import { Box, Divider, FormControl, IconButton, keyframes, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { KeyWord, KeyWordUpdate } from "../../../types/types";
import EditIcon from '@mui/icons-material/Edit';
import useFetchKeyWord from "./useFetchKeyWord";
import Helper from "../../Dialog/Helper";
import DeleteIcon from '@mui/icons-material/Delete';


const grow = keyframes`
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.2);
  }
`;

interface FormUpdateKeyWordProps {
    keyword: KeyWord;
    handleCloseModalDelete: () => void;
}


const FormUpdateKeyWord: React.FC<FormUpdateKeyWordProps> = ({ keyword, handleCloseModalDelete }) => {
    const { handleSubmit, register, formState: { errors } } = useForm<KeyWordUpdate>({
        defaultValues: {
            label: keyword.label,
        }
    });

    const { updateKeyWord } = useFetchKeyWord();

    const onSubmit = async (data: KeyWordUpdate) => {
        const dataToUpdate = {
            ...data,
            id: keyword.id
        }
        await updateKeyWord(dataToUpdate)
    }

    const handleDelete = () => {
        handleCloseModalDelete(); // Esta função deve abrir o modal no componente pai
    }

    return (
        <Box
            component="form"
            name='formKeyWordUpdate'
            id='formKeyWordUpdate'
            onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleSubmit(onSubmit)(e);
            }}
            sx={{ display: 'flex', flexDirection: 'row' }}
        >
            <FormControl sx={{ display: 'flex', flexDirection: 'row' }} >
                <TextField
                    variant='outlined'
                    required
                    fullWidth
                    size="small"
                    id="label"
                    label='Palavra Chave'
                    type="text"
                    error={!!errors?.label}
                    {...register('label', {
                        required: 'Campo obrigatório'
                    })}
                />

                {errors?.label && (
                    <Typography variant="caption" sx={{ color: 'red', ml: '10px' }}>
                        {errors.label.message}
                    </Typography>
                )}

                <Divider orientation="vertical" flexItem sx={{ mr: 2, ml: 2 }} />
                <Helper title="Clique aqui para editar o registro">
                    <IconButton type='submit'
                        sx={{
                            '&:hover': {
                                backgroundColor: 'transparent',
                                animation: `${grow} 0.2s ease-in-out forwards`
                            }
                        }}
                    >
                        <EditIcon sx={{ color: 'primary.main' }} />
                    </IconButton>
                </Helper>

                <Helper title="Clique aqui para deletar o registro">
                    <IconButton color="error" onClick={() => handleDelete()}
                        sx={{
                            '&:hover': {
                                backgroundColor: 'transparent',
                                animation: `${grow} 0.2s ease-in-out forwards`
                            }
                        }}
                    >
                        <DeleteIcon />
                    </IconButton>
                </Helper>
            </FormControl>
        </Box>


    )
}

export default FormUpdateKeyWord;