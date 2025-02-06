// TODO: takes v1, v2, and performs the correct operation
function operate(value1, operation, value2){
    switch(operation){
        case "+":
            return (parseFloat(value1) + parseFloat(value2));
        case "-":
            return (parseFloat(value1) - parseFloat(value2));
        case "X":
            let result = (parseFloat(value1) * parseFloat(value2));
            // Round to five decimal places
            result = Math.round(result * 100000) / 100000;
            return result;
        case "/":
            if(value2 != "0"){
                let divResult = (parseFloat(value1) / parseFloat(value2));
                divResult = Math.round(divResult * 100000) / 100000;
                return divResult;
            }
            else{
                return "ERROR"
            } 
        default:
            return "INVALID OP";
    }

}

// test
let val = operate("100", "+", "1");
console.log(val);
val = operate("100", "-", "1");
console.log(val);
val = operate("10", "X", "10");
console.log(val);
val = operate("100", "/", "10");
console.log(val);
val = operate("100", "/", "0");
console.log(val);
val = operate("1", "hjb", "1");
console.log(val);

val = operate("100", "/", "3");
console.log(val);