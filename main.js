var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// CLASSE Pessoa
var Pessoa = /** @class */ (function () {
    function Pessoa(nome, idade) {
        this.nome = nome;
        this.idade = idade;
    }
    Pessoa.prototype.mostrarDados = function () {
        return "\nDADOS\n\tNome: ".concat(this.nome, "\n\tIdade: ").concat(this.idade);
    };
    return Pessoa;
}());
// CLASSE Cidadao
var Cidadao = /** @class */ (function (_super) {
    __extends(Cidadao, _super);
    function Cidadao(nome, idade, telefone, email) {
        var _this = _super.call(this, nome, idade) || this;
        _this.telefone = telefone;
        _this.email = email;
        _this.agendamentoVacina = null;
        return _this;
    }
    Cidadao.prototype.mostrarDados = function () {
        var agendamento = "Sem agendamento";
        if (this.agendamentoVacina) {
            agendamento = this.agendamentoVacina;
        }
        return (_super.prototype.mostrarDados.call(this) +
            "\n\tTelefone: ".concat(this.telefone, "\n\tE-mail: ").concat(this.email, "\n\tAgendamento: ").concat(agendamento));
    };
    Cidadao.prototype.agendarVacina = function (data, funcionario_escolhido) {
        this.agendamentoVacina = "".concat(data.getDate(), "/").concat(data.getMonth() + 1, "/").concat(data.getFullYear(), " Agendado por: ").concat(funcionario_escolhido);
    };
    return Cidadao;
}(Pessoa));
// CLASSE Funcionario
var Funcionario = /** @class */ (function (_super) {
    __extends(Funcionario, _super);
    function Funcionario(nome, idade, cargo, salario) {
        var _this = _super.call(this, nome, idade) || this;
        _this.cargo = cargo;
        _this.salario = salario;
        return _this;
    }
    Funcionario.prototype.mostrarDados = function () {
        return (_super.prototype.mostrarDados.call(this) +
            "\n\tCargo: ".concat(this.cargo, "\n\tSal\u00E1rio: ").concat(this.salario));
    };
    return Funcionario;
}(Pessoa));
// CLASSE CadastroValidator
var CadastroValidator = /** @class */ (function () {
    function CadastroValidator() {
    }
    CadastroValidator.verificarIdade = function (idade) {
        if (idade > 0 && idade < 200) {
            return true;
        }
        throw new Error("Idade inválida! Deve ser maior que 0 e menor que 200.");
    };
    CadastroValidator.verificarNome = function (nome) {
        if (nome && nome.trim().length > 0) {
            return true;
        }
        throw new Error("Nome inválido! Deve ser um texto não vazio.");
    };
    CadastroValidator.verificarTelefone = function (telefone) {
        var telefoneRegex = /^\d{4}-\d{4}$/;
        if (telefoneRegex.test(telefone)) {
            return true;
        }
        throw new Error("Telefone inválido! Deve estar no formato XXXX-XXXX.");
    };
    CadastroValidator.verificarEmail = function (email) {
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(email)) {
            return true;
        }
        throw new Error("E-mail inválido! Deve estar no formato padrão de e-mail.");
    };
    CadastroValidator.verificarSalario = function (salario) {
        if (salario > 0) {
            return true;
        }
        throw new Error("Salário inválido! Deve ser um valor positivo.");
    };
    return CadastroValidator;
}());
// CLASSE CadastroService
var CadastroService = /** @class */ (function () {
    function CadastroService() {
    }
    CadastroService.prototype.registrarCidadao = function () {
        try {
            var nome = prompt("Qual o nome do cidad\u00E3o?");
            CadastroValidator.verificarNome(nome);
            var idade = parseInt(prompt("Qual a idade de ".concat(nome, "?")));
            CadastroValidator.verificarIdade(idade);
            var telefone = prompt("Qual o telefone de ".concat(nome, "?\nAVISO: SOMENTE OS 8 DIGITOS COM UM H\u00CDFEN NO MEIO"));
            CadastroValidator.verificarTelefone(telefone);
            var email = prompt("Qual o E-mail de ".concat(nome));
            CadastroValidator.verificarEmail(email);
            var novo_cidadao = new Cidadao(nome, idade, telefone, email);
            cidadao_array.push(novo_cidadao);
            console.log(cidadao_array);
        }
        catch (error) {
            alert("Erro no cadastro do cidad\u00E3o: ".concat(error.message));
        }
    };
    CadastroService.prototype.removerCidadao = function () {
        var texto = "Qual cidadão você deseja remover:\n";
        cidadao_array.forEach(function (cidA, index) {
            texto += "(".concat(index, ") - ").concat(cidA.nome, "\n");
        });
        var res = parseInt(prompt(texto));
        if (res >= 0 && res < cidadao_array.length) {
            cidadao_array = cidadao_array.filter(function (_, index) { return index !== res; });
            alert("Cadastro removido com sucesso!");
        }
        else
            alert("Valor inválido!");
    };
    CadastroService.prototype.buscarCidadao = function (nomeProcurado) {
        var cidadao_encontrado = "Nenhum cidadão encontrado";
        cidadao_array.forEach(function (cidA) {
            if (cidA.nome.toUpperCase() === nomeProcurado.toUpperCase()) {
                cidadao_encontrado = cidA.mostrarDados();
            }
        });
        return cidadao_encontrado;
    };
    CadastroService.prototype.registrarFuncionario = function () {
        try {
            var nome = prompt("Qual o nome do funcion\u00E1rio?");
            CadastroValidator.verificarNome(nome);
            var idade = parseInt(prompt("Qual a idade de ".concat(nome, "?")));
            CadastroValidator.verificarIdade(idade);
            var cargo = "Cadastrador";
            var salario = parseInt(prompt("Qual o sal\u00E1rio de ".concat(nome)));
            CadastroValidator.verificarSalario(salario);
            var novo_funcionario = new Funcionario(nome, idade, cargo, salario);
            funcionario_array.push(novo_funcionario);
            console.log(funcionario_array);
        }
        catch (error) {
            alert("Erro no cadastro do funcion\u00E1rio: ".concat(error.message));
        }
    };
    CadastroService.prototype.removerFuncionario = function () {
        var texto = "Qual funcionário você deseja remover:\n";
        funcionario_array.forEach(function (funcA, index) {
            texto += "(".concat(index, ") - ").concat(funcA.nome, "\n");
        });
        var res = parseInt(prompt(texto));
        if (res >= 0 && res < funcionario_array.length) {
            funcionario_array = funcionario_array.filter(function (_, index) { return index !== res; });
            alert("Funcionário removido com sucesso!");
        }
        else
            alert("Valor inválido!");
    };
    CadastroService.prototype.buscarFuncionario = function (nomeProcurado) {
        var funcionario_encontrado = "Nenhum funcionário encontrado";
        funcionario_array.forEach(function (funcA) {
            if (funcA.nome.toUpperCase() === nomeProcurado.toUpperCase()) {
                funcionario_encontrado = funcA.mostrarDados();
            }
        });
        return funcionario_encontrado;
    };
    CadastroService.prototype.agendamento = function () {
        var funcionario_escolhido = prompt("Escolha um funcion\u00E1rio:\n".concat(this.showLista(funcionario_array)));
        var res = parseInt(prompt("Qual cidad\u00E3o deseja ter um agendamento?\n".concat(this.showLista(cidadao_array)))) - 1;
        var data = prompt("Qual a data do agendamento?\nColoque dessa forma AA-MM-DD");
        cidadao_array[res].agendarVacina(new Date(data), funcionario_escolhido);
    };
    CadastroService.prototype.showLista = function (type) {
        var texto = "LISTA\n------------------\n";
        type === null || type === void 0 ? void 0 : type.forEach(function (t, index) {
            texto += "\nID: ".concat(index + 1, " | Nome: ").concat(t.nome, "\n");
        });
        texto += "\n------------------";
        return texto;
    };
    return CadastroService;
}());
// Contantes usadas para chamar algum metodo ou variavel das classes
var _funcionario = new Funcionario();
var _cidadao = new Cidadao();
var _cadastroService = new CadastroService();
// Funções ativadas pelos botões do HTML. A funcionalidade dela é para chamar os métodos
function addCidadao() {
    _cadastroService.registrarCidadao();
}
function removerCidadao() {
    _cadastroService.removerCidadao();
}
function buscarCidadao() {
    var res = prompt("Qual voc\u00EA deseja buscar?\n".concat(_cadastroService.showLista(cidadao_array), "\nDigite o nome."));
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
    var res = prompt("Qual voc\u00EA deseja buscar?\n".concat(_cadastroService.showLista(funcionario_array), "\nDigite o nome."));
    alert(_cadastroService.buscarFuncionario(res));
}
// Adicionei logo de início um cidadão cadastrado caso queira verificar a lista sem cadastrar algum cidadão
var cidadao_array = [];
cidadao_array.push(new Cidadao("Carlos", 23, "8898-9807", "carlos@obrigado.com"));
// Fiz o mesmo com um funcionário
var funcionario_array = [];
funcionario_array.push(new Funcionario("Matheus", 19, "Cadastrador", 2000));
