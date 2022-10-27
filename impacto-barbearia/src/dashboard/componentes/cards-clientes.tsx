import { Cliente } from "../../models/cliente";

interface ITabelaClientesProps {
    clientes: Cliente[],
    deletarCliente: (id: string) => Promise<void>,
    abrirModalAtualizacao: (cliente: Cliente) => void
}

const CardsClientes = ({ clientes, deletarCliente, abrirModalAtualizacao }: ITabelaClientesProps) => {
    return (
        <div className='clientes-grid'>
            {clientes.map(cliente => (
                <div className='cliente-card' key={cliente.id}>
                    <p className='cliente-card-nome'>{cliente.nome} {cliente.sobrenome}</p>
                    <p>E-mail: {cliente.email}</p>
                    <p>Telefone: +{cliente.telefone.ddi} ({cliente.telefone.ddd}) {cliente.telefone.numero}</p>
                    <div className='cliente-card-botoes'>
                        <button className='btn btn-primary' onClick={() => abrirModalAtualizacao(cliente)}>Atualizar</button>
                        <button className='btn btn-danger' onClick={() => deletarCliente(cliente.id ?? '')}>Excluir</button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default CardsClientes;