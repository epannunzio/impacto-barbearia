import { Servicos } from "../dashboard/utils/servicos-enum";

const obterPrecoServico = (servico: Servicos) => {
    switch (servico) {
        case Servicos.barba:
            return 18;
        case Servicos.cabeloEBarba:
            return 35;
        default:
            return 25;
    }
}

export default obterPrecoServico;