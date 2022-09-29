import { useCallback, useEffect, useState } from "react";
import { Agendamento } from "../../models/agendamento";
import ImpactoBarbeariaServico from "../../servicos/impacto-barbearia-servico";
import CardsAgendamentos from "../componentes/cards-agendamentos";
import FormularioAgendamentos from "../componentes/formulario-agendamentos";
import useAgendamentos from "../hooks/use-agendamentos-hook";

const PaginaAgendamentos = () => {
    const [abrirFormulario, setAbrirFormulario] = useState<boolean>(false);
    const [agendamentoSendoAtualizado, setAgendamentoSendoAtualizado] = useState<Agendamento | undefined>();
    const { agendamentos, deletarAgendamento, atualizarAgendamento, criarAgendamento, atualizarAgendamentos } = useAgendamentos();

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
                        : agendamentos.length ?
                            <CardsAgendamentos
                                agendamentos={agendamentos}
                                deletarAgendamento={deletarAgendamento} /> : (<p>Carregando agendamentos...</p>)
                }
            </>
        </>
    );
}

export default PaginaAgendamentos;