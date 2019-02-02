var selectableWords =         
    [
     "guitar",
     "drum",
     "bass",
     "violin",
     "cello",
     "trombone",
     "tuba",
     "xylophone",
     "banjo",
     "ukulele",
     "harmonica",
     "accordian",
     "piano",
     "mandolin",
     "trumpet",
     "oboe",
     "flute",
     "saxophone",
     "bassoon",
     "clarinet",
     "organ",
     "harp",
     "viola",
     "bagpipes",
     "marimba",
     "tambourine",
     "sitar",
     "ocarina",
     "theremin",
     "didgeridoo"
    
    ];

const maxTries = 10;            

let guessedLetters = [];        
let currentWordIndex;           
let guessingWord = [];          
let remainingGuesses = 0;       
let gameStarted = false;        
let hasFinished = false;            
let wins = 0;                   


const resetGame = () => {
    remainingGuesses = maxTries;
    gameStarted = false;

    currentWordIndex = Math.floor(Math.random() * (selectableWords.length));

    guessedLetters = [];
    guessingWord = [];

    document.getElementById("hangmanImage").src = "";

    for (var i = 0; i < selectableWords[currentWordIndex].length; i++) {
        guessingWord.push("_");
    }
    
    document.getElementById("pressKeyTryAgain").style.cssText= "display: none";
    document.getElementById("gameover-image").style.cssText = "display: none";
    document.getElementById("youwin-image").style.cssText = "display: none";
   
    updateDisplay();
};


const updateDisplay = () => {

    document.getElementById("totalWins").innerText = wins;
    document.getElementById("currentWord").innerText = "";
    
    for (var i = 0; i < guessingWord.length; i++) {
        document.getElementById("currentWord").innerText += guessingWord[i];
    }
    
    document.getElementById("remainingGuesses").innerText = remainingGuesses;
    document.getElementById("guessedLetters").innerText = guessedLetters;
    
    if(remainingGuesses <= 0) {
        document.getElementById("gameover-image").style.cssText = "display: block";
        document.getElementById("pressKeyTryAgain").style.cssText = "display:block";
        hasFinished = true;
    }
};


const updateHangmanImage = () => {
    document.getElementById("hangmanImage").src = "assets/images/" + (maxTries - remainingGuesses) + ".png";
};

document.onkeydown = function(event) {
   
    if(hasFinished) {
        resetGame();
        hasFinished = false;
    } else {
       
        if(event.keyCode >= 65 && event.keyCode <= 90) {
            makeGuess(event.key.toLowerCase());
        }
    }
};

const makeGuess = letter => {
    if (remainingGuesses > 0) {
        if (!gameStarted) {
            gameStarted = true;
        }
       
        if (guessedLetters.indexOf(letter) === -1) {
            guessedLetters.push(letter);
            evaluateGuess(letter);
        }
    }
    
    updateDisplay();
    checkWin();
};

const evaluateGuess = letter => {
    
    var positions = [];
    
    for (var i = 0; i < selectableWords[currentWordIndex].length; i++) {
        if(selectableWords[currentWordIndex][i] === letter) {
            positions.push(i);
        }
    }
    
    if (positions.length <= 0) {
        remainingGuesses--;
        updateHangmanImage();
    } else {
        
        for(var i = 0; i < positions.length; i++) {
            guessingWord[positions[i]] = letter;
        }
    }
};

const checkWin = () => {
    if(guessingWord.indexOf("_") === -1) {
        document.getElementById("youwin-image").style.cssText = "display: block";
        document.getElementById("pressKeyTryAgain").style.cssText= "display: block";
        wins++;
        hasFinished = true;
    }
};

