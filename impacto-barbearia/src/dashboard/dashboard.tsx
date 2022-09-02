import { useEffect, useState } from "react";
import { Cliente } from "../models/cliente";
import ImpactoBarbeariaServico from "../servicos/impacto-barbearia-servico";
import ModalCriacaoCliente from "./componentes/modal-criacao-cliente";
import CardsClientes from "./componentes/cards-clientes";

const Dashboard = () => {
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [abrirModal, setAbrirModal] = useState<boolean>(false);
    const [estaAtualizando, setEstaAtualizando] = useState<boolean>(false);
    const [clienteSendoAtualizado, setClientesendoAtualizado] = useState<Cliente|undefined>();

    const buscarClientes = async () => {
        const resposta = await ImpactoBarbeariaServico.buscarTodosOsClientes();
        setClientes(resposta);
    }

    const criarCliente = async (cliente: Cliente) => {
        const resposta = await ImpactoBarbeariaServico.criarCliente(cliente);
        buscarClientes();
        fecharModal();
    }

    const deletarCliente = async (id: string) => {
        const resposta = await ImpactoBarbeariaServico.excluirCliente(id);
        buscarClientes();
    }

    const atualizarCliente = async (cliente: Cliente) => {
        await ImpactoBarbeariaServico.atualizarCliente(cliente).then(_ => {
            setClientesendoAtualizado(undefined);
            buscarClientes();
            fecharModal();
        });
    }

    const abrirModalAtualizacao = (cliente: Cliente) => {
        setEstaAtualizando(true);
        setClientesendoAtualizado(cliente);
        mostrarModal();
    }

    const fecharModal = () => {
        setAbrirModal(false);
        setEstaAtualizando(false);
        setClientesendoAtualizado(undefined);
    }

    const mostrarModal = () => {
        setAbrirModal(true);
    }

    useEffect(() => {
        buscarClientes();
    }, []);

    return(
        <>
            <h1 className='titulo'>Impacto Barbearia</h1>
            <h2>Clientes</h2>
            <ModalCriacaoCliente 
                abrirModal={abrirModal}
                fecharModal={fecharModal}
                criarCliente={criarCliente}
                estaAtualizando={estaAtualizando}
                atualizarCliente={atualizarCliente}
                clienteSendoAtualizado={clienteSendoAtualizado}/>
            {clientes.length ? 
                <>
                    <button
                        onClick={() => mostrarModal()} 
                        type="button" 
                        className="btn btn-primary" 
                        data-toggle="modal" 
                        data-target="#exampleModal">
                        Adicionar cliente
                    </button>
                    <CardsClientes 
                        clientes={clientes}
                        abrirModalAtualizacao={abrirModalAtualizacao} 
                        deletarCliente={deletarCliente}/>     
                </> : (<p>Carregando clientes...</p>)}
        </>
    );
}

export default Dashboard;