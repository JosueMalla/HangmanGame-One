
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
function randomWordF(){
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
    for(i=0;i<=26;i++){
        const button = document.getElementById("key"+i);
        button.style.background = "white";
    }
    trynumber = 0;
    failnumber = 0;
    randomWord = "";
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

    console.log("creando cajas");

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

function getKey(letterkey){
    arrayLetters = ["Q","W","E","R","T","Y","U","I","O","P","A","S","D","F","G","H","J","K","L","Ñ","Z","X","C","V","B","N","M"]
    for(i=0;i<arrayLetters.length;i++){
        if(letterkey==arrayLetters[i]){
            return i;
        }
    }
}

function getwords(evento){
    const activatedkey = evento.key.toLocaleUpperCase();
    if (activatedkey.match(/^[A-ZÑ]$/i)) {
        gamelogic(activatedkey);
    }
}

function gamelogic(activatedkey){

    console.log(activatedkey);
    
    trynumber = trynumber + 1; //Trying counter

    for(i=0;i<randomWord.length;i++){ //Compare letter activated with word's letters  
        if(activatedkey==randomWord.charAt(i)){ 
            const guessbox = document.getElementById("letterbox"+i);
            guessbox.textContent = randomWord.charAt(i);  //show letter in the box
            
            find = true;
        }
    }

    
    disablebutton("key"+getKey(activatedkey), true);

    if (find!=true){ //This code execute if letter activated is not the same with any word's letter 
        failnumber = failnumber + 1;
        showpart(failnumber);
        const letterbuttonfail = document.getElementById("key"+getKey(activatedkey))
        letterbuttonfail.style.background = "#ff0000";
    }else{
        const letterbuttonright = document.getElementById("key"+getKey(activatedkey))
        letterbuttonright.style.background = "#3cc8b6";
    }
    find = false;

    if(failnumber>6){
        alert("Perdiste")
        finishgame();
    }
}

function finishgame(){

    ableButtons(true);
    disablebutton("newg-button", false);
    document.removeEventListener("keyup", getwords)

}

//starting game//
function startGame(){
    //claning 
    clean();
    part0.style.opacity = "1";

    //disable new game button
    disablebutton("newg-button", true);
    ableButtons(false);

    //generating word to be used
    randomWord = randomWordF();
    console.log(randomWord);

    createboxes(randomWord);

    document.addEventListener("keyup", getwords);

    console.log(Math.random());
}

