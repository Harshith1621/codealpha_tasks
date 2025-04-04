function appendValue(value) {
  document.getElementById("display").value += value;
}

function clearDisplay() {
  document.getElementById("display").value = "";
  document.getElementById("history").innerText = "";
}

function clearEntry() {
  let display = document.getElementById("display");
  display.value = display.value.slice(0, -1);
}

function backspace() {
  let display = document.getElementById("display");
  display.value = display.value.slice(0, -1);
}

function calculateResult() {
  try {
    let expression = document.getElementById("display").value;
    let result = eval(expression);
    document.getElementById("history").innerText = expression;
    document.getElementById("display").value = result;
  } catch {
    document.getElementById("display").value = "Error";
  }
}

function reciprocal() {
  let display = document.getElementById("display");
  let value = parseFloat(display.value);
  if (value !== 0) {
    display.value = 1 / value;
  } else {
    display.value = "Error";
  }
}

function square() {
  let display = document.getElementById("display");
  let value = parseFloat(display.value);
  display.value = value * value;
}

function squareRoot() {
  let display = document.getElementById("display");
  let value = parseFloat(display.value);
  if (value >= 0) {
    display.value = Math.sqrt(value);
  } else {
    display.value = "Error";
  }
}

function toggleSign() {
  let display = document.getElementById("display");
  if (display.value !== "") {
    display.value = parseFloat(display.value) * -1;
  }
}

document.addEventListener("keydown", function (event) {
  let key = event.key;

  if (!isNaN(key) || ["+", "-", "*", "/", ".", "%"].includes(key)) {
    appendValue(key);
  } else if (key === "Enter") {
    calculateResult();
  } else if (key === "Backspace") {
    backspace();
  } else if (key === "Escape") {
    clearDisplay();
  }
});
