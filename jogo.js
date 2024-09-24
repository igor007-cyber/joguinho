const characterImg = document.getElementById("character");
const pipe = document.querySelector(".pipe");
const overDiv = document.querySelector(".game-status");
var counterVal = 0;  // Contador de eventos
var body = document.querySelector(".tela-body");
var selectedCharacter = '';
var points = 0;  // Variável para os pontos
const pointsLabel = document.getElementById("points-label");

let backgroundMusic = new Audio('sounds/bgMusic.mp3');
backgroundMusic.loop = true; // Define a música para tocar em loop
backgroundMusic.volume = 0.2; // Define o volume da música

let jumpSound = new Audio('sounds/jump.mp3');
jumpSound.volume = 0.2; // Define o volume do som de pulo

let colisaoSound = new Audio('sounds/colisao.mp3');
colisaoSound.volume = 0.2; // Define o volume do som de colisão



// Função para selecionar o personagem
function selectCharacter(character) {
    if (character === 'mario') {
        characterImg.src = 'images/leleko.png';
        characterImg.classList.add('mario');
    } else if (character === 'luigi') {
        characterImg.src = 'images/leleka.png';
        characterImg.classList.add('luigi');
    }
    
    selectedCharacter = character;

    // Esconde a seleção de personagens e mostra o jogo
    document.querySelector('#character-selection').style.display = 'none';
    document.querySelector('.game-board').style.display = 'block';

    // Inicializa os pontos
    points = 0;
    updatePoints(points);

    backgroundMusic.play(); // Toca a música de fundo
}

// Função para gerar obstáculos aleatórios
function generateObstacles() {
    const obstacle = document.createElement('div');
    obstacle.classList.add('pipe');
    obstacle.style.left = '100%';
    document.querySelector('.game-board').appendChild(obstacle);

    // Move o obstáculo
    let moveInterval = setInterval(() => {
        let obstacleLeft = parseInt(window.getComputedStyle(obstacle).left);
        if (obstacleLeft <= -60) {
            clearInterval(moveInterval);
            obstacle.remove();
        } else {
            obstacle.style.left = obstacleLeft - 10 + 'px';
        }
    }, 100);

    // Gera o próximo obstáculo após um intervalo aleatório
    let nextObstacleDelay = Math.random() * 2000; // Entre 1 e 4 segundos
    setTimeout(generateObstacles, nextObstacleDelay);
}

// Função para iniciar o jogo e a geração dos obstáculos
function selectCharacter(character) {
    if (character === 'mario') {
        characterImg.src = 'images/leleko.png';
        characterImg.classList.add('mario');
    } else if (character === 'luigi') {
        characterImg.src = 'images/leleka.png';
        characterImg.classList.add('luigi');
    }
    
    selectedCharacter = character;

    // Esconde a seleção de personagens e mostra o jogo
    document.querySelector('#character-selection').style.display = 'none';
    document.querySelector('.game-board').style.display = 'block';

    // Inicializa os pontos
    points = 0;
    updatePoints(points);

    backgroundMusic.play(); // Toca a música de fundo

    generateObstacles(); // Começa a gerar obstáculos
}

// Função de pular (jump)
function jump() {
    characterImg.classList.add("jump");
    jumpSound.play(); // Toca o som de pulo 
    setTimeout(() => {
        characterImg.classList.remove("jump");
    }, 500);
}

// Função para verificar se o jogador passa o tubo com sucesso ou colide
const loop = setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(characterImg).bottom.replace('px', '');

    if (document.body.offsetWidth >= 760) {
        if (pipePosition <= 100 && pipePosition > 0 && marioPosition < 80) {
            // Colisão com o tubo
            pipe.style.animation = 'none';
            pipe.style.left = `${pipePosition}px`;

            characterImg.style.animation = 'none';
            characterImg.style.bottom = `${marioPosition}px`;
            characterImg.src = 'images/lelekoTriste.png';
            characterImg.style.width = '100px';
            characterImg.style.marginLeft = '5px';

            clearInterval(loop);
            gameOver();
        } else if (pipePosition <= 0) {
            // Jogador passou com sucesso pelo tubo
            points++;
            updatePoints(points);
        }
    } else if (document.body.offsetWidth >= 420) {
        if (pipePosition <= 85 && pipePosition > 0 && marioPosition < 70) {
            // Colisão com o tubo
            pipe.style.animation = 'none';
            pipe.style.left = `${pipePosition}px`;

            characterImg.style.animation = 'none';
            characterImg.style.bottom = `${marioPosition}px`;
            characterImg.src = 'images/lelekoTriste.png';
            characterImg.style.width = '100px';
            characterImg.style.marginLeft = '5px';

            clearInterval(loop);
            gameOver();
        } else if (pipePosition <= 0) {
            // Jogador passou com sucesso pelo tubo
            points++;
            updatePoints(points);
        }
    } else {
        if (pipePosition <= 80 && pipePosition > 0 && marioPosition < 50) {
            // Colisão com o tubo
            pipe.style.animation = 'none';
            pipe.style.left = `${pipePosition}px`;

            characterImg.style.animation = 'none';
            characterImg.style.bottom = `${marioPosition}px`;
            characterImg.src = 'images/lelekoTriste.png ';
            characterImg.style.width = '120px';
            characterImg.style.marginLeft = '35px';

            clearInterval(loop);
            gameOver();
        } else if (pipePosition <= 0) {
            // Jogador passou com sucesso pelo tubo
            points++;
            updatePoints(points);
        }
    }
}, 10);

// Função de game over
function gameOver() {
    colisaoSound.play(); // Toca o som de colisão
    overDiv.innerHTML += `<img src="images/overpic.png" alt="imagem game over" class="game-over">
    <button class="buttonStart" onclick="start()">
        <img src="images/Daco_4422541.png" alt="imagem começar jogo" width="150px" class="start">
    </button>`;
    resetPoints();  // Zerar a pontuação quando o jogador morrer
}

// Função para reiniciar o jogo
function start() {
    location.reload();
}

// Atualizar o display dos pontos
function updatePoints(val) {
    pointsLabel.textContent = "Pontos: " + val;
}

// Função para resetar os pontos
function resetPoints() {
    points = 0;
    pointsLabel.textContent = "Pontos: 0";
}

// Eventos de controle
body.addEventListener('touchstart', jump);

document.addEventListener('keydown', function(event) {
    if (event.key === " ") {
        jump();
    }
});

document.addEventListener('keydown', function(event) {
    if (event.key === "Enter") {
        start();
    }
});

// Exibir instrução de controle em dispositivos móveis
const inst = document.querySelector(".instrucoes");

let i = 0;
function handleInstrucao() {
    if (window.innerWidth < 990 && i < 1) {
        inst.innerHTML += "<p><b>Usando Mobile?</b> Toque a tela para pular e pressione <i>Start</i> para reiniciar o jogo.</p>";
        i += 1;
    }
}

window.addEventListener("resize", handleInstrucao);
window.addEventListener("pageshow", handleInstrucao);