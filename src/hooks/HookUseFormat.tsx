import { Achado, TopicoAchado } from "../types/types"

const HookUseFormat = () => {
    const AchadoFormatado = (achados: Achado[], topicos: TopicoAchado[]) => {
        return achados.map((achado) => {
            const topicoEncontrado = topicos.find(topico => topico.id === achado.tema_id);
            return {
                ...achado,
                topico_id: topicoEncontrado ? topicoEncontrado.tema : 'Topico não encontrado'
            }
        })
    }
    return {
        AchadoFormatado,
    }
}
export default HookUseFormat