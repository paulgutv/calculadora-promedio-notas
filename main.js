const inputs = document.getElementsByTagName("input");
const inputsContainer = document.querySelector(".input-container");
const plus = document.querySelector(".plus"); 
const result = document.querySelector("p");
const calculateButton = document.querySelector(".calculate-button");
const resetButton = document.querySelector(".reset-button");
const plusButton = document.querySelector(".plus-button");
plusButton.addEventListener("click", newPlus);
calculateButton.addEventListener("click", mean);
resetButton.addEventListener("click", reset);
inputsContainer.addEventListener("paste", pasteInput);
inputsContainer.addEventListener("keydown", keydown);
inputsContainer.addEventListener("keyup", keyup);
inputsContainer.addEventListener("input", inputKey);

function newPlus() {
    const newInput = document.createElement("input");
    const plus = document.createElement("span");
    plus.innerText = "+";
    inputsContainer.removeChild(plusButton);    
    inputsContainer.append(plus);
    inputsContainer.append(newInput);
    inputsContainer.append(plus);
    inputsContainer.append(plusButton);
    newInput.setAttribute("type", "text");
    newInput.setAttribute("oninput", "this.value = this.value.toUpperCase()");
}

function pasteInput () {
    document.removeEventListener("keydown", keydown);
    document.removeEventListener("keyup", keyup);
    document.removeEventListener("input", inputKey);
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].setAttribute("maxLength","default");
    }
    setTimeout(pasteOrder, 100);
}

function pasteOrder() {
    let array = [];
    let intermedio = [];

    //INPUTS EN ARRAY

    for (let i = 0; i < inputs.length; i++) {
        array.push(inputs[i].value);
    }


    //ARRAY COMPLETO

    for(item of array) {
        let semiArray = item.split("");
        for (item of semiArray) {
            intermedio.push(item);
        }
    }

    //ARRAY SIN ESPACIOS

    for (let i = 0; i < intermedio.length; i++) {
        if (intermedio[i] == "\t" || intermedio[i] == " ") {
            intermedio.splice(i, 1);
        };
    };


    //ARRAY CON AD

    for (let i = 1; i < intermedio.length; i++) {
        if (intermedio[i-1] == "A" && intermedio[i] == "D") {
            intermedio[i] = "AD";
            intermedio.splice(i-1, 1);
        };
    };

    //ELIMINAR CARACTERES NO DESEADOS

    let nuevoIntermedio = [];

    for (let i = 0; i < intermedio.length; i++) {
        if (intermedio[i] == "A" || intermedio[i] == "B" || intermedio[i] == "C" || intermedio[i] == "AD") {
            nuevoIntermedio.push(intermedio[i]);
        }
    }

    //AGREGAR INPUTS

    if (nuevoIntermedio.length > inputs.length) {
        const difference = nuevoIntermedio.length - inputs.length;
        inputsContainer.removeChild(inputsContainer.lastElementChild);
        inputsContainer.removeChild(inputsContainer.lastElementChild);
        for (let i = 0; i < difference; i++) {
            const newInput = document.createElement("input");
            const plus = document.createElement("span");
            plus.innerText = "+";
            inputsContainer.append(plus);
            inputsContainer.append(newInput);
            newInput.setAttribute("type", "text");
            newInput.setAttribute("oninput", "this.value = this.value.toUpperCase()");
        }
        const plusi = document.createElement("span");
        plusi.innerText = "+";
        inputsContainer.append(plusi);
        inputsContainer.append(plusButton);    
    }

    

    //INPUT ES IGUAL A ARRAY

    for (let i = 0; i < inputs.length; i++) {
        if (nuevoIntermedio[i]) {
            inputs[i].value = nuevoIntermedio[i];
        } else {
            inputs[i].value = "";
        }
    }
}

