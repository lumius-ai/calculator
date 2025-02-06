// Global Variables
let v1 = "";
let v2 = "";
let operation = "";
let screenDisplay = "";

// Saving previous calculation state
result = "";
prevState = -1;
prevV1 = "";
prevV2 = "";
prevOp = ""
prevDisplay = "";

// System state
let state = 0;

// Prevents multiple operation button presses executing an Operate()
let opLoaded = false;

// Saves a calculator's state on calculation
function saveState(res){
    prevState = state;
    result = res;
    prevV1 = v1;
    prevV2 = v2;
    prevOp = operation;
    prevDisplay = screenDisplay;
}
// Loads a calculator's state on button press
function loadState(){
    state = prevState;
    v1 = prevV1;
    v2 = prevV2;
    operation = prevOp;
    screenDisplay = "";
    updateDisplay(result);


}
// Handle a keyboard button press
function handleKey(k){
    let keyText = k.key;
    button = document.getElementById(keyText); //problem
    button.click();
    

}
// Operation Cycle
function operationCycle(inString){
    let result = operate(inString);
    screenDisplay = result;
    refreshScreen();
    clearVars();
}

// Updates given variable and the screen
function updateDisplay(value){
    screenDisplay += value;
    refreshScreen();


}
// Takes v1, v2, and performs the correct operation
function operate(value1, operation, value2){
    let x = "";
    switch(operation){
        case " + ":
            x = parseFloat(value1) + parseFloat(value2);
            break;
        case " - ":
            x = parseFloat(value1) - parseFloat(value2)
            break;
        case " * ":
            x = (parseFloat(value1) * parseFloat(value2));
            // Round to five decimal places
            x = Math.round(x * 100000) / 100000;
            break;
        case " / ":
            if(value2 != "0"){
                x = (parseFloat(value1) / parseFloat(value2));
                x = Math.round(divResult * 100000) / 100000;

            }
            else{
                x = "ERROR";
            }
            break;
        default:
            x = "INVALID OP";
            break;
    }
    saveState(x);
    return x;


}

// Handles the click of a button based on its value
function handleClick(event){
    let button = event.target;
    // get the button's class and value
    let buttonClasses = button.getAttribute("class").split(" ");
    let buttonClass = buttonClasses[1];
    let buttonValue = button.textContent;

    // If state is zero
    if(state == 0){
        // Numbers are added to display and var1
        if(buttonClass == "number"){
            if(buttonValue == "."){
                // dots are added to string ONLY if string isn't empty, and if there is NOT another dot inside
                if(v1 != "" && !(v1.includes("."))){
                    v1 += buttonValue;
                    updateDisplay(buttonValue);
                }

            }else {
                // Numbers are appended to v1, and the current number on screen
                v1 += buttonValue;
                updateDisplay(buttonValue);

            }
        }
        else if(buttonClass == "operation"){
            // Equals refreshes screen, goes to state 2
            if(buttonValue == "="){
                updateDisplay("");
                result = v1;
                state = 2;
            }
            // Operands are added to display, update var, and go to state 1
            else{
                // No operations on empty strings
                if(screenDisplay == ""){
                    refreshScreen();
                }
                else{
                    let opString =  ` ${buttonValue} `;
                    operation = opString;
                    updateDisplay(opString);
                    state = 1;
    
                    opLoaded = true;
                }
            }
            // TEST
            // alert(`State switched to ${state}`);

        }
        else{
            // Clear clears variables and display, sets state to 0
            if(buttonValue == "AC"){
                clearScreen();
            }
            // Prev display the previous value
            else if(buttonValue == "Back"){
                loadState();
            }
        }
    }
    // If state is 1
    else if(state == "1"){
        if(buttonClass == "number"){
            if(buttonValue == "."){
                // Dots are added to string ONLY if not empty
                if(v2 != "" && !(v2.includes("."))){
                    v2 += buttonValue;
                    updateDisplay(buttonValue);
                }
            }else{
                //Numbers are appended to display and var2
                v2 += buttonValue;
                updateDisplay(buttonValue);


            }
        }
        else if(buttonClass == "operation"){
            if(buttonValue == "="){
                // Equals performs operation cycle, sets state to 2
                result = operate(v1, operation, v2);
                console.log(`V1: ${v1}, V2: ${v2}, OP: ${operation}, RESULT: ${result}`)
                clearScreen();
                console.log(`RESULT: ${result}`);
                updateDisplay(result);
                state = 2;

            }else{
                // Another sign performs operation, places result in var1, updates screen, state the same, var 2 set to empty
                // If no previous operation button pressed, go as normal
                if(opLoaded = false){
                    let opString =  ` ${buttonValue} `;
                    operation = opString;
                    result = operate(v1, operation, v2);
                    console.log(`V1: ${v1}, V2: ${v2}, OP: ${operation}, RESULT: ${result}`)
                    var1 = result.toString();
    
                    v1 = var1;
                    v2 = "";
    
                    screenDisplay = var1 + ` ${buttonValue} `;
                    refreshScreen();

                    opLoaded = true;
                }
                // If the previous operation button was pressed, do nothing
                else{
                    refreshScreen();
                }


            }
        }
        else{
            // Clear resets screen and sets state to 0
            if(buttonValue == "AC"){
                clearScreen();
                state = 0;
            }
            else if (buttonValue == "Back"){
                loadState();
            }
        }
    }
    // State is 2
    else{
        if(buttonClass == "number"){
            // dot carries number into state 0, adds itself
            if(buttonValue == "." && !(v1.includes("."))){
                v1 = result + ".";
                state = 0;
                updateDisplay(v1);


            }
            // number clears screen, resets variables, sets state to 0
            else{
                clearScreen();
                v1 = buttonValue
                updateDisplay(buttonValue);
                state = 0;
            }
        }
        else if(buttonClass == "operation"){
            // equals clears screen, sets state to 0
            if(buttonValue == "="){
                state = 0;
                updateDisplay("");
            }
            // any operation is appended, result is stored in v1, state is moved to 1
            else{
                v1 = result;
                let opString =  ` ${buttonValue} `;
                operation = opString;
                updateDisplay(opString);
                state = 1;

            }
        }
        // Button is a clear
        else{
            // Clear clears all values and sets state to 0
            if(buttonValue == "AC"){
                clearScreen();
                state = 0;
            }
            // Prev shows result on screen, state is the same
            else if (buttonValue == "Back"){
                loadState();
            }

        }
    }
    // If equal and in state 0, display the same thing
    console.log(`This button's class is ${buttonClasses[1]}\nThis button's value is ${buttonValue}`);
}

// Refreshes screen display to current screenDisplay value
function refreshScreen(){

    let screen = document.querySelector("#screenContent");
    // Truncate to max length of 12
    shortDisplay = screenDisplay.substring(screenDisplay.length - 12);
    screen.textContent = shortDisplay;

}

// Clears global variables ONLY
function clearVars(){
    v1 = "";
    v2 = "";
    operation = "";
    // Clear oploaded state too
    opLoaded = false;
}
// Clears the screen content and the global variables
function clearScreen(){
    clearVars();
    screenDisplay = "";
    refreshScreen();
}
// Adds click listeners to all the buttons
function addListeners(){
    let buttons = document.querySelectorAll(".calcButton");
    for(let i = 0; i < buttons.length; i++){
        let button = buttons[i];
        button.addEventListener("click", (e)=>{
           handleClick(e);
        })
    }

    // Keyboard event listeners
    document.addEventListener("keypress", (k)=>handleKey(k));
}
// main script
document.addEventListener("DOMContentLoaded", ()=>{
    addListeners();
})

