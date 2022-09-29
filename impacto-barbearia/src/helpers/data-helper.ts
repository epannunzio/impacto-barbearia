const formatarDataParaTexto = (dataEmString: string) => {
    const data = new Date(dataEmString);
    const ano = data.getFullYear();
    const mes = data.getMonth();
    const dia = data.getDate();
    return `${dia}/${mes}/${ano}`;
}

const formatarDataParaApi = (dataEmString: string) => {
    const data = new Date(dataEmString);
    const ano = data.getFullYear();
    const mes = (data.getMonth() + 1).toString().padStart(2, "0");
    const dia = data.getUTCDate();
    return `${ano}-${mes}-${dia}`;
}

const formatarDataParaDatePicker = (dataEmString: string) => {
    const data = new Date(dataEmString);
    const ano = data.getFullYear();
    const mes = (data.getMonth() + 1).toString().padStart(2, "0");
    const dia = data.getUTCDate();
    return `${ano}/${mes}/${dia}`;
}

const DataHelper = {
    formatarData: formatarDataParaTexto,
    formatarDataParaApi,
    formatarDataParaDatePicker
}

export default DataHelper;