const formatarDataParaTexto = (dataEmString: string) => {
    const data = new Date(dataEmString);
    const ano = data.getFullYear();
    const mes = data.getMonth() + 1;
    const dia = data.getDate();
    return `${dia}/${mes}/${ano}`;
}

const formatarDataParaApiBuscarHorarios = (dataEmString: string) => {
    const data = new Date(dataEmString);
    const ano = data.getUTCFullYear();
    const mes = data.getUTCMonth() + 1;
    const dia = data.getUTCDate();
    return `${mes}/${dia}/${ano}`;
}

const formatarDataParaDatePicker = (dataEmString: string) => {
    const data = new Date(dataEmString);
    const ano = data.getFullYear();
    const mes = (data.getMonth() + 1).toString().padStart(2, "0");
    const dia = data.getUTCDate();
    return `${ano}-${mes}-${dia}`;
}

const DataHelper = {
    formatarData: formatarDataParaTexto,
    formatarDataParaApi: formatarDataParaApiBuscarHorarios,
    formatarDataParaDatePicker,
}

export default DataHelper;