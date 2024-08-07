import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { ColumnConfig, dataRelation, jurisdRelation, ListData, NatAchadoUp, ProcessoDetails } from '../../types/types';
import { interessadoHeader, apensoHeader, pessoaJurisdHeader, jurisdHeader, juridJurisdHeader, natAchadoRelationHeader } from '../../service/columns';
import { useContextTable } from '../../context/TableContext';
import DeleteDataButton from '../Buttons/DeleteButton';
import useFetchListData from '../../hooks/useFetchListData';
import { formateDateToPtBr } from '../../hooks/DateFormate';
import useFormData from '../../hooks/useFormData';


export interface DataProcessoDetailsProps {
    dataType: string;
    Details?: ProcessoDetails | undefined;
    arrayRelation?: dataRelation | undefined;
    arrayListData?: ListData[];
    jursidDetails?: jurisdRelation | undefined;
    natAchadoRelations?: NatAchadoUp;
}
const DataProcessoDetails: React.FC<DataProcessoDetailsProps> = ({ natAchadoRelations, dataType, Details, arrayRelation, arrayListData, jursidDetails }) => {
    const [columns, setColumns] = useState<GridColDef[]>([]);
    const [rows, setRows] = useState<any[]>([]);
    const { handleLocalization } = useContextTable()
    const { onDelete } = useFetchListData()
    const {transformNat} = useFormData()

    const handleDelete = (id: string, type: string) => {
        if (id) {
            onDelete(id, type)
        }
    }

    const createGridColumns = (headers: ColumnConfig[]): GridColDef[] => {

        return headers.map(header => ({
            field: header.id,
            headerName: header.label,
            width: header.minWidth,
            editable: false,
            renderCell: (params: GridRenderCellParams) => {
                return params.value;
            },
        }));
    };


    const createRows = (data: any[]): any[] => {
        return data.map((item, index) => ({
            id: item.id,
            ...item,
        }));
    };



    useEffect(() => {
        if (dataType === "apenso") {
            setColumns(createGridColumns(apensoHeader));
            if (Details) {
                setRows(createRows(Details.apensados.map(apenso => ({
                    id: apenso.id,
                    remover: <DeleteDataButton stateType={dataType} itemId={apenso.id} handleDelete={handleDelete} />,
                    numero: apenso.apensado.numero,
                    ano: apenso.apensado.ano,
                    natureza: apenso.apensado.natureza,
                    exercicio: apenso.apensado.exercicio,
                    objeto: apenso.apensado.objeto,
                    arquivamento: formateDateToPtBr(apenso.apensado.arquivamento)
                }))));
            }
        } else if (dataType === "interessado") {
            setColumns(createGridColumns(interessadoHeader));
            if (Details?.interessados) {
                setRows(Details.interessados.map(interessado => ({
                    id: interessado.id,
                    remover: <DeleteDataButton stateType={dataType} itemId={interessado.id} handleDelete={handleDelete} />,
                    interesse: interessado.interesse,
                    pessoa: interessado.pessoa.nome,
                })))
            }
        } else if (dataType === "processo") {
            setColumns(createGridColumns(apensoHeader));
            if (arrayRelation?.processos) {
                setRows(arrayRelation.processos.map(processo => ({
                    id: processo.id,
                    remover: <DeleteDataButton stateType={dataType} itemId={processo.id} handleDelete={handleDelete} />,
                    numero: processo.numero,
                    ano: processo.ano,
                    natureza: processo.natureza,
                    exercicio: processo.exercicio,
                    objeto: processo.objeto,
                    arquivamento: formateDateToPtBr(processo.arquivamento)
                })));
            } else if (jursidDetails?.processos) {
                setRows(jursidDetails.processos.map(processo => ({
                    id: processo.id,
                    remover: <DeleteDataButton stateType={dataType} itemId={processo.id} handleDelete={handleDelete} />,
                    numero: processo.numero,
                    ano: processo.ano,
                    natureza: processo.natureza,
                    exercicio: processo.exercicio,
                    objeto: processo.objeto,
                    arquivamento: formateDateToPtBr(processo.arquivamento)
                })));
            }

        } else if (dataType === "pessoajurisd") {
            setColumns(createGridColumns(pessoaJurisdHeader));
            if (arrayRelation?.pessoaJurisds) {
                setRows(arrayRelation.pessoaJurisds.map(pessoaJurisd => ({
                    id: pessoaJurisd.id,
                    remover: <DeleteDataButton stateType={dataType} itemId={pessoaJurisd.id} handleDelete={handleDelete} />,
                    cargo: pessoaJurisd.cargo,
                    mandato: pessoaJurisd.mandato,
                    normaNomeacao: pessoaJurisd.normaNomeacao,
                    dataNomeacao: formateDateToPtBr(pessoaJurisd.dataNomeacao),
                    normaExoneracao: pessoaJurisd.normaExoneracao,
                    dataExoneracao: formateDateToPtBr(pessoaJurisd.dataExoneracao),
                    gestor: pessoaJurisd.gestor

                })))
            } else if (jursidDetails?.pessoaJurisds) {
                setRows(jursidDetails.pessoaJurisds.map(pessoaJurisd => ({
                    id: pessoaJurisd.id,
                    remover: <DeleteDataButton stateType={dataType} itemId={pessoaJurisd.id} handleDelete={handleDelete} />,
                    cargo: pessoaJurisd.cargo,
                    mandato: pessoaJurisd.mandato,
                    normaNomeacao: pessoaJurisd.normaNomeacao,
                    dataNomeacao: formateDateToPtBr(pessoaJurisd.dataNomeacao),
                    normaExoneracao: pessoaJurisd.normaExoneracao,
                    dataExoneracao: formateDateToPtBr(pessoaJurisd.dataExoneracao),
                    gestor: pessoaJurisd.gestor

                })))
            }
        } else if (dataType === 'jurisd-jurisd') {
            setColumns(createGridColumns(juridJurisdHeader));
            if (jursidDetails?.jurisdJurisds) {
                setRows(jursidDetails.jurisdJurisds.map(objeto => ({
                    id: objeto.id,
                    remover: <DeleteDataButton stateType={dataType} itemId={objeto.id} handleDelete={handleDelete} />,
                    nome: objeto.subordinado.nome,
                    sigla: objeto.subordinado.sigla,
                    cnpj: objeto.subordinado.cnpj,
                    ug: objeto.subordinado.ug,
                    cep: objeto.subordinado.cep,
                    logradouro: objeto.subordinado.logradouro,
                    complemento: objeto.subordinado.complemento,
                    numero: objeto.subordinado.numero,
                    cidade: objeto.subordinado.cidade,
                    telefone1: objeto.subordinado.telefone1,
                    telefone2: objeto.subordinado.telefone2,
                    email: objeto.subordinado.email,
                    site: objeto.subordinado.site,
                    cargoGestor: objeto.subordinado.cargoGestor,
                    normaCriacao: objeto.subordinado.normaCriacao,
                    dataCriacao: formateDateToPtBr(objeto.subordinado.dataCriacao),
                    normaExtincao: objeto.subordinado.normaExtincao,
                    dataExtincao: formateDateToPtBr(objeto.subordinado.dataExtincao),
                    poder: objeto.subordinado.poder,
                    ativo: objeto.subordinado.ativo

                })))
            }
        }
        if (arrayListData) {
            if (arrayListData[0].type === 'procurador' || arrayListData[0].type === 'relator') {
                setColumns(createGridColumns(apensoHeader))
                setRows(arrayListData.map(processo => ({
                    id: processo.id,
                    remover: <DeleteDataButton stateType={dataType} itemId={processo.id} handleDelete={handleDelete} />,
                    numero: processo.value1,
                    ano: processo.value2,
                    natureza: processo.value3,
                    exercicio: processo.value4,
                    objeto: processo.value5,
                    arquivamento: processo.value6
                })))
            }
        }
        if (dataType === 'nat-achado') {
            setColumns(createGridColumns(natAchadoRelationHeader));
            if (natAchadoRelations) {
                const transformedRows = transformNat(natAchadoRelations, true);
                setRows(transformedRows);
            }
        }
    })


    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                localeText={handleLocalization}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    },
                }}
                sx={{ bgcolor: 'white' }}
                pageSizeOptions={[5, 10]}
                disableRowSelectionOnClick={true}
            />
        </Box>
    );
}

export default DataProcessoDetails