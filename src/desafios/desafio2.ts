// Como podemos melhorar o esse código usando TS? 

interface Funcionario {
    nome: string,
    idade: number,
    profissao: Profissao,
}

enum Profissao {
    Atriz,
    Padeiro
}

let pessoa1: Funcionario = {
    nome: "Maria",
    idade: 29,
    profissao: Profissao.Atriz
}

let pessoa2: Funcionario = {
    nome: "Roberto",
    idade: 19,
    profissao: Profissao.Padeiro
}

let pessoa3: Funcionario = {
    nome: "Laura",
    idade: 32,
    profissao: Profissao.Atriz
}

let pessoa4: Funcionario = {
    nome: "Carlos",
    idade: 19,
    profissao: Profissao.Padeiro
}
