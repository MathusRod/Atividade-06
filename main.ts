// CLASSE Pessoa
class Pessoa {
  nome: string;
  idade: number;

  constructor(nome: string, idade: number) {
    this.nome = nome;
    this.idade = idade;
  }

  mostrarDados(): string {
    return `\nDADOS\n\tNome: ${this.nome}\n\tIdade: ${this.idade}`;
  }
}

// CLASSE Cidadao
class Cidadao extends Pessoa {
  telefone: string;
  email: string;
  agendamentoVacina: string | null;

  constructor(nome?: string, idade?: number, telefone?: string, email?: string) {
    super(nome, idade);
    this.telefone = telefone;
    this.email = email;
    this.agendamentoVacina = null;
  }

  mostrarDados(): string {
    let agendamento: string = "Sem agendamento";
    if (this.agendamentoVacina) {
      agendamento = this.agendamentoVacina;
    }
    return (
      super.mostrarDados() +
      `\n\tTelefone: ${this.telefone}\n\tE-mail: ${this.email}\n\tAgendamento: ${agendamento}`
    );
  }

  agendarVacina(data: Date, funcionario_escolhido: string) {
    this.agendamentoVacina = `${data.getDate()}/${
      data.getMonth() + 1
    }/${data.getFullYear()} Agendado por: ${funcionario_escolhido}`;
  }
}

// CLASSE Funcionario
class Funcionario extends Pessoa {
  cargo: string;
  salario: number;

  constructor(nome?: string, idade?: number, cargo?: string, salario?: number) {
    super(nome, idade);
    this.cargo = cargo;
    this.salario = salario;
  }

  mostrarDados(): string {
    return (
      super.mostrarDados() +
      `\n\tCargo: ${this.cargo}\n\tSalário: ${this.salario}`
    );
  }
}

// CLASSE CadastroValidator
class CadastroValidator {
  
  static verificarIdade(idade: number): boolean {
    if (idade > 0 && idade < 200) {
      return true;
    }
    throw new Error("Idade inválida! Deve ser maior que 0 e menor que 200.");
  }

  static verificarNome(nome: string): boolean {
    if (nome && nome.trim().length > 0) {
      return true;
    }
    throw new Error("Nome inválido! Deve ser um texto não vazio.");
  }

  static verificarTelefone(telefone: string): boolean {
    const telefoneRegex = /^\d{4}-\d{4}$/;
    if (telefoneRegex.test(telefone)) {
      return true;
    }
    throw new Error("Telefone inválido! Deve estar no formato XXXX-XXXX.");
  }

  static verificarEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) {
      return true;
    }
    throw new Error("E-mail inválido! Deve estar no formato padrão de e-mail.");
  }

  static verificarSalario(salario: number): boolean {
    if (salario > 0) {
      return true;
    }
    throw new Error("Salário inválido! Deve ser um valor positivo.");
  }
}

// CLASSE CadastroService
class CadastroService {
  registrarCidadao() {
    try {
      const nome: string = prompt(`Qual o nome do cidadão?`);
      CadastroValidator.verificarNome(nome);
      
      const idade: number = parseInt(prompt(`Qual a idade de ${nome}?`));
      CadastroValidator.verificarIdade(idade);
      
      const telefone: string = prompt(
        `Qual o telefone de ${nome}?\nAVISO: SOMENTE OS 8 DIGITOS COM UM HÍFEN NO MEIO`
      );
      CadastroValidator.verificarTelefone(telefone);
      
      const email: string = prompt(`Qual o E-mail de ${nome}`);
      CadastroValidator.verificarEmail(email);
      
      const novo_cidadao = new Cidadao(nome, idade, telefone, email);
      cidadao_array.push(novo_cidadao);
      
      console.log(cidadao_array);
    } catch (error) {
      alert(`Erro no cadastro do cidadão: ${error.message}`);
    }
  }

  removerCidadao() {
    let texto = "Qual cidadão você deseja remover:\n";
    cidadao_array.forEach((cidA, index) => {
      texto += `(${index}) - ${cidA.nome}\n`;
    });
    const res: number = parseInt(prompt(texto));
    if (res >= 0 && res < cidadao_array.length) {
      cidadao_array = cidadao_array.filter((_, index) => index !== res);
      alert("Cadastro removido com sucesso!");
    } else alert("Valor inválido!");
  }

