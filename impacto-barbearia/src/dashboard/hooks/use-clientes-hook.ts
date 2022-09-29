import { useCallback, useEffect, useRef, useState } from "react";
import { Cliente } from "../../models/cliente";
import ImpactoBarbeariaServico from "../../servicos/impacto-barbearia-servico";

const useClientes = () => {
    const [clientes, setClientes] = useState<Cliente[]>([]);

    const buscarClientes = useCallback(async () => {
        const resposta = await ImpactoBarbeariaServico.buscarTodosOsClientes();
        setClientes(resposta);
    }, []);

    const atualizarClientes = (clientesAtualizados: Cliente[]) => {
        setClientes(clientesAtualizados);
    };

    const criarCliente = async (cliente: Cliente) => {
        await ImpactoBarbeariaServico.criarCliente(cliente);
        setClientes([...clientes, cliente]);
    };

    const deletarCliente = async (id: string) => {
        await ImpactoBarbeariaServico.excluirCliente(id);
        setClientes(clientes.filter(cliente => cliente.id !== id));
    };

    const atualizarCliente = async (cliente: Cliente) => {
        await ImpactoBarbeariaServico.atualizarCliente(cliente).then(_ => {
            atualizarClientes([]);
        });
    };

    useEffect(() => {
        buscarClientes();
    }, [buscarClientes])

    return {
        clientes,
        atualizarClientes,
        criarCliente,
        atualizarCliente,
        deletarCliente
    };
}

export default useClientes;