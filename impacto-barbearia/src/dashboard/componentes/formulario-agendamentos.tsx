import { ErrorMessage, Field, Form, Formik } from "formik";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import DataHelper from "../../helpers/data-helper";
import obterPrecoServico from "../../helpers/preco-servico-helper";
import { Agendamento, AgendamentoViewModel } from "../../models/agendamento";
import { HorarioDisponivel } from "../../models/horarios-disponiveis";
import ImpactoBarbeariaServico from "../../servicos/impacto-barbearia-servico";
import useClientes from "../hooks/use-clientes-hook";
import { Servicos } from "../utils/servicos-enum";


interface IFormularioAgendamentoProps {
    criarAgendamento: (agendamento: AgendamentoViewModel) => Promise<void>
    estaAtualizando: boolean,
    atualizarAgendamento: (agendamento: AgendamentoViewModel) => Promise<void>,
    atualizarAgendamentos: (agendamentosAtualizados: Agendamento[]) => void,
    agendamentoSendoAtualizado: Agendamento | undefined,
    fecharFormulario: () => void
}


const FormularioAgendamentos = ({
    criarAgendamento,
    fecharFormulario,
}: IFormularioAgendamentoProps) => {
    const [tipoDeServico, setTipoDeServico] = useState<Servicos>(Servicos.cabelo);
    const [dataSelecionada, setDataSelecionada] = useState<Date>(new Date());
    const [horariosDisponiveis, setHorariosDisponiveis] = useState<HorarioDisponivel[]>([]);
    const { clientes } = useClientes();
    const [clienteSelecionado, setClienteSelecionado] = useState<string>();
    const [horarioSelecionado, setHorarioSelecionado] = useState<HorarioDisponivel>({
        horario: '',
        estaDisponivel: true
    });

    const buscarHorarios = useCallback(async () => {
        var data = DataHelper.formatarDataParaApi(dataSelecionada?.toString() ?? '');
        const horarios = await ImpactoBarbeariaServico.buscarHorariosDisponiveis(data)
        setHorariosDisponiveis(horarios);
    }, [dataSelecionada]);

    useEffect(() => {
        buscarHorarios();
    }, [buscarHorarios, dataSelecionada]);

    return (
        <>
            <Formik
                initialValues={{
                    cliente: undefined,
                    tipoDeServico: tipoDeServico,
                    valor: 0,
                    horario: { horario: '', estaDisponivel: true }
                }}
                onSubmit={async (values, { setSubmitting }) => {
                    const novoAgendamento: AgendamentoViewModel = {
                        servico: tipoDeServico,
                        valor: obterPrecoServico(tipoDeServico),
                        clienteId: clienteSelecionado ?? clientes[0]?.id ?? '',
                        dataEHora: dataSelecionada,
                        horario: horarioSelecionado.horario
                    }
                    await criarAgendamento(novoAgendamento);
                    fecharFormulario();
                }}>
                {({ isSubmitting }) => (
                    <Form className='cliente-form container'>
                        <div className='row'>
                            <div className='form-group col-md-12'>
                                <label htmlFor="data-servico">Data do serviço</label>
                                <Field type="date" name="dataEHora" className="form-control" onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                    setDataSelecionada(new Date(event.target.value.replace('/', '-')));
                                    setHorariosDisponiveis([]);
                                }} />
                                <ErrorMessage name="nome" component="div" />
                            </div>
                        </div>
                        {horariosDisponiveis.length ? (
                            <ul className="lista-horarios">
                                {horariosDisponiveis.map(horario =>
                                    <li
                                        onClick={() => setHorarioSelecionado(horario)}
                                        className={horarioSelecionado === horario ? 'lista-horarios-itens horario-selecionado' : 'lista-horarios-itens'}
                                        key={horario.horario}>
                                        {horario.horario}
                                    </li>)}
                            </ul>
                        ) : <p>Carregando horarios</p>}
                        <div className='row'>
                            <div className='form-group col-md-12'>
                                <label htmlFor="cliente">Cliente</label>
                                <Field as='select' name="cliente" className="form-control" required onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                                    const element = event.target as HTMLSelectElement;
                                    setClienteSelecionado(element.value);
                                }}>
                                    {clientes.length ? clientes.map(cliente => <option value={cliente.id} key={cliente.id}>{cliente.nome} {cliente.sobrenome}</option>) : <option key='carregando'>Carregando clientes</option>}
                                </Field>
                                <ErrorMessage name="nome" component="div" />
                            </div>
                        </div>
                        <div className='form-group'>
                            <label htmlFor="sobrenome">Tipo de serviço</label>
                            <ul className="produtos">
                                <li
                                    onClick={() => setTipoDeServico(Servicos.cabelo)}
                                    className={tipoDeServico === Servicos.cabelo ? 'produto-selecionado' : ''}>
                                    <h2>Cabelo</h2>
                                    <img src="images/cabelo.jpg" alt="imagem de um cabelo" />
                                    <p className="produto-descricao">Na tesoura ou máquina, como o cliente preferir!</p>
                                    <p className="produto-preco">R$ 25</p>
                                </li>

                                <li
                                    onClick={() => setTipoDeServico(Servicos.barba)}
                                    className={tipoDeServico === Servicos.barba ? 'produto-selecionado' : ''}>
                                    <h2>Barba</h2>
                                    <img src="images/barba.jpg" alt="imagem de uma barba" />
                                    <p className="produto-descricao">Corte e desenho profissional de barba!</p>
                                    <p className="produto-preco">R$ 18</p>
                                </li>

                                <li
                                    onClick={() => setTipoDeServico(Servicos.cabeloEBarba)}
                                    className={tipoDeServico === Servicos.cabeloEBarba ? 'produto-selecionado' : ''}>
                                    <h2>Cabelo e Barba</h2>
                                    <img src="images/cabelo+barba.jpg" alt="imagem de um rosto com cabelo e barba" />
                                    <p className="produto-descricao">Pacote completo de cabelo e barba!</p>
                                    <p className="produto-preco">R$ 35</p>
                                </li>
                            </ul>
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Agendar
                        </button>
                    </Form>
                )}
            </Formik>
        </>
    );
}

export default FormularioAgendamentos;