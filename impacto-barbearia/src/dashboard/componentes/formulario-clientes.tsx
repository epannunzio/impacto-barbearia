import { ErrorMessage, Field, Form, Formik } from "formik";
import { Cliente } from "../../models/cliente";

interface IFormularioClienteProps {
    criarCliente: (cliente: Cliente) => Promise<void>,
    estaAtualizando: boolean,
    atualizarCliente: (cliente: Cliente) => Promise<void>,
    clienteSendoAtualizado: Cliente | undefined
}

const FormularioCliente = ({ criarCliente, estaAtualizando, atualizarCliente, clienteSendoAtualizado }: IFormularioClienteProps) => {
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
            onSubmit={(values, { setSubmitting }) => {
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
                <Form className='cliente-form container'>
                    <div className='form-control'>
                        <label htmlFor="nome">Nome</label>
                        <Field type="text" name="nome" placeholder='Ex: João' className="form-control" maxlength="15" required />
                        <ErrorMessage name="nome" component="div" />
                    </div>
                    <div className='form-control'>
                        <label htmlFor="sobrenome">Sobrenome</label>
                        <Field type="text" name="sobrenome" placeholder='Ex: Silva' className="form-control" maxlength="15" required />
                        <ErrorMessage name="sobrenome" component="div" />
                    </div>
                    <div className='form-control'>
                        <label htmlFor="email">E-mail</label>
                        <Field type="email" name="email" placeholder='Ex: joaosilva@teste.com' className="form-control" required />
                        <ErrorMessage name="email" component="div" />
                    </div>
                    <div className='form-control col-1'>
                        <label htmlFor="ddi">DDI</label>
                        <Field type="text" name="ddi" placeholder='Ex: 55' className="form-control" maxlength="3" required />
                        <ErrorMessage name="ddi" component="div" />
                    </div>
                    <div className='form-control col-1'>
                        <label htmlFor="ddd">DDD</label>
                        <Field type="text" name="ddd" placeholder='Ex: 11' className="form-control" maxlength="2" required />
                        <ErrorMessage name="ddd" component="div" />
                    </div>
                    <div className='form-control col-2'>
                        <label htmlFor="numero">Numero</label>
                        <Field
                            type="text"
                            name="numero"
                            placeholder='Ex: 912345678'
                            maxlength="9"
                            className="form-control"
                            required />
                        <ErrorMessage name="numero" component="div" />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        {estaAtualizando ? 'Atualizar' : 'Criar'}
                    </button>
                </Form>
            )}
        </Formik>
    );
}

export default FormularioCliente;