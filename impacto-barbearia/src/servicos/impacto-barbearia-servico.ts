import { AgendamentoViewModel } from "../models/agendamento";
import { Cliente } from "../models/cliente";
import api from "./api";

const buscarTodosOsClientes = async () => {
    try {
        const response = await api.get('Clientes/Buscar');
        return response.data;
    } catch (err) {
        console.log(err);
    }
}

const criarCliente = async (cliente: Cliente) => {
    try {
        const response = await api.post('Clientes/Criar', cliente);
        return response.data;
    } catch (err) {
        console.log(err);
    }
}

const excluirCliente = async (id: string) => {
    try {
        const response = await api.delete(`Clientes/Deletar/${id}`);
        return response.data;
    } catch (err) {
        console.log(err);
    }
}

const atualizarCliente = async (cliente: Cliente) => {
    try {
        const response = await api.put(`Clientes/Atualizar`, cliente);
        return response.data;
    } catch (err) {
        console.log(err);
    }
}

const buscarTodosOsAgendamentos = async () => {
    try {
        const response = await api.get('Agendamentos/Buscar');
        return response.data;
    } catch (err) {
        console.log(err);
    }
}

const criarAgendamento = async (agendamento: AgendamentoViewModel) => {
    try {
        const response = await api.post('Agendamentos/Criar', agendamento);
        return response.data;
    } catch (err) {
        console.log(err);
    }
}

const excluirAgendamento = async (id: string) => {
    try {
        const response = await api.delete(`Agendamentos/Deletar/${id}`);
        return response.data;
    } catch (err) {
        console.log(err);
    }
}

const buscarHorariosDisponiveis = async (data: string | undefined) => {
    try {
        if (!data) {
            throw Error('Data não pode ser nula.');
        }
        const response = await api.get(`Agendamentos/HorariosDisponiveis?data=${data}`);
        return response.data;
    } catch (err) {
        console.log(err);
    }
}

const ImpactoBarbeariaServico = {
    buscarTodosOsClientes,
    criarCliente,
    excluirCliente,
    atualizarCliente,
    buscarTodosOsAgendamentos,
    criarAgendamento,
    excluirAgendamento,
    buscarHorariosDisponiveis
};

export default ImpactoBarbeariaServico;