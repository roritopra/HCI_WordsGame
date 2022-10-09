const wordE1 = document.getElementById('word');
const wrongLettersE1 = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');
const shuffledWord = document.getElementById('shuffle-word');
const wrongLimit = 6;
const img = document.getElementById('img');
const words = [
    {word: 'carbomero', img: './images/image1.png'},
    {word: 'trietanolamina', img: './images/image2.png'},
    {word: 'carbono', img: './images/image3.png'},
    {word: 'sodio', img: './images/image4.png'}
];

let selectedWord = "";
selectWord(Math.floor(Math.random() * words.length));

const correctLetters = [];
const wrongLetters = [];

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
 
    //Comprobar si perdió
    if(wrongLetters.length === wrongLimit){
        finalMessage.innerText = 'Perdiste. 😕';
        popup.style.display = 'flex';
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
    const selected = Math.floor(Math.random() * words.length);
    selectWord(selected);
    //shuffledWord.innerText = `${selected.split("").sort(() => (Math.random() - 0.5)).join("")}`;
    displayWord();
    updateWrongLetterE1();
    popup.style.display = 'none';
});

displayWord();

