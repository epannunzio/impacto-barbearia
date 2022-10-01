import { useCallback, useEffect, useState } from "react";
import { Agendamento, AgendamentoViewModel } from "../../models/agendamento";
import ImpactoBarbeariaServico from "../../servicos/impacto-barbearia-servico";

const useAgendamentos = () => {
    const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);

    const buscarAgendamentos = useCallback(async () => {
        const resposta = await ImpactoBarbeariaServico.buscarTodosOsAgendamentos();
        setAgendamentos(resposta);
    }, []);

    const atualizarAgendamentos = useCallback((agendamentosAtualizados: Agendamento[]) => {
        setAgendamentos(agendamentosAtualizados);
    }, []);

    const criarAgendamento = useCallback(async (agendamento: AgendamentoViewModel) => {
        await ImpactoBarbeariaServico.criarAgendamento(agendamento);
        buscarAgendamentos();
    }, [buscarAgendamentos]);

    useEffect(() => {
        buscarAgendamentos();
    }, [buscarAgendamentos])

    return {
        agendamentos,
        atualizarAgendamentos,
        criarAgendamento,
    };
}

export default useAgendamentos;