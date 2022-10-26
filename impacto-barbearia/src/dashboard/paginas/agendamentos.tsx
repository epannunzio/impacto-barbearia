import { useState } from "react";
import { Agendamento } from "../../models/agendamento";
import CardsAgendamentos from "../componentes/cards-agendamentos";
import FormularioAgendamentos from "../componentes/formulario-agendamentos";
import useAgendamentos from "../hooks/use-agendamentos-hook";

const PaginaAgendamentos = () => {
    const [abrirFormulario, setAbrirFormulario] = useState<boolean>(false);
    const [agendamentoSendoAtualizado, setAgendamentoSendoAtualizado] = useState<Agendamento | undefined>();
    const { agendamentos, criarAgendamento, atualizarAgendamentos, atualizarAgendamento, deletarAgendamento } = useAgendamentos();

    const iniciarAtualizacaoAgendamento = (agendamento: Agendamento | undefined) => {
        setAgendamentoSendoAtualizado(agendamento)
        setAbrirFormulario(true);
    }

    return (
        <>
            <h1 className='titulo'>Agendamentos</h1>
            <>
                <button
                    onClick={() => setAbrirFormulario(!abrirFormulario)}
                    type="button"
                    className={abrirFormulario ? "btn btn-danger" : "btn btn-primary"}
                    data-toggle="modal"
                    data-target="#exampleModal">
                    {abrirFormulario ? 'Fechar formulário' : 'Adicionar agendamento'}
                </button>
                {
                    abrirFormulario ?
                        <FormularioAgendamentos
                            criarAgendamento={criarAgendamento}
                            estaAtualizando={false}
                            atualizarAgendamento={atualizarAgendamento}
                            agendamentoSendoAtualizado={agendamentoSendoAtualizado}
                            atualizarAgendamentos={atualizarAgendamentos}
                            fecharFormulario={() => setAbrirFormulario(false)} />
                        : agendamentos?.length ?
                            <CardsAgendamentos
                                agendamentos={agendamentos.sort((a, b) => a.dataEHora.localeCompare(b.dataEHora))}
                                deletarAgendamento={deletarAgendamento}
                                inicializarAtualizacaoAgendamento={iniciarAtualizacaoAgendamento}
                            /> : (<p>Carregando agendamentos...</p>)
                }
            </>
        </>
    );
}

export default PaginaAgendamentos;