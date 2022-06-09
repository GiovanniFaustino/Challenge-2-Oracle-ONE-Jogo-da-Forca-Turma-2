var adicionarPalavra = document.querySelector(".adicionarPalavra");
var adicionarPalavra1 = document.querySelector(".adicionarPalavra1");
var inputTexto = document.querySelector(".input-texto");
var container1 = document.querySelector('.container1');
var container2 = document.querySelector('.container2');
var container3 = document.querySelector('.container3');
var cabeca = document.querySelector('#cabeca');
var corpo = document.querySelector('#corpo');
var bracoDireito = document.querySelector('#bracoDireito');
var bracoEsquerdo = document.querySelector('#bracoEsquerdo');
var pernaDireita = document.querySelector('#pernaDireita');
var pernaEsquerda = document.querySelector('#pernaEsquerda');
var avisoPalavraRepetida = document.querySelector('#notification-container')
var div = document.querySelector('.letras-erradas-container');
var container = document.querySelector(".palavra-secreta-container");
var partesCorpo = document.querySelectorAll(".parte-figura");
var playAgainBtn = document.getElementById('play-button');
var popup = document.querySelector('.popup-container');
var finalMessage = document.getElementById('final-message');
var adicionarPalavra = document.getElementById('input-texto');
var pista = document.getElementById('pista');
//Montagem do Boneco
cabeca.style.display = 'none';
corpo.style.display = 'none';
bracoDireito.style.display = 'none';
bracoEsquerdo.style.display = 'none';
pernaDireita.style.display = 'none';
pernaEsquerda.style.display = 'none';
//Troca de telas
container1.style.display = 'none';
container2.style.display = 'block';
container3.style.display = 'none';

var frutas = ['BANANA', 'MELANCIA', 'LARANJA', 'PERA', 'KIWI','JAMBO','MEXERICA','MERTILO','FRAMBOESA','UVA'];
var palavraSecreta = frutas[Math.floor(Math.random() * frutas.length)];
var letrasErradas = []
var letrasCorretas = []

function btnJogar() {
    atualizarJogo()
    container1.style.display = 'block';
    container2.style.display = 'none';
    container3.style.display = 'none';    
}

function btnAdicionarPalavra1() {
    container1.style.display = 'none';
    container2.style.display = 'none';
    container3.style.display = 'block';
}

function btnMenuInicial() {
    container1.style.display = 'none';
    container2.style.display = 'block';
    container3.style.display = 'none';
}

function btnDesitirJogo() {
    location.reload();
    container1.style.display = 'none';
    container2.style.display = 'none';
    container3.style.display = 'block';    
}

function btnAdicionarPalavra() {
    if(inputTexto.value == inputTexto.value.replace(/[^0-9]\w+/g,"")) {
        alert('Digite somente letras!');
        inputTexto.value = "";
    }       
    else{
        inputTexto.value = inputTexto.value.toUpperCase(); 
        frutas.push(inputTexto.value) == inputTexto.value    
        inputTexto.value = "";
    }     
}

document.addEventListener("keydown", (evento) => {
    const codigo = evento.keyCode; // 65 - 90 (intervalo)
    if(isLetra(codigo)) {
        const letra = evento.key.toLocaleUpperCase();
        if(letrasErradas.includes(letra)) {
            mostrarAvisoLetraRepetida()
        } else {
            if(palavraSecreta.includes(letra)) {
                letrasCorretas.push(letra);
            } else {
                letrasErradas.push(letra);
            }
        }
        atualizarJogo();
    }
})

function atualizarJogo() {
    mostrarLetrasErradas();
    mostraLetrasCertas();
    desenharForca();
    checarJogo();
}

function mostrarLetrasErradas() {    
    div.innerHTML = "";
    letrasErradas.forEach(letra => {
        div.innerHTML += `<span>${letra}</span>`;
    });
}

function mostraLetrasCertas() {    
    container.innerHTML = "";
    palavraSecreta.split("").forEach(letra => {
        if(letrasCorretas.includes(letra)) {
            container.innerHTML += `<span>${letra}</span>`;
        } else {
            container.innerHTML += `<span>__</span>`;
        }
    })
}

function checarJogo() {
    let mensagem = "";  
    if(letrasErradas.length == partesCorpo.length) {
        
        document.querySelector("#final-message").innerHTML = mensagem;
        document.querySelector("#final-message").style.color = 'red';
        mensagem = ("Fim de Jogo! Você perdeu!")
    }
    if(palavraSecreta == container.innerText) {
        document.querySelector("#final-message").innerHTML = mensagem;
        document.querySelector("#final-message").style.color = 'green';
        mensagem = "Parabens! Você Ganhou!"
    }

    if(mensagem) {
        document.querySelector("#final-message").innerHTML = mensagem;
        document.querySelector(".popup-container").style.display = "flex";
    }
}

function desenharForca() {    
    for(let i = 0; i < letrasErradas.length; i++) {
        partesCorpo[i].style.display = "block";
    }
}

function mostrarAvisoLetraRepetida() {    
    avisoPalavraRepetida.classList.add("show");
    setTimeout(() => {
    avisoPalavraRepetida.classList.remove("show");
    }, 1000);
}

function isLetra(codigo) {
    return codigo >= 65 && codigo <= 90;
}

function reiniciarJogo() {
    window.location.reload();    
}