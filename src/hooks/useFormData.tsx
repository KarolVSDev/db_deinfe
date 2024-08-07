import { NatAchadoUp } from "../types/types";


const useFormData = () => {

    const transformNat = (data: NatAchadoUp | undefined, includeId: boolean = true): any[] => {
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
                                row.id = achado.id;
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
                });
            }
        }
        return rows;
    };
  return {
      transformNat
  }

}

export default useFormData