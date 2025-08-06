import { useState } from 'react';
import { topicoAchadoHeader, achadoHeader, processoHeader, coletaHeader } from '../../../service/columns'
import { useContextTable } from '../../../context/TableContext';
import useFetchProcesso from '../../Forms/FormsTable/Create/FormProcessoPasta/useFetchProcesso';
import useFetchColeta from '../../Forms/FormsTable/Create/formColetaPasta/useFetchColeta';
import useFetchKeyWord from '../../Forms/FormsColors/useFetchKeyWord';
import useFetchAchado from '../../Forms/FormsTable/Create/FormAchadoPasta/useFetchAchado';
import useFetchTema from '../../Forms/FormsTable/Create/FormTemaPasta/useFetchTema';

export const useControllerTable = () => {
    const [dataType, setDataType] = useState('relacionamentos');
    const [isLoading, setIsLoading] = useState(true);
    const [textButton, setTextButton] = useState('');
    const { escutarTemas } = useFetchTema();
    const { escutarAchados } = useFetchAchado();
    const { escutarProcessos } = useFetchProcesso();
    const { escutarColeta } = useFetchColeta();
    const { escutarKeyWords } = useFetchKeyWord();
    const { setArrayTopicoAchado, setArrayAchado, setArrayProcesso, setArrayColeta, setArrayKeyWord } = useContextTable();

        //Esse bloco controla a renderizaçao dos dados
        const handleDataTypeChange = (event: { target: { value: string; }; }) => {
            const value = event.target.value as string;
            setDataType(value)
            setIsLoading(true);
            let keywordUnsubscribe: (() => void) | undefined;

            // Sempre escuta keywords
            keywordUnsubscribe = escutarKeyWords((keywords) => {
                setArrayKeyWord(keywords);
            });
            switch (value) {
                case 'tema':
                    setTextButton('Tema')
                    setColumns(createGridColumns(topicoAchadoHeader));
                    const temaListener = escutarTemas((temas) => {
                        setArrayTopicoAchado(temas)
                        setRows(createRows(temas))
                        setIsLoading(false);
                    })
                    return () => temaListener;
                case 'achado':
                    setTextButton('Banco de Achado')
                    setColumns(createGridColumns(achadoHeader));
                    const achadoListener = escutarAchados((achados) => {
                        const keywordListener = escutarKeyWords((keyword) => {
                            return keyword;
                        })
                        keywordListener();
                        setArrayAchado(achados)
                        setRows(createRows(achados))
                        setIsLoading(false);
                    })
                    return () => achadoListener;
                case 'processo':
                    setTextButton('Processo')
                    setColumns(createGridColumns(processoHeader));
                    const processoListener = escutarProcessos((processos) => {
                        setArrayProcesso(processos)
                        setRows(createRows(processos))
                        setIsLoading(false);
                    })
                    return () => processoListener;
                case 'relacionamentos':
                    setTextButton('Coleta')
                    setColumns(createGridColumns(coletaHeader));
                    const coletaListener = escutarColeta((coleta) => {
                        setArrayColeta(coleta)
                        setRows(createRows(coleta))
                        setIsLoading(false);
                    })
                    return () => coletaListener;
                default:
                    setColumns([]);
                    setRows([])
                    keywordUnsubscribe
            }
        };

        return {
            handleDataTypeChange
        }
    }
