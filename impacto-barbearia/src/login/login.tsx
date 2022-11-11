import { ErrorMessage, Field, Form, Formik } from "formik";
import { LoginViewModel } from "../models/login";
import ImpactoBarbeariaServico from "../servicos/impacto-barbearia-servico";
import { useNavigate } from 'react-router-dom';

interface ILoginProps {
    atualizarJwt: (novoToken: string) => void
}

const Login = ({ atualizarJwt }: ILoginProps) => {
    const navigate = useNavigate();
    return (
        <Formik
            initialValues={{
                login: '',
                senha: ''
            }}
            onSubmit={async (values, { setSubmitting }) => {
                const login: LoginViewModel = {
                    usuario: values.login,
                    senha: values.senha
                }
                await ImpactoBarbeariaServico.autenticar(login)
                    .then(data => atualizarJwt(data.token))
                    .then(_ => navigate('/agendamentos'));
            }}>
            {({ isSubmitting }) => (
                <Form className='login-form container'>
                    <div className='form-control'>
                        <label htmlFor="login">Usuário</label>
                        <Field type="text" name="login" placeholder='Digite o login aqui' className="form-control" required />
                        <ErrorMessage name="login" component="div" />
                    </div>
                    <div className='form-control'>
                        <label htmlFor="senha">Senha</label>
                        <Field type="password" name="senha" placeholder='Digite a senha aqui' className="form-control" required />
                        <ErrorMessage name="senha" component="div" />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Login
                    </button>
                </Form>
            )}
        </Formik >);
}

export default Login;