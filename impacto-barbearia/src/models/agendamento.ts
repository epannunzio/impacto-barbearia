import Servicos from "../dashboard/utils/servicos-enum";
import { Cliente } from "./cliente";
import { HorarioDisponivel } from "./horarios-disponiveis";

export interface Agendamento {
    id?: string,
    servico: Servicos,
    valor: number,
    cliente?: Cliente,
    horario: HorarioDisponivel,
    dataEHora: string
}

export interface AgendamentoViewModel {
    id?: string,
    servico: Servicos,
    valor: number,
    clienteId: string,
    horario: string,
    dataEHora: string
}