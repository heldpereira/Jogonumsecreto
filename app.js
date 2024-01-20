let listaNumerosSorteados = [];
let numeroMaximoJogo = 1000;

let numeroSecreto = gerarNumeroAleatorio()
let tentativas = 1

function exibirTextoNaTela(tagHTML, textoExibido){
    let campo = document.querySelector(tagHTML);
    campo.innerHTML = textoExibido;
    responsiveVoice.speak(textoExibido, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensageminicial(){
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', `Escolha um número entre 1 e ${numeroMaximoJogo}.`);
};
exibirMensageminicial ()

function verificarChute() {
    let chute = document.querySelector('input').value;

    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', `O número secreto é menor que ${chute}.`);
        } else {
        exibirTextoNaTela('p', `O número secreto é maior que ${chute}.`);
        };
        tentativas++;
        limparCampo();
    };
};

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroMaximoJogo + 1);
    let quantidadeNumerosSorteados = listaNumerosSorteados.length;
    if (quantidadeNumerosSorteados == numeroMaximoJogo ) {
        listaNumerosSorteados = [];
    }
    if (listaNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    } else {
        listaNumerosSorteados.push(numeroEscolhido);
        console.log(listaNumerosSorteados);
        return numeroEscolhido;
    }
}
function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
};

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensageminicial ();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}