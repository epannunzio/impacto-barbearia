import { AgendamentoViewModel } from "../models/agendamento";
import { Cliente } from "../models/cliente";
import { LoginViewModel } from "../models/login";
import api from "./api";


const buscarTodosOsClientes = async () => {
    try {
        const response = await api.get('Clientes/Buscar', getConfig());
        return response.data;
    } catch (err) {
        console.log(err);
    }
}

const criarCliente = async (cliente: Cliente) => {
    try {
        const response = await api.post('Clientes/Criar', cliente, getConfig());
        return response.data;
    } catch (err) {
        console.log(err);
    }
}

const excluirCliente = async (id: string) => {
    try {
        const response = await api.delete(`Clientes/Deletar/${id}`, getConfig());
        return response.data;
    } catch (err) {
        console.log(err);
    }
}

const atualizarCliente = async (cliente: Cliente) => {
    try {
        const response = await api.put(`Clientes/Atualizar`, cliente, getConfig());
        return response.data;
    } catch (err) {
        console.log(err);
    }
}

const buscarTodosOsAgendamentos = async () => {
    try {
        const response = await api.get('Agendamentos/Buscar', getConfig());
        return response.data;
    } catch (err) {
        console.log(err);
    }
}

const criarAgendamento = async (agendamento: AgendamentoViewModel) => {
    try {
        const response = await api.post('Agendamentos/Criar', agendamento, getConfig());
        return response.data;
    } catch (err) {
        console.log(err);
    }
}

const excluirAgendamento = async (id: string) => {
    try {
        const response = await api.delete(`Agendamentos/Deletar/${id}`, getConfig());
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
        const response = await api.get(`Agendamentos/HorariosDisponiveis?data=${data}`, getConfig());
        return response.data;
    } catch (err) {
        console.log(err);
    }
}

const atualizarAgendamento = async (agendamento: AgendamentoViewModel) => {
    try {
        const response = await api.put('Agendamentos/Atualizar', agendamento, getConfig());
        return response.data;
    } catch (err) {
        console.log(err);
    }
}

const autenticar = async (login: LoginViewModel) => {
    try {
        const response = await api.post('Usuarios/Autenticar', login);
        return response.data;
    } catch (err) {
        console.log(err);
    }
}

const getConfig = () => {
    var token = localStorage.getItem('token');
    return {
        headers: { Authorization: `Bearer ${token}` }
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
    atualizarAgendamento,
    buscarHorariosDisponiveis,
    autenticar
};

export default ImpactoBarbeariaServico;