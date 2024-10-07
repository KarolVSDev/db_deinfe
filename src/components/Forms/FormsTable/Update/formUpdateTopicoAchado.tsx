import { Box, Button, Container, Grid, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { TopicoAchado } from '../../../../types/types';
import { GridRowId } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import RegisterButton from '../../../Buttons/RegisterButton';
import HandleModalButton from '../../../Buttons/HandleTypeButton';
import ButtonExport from '../../../Buttons/ButtonExport';
import { useContextTable } from '../../../../context/TableContext';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

interface TopicoAchadoProp {
  closeModal: () => void;
  id: GridRowId | undefined;
}

const FormUpdateTopicoAchado: React.FC<TopicoAchadoProp> = ({ closeModal, id }) => {
  const { handleSubmit, register, formState: { errors }, reset } = useForm<TopicoAchado>({});
  const [topicoAchado, setTopicoAchado] = useState<TopicoAchado | null>(null);
  const { arrayTopicoAchado } = useContextTable();
  const [alignment, setAlignment] = useState('web');

  // Função para buscar o tópico do achado
  const getTopicoAchado = () => {
    const topico = arrayTopicoAchado.find(item => item.id === id);
    setTopicoAchado(topico || null);
  };

  useEffect(() => {
    if (id) {
      getTopicoAchado();
    }
  }, [id, arrayTopicoAchado]);

  const onSubmit = (data: TopicoAchado) => {
    // Simulando a atualização (API ou outra lógica aqui)
    closeModal();
  };

  if (!topicoAchado) {
    return <Typography variant="h6">Carregando...</Typography>;
  }

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    setAlignment(newAlignment);
  };

  return (
    <Container>
      <Box component="form" name="formTopicoAchado" noValidate onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h5" sx={{ pt: 3, pb: 3, color: '#1e293b', fontWeight: 'bold' }}>
          Atualizar Registro de Natureza do Achado
        </Typography>
        <Grid item xs={12} sm={4}>
          <TextField
            variant="filled"
            required
            defaultValue={topicoAchado.topico} // Certificando-se de que `topicoAchado` está definido
            fullWidth
            autoFocus
            id="descricao"
            label="Natureza do Achado"
            type="text"
            error={!!errors?.topico} // Corrigindo o erro
            {...register('topico', {
              required: 'Campo obrigatório'
            })}
          />
          {errors?.topico && (
            <Typography variant="caption" sx={{ color: 'red', ml: '10px' }}>
              {errors.topico?.message} {/* Acessando a mensagem correta */}
            </Typography>
          )}

          <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
          >
            <ToggleButton value={topicoAchado.situacao}>Pendente</ToggleButton>
            <ToggleButton value='true'>Aprovado</ToggleButton>
          </ToggleButtonGroup>
        </Grid>
        <RegisterButton text="Registrar" />
      </Box>
      <HandleModalButton handleModal={() => { }} />
      <ButtonExport handleExport={() => { }} />
    </Container>
  );
};

export default FormUpdateTopicoAchado;
