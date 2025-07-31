let cores = ["vermelho", "azul", "verde", "amarelo", "roxo", "laranja", "rosa", "marrom", "cinza"];
let corAtual = "";
let pontuacao = 0;
let tempoRestante = 30;
let intervaloTempo;
let nomeJogador = "";

const grade = document.getElementById("grade");
const corTexto = document.getElementById("corAtual");
const pontuacaoTexto = document.getElementById("pontuacao");
const tempo = document.getElementById("tempo");
const nomeExibido = document.getElementById("nomeExibido");
const nomeFinal = document.getElementById("nomeFinal");
const pontuacaoFinal = document.getElementById("pontuacaoFinal");

document.getElementById("botaoJogar").addEventListener("click", () => {
  const nomeInput = document.getElementById("nomeJogador").value.trim();
  if (nomeInput !== "") {
    nomeJogador = nomeInput;
    document.getElementById("inicio").classList.add("escondido");
    document.getElementById("jogo").classList.remove("escondido");
    nomeExibido.textContent = nomeJogador;
    iniciarJogo();
  }
});

function iniciarJogo() {
  pontuacao = 0;
  tempoRestante = 30;
  atualizarPontuacao();
  gerarGrade();
  escolherNovaCor();
  tempo.textContent = tempoRestante;

  intervaloTempo = setInterval(() => {
    tempoRestante--;
    tempo.textContent = tempoRestante;
    if (tempoRestante <= 0) {
      tempoRestante = 0;
      clearInterval(intervaloTempo);
      finalizarJogo();
    }
  }, 1000);
}

function gerarGrade() {
  grade.innerHTML = "";
  for (let i = 0; i < 9; i++) {
    const corAleatoria = cores[Math.floor(Math.random() * cores.length)];
    const div = document.createElement("div");
    div.classList.add("quadrado");
    div.style.backgroundColor = corAleatoria;
    div.setAttribute("data-cor", corAleatoria);
    div.addEventListener("click", verificarCor);
    grade.appendChild(div);
  }
}

function escolherNovaCor() {
  const quadrados = document.querySelectorAll(".quadrado");
  const indice = Math.floor(Math.random() * quadrados.length);
  corAtual = quadrados[indice].getAttribute("data-cor");
  corTexto.textContent = corAtual;
}

function verificarCor(event) {
  const corClicada = event.target.getAttribute("data-cor");
  if (corClicada === corAtual) {
    pontuacao += 10;
  } else {
    pontuacao -= 5;
  }
  atualizarPontuacao();
  gerarGrade();
  escolherNovaCor();
}

function atualizarPontuacao() {
  pontuacaoTexto.textContent = pontuacao;
}

function finalizarJogo() {
  clearInterval(intervaloTempo);
  document.getElementById("jogo").classList.add("escondido");
  document.getElementById("fim").classList.remove("escondido");
  nomeFinal.textContent = nomeJogador;
  pontuacaoFinal.textContent = pontuacao;
}

function reiniciarJogo() {
  clearInterval(intervaloTempo);
  document.getElementById("fim").classList.add("escondido");
  document.getElementById("jogo").classList.remove("escondido");
  pontuacao = 0;
  tempoRestante = 30;
  pontuacaoFinal.textContent = "0";
  atualizarPontuacao();
  gerarGrade();
  escolherNovaCor();
  tempo.textContent = tempoRestante;

  intervaloTempo = setInterval(() => {
    tempoRestante--;
    tempo.textContent = tempoRestante;
    if (tempoRestante <= 0) {
      tempoRestante = 0;
      clearInterval(intervaloTempo);
      finalizarJogo();
    }
  }, 1000);
}
