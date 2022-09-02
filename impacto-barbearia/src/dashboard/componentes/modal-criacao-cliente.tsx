import { Modal, ModalBody, ModalHeader } from "react-bootstrap";
import { Cliente } from "../../models/cliente";
import FormularioCliente from "./formulario-clientes";

interface IModalClienteProps {
    abrirModal: boolean
    fecharModal: () => void,
    criarCliente: (cliente: Cliente) => Promise<void>,
    estaAtualizando: boolean,
    atualizarCliente: (cliente: Cliente) => Promise<void>,
    clienteSendoAtualizado: Cliente | undefined
}

const ModalCriacaoCliente = ({abrirModal, fecharModal, criarCliente, estaAtualizando, atualizarCliente, clienteSendoAtualizado}: IModalClienteProps) => {
    return (
        <Modal 
            show={abrirModal}
            animation={true}
            backdrop={true}
            onHide={() => fecharModal()}>
            <ModalHeader>
                Modal title
            </ModalHeader>
            <ModalBody>
                <FormularioCliente 
                    criarCliente={criarCliente}
                    atualizarCliente={atualizarCliente}
                    estaAtualizando={estaAtualizando}
                    clienteSendoAtualizado={clienteSendoAtualizado}/>
            </ModalBody>
        </Modal>
    );
}

export default ModalCriacaoCliente;