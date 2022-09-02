import { ErrorMessage, Field, Form, Formik } from "formik";
import { Cliente } from "../../models/cliente";

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

export default FormularioCliente;