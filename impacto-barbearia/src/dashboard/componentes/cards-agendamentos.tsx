import DataHelper from "../../helpers/data-helper";
import { Agendamento } from "../../models/agendamento";

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
                    <p>Valor: R${agendamento.valor}</p>
                    {/* <div className='agendamento-card-botoes'>
                        <button className='btn btn-primary' onClick={() => { }}>Atualizar</button>
                        <button className='btn btn-danger' onClick={() => deletarAgendamento(agendamento?.id ?? '')}>Excluir</button>
                    </div> */}
                </div>
            ))
            }
        </div >
    );
}

export default CardsAgendamentos;