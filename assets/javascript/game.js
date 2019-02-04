var instrumentList = ["guitar", "drum", "bass", "violin", "cello", "trombone", "tuba", "xylophone", "banjo", "ukulele", "harmonica", "accordian", "piano", "mandolin", "trumpet", "oboe", "flute", "saxophone", "bassoon", "clarinet", "organ", "harp", "viola", "bagpipes", "marimba", "tambourine", "sitar", "ocarina", "theremin", "didgeridoo"];

const maximumTries = 10;            

let guessedLetters = [];        
let currentWordIndex;           
let guessingWord = [];          
let remainingGuesses = 0;       
let gameStarted = false;        
let hasFinished = false;            
let wins = 0;                   


const newGame = () => {
    remainingGuesses = maximumTries;
    gameStarted = false;

    currentWordIndex = Math.floor(Math.random() * (instrumentList.length));

    guessedLetters = [];
    guessingWord = [];

    document.getElementById("startingImage").src ="https://s3.amazonaws.com/spoonflower/public/design_thumbnails/0596/0887/rOrchestra_preview.png";

    for (var i = 0; i < instrumentList[currentWordIndex].length; i++) {
        guessingWord.push("_");
    }
    
    document.getElementById("pressKeyTryAgain").style.cssText= "display: none";
    document.getElementById("gameover-image").style.cssText = "display: none";
    document.getElementById("youwin-image").style.cssText = "display: none";
   
    refreshDisplay();
};


const refreshDisplay = () => {

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


const updateImage = () => {
    document.getElementById("startingImage").src ="https://s3.amazonaws.com/spoonflower/public/design_thumbnails/0596/0887/rOrchestra_preview.png" + (maximumTries - remainingGuesses) + ".png";
};

document.onkeydown = function(event) {
   
    if(hasFinished) {
        newGame();
        hasFinished = false;
    } else {
       
        if(event.keyCode >= 65 && event.keyCode <= 90) {
            guess(event.key.toLowerCase());
        }
    }
};

const guess = letter => {
    if (remainingGuesses > 0) {
        if (!gameStarted) {
            gameStarted = true;
        }
       
        if (guessedLetters.indexOf(letter) === -1) {
            guessedLetters.push(letter);
            checkGuess(letter);
        }
    }
    
    refreshDisplay();
    checkWin();
};

const checkGuess = letter => {
    
    var positions = [];
    
    for (var i = 0; i < instrumentList[currentWordIndex].length; i++) {
        if(instrumentList[currentWordIndex][i] === letter) {
            positions.push(i);
        }
    }
    
    if (positions.length <= 0) {
        remainingGuesses--;
        updateImage();
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

