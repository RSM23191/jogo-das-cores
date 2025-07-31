const cores = [
  { nome: "vermelho", valor: "red" },
  { nome: "azul", valor: "blue" },
  { nome: "verde", valor: "green" },
  { nome: "amarelo", valor: "yellow" },
  { nome: "roxo", valor: "purple" },
  { nome: "rosa", valor: "pink" },
  { nome: "laranja", valor: "orange" },
  { nome: "cinza", valor: "gray" },
  { nome: "preto", valor: "black" }
];

let nome = "";
let pontuacao = 0;
let tempoRestante = 30;
let corAlvo = "";
let corAlvoNome = "";
let timer;
let jogoAtivo = false;

const botaoJogar = document.getElementById("botaoJogar");
const nomeInput = document.getElementById("nomeJogador");
const nomeExibido = document.getElementById("nomeExibido");
const nomeFinal = document.getElementById("nomeFinal");
const pontuacaoFinal = document.getElementById("pontuacaoFinal");
const corAtual = document.getElementById("corAtual");
const pontuacaoSpan = document.getElementById("pontuacao");
const tempoSpan = document.getElementById("tempo");
const grade = document.getElementById("grade");
const inicioDiv = document.getElementById("inicio");
const jogoDiv = document.getElementById("jogo");
const fimDiv = document.getElementById("fim");

botaoJogar.addEventListener("click", iniciarJogo);

function iniciarJogo() {
  nome = nomeInput.value.trim();
  if (!nome) return;

  pontuacao = 0;
  tempoRestante = 30;
  jogoAtivo = true;
  atualizarPontuacao();
  tempoSpan.textContent = tempoRestante;

  nomeExibido.textContent = nome;
  inicioDiv.classList.add("escondido");
  jogoDiv.classList.remove("escondido");
  fimDiv.classList.add("escondido");

  gerarGrade();
  atualizarCores();
  sortearCor();

  timer = setInterval(() => {
    tempoRestante--;
    tempoSpan.textContent = tempoRestante;
    if (tempoRestante <= 0) {
      encerrarJogo();
    }
  }, 1000);
}

function gerarGrade() {
  grade.innerHTML = "";
  grade.style.gridTemplateColumns = "repeat(3, 1fr)";
  grade.style.gridTemplateRows = "repeat(3, 1fr)";
  for (let i = 0; i < 9; i++) {
    const div = document.createElement("div");
    div.classList.add("cor");
    div.addEventListener("click", () => verificarCor(div.style.backgroundColor));
    grade.appendChild(div);
  }
}

function atualizarCores() {
  const divs = document.querySelectorAll(".cor");
  divs.forEach(div => {
    const cor = cores[Math.floor(Math.random() * cores.length)];
    div.style.backgroundColor = cor.valor;
  });

  const temCorAlvo = Array.from(divs).some(div => div.style.backgroundColor === corAlvo);
  if (!temCorAlvo) {
    const randomDiv = divs[Math.floor(Math.random() * divs.length)];
    randomDiv.style.backgroundColor = corAlvo;
  }
}

function sortearCor() {
  const cor = cores[Math.floor(Math.random() * cores.length)];
  corAlvo = cor.valor;
  corAlvoNome = cor.nome;
  corAtual.textContent = corAlvoNome;
}

function verificarCor(corClicada) {
  if (!jogoAtivo || tempoRestante <= 0) return;

  if (corClicada === corAlvo) {
    pontuacao++;
  } else {
    pontuacao--;
  }
  atualizarPontuacao();
  atualizarCores();
  sortearCor();
}

function atualizarPontuacao() {
  pontuacaoSpan.textContent = pontuacao;
}

function encerrarJogo() {
  clearInterval(timer);
  jogoAtivo = false;
  jogoDiv.classList.add("escondido");
  fimDiv.classList.remove("escondido");
  nomeFinal.textContent = nome;
  pontuacaoFinal.textContent = pontuacao;
}

function reiniciarJogo() {
  nomeInput.value = "";
  inicioDiv.classList.remove("escondido");
  jogoDiv.classList.add("escondido");
  fimDiv.classList.add("escondido");
}
