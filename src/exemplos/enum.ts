const sarah = {
    name: 'Sarah',
    idade: 26,
    casado: true,
    trabalho: 'Engenheira' // Nesse campo é dito que a sarah trabalha como 'Engenheira'
}

const maria = { 
    name: 'Maria',
    idade: 23,
    casado: false,
    trabalho: 'engenheira' // E aqui é dito que maria trabalha como 'engenheira'.
}

// Isso está correto? Existe diferença entre 'Engenheira' e 'engenheira'? Acredito que não. Isso deve ter sido um erro cometido em desenvolvimento.

// Para resolver isso vamos usar a feature Enum do TypeScript para criar o enum Profissao
enum Profissao_ex {
    Professor,
    Engenheiro,
    Pintor,
    Porteiro
}

// E para garantir que o enum vai ser usado corretamente, vamos criar um tipo Pessoa também
type Pessoa = {
    name: string,
    idade: number,
    casado: boolean,
    trabalho: Profissao_ex // Aqui inserimos o enum como um tipo
}

const gabriel: Pessoa = {
    name: 'Gabriel',
    idade: 26,
    casado: false,
    trabalho: Profissao_ex.Engenheiro // E aqui usamos ele para definir de forma padronizada a profissão de cada objeto do tipo Pessoa
}

const mario: Pessoa = {
    name: 'Mario',
    idade: 26,
    casado: false,
    trabalho: Profissao_ex.Engenheiro // Tudo padronizado e consistente
}