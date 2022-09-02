export interface Cliente {
    id?: string,
    nome: string;
    sobrenome: string;
    email: string;
    telefone: Telefone;
}

interface Telefone {
    ddi: string;
    ddd: string;
    numero: string;
}