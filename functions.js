
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
var randomWord;
var trynumber = 0;
var failnumber = 0;

//-------------------------------------------------------------------//

//Function for activate letter buttons
ableButtons(true);
function ableButtons(ok){
    for(i=0;i<=26;i++){
        disablebutton("key"+i, ok);
    }
}


//Random word//
function randomWord(){
    return WordList[(Math.round(Math.random()*(WordList.length-1)))];
}

//Limpiar
function clean(){
    
    part1.style.opacity = "0";
    part2.style.opacity = "0";
    part3.style.opacity = "0";
    part4.style.opacity = "0";
    part5.style.opacity = "0";
    part6.style.opacity = "0";
    part7.style.opacity = "0";
}

function showpart(number){
    if(number==1){
        part1.style.opacity = "1";
    }else if(number==2){
        part2.style.opacity = "1";
    }else if(number==3){
        part3.style.opacity = "1";
    }else if(number==4){
        part4.style.opacity = "1";
    }else if(number==5){
        part5.style.opacity = "1";
    }else if(number==6){
        part6.style.opacity = "1";
    }else if(number==7){
        part7.style.opacity = "1";
    }
    
}

function disablebutton(id, ok){
    document.getElementById(id).disabled = ok;
}

//Creating boxes for letters
function createboxes(word){

    document.getElementById("word-box").innerHTML = ""; //clean the word box 
    const wordbox = document.getElementById("word-box")

    for(i=0; i<word.length; i++){
        const letterbox = document.createElement("textarea");  //create textarea depends on word length
        letterbox.classList.add("letterbox"); //adding class to textarea
        letterbox.setAttribute("id", ("letterbox"+i)); //adding id
        letterbox.setAttribute("readonly", "true"); //adding just for r
        letterbox.textContent = ""
        wordbox.appendChild(letterbox) //adding textarea to word box
    }
    console.log("funcion box")
}

function getwords(evento){
    const activatedkey = evento.key.toLocaleUpperCase();
    if (activatedkey.match(/^[A-ZÑ]$/i)) {
        gamelogic(activatedkey);
    }
}

function gamelogic(activatedkey){
    console.log(activatedkey);
    
    trynumber = trynumber + 1;

    for(i=0;i<randomWord.length;i++){
        if(activatedkey==randomWord.charAt(i)){
            const guessbox = document.getElementById("letterbox"+i);
            guessbox.textContent = randomWord.charAt(i);
            find = true;
        }
    }
    if (find!=true){
        failnumber = failnumber + 1;
        console.log("xd");
        showpart(failnumber);
    }
    find = false;
}

//starting game//
function startGame(){
    //claning 
    clean();
    part0.style.opacity = "1";

    //generating word to be used
    randomWord = randomWord();
    console.log(randomWord);

    //disable new game button
    disablebutton("newg-button", true);
    ableButtons(false);

    createboxes(randomWord);

    document.addEventListener("keyup", getwords);

    console.log(Math.random());
}