function reset() {
    result.innerText = "";
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = "";
    }
    if (inputs.length > 7) {
        const difference = inputs.length - 7;
        inputsContainer.removeChild(plusButton)
        for (let i = 0; i < difference; i++) {
            inputsContainer.removeChild(inputsContainer.lastChild);
            inputsContainer.removeChild(inputsContainer.lastChild);
        }
        inputsContainer.append(plusButton);
    }   
}

function mean() {
    const values = [];
    let array = [];
    let intermedio = [];

    //INPUTS EN ARRAY

    for (let i = 0; i < inputs.length; i++) {
        array.push(inputs[i].value);
    }

    //ARRAY COMPLETO

    for(item of array) {
        let semiArray = item.split("");
        for (item of semiArray) {
            intermedio.push(item);
        }
    }

    //ARRAY SIN ESPACIOS

    for (let i = 0; i < intermedio.length; i++) {
        if (intermedio[i] == "\t" || intermedio[i] == " ") {
            intermedio.splice(i, 1);
        };
    };

    //ARRAY CON AD

    for (let i = 1; i < intermedio.length; i++) {
        if (intermedio[i-1] == "A" && intermedio[i] == "D") {
            intermedio[i] = "AD";
            intermedio.splice(i-1, 1);
        };
    };

    //INPUT ES IGUAL A ARRAY

    for (let i = 0; i < inputs.length; i++) {
        if (intermedio[i]) {
            inputs[i].value = intermedio[i];
        } else {
            inputs[i].value = "";
        }
    }

    //SE CAMBIA LETRAS POR NÚMEROS

    for (let i = 0; i < inputs.length; i++) {
        switch (inputs[i].value) {
            case "C":
                values.push(0);
                break;
            case "B":
                values.push(1);
                break;
            case "A":
                values.push(2);
                break;
            case "AD":
                values.push(3);
                break;
        }
    }

    //SE EJECUTA EL CÁLCULO

    function formula (a, b) {
        if (a - b == 1 || a - b == -1) {
            a = Math.max(a, b);
        } else if (a - b > 1 || a - b < -1) {
            a = Math.max(a, b) - 1;
        } else if (a - b == 0) {
            a = b;
        }
        return a;
    }

    let calculate = values.reduce(formula);

    switch (calculate) {
        case 0:
            calculate = "C";
            break;
        case 1:
            calculate = "B";
            break;
        case 2:
            calculate = "A";
            break;
        case 3:
            calculate = "AD";
            break;
    }

    result.innerText = calculate;
}

function keydown(char) {
    for (let i = 0; i < inputs.length; i++) {
        if (["A","a","B","b","C","c","D","d","Tab","v","V"].indexOf(char.key) !== -1) {
        } else {
            char.preventDefault();
        }
    }
    if (char.key == "Enter") {
        mean();
    }
}

function keyup() {  
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].value == "B" || inputs[i].value == "C" ||  !inputs[i].value) {
            inputs[i].setAttribute("maxLength","1");
        } else if(inputs[i].value == "A" || inputs[i].value == "AD" || !inputs[i].value ){
            inputs[i].setAttribute("maxLength","2");
        }
    }
}

function inputKey() {
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].value == "D") {
            inputs[i].setAttribute("maxLength","0");
            inputs[i].value = "";
        } else if (inputs[i].value == "V") { 
            inputs[i].value = "";
        } else if(inputs[i].value == "AD") {
            inputs[i].setAttribute("maxLength","2");
            inputs[i].value = "AD";
        } else if(inputs[i].value =="AA") {
            inputs[i].setAttribute("maxLength","1");
            inputs[i].value = "A";
        } else if(inputs[i].value =="AB") {
            inputs[i].setAttribute("maxLength","1");
            inputs[i].value = "A";
        } else if(inputs[i].value =="AC") {
            inputs[i].setAttribute("maxLength","1");
            inputs[i].value = "A";
        } else if(inputs[i].value =="AV") {
            inputs[i].value = "A";
        }
    }
}