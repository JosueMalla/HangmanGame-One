
//Function for go to game zone

function GoGame(){
    window.location.href="gamezone.html";
}

function GoHome(){
    window.location.href="index.html";
}

function GoAddword(){
    window.location.href="addword.html";
}

//Functions for game

const boximages = document.querySelector(".box-images");
const WordList = ["JAVA", "PYTHON", "TOMORROW", "BOGOTA", "MACHALA", "ECUADOR", "DEVELOPER", "JUNIOR", "KEYBOARD"]
const part0 = document.querySelector(".part0");
const part1 = document.querySelector(".part1");
const part2 = document.querySelector(".part2");
const part3 = document.querySelector(".part3");
const part4 = document.querySelector(".part4");
const part5 = document.querySelector(".part5");
const part6 = document.querySelector(".part6");
const part7 = document.querySelector(".part7");

//-------------------------------------------------------------------//

//Random word//
function randomWord(){
    return WordList[(Math.round(Math.random()*(WordList.length-1)))];
}

//starting game//
function startGame(){
    //limpiando todo
    
    randomWord = randomWord();

}

console.log(randomWord());


