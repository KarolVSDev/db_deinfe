import { AchadoUp, AreaAchadoUp, DivAchadoUp, NatAchadoUp } from "../types/types";


const useFormData = () => {

    const transformNat = (data: NatAchadoUp | undefined, includeId: boolean): any[] => {
        const rows: any[] = [];
        if (data) {
            data.areas.forEach(area => {
                area.divisoes.forEach(divisao => {
                    if (Array.isArray(divisao.achados) && divisao.achados.length > 0) {
                        divisao.achados.forEach(achado => {
                            const row: any = {
                                natureza: data.descricao || '',
                                area: area.descricao || '',
                                divisao: divisao.descricao || '',
                                titulo: achado.titulo || '',
                                texto: achado.texto || '',
                                criterio: achado.criterio || '',
                                ativo: achado.ativo || '',
                            };
                            if (includeId) {
                                row.id = achado.id; // Inclui o ID dos achados
                            }
                            rows.push(row);
                        });
                    } else {
                        rows.push({
                            natureza: data.descricao || '',
                            area: area.descricao || '',
                            divisao: divisao.descricao || '',
                            titulo: '',
                            texto: '',
                            criterio: '',
                            ativo: '',
                            id: includeId ? `no-id-${area.id}-${divisao.id}` : undefined, // Inclui um ID fictício
                        });
                    }
                });
                if (area.divisoes.length === 0) {
                    rows.push({
                        natureza: data.descricao || '',
                        area: area.descricao || '',
                        divisao: '',
                        titulo: '',
                        texto: '',
                        criterio: '',
                        ativo: '',
                        id: includeId ? `no-id-${area.id}` : undefined, // Inclui um ID fictício
                    });
                }
            });
            if (data.areas.length === 0) {
                rows.push({
                    natureza: data.descricao || '',
                    area: '',
                    divisao: '',
                    titulo: '',
                    texto: '',
                    criterio: '',
                    ativo: '',
                    id: includeId ? `no-id-${data.id}` : undefined, // Inclui um ID fictício
                });
            }
        }
        return rows;
    };

    const transformAreaAchado = (data: AreaAchadoUp | undefined, includeId: boolean): any[] => {
        const rows: any[] = [];
        if (data) {
            data.divisoes.forEach(divisao => {
                if (Array.isArray(divisao.achados) && divisao.achados.length > 0) {
                    divisao.achados.forEach(achado => {
                        const row: any = {
                            natureza: data.natureza.descricao || '',
                            area: data.descricao || '',
                            divisao: divisao.descricao || '',
                            titulo: achado.titulo || '',
                            texto: achado.texto || '',
                            criterio: achado.criterio || '',
                            ativo: achado.ativo || '',
                        };
                        if (includeId) {
                            row.id = achado.id;
                        }
                        rows.push(row);
                    });
                } else {
                    rows.push({
                        natureza: data.natureza.descricao || '',
                        area: data.descricao || '',
                        divisao: divisao.descricao || '',
                        titulo: '',
                        texto: '',
                        criterio: '',
                        ativo: '',
                        id: includeId ? `no-id-${data.id}-${divisao.id}` : undefined,
                    });
                }
            });
            if (data.divisoes.length === 0) {
                rows.push({
                    natureza: data.natureza.descricao || '',
                    area: data.descricao || '',
                    divisao: '',
                    titulo: '',
                    texto: '',
                    criterio: '',
                    ativo: '',
                    id: includeId ? `no-id-${data.id}` : undefined,
                });
            }
        }
        return rows;
    };

    const transformDivAchado = (data: DivAchadoUp | undefined, includeId: boolean): any[] => {
        const rows: any[] = []
        if (data) {
            const { area, achados, descricao, id } = data;
            if (Array.isArray(achados) && achados.length > 0) {
                achados.forEach(achado => {
                    const row: any = {
                        natureza: area.natureza.descricao || '',
                        area: area.descricao || '',
                        divisao: descricao || '',
                        titulo: achado.titulo || '',
                        texto: achado.texto || '',
                        criterio: achado.criterio || '',
                        ativo: achado.ativo || '',
                    }
                    if (includeId) {
                        row.id = achado.id
                    }
                    rows.push(row)
                })
            } else {
                rows.push({
                    natureza: area.natureza.descricao || '',
                    area: area.descricao || '',
                    divisao: descricao || '',
                    titulo: '',
                    texto: '',
                    criterio: '',
                    ativo: '',
                    id: includeId ? `no-id-${id}` : undefined
                })
            }
        }
        return rows;
    }

    const transformAchado = (data: AchadoUp | undefined, includeId: boolean): any[] => {
        const rows: any[] = []
        if(data){
            const {titulo, texto, criterio, ativo, divisao} = data;
            if(divisao){
                const { descricao: divisaoDescricao, area } = divisao;
                const { descricao: areaDescricao, natureza } = area;
                const row: any = {
                    natureza: natureza.descricao,
                    area:areaDescricao,
                    divisao:divisaoDescricao,
                    titulo:titulo,
                    texto:texto,
                    criterio:criterio,
                    ativo:ativo
                }
                if(includeId){
                    row.id = data.id
                }
                rows.push(row)
            }else{
                rows.push({
                    natureza: '',
                    area:'',
                    divisao:'',
                    titulo:titulo,
                    texto:texto,
                    criterio:criterio,
                    ativo:ativo,
                    id:includeId ? `no-id${data.id}` : undefined
                })
            }
        }
        return rows;
    }

    return {
        transformNat,
        transformAreaAchado,
        transformDivAchado,
        transformAchado
    }

}

export default useFormData