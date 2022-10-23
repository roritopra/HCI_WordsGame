//Emmet
const wordE1 = document.getElementById('word');
const wrongLettersE1 = document.getElementById('wrong-letters');
const pointsContainer = document.querySelector('.score');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');
const shuffledWord = document.getElementById('shuffle-word');
const figureParts= document.querySelectorAll(".figure-part");
const instructionScreen = document.querySelectorAll("instruction");
const wrongLimit = figureParts.length;
const img = document.getElementById('img');
const words = [
    {word: 'carbomero', img: './images/image1.png'},
    {word: 'trietanolamina', img: './images/image2.png'},
    {word: 'carbono', img: './images/image3.png'},
    {word: 'glicerina', img: './images/image4.png'}
];
let score = 0;
updatePoints();
let selectedWord = "";
selectWord(Math.floor(Math.random() * words.length));

const correctLetters = [];
const wrongLetters = [];

//cambiar de nivel

function changeLevelScore() {
    window.location.href = '/screen-score';
}

function saveScore(score) {
    localStorage.setItem("score", score);
    
}


//Mostrar la palabra en las lineas

function displayWord(){
    wordE1.innerHTML = `
    ${selectedWord.split('').map(
        letter =>`
        <span class="letter">
        ${correctLetters.includes(letter) ? letter : ''}
        </span>
        `
    )
    .join('')}
    `;

    const innerWord = wordE1.innerText.replace(/\n/g, '');
    if(innerWord === selectedWord){
        score += 10;
        updatePoints();
        finalMessage.innerText = 'Felicitaciones sigue la prueba! 😃';
        popup.style.display= 'flex';
    }
}

// Actualiza las letras incorrectas
function updateWrongLetterE1(){
    //Muestra las letras incorrectas
    wrongLettersE1.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Letra incorrecta</p>' : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;

    //Muestra las partes del ahorcado
    if(wrongLetters.length > 0) figureParts[wrongLetters.length - 1]?.classList.add("show");
 
    //Comprobar si perdió
    if(wrongLetters.length === wrongLimit){
        finalMessage.innerText = 'Perdiste. 😕';
        popup.style.display = 'flex';
        score -= 5;
        updatePoints();
    }
}

//Contador de tiempo

var timeoutHandle;
function countdown(minutes, seconds) {
    function tick() {
        var counter = document.getElementById("timer");
        counter.innerHTML =
            minutes.toString() + ":" + (seconds < 10 ? "0" : "") + String(seconds);
        seconds--;
        if (seconds >= 0) {
            timeoutHandle = setTimeout(tick, 1000);
        } else {
            if (minutes >= 1) {
                
                setTimeout(function () {
                    countdown(minutes - 1, 59);
                }, 1000);
            }
        }
    }
    tick();
}

countdown(2, 05);

function changeLevel(){
    if((countdown) === 0){ 
    }
    else{
       changeLevelScore() 
    }   
}

//Mostrar la notificación
function showNotification(){
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}

//Seleccionar palabra nueva
function selectWord(index) {
    const selected = words[index];
    selectedWord = selected.word;
    img.setAttribute('src', selected.img);
//shuffledWord.innerText = `${selectedWord.split("").sort(() => (Math.random() - 0.5)).join("")}`;
}

function updatePoints() {
    pointsContainer.innerHTML = "" + score + " puntos";
    
}

//Todas las letras
window.addEventListener('keydown', e =>{
    if(e.keyCode >= 65 && e.keyCode <=90){
        const letter = e.key;

        if(selectedWord.includes(letter)){
            if(!correctLetters.includes(letter)){
                correctLetters.push(letter);

                displayWord();
            } else{
                showNotification();
            }
        } else{
            if(!wrongLetters.includes(letter)){
                wrongLetters.push(letter);

                updateWrongLetterE1();
            } else{
                showNotification();
            }
        }
    }
});

//Reiniciar el juego 
playAgainBtn.addEventListener('click', () => {
    correctLetters.splice(0);
    wrongLetters.splice(0);
    figureParts.forEach(part => part.classList.remove("show"));
    const selected = Math.floor(Math.random() * words.length);
    selectWord(selected);
    //shuffledWord.innerText = `${selected.split("").sort(() => (Math.random() - 0.5)).join("")}`;
    displayWord();
    updateWrongLetterE1();
    popup.style.display = 'none';
});

displayWord();
