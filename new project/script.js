let lengthDisplay = document.querySelector("[lengthDisplay]");
let slider = document.querySelector('input[type=range]');
let passwordLength = 10;

function handSlider(){
    slider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
}
handSlider();

slider.addEventListener('input',(event) =>{
    passwordLength = event.target.value;
    handSlider();
});


// generate random letter and symbols
const symbol = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';
function generateRandom(min,max){
    return Math.floor(Math.random()*(max-min) ) + min;
}
function generateRandomLowerCase(){
    return String.fromCharCode(generateRandom(97,123));
}
function generateRandomUpperCase(){
    return String.fromCharCode(generateRandom(65,91));
}
function generateRandomSymbol(){
    return symbol[generateRandom(0,symbol.length)];
}
function generateRandomNumber(){
    return symbol[generateRandom(0,9)];
}

// strength color based on password
let indicator = document.querySelector('.indicator');

// set indicator
function setIndicator(color){
  indicator.style.backgroundColor = color;
//   boxshadow hw
}

// default indicator
setIndicator("#ccc");


const uppercase = document.querySelector('#uppercase');
const lowercase = document.querySelector('#lowercase');
const symbols = document.querySelector('#symbols');
const numbers = document.querySelector('#numbers');

function calcStrength(){
    let hasupper = false;
    let haslower = false;
    let hasnumber = false;
    let hassymbol = false;
    if(uppercase.checked)hasupper = true;
    if(lowercase.checked)haslower = true;
    if(symbols.checked)hassymbol = true;
    if(numbers.checked)hasnumber = true;
    if(hasupper && haslower && (hasnumber||hassymbol) && passwordLength>=8){
    setIndicator("#0f0");
    }
    else if((haslower || hasupper) && (hasnumber || hassymbol) && passwordLength >= 6){
    setIndicator("#ff0");
    }
    else{ 
    setIndicator("#f00");
    }
}

// copy message 
let passwordDisplay = document.querySelector("input[passwordDisplay]");
let copymessage = document.querySelector("[copyMessage]");
let copyBtn = document.querySelector(".copyBtn");

async function copyContent(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copymessage.innerText = "Copied";
    }
    catch{
        copymessage.innerText = "Failed"; 
    }
    copymessage.classList.add('active');
    setTimeout(() => {
        copymessage.classList.remove('active');
    }, 2000);
}

copyBtn.addEventListener("click", ()=>{
    if(passwordDisplay.value)
    copyContent();
});

// shuffle algorithm
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}

// password generate;
let checkBoxes = document.querySelectorAll('input[type = checkbox]');
let checkCount = 0;
uppercase.checked = true;
function handleCheckBoxChange(){
    checkCount = 0;
    checkBoxes.forEach((checkbox) => {
        if(checkbox.checked)checkCount++;
    });
    if(checkCount > passwordLength){
        passwordLength = checkCount;
        handSlider();
    }
}
checkBoxes.forEach((checkbox) =>{
    checkbox.addEventListener('change',handleCheckBoxChange());
;});



let password =  "";

let generatebtn = document.querySelector('#generateBtn');

generatebtn.addEventListener('click',()=>{
    if(checkCount <= 0)return;
    if(passwordLength < checkCount){
        passwordLength = checkCount;
        handSlider();
    }
    password = "";
    let arrayOfCheckFunction = [];
    if(uppercase.checked)arrayOfCheckFunction.push(generateRandomUpperCase);
    if(lowercase.checked)arrayOfCheckFunction.push(generateRandomLowerCase);
    if(symbols.checked)arrayOfCheckFunction.push(generateRandomSymbol);
    if(numbers.checked)arrayOfCheckFunction.push(generateRandomNumber);

// compulasory addition 
    for(let i = 0;i<arrayOfCheckFunction.length;i++){
        password += arrayOfCheckFunction[i]();
    }
    // console.log(password);
    // additional addition 
    
    for(let j = 0;j<passwordLength - arrayOfCheckFunction.length;j++){
        let randIdx = generateRandom(0,arrayOfCheckFunction.length);
        password += arrayOfCheckFunction[randIdx]();
    }

    // console.log("Password: " + password)

     password = shuffle(Array.from(password));
     passwordDisplay.value = password;
     calcStrength();
})

