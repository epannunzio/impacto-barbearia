import { useState } from "react";
import { Cliente } from "../../models/cliente";
import CardsClientes from "../componentes/cards-clientes";
import ModalCriacaoCliente from "../componentes/modal-criacao-cliente";
import useClientes from "../hooks/use-clientes-hook";

const PaginaClientes = () => {
    const [abrirModal, setAbrirModal] = useState<boolean>(false);
    const [estaAtualizando, setEstaAtualizando] = useState<boolean>(false);
    const [clienteSendoAtualizado, setClientesendoAtualizado] = useState<Cliente | undefined>();
    const { clientes, atualizarCliente, criarCliente, deletarCliente } = useClientes();

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

    return (
        <>
            <h1 className='titulo'>Clientes</h1>
            <ModalCriacaoCliente
                abrirModal={abrirModal}
                fecharModal={fecharModal}
                criarCliente={criarCliente}
                estaAtualizando={estaAtualizando}
                atualizarCliente={atualizarCliente}
                clienteSendoAtualizado={clienteSendoAtualizado} />
            <button
                onClick={() => mostrarModal()}
                type="button"
                className="btn btn-primary"
                data-toggle="modal"
                data-target="#exampleModal">
                Adicionar cliente
            </button>
            {clientes.length ?
                <CardsClientes
                    clientes={clientes}
                    abrirModalAtualizacao={abrirModalAtualizacao}
                    deletarCliente={deletarCliente} /> : (<p>Carregando clientes...</p>)}
        </>
    );
}

export default PaginaClientes;