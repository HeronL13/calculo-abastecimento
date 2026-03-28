const tabela = {
    P125: 250,
    P190: 400,
    P500: 1000,
    P1000: 2000,
    P2000: 4000,
    P4000: 8000
};

function formatarDensidade(input) {
    let valor = input.value.replace(/\D/g, "");

    if (valor.length === 0) {
        input.value = "";
        return;
    }

    valor = valor.padStart(3, "0");

    input.value = "0." + valor.slice(-3);
}

function mostrarTela(telaId) {
    let telas = document.querySelectorAll(".tela");

    telas.forEach(t => t.style.display = "none");

    document.getElementById(telaId).style.display = "block";
}

function mostrarTela(telaId) {
    let telas = document.querySelectorAll(".tela");
    let botoes = document.querySelectorAll(".menu button");

    
    telas.forEach(t => t.style.display = "none");

    
    botoes.forEach(b => b.classList.remove("ativo"));

    
    document.getElementById(telaId).style.display = "block";


    event.target.classList.add("ativo");
}


function calcularInicial(tipoTanque, quantidadeTanques, kgAbastecido, densidade) {
    let litrosTotal = tabela[tipoTanque] * quantidadeTanques;

    let porcentagemAdicionada = (kgAbastecido / (litrosTotal * densidade)) * 100;

    return 85 - porcentagemAdicionada;
}


function calcularAbastecimento(tipoTanque, quantidadeTanques, kgAbastecido, densidade, porcentagemInicial) {
    let litrosTotal = tabela[tipoTanque] * quantidadeTanques;

    let capacidadeKg = litrosTotal * densidade;

    let porcentagemAdicionada = (kgAbastecido / capacidadeKg) * 100;

    let final = porcentagemInicial + porcentagemAdicionada;

    if (final > 85) final = 85;

    return {
        inicial: porcentagemInicial,
        final: final
    };
}


function calcularSeguro(tipoTanque, quantidadeTanques, densidade, porcentagemAtual) {
    let litrosTotal = tabela[tipoTanque] * quantidadeTanques;

    let capacidadeKg = litrosTotal * densidade;

    let limiteSeguro = 85;

    let porcentagemDisponivel = limiteSeguro - porcentagemAtual;

    if (porcentagemDisponivel <= 0) {
        return 0;
    }

    let kgDisponivel = (porcentagemDisponivel / 100) * capacidadeKg;

    return kgDisponivel;
}


function converterNumero(valor) {
    if (!valor) return null;

    valor = valor.replace(",", ".");
    let numero = Number(valor);

    if (isNaN(numero)) return null;

    return numero;
}

function arredondar5(valor) {
    valor = Number(valor);

    let resto = valor % 10;

    if (resto === 0) return valor;
    if (resto === 5) return valor + 5;

    if (resto < 5) return valor - resto;
    return valor - resto + 10;
}


function modo1() {
    let tipo = document.getElementById("tipo1").value;
    let quantidade = Number(document.getElementById("quantidade1").value);
    let kg = Number(document.getElementById("kg1").value);
    let densidade = converterNumero(document.getElementById("densidade1").value);

    if (!tipo || !quantidade || !kg || densidade === null) {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    let resultado = calcularInicial(tipo, quantidade, kg, densidade);

    document.getElementById("resultado1").innerHTML =
        "Inicial: " + arredondar5(resultado) + "%";
}


function modo2() {
    let tipo = document.getElementById("tipo2").value;
    let quantidade = Number(document.getElementById("quantidade2").value);
    let kg = Number(document.getElementById("kg2").value);
    let densidade = converterNumero(document.getElementById("densidade2").value);
    let inicial = Number(document.getElementById("inicial2").value);

    if (!tipo || !quantidade || !kg || densidade === null || !inicial) {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    let resultado = calcularAbastecimento(tipo, quantidade, kg, densidade, inicial);

    document.getElementById("resultado2").innerHTML =
        "Inicial: " + arredondar5(resultado.inicial) + "%<br>" +
        "Final: " + arredondar5(resultado.final) + "%";
}

function modo3() {
    let tipo = document.getElementById("tipo3").value;
    let quantidade = Number(document.getElementById("quantidade3").value);
    let densidade = converterNumero(document.getElementById("densidade3").value);
    let inicial = Number(document.getElementById("inicial3").value);

    if (!tipo || !quantidade || densidade === null || inicial === null) {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    let kg = calcularSeguro(tipo, quantidade, densidade, inicial);

    document.getElementById("resultado3").innerHTML =
        "Abastecimento seguro: " + arredondar5(Math.round(kg)) + " KG";
}