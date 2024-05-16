const formatDate = (data: string) => {
    const partes = data.split('/');
    const dataFormatada = `${partes[2]}-${partes[1]}-${partes[0]}`;
    return dataFormatada;
}

export default formatDate;

