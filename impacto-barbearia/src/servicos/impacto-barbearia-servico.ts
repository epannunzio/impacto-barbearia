import { Cliente } from "../models/cliente";
import api from "./api";

const buscarTodosOsClientes = async () => {
    try {
        const response = await api.get('Clientes/Buscar');
        return response.data;
    } catch(err) {
        console.log(err);
    }
}

const criarCliente = async (cliente: Cliente) => {
    try {
        const response = await api.post('Clientes/Criar', cliente);
        return response.data;
    } catch(err) {
        console.log(err);
    }
}

const excluirCliente = async (id: string) => {
    try {
        const response = await api.delete(`Clientes/Deletar/${id}`);
        return response.data;
    } catch(err) {
        console.log(err);
    }
}

const atualizarCliente = async (cliente: Cliente) => {
    try {
        const response = await api.put(`Clientes/Atualizar`, cliente);
        return response.data;
    } catch(err) {
        console.log(err);
    }
}

const ImpactoBarbeariaServico = {
    buscarTodosOsClientes,
    criarCliente,
    excluirCliente,
    atualizarCliente
};

export default ImpactoBarbeariaServico;