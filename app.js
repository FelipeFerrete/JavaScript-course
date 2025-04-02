// let titulo = document.querySelector("h1");
// titulo.innerHTML = "Jogo do Numero Secreto";

// let paragrafo = document.querySelector("p");
// paragrafo.innerHTML = "Escolha um numero entre 0 e 10.";

let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas =1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML =  texto;
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.5; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function exibirMensagemInicial() {
    exibirTextoNaTela("h1","Jogo do Numero Secreto");
    exibirTextoNaTela("p","Escolha um numero entre 0 e 10.");
}

exibirMensagemInicial();


function verificarChute() {
    let chute = document.querySelector("input").value;

    if (chute == numeroSecreto) {
        exibirTextoNaTela("h1", "ACERTOU!!!");
        let palavraTentativas = tentativas > 1 ? "tentativas" : "tentativa";  
        let mensagemTentativas = `Voce descobriu o numero seecretos com ${tentativas} ${palavraTentativas}.` 
        exibirTextoNaTela("p", `${mensagemTentativas}`);
        document.getElementById("reiniciar").removeAttribute("disabled");
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela("p", "O numero secreto e menor que o chute")
        }   else {
            exibirTextoNaTela("p", "O numero secreto e maior que o chute")
    }        
    // tentativas = tentativas + 1;
    tentativas++;
    limparCampo();

    }
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == 3) {
        listaDeNumerosSorteados = [];
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }

}

function limparCampo() {
    chute = document.querySelector("input");
    chute.value = "";
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById("reiniciar").setAttribute("disabled",true)
}