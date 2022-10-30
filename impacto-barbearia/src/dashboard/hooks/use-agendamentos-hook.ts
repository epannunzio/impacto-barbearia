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

    const deletarAgendamento = useCallback(async (id: string) => {
        await ImpactoBarbeariaServico.excluirAgendamento(id);
        buscarAgendamentos();
    }, [buscarAgendamentos]);

    const atualizarAgendamento = useCallback(async (agendamento: AgendamentoViewModel) => {
        console.log(agendamento);
        await ImpactoBarbeariaServico.atualizarAgendamento(agendamento);
        buscarAgendamentos();
    }, [buscarAgendamentos])

    useEffect(() => {
        buscarAgendamentos();
    }, [buscarAgendamentos])

    return {
        agendamentos,
        atualizarAgendamentos,
        criarAgendamento,
        deletarAgendamento,
        atualizarAgendamento
    };
}

export default useAgendamentos;