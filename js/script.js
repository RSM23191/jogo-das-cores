const cores = ["red", "green", "blue", "yellow", "purple", "orange"];
let corParaClicar = "";
let pontuacao = 0;
let tempoRestante = 30;
let nomeJogador = "";
let intervaloTempo;
let coresAtuais = [];

const botaoJogar = document.getElementById("botaoJogar");
const grade = document.getElementById("grade");
const corAtual = document.getElementById("corAtual");
const spanPontuacao = document.getElementById("pontuacao");
const tempo = document.getElementById("tempo");

botaoJogar.onclick = iniciarJogo;

function iniciarJogo() {
  nomeJogador = document.getElementById("nomeJogador").value;
  if (nomeJogador === "") {
    alert("Digite seu nome!");
    return;
  }

  document.getElementById("inicio").classList.add("escondido");
  document.getElementById("jogo").classList.remove("escondido");

  pontuacao = 0;
  tempoRestante = 30;
  atualizarPontuacao();
  gerarGrade();
  escolherNovaCor();

  tempo.textContent = tempoRestante;

  intervaloTempo = setInterval(() => {
    tempoRestante--;
    tempo.textContent = tempoRestante;
    if (tempoRestante === 0) finalizarJogo();
  }, 1000);
}

function gerarGrade() {
  grade.innerHTML = "";
  coresAtuais = [];

  for (let i = 0; i < 9; i++) {
    const cor = cores[Math.floor(Math.random() * cores.length)];
    coresAtuais.push(cor);
    const div = document.createElement("div");
    div.classList.add("quadrado");
    div.style.backgroundColor = cor;
    div.onclick = () => verificarCor(cor);
    grade.appendChild(div);
  }
}

function escolherNovaCor() {
  const indice = Math.floor(Math.random() * coresAtuais.length);
  corParaClicar = coresAtuais[indice];
  corAtual.textContent = corParaClicar;
  corAtual.style.color = corParaClicar;
}

function verificarCor(clicada) {
  if (clicada === corParaClicar) {
    pontuacao += 10;
  } else {
    pontuacao -= 5;
  }
  atualizarPontuacao();
  gerarGrade();
  escolherNovaCor();
}

function atualizarPontuacao() {
  spanPontuacao.textContent = pontuacao;
}

function finalizarJogo() {
  clearInterval(intervaloTempo);
  document.getElementById("jogo").classList.add("escondido");
  document.getElementById("fim").classList.remove("escondido");
  document.getElementById("nomeFinal").textContent = nomeJogador;
  document.getElementById("pontuacaoFinal").textContent = pontuacao;
}

function reiniciarJogo() {
  clearInterval(intervaloTempo);

  pontuacao = 0;
  tempoRestante = 30;
  atualizarPontuacao();

  document.getElementById("fim").classList.add("escondido");
  document.getElementById("jogo").classList.remove("escondido");

  gerarGrade();
  escolherNovaCor();

  tempo.textContent = tempoRestante;

  intervaloTempo = setInterval(() => {
    tempoRestante--;
    tempo.textContent = tempoRestante;
    if (tempoRestante === 0) finalizarJogo();
  }, 1000);
}
