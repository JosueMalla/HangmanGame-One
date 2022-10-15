
//Function for go to game zone

function GoHome(){
    window.location.href="index.html";
}

function GoAddword(){
    window.location.href="addword.html";
}

//Functions for game

const boximages = document.querySelector(".box-images");
const WordList = ["JAVA", "PYTHON", "TOMORROW", "BOGOTA", "MACHALA", "ECUADOR", "DEVELOPER", "JUNIOR", "KEYBOARD", "LAPTOP", "COMPUTER", "WINDOWS", "BEDROOM"]
const part0 = document.querySelector(".part0");
const part1 = document.querySelector(".part1");
const part2 = document.querySelector(".part2");
const part3 = document.querySelector(".part3");
const part4 = document.querySelector(".part4");
const part5 = document.querySelector(".part5");
const part6 = document.querySelector(".part6");
const part7 = document.querySelector(".part7");
const attempts = document.getElementById("attempts");
var randomWord = "";
var trynumber = 0;
var failnumber = 0;
var winnumber = 0;
sessionStorage.setItem("saverandomword", "");
x=0;

array_Letters = ["Q","W","E","R","T","Y","U","I","O","P","A","S","D","F","G","H","J","K","L","Ñ","Z","X","C","V","B","N","M"];

//-----------------------------------------------------------------------------------------------//

function addwordbutton(){
    if(x==0){
        const button2 = document.querySelector("#button22");
        document.getElementById('button22').style.height = "150px";
        button2.style.heigth = "100px";
        const wordt = document.createElement("textarea");
        wordt.setAttribute("id", "txtaddword");
        wordt.setAttribute("class", "txtaddwordclass");
        wordt.setAttribute("rows", "1");
        wordt.setAttribute("placeholder", "Enter only letters");
        wordt.setAttribute("Maxlength", "9");
        button2.appendChild(wordt);
        const buttont = document.createElement("button");
        buttont.setAttribute("id", "buttont");
        buttont.setAttribute("class", "buttontclass");
        buttont.setAttribute("onclick", "addword()");
        buttont.innerHTML = "Guardar"
        button2.appendChild(buttont);
        x++;
    }
}

function addword(){
    word = document.getElementById("txtaddword").value;
    word = word.toLocaleUpperCase();
    for(i=0;i<word.length;i++){
        subword = word.charAt(i);
        if(subword.match(/^[A-ZÑ]$/i)){
            ok = true;
        }else{
            ok = false;
            break;
        }
        console.log(ok);
    }

    if(ok==true){
        sessionStorage.setItem("saverandomword", word);
        GoGame();
    }else{
        caja = document.getElementById("txtaddword");
        document.getElementById("txtaddword").value = "";
        caja.style="background-color: red; opacity: .5;"
        
    }
    
}

function showattempts(numero){
    attempts.textContent = numero;
}

//Function for activate letter buttons
ableButtons(true);
function ableButtons(ok){
    for(i=0;i<=26;i++){
        disablebutton("key"+i, ok);
    }
}


//Random word//
function randomWordF(){
    randomWord = sessionStorage.getItem("saverandomword");

    if(randomWord==""){
        return WordList[(Math.round(Math.random()*(WordList.length-1)))];
    }else{
        return randomWord;
    }
    
}

//Limpiar
function clean(){
    part1.style.opacity = "0"; //reboot hangman body
    part2.style.opacity = "0";
    part3.style.opacity = "0";
    part4.style.opacity = "0";
    part5.style.opacity = "0";
    part6.style.opacity = "0";
    part7.style.opacity = "0";
    attempts.textContent = "";

    //reboot letter list
    array_Letters = ["Q","W","E","R","T","Y","U","I","O","P","A","S","D","F","G","H","J","K","L","Ñ","Z","X","C","V","B","N","M"];

    //activate buttons
    for(i=0;i<=26;i++){
        const button = document.getElementById("key"+i);
        button.style.background = "white";
    }

    //reboot data
    trynumber = 0;
    failnumber = 0;
    winnumber = 0;
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

//Get and return the number key through letter
function getKey(letterkey){
    arrayLetters = ["Q","W","E","R","T","Y","U","I","O","P","A","S","D","F","G","H","J","K","L","Ñ","Z","X","C","V","B","N","M"]
    for(i=0;i<arrayLetters.length;i++){
        if(letterkey==arrayLetters[i]){
            return i;
        }
    }
}

//Capture key activated on keyboard
function getwords(evento){
    const activatedkey = evento.key.toLocaleUpperCase();
    if (activatedkey.match(/^[A-ZÑ]$/i)) {
        for(i=0;i<array_Letters.length;i++){
            if(activatedkey==array_Letters[i]){
                gamelogic(activatedkey);
                array_Letters[i] = "-";
                console.log(array_Letters);
            }
        }
    }
}


//Structure of how game works
function gamelogic(activatedkey){

    console.log(activatedkey);
    
    trynumber = trynumber + 1; //Trying counter

    for(i=0;i<randomWord.length;i++){ //Compare letter activated with word's letters  
        if(activatedkey==randomWord.charAt(i)){ 
            const guessbox = document.getElementById("letterbox"+i);
            guessbox.textContent = randomWord.charAt(i);  //show letter in the box
            winnumber -=1;
            console.log(winnumber)
            find = true;
        }
    }

    if(failnumber==3&&randomWord.length>3&&Math.random()*10==1){
        audio = document.getElementById("niunbrillo");
        audio.play();
    }

    disablebutton("key"+getKey(activatedkey), true);

    if (find!=true){ //This code execute if letter activated is not the same with any word's letter

        failnumber = failnumber + 1; //failnumber counter
        showpart(failnumber); //show part of hangman body

        const letterbuttonfail = document.getElementById("key"+getKey(activatedkey))
        letterbuttonfail.style.background = "#ff0000"; //set red bg to wrong letter
        attempts.textContent = randomWord.length-failnumber+1; //show remaining attempts
    }else{
        const letterbuttonright = document.getElementById("key"+getKey(activatedkey))
        letterbuttonright.style.background = "#3cc8b6"; //set green bg to rigth letter
    }
    find = false;

    console.log(randomWord);
    if(failnumber>randomWord.length){
        //alert("Perdiste")
        audio = document.getElementById("audiolose");
        audio.play();
        for(i=0;i<randomWord.length;i++){
            const guessbox = document.getElementById("letterbox"+i);
            guessbox.style.color = "red";
            guessbox.textContent = randomWord.charAt(i);
        }
        
        finishgame();
    }

    if(winnumber==0){
        //alert("ganaste");
        audio = document.getElementById("audiowin");
        audio.play();
        finishgame();
        
        
    }
}

//Finish the game through disable buttons key and enable new game button
function finishgame(){

    ableButtons(true);
    disablebutton("newg-button", false);
    document.removeEventListener("keyup", getwords)
    sessionStorage.setItem("saverandomword", "");
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
    attempts.textContent = randomWord.length-failnumber+1;

    winnumber = randomWord.length;

    createboxes(randomWord);

    document.addEventListener("keyup", getwords);

    console.log(Math.random());
}

function GoGame(){
    window.location.href="gamezone.html";
    console.log("si1");
}