  buscarCidadao(nomeProcurado: string) {
    let cidadao_encontrado: object | string = "Nenhum cidadão encontrado";
    cidadao_array.forEach((cidA) => {
      if (cidA.nome.toUpperCase() === nomeProcurado.toUpperCase()) {
        cidadao_encontrado = cidA.mostrarDados();
      }
    });
    return cidadao_encontrado;
  }

  registrarFuncionario() {
    try {
      const nome: string = prompt(`Qual o nome do funcionário?`);
      CadastroValidator.verificarNome(nome);
      
      const idade: number = parseInt(prompt(`Qual a idade de ${nome}?`));
      CadastroValidator.verificarIdade(idade);
      
      const cargo: string = "Cadastrador";
      
      const salario: number = parseInt(prompt(`Qual o salário de ${nome}`));
      CadastroValidator.verificarSalario(salario);
      
      const novo_funcionario = new Funcionario(nome, idade, cargo, salario);
      funcionario_array.push(novo_funcionario);
      
      console.log(funcionario_array);
    } catch (error) {
      alert(`Erro no cadastro do funcionário: ${error.message}`);
    }
  }

  removerFuncionario() {
    let texto = "Qual funcionário você deseja remover:\n";
    funcionario_array.forEach((funcA, index) => {
      texto += `(${index}) - ${funcA.nome}\n`;
    });
    const res: number = parseInt(prompt(texto));
    if (res >= 0 && res < funcionario_array.length) {
      funcionario_array = funcionario_array.filter((_, index) => index !== res);
      alert("Funcionário removido com sucesso!");
    } else alert("Valor inválido!");
  }

  buscarFuncionario(nomeProcurado: string) {
    let funcionario_encontrado: object | string = "Nenhum funcionário encontrado";
    funcionario_array.forEach((funcA) => {
      if (funcA.nome.toUpperCase() === nomeProcurado.toUpperCase()) {
        funcionario_encontrado = funcA.mostrarDados();
      }
    });
    return funcionario_encontrado;
  }

  agendamento() {
    const funcionario_escolhido: string = prompt(
      `Escolha um funcionário:\n${this.showLista(funcionario_array)}`
    );
    const res: number =
      parseInt(
        prompt(
          `Qual cidadão deseja ter um agendamento?\n${this.showLista(cidadao_array)}`
        )
      ) - 1;
    const data: string = prompt(
      "Qual a data do agendamento?\nColoque dessa forma AA-MM-DD"
    );
    cidadao_array[res].agendarVacina(new Date(data), funcionario_escolhido);
  }

  showLista(type) {
    let texto = "LISTA\n------------------\n";
    type?.forEach((t, index) => {
      texto += `\nID: ${index + 1} | Nome: ${t.nome}\n`;
    });
    texto += `\n------------------`;
  
    return texto;
  }
}

// Contantes usadas para chamar algum metodo ou variavel das classes
const _funcionario = new Funcionario();
const _cidadao = new Cidadao();
const _cadastroService = new CadastroService();

// Funções ativadas pelos botões do HTML. A funcionalidade dela é para chamar os métodos
function addCidadao() {
  _cadastroService.registrarCidadao();
}

function removerCidadao() {
  _cadastroService.removerCidadao();
}

function buscarCidadao() {
  let res = prompt(
    `Qual você deseja buscar?\n${_cadastroService.showLista(cidadao_array)}\nDigite o nome.`
  );
  alert(_cadastroService.buscarCidadao(res));
}

function agendarUmaVacina() {
  _cadastroService.agendamento();
}

function addFuncionario() {
  _cadastroService.registrarFuncionario();
}

function removerFuncionario() {
  _cadastroService.removerFuncionario();
}

function buscarFuncionario() {
  let res = prompt(
    `Qual você deseja buscar?\n${_cadastroService.showLista(funcionario_array)}\nDigite o nome.`
  );
  alert(_cadastroService.buscarFuncionario(res));
}

// Adicionei logo de início um cidadão cadastrado caso queira verificar a lista sem cadastrar algum cidadão
let cidadao_array: Cidadao[] = [];
cidadao_array.push(new Cidadao("Carlos", 23, "8898-9807", "carlos@obrigado.com"));

// Fiz o mesmo com um funcionário
let funcionario_array: Funcionario[] = [];
funcionario_array.push(new Funcionario("Matheus", 19, "Cadastrador", 2000));
