/////////////////////////////////////////////////
//         JUDO I/O API
/////////////////////////////////////////////////

/// <summary>Prints out the value to the screen on its own line</summary>
function printLine(str) {
	_print(str, "", "<br />");
}

/// <summary>Prints out the value to the screen</summary>
function print(str) {
	_print(str, "", "");
}

function _print(str, prefix, suffix) {
	// TODO: add a try / catch? (see HTML5 Canvas book [or was it Pro HTML5] for logger class)
	var printVal = prefix + str + suffix;
	console.log(printVal);
	outputArea.append(printVal);
	outputAreaElem.scrollTop = outputAreaElem.scrollHeight;
}

function readString() {
    return prompt('Enter a string:');
}

function readInt() {
    return parseInt(prompt('Enter an integer:'));
}

function readDouble() {
    return parseFloat(prompt('Enter an floating point number:'));
}

// TODO : ?? instead of an eval, create a switch statement over input value and select the color variable
function readColor() {
    return eval(prompt('Enter a color:'));
}

function readBoolean() {
    return parseBool(prompt('Enter true or false:'));
}

/////////////////////////////////////////////////
//         SUPPORT FUNCTIONS
/////////////////////////////////////////////////

// function parseInt and parseFloat already exist in JS
function parseBool(testValue) {
    return testValue.toString().toLowerCase() == "true";
}
