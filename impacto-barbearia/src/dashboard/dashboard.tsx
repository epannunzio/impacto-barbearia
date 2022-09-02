import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "react-bootstrap";
import { Cliente } from "../models/cliente";
import ImpactoBarbeariaServico from "../servicos/impacto-barbearia-servico";

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
            <h1>Clientes</h1>
            <button
                onClick={() => mostrarModal()} 
                type="button" 
                className="btn btn-primary" 
                data-toggle="modal" 
                data-target="#exampleModal">
                Adicionar cliente
            </button>
            <ModalCriacaoCliente 
                abrirModal={abrirModal}
                fecharModal={fecharModal}
                criarCliente={criarCliente}
                estaAtualizando={estaAtualizando}
                atualizarCliente={atualizarCliente}
                clienteSendoAtualizado={clienteSendoAtualizado}/>
            {clientes.length ? 
                <TabelaClientes 
                    clientes={clientes}
                    abrirModalAtualizacao={abrirModalAtualizacao} 
                    deletarCliente={deletarCliente}/> : (<p>Carregando clientes...</p>)}
        </>
    );
}

interface IFormularioClienteProps {
    criarCliente: (cliente: Cliente) => Promise<void>,
    estaAtualizando: boolean,
    atualizarCliente: (cliente: Cliente) => Promise<void>,
    clienteSendoAtualizado: Cliente | undefined
}

const FormularioCliente = ({criarCliente, estaAtualizando, atualizarCliente, clienteSendoAtualizado}: IFormularioClienteProps) => {
    return (
        <Formik
                initialValues={{
                    nome: clienteSendoAtualizado?.nome ?? '', 
                    sobrenome: clienteSendoAtualizado?.sobrenome ?? '', 
                    email: clienteSendoAtualizado?.email ?? '', 
                    ddi: clienteSendoAtualizado?.telefone?.ddi ?? '', 
                    ddd: clienteSendoAtualizado?.telefone?.ddd ?? '', 
                    numero: clienteSendoAtualizado?.telefone?.numero ?? ''
                }}
                onSubmit={(values, {setSubmitting}) => {
                    const novoCliente: Cliente = {
                        id: estaAtualizando ? clienteSendoAtualizado?.id : undefined,
                        nome: values.nome,
                        sobrenome: values.sobrenome,
                        email: values.email,
                        telefone: {
                            ddi: values.ddi,
                            ddd: values.ddd,
                            numero: values.numero
                        }
                    };
                    estaAtualizando ? atualizarCliente(novoCliente) : criarCliente(novoCliente);
                }}>
                {({ isSubmitting }) => (  
                    <Form>
                        <Field type="text" name="nome" placeholder='Ex: João'/>
                        <ErrorMessage name="nome" component="div" />
                        <Field type="text" name="sobrenome" placeholder='Ex: Silva'/>
                        <ErrorMessage name="sobrenome" component="div" />
                        <Field type="email" name="email" placeholder='Ex: joaosilva@teste.com'/>
                        <ErrorMessage name="email" component="div" />
                        <Field type="text" name="ddi" placeholder='Ex: 55'/>
                        <ErrorMessage name="ddi" component="div" />
                        <Field type="text" name="ddd" placeholder='Ex: 11'/>
                        <ErrorMessage name="ddd" component="div" />
                        <Field type="text" name="numero" placeholder='Ex: 912345678'/>
                        <ErrorMessage name="numero" component="div" />
                        <button type="submit">
                            {estaAtualizando ? 'Atualizar' : 'Criar'}
                        </button>
                    </Form>
                )}
            </Formik>
    );
}

interface ITabelaClientesProps {
    clientes: Cliente[],
    deletarCliente: (id: string) => Promise<void>,
    abrirModalAtualizacao: (cliente: Cliente) => void
}

const TabelaClientes = ({clientes, deletarCliente, abrirModalAtualizacao}: ITabelaClientesProps) => {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">Nome</th>
                    <th scope="col">Sobrenome</th>
                    <th scope="col">Telefone</th>
                    <th scope="col">E-mail</th>
                    <th scope="col">Ações</th>
                </tr>
            </thead>
            <tbody>
                {clientes.map((cliente) => {
                    var telefone = `+${cliente.telefone.ddi} (${cliente.telefone.ddd}) ${cliente.telefone.numero}`;
                    return (
                        <tr key={cliente.id}>
                            <td>{cliente.nome}</td>
                            <td>{cliente.sobrenome}</td>
                            <td>{telefone}</td>
                            <td>{cliente.email}</td>
                            <td>
                                <button onClick={() => deletarCliente(cliente.id ?? '')}>Excluir</button>
                            </td>
                            <td>
                                <button onClick={() => abrirModalAtualizacao(cliente)}>Atualizar</button>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

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

export default Dashboard;