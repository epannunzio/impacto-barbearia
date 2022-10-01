import DataHelper from "../../helpers/data-helper";
import { Agendamento } from "../../models/agendamento";
import { LabelServicos } from "../utils/servicos-enum";

interface ICardsAgendamentosProps {
    agendamentos: Agendamento[],
    deletarAgendamento: (id: string) => Promise<void>,
}

const CardsAgendamentos = ({ agendamentos }: ICardsAgendamentosProps) => {
    return (
        <div className='agendamentos-grid'>
            {agendamentos.map(agendamento => (
                <div className='agendamento-card' key={agendamento.id}>
                    <p className='agendamento-card-nome'>{DataHelper.formatarData(agendamento.dataEHora)} - {`${agendamento.horario.horario.slice(0, 5)}h`}</p>
                    <p>Cliente: {agendamento?.cliente?.nome ?? ''} {agendamento?.cliente?.sobrenome ?? ''}</p>
                    <p>Serviço: {LabelServicos[agendamento?.servico]}</p>
                    <p>Valor: R${agendamento.valor}</p>
                </div>
            ))
            }
        </div >
    );
}

export default CardsAgendamentos;