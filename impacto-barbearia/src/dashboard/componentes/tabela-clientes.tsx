import { Cliente } from "../../models/cliente";

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

export default TabelaClientes;