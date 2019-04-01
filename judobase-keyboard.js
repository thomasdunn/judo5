/////////////////////////////////////////////////
//         JUDO KEYBOARD API
/////////////////////////////////////////////////

/// <summary>Returns true if the keyboard key is currently pressed down</summary>
// Ex: if (getKeyState("left") && shipX > 0) {
// http://www.javascripter.net/faq/keycodes.htm
function getKeyState(key) {
    if (key.length == 1)
        return pressedKeys[key.toUpperCase().charCodeAt(0)] === true;

    // TODO : ?Move these to the dictionary?
    // clean up / combine with other list
    // num pad handling good?
    return (
		(key == "backspace" && pressedKeys[8] === true) ||
		(key == "tab" && pressedKeys[9] === true) ||
		(key == "enter" && pressedKeys[13] === true) ||
		(key == "shift" && pressedKeys[16] === true) ||
		(key == "ctrl" && pressedKeys[17] === true) ||
		(key == "alt" && pressedKeys[18] === true) ||
		(key == "pause" && pressedKeys[19] === true) ||
		(key == "break" && pressedKeys[19] === true) ||
		(key == "capslock" && pressedKeys[20] === true) ||
		(key == "esc" && pressedKeys[27] === true) ||
		(key == "space" && pressedKeys[32] === true) ||
		(key == "pageup" && pressedKeys[33] === true) ||
		(key == "pagedown" && pressedKeys[34] === true) ||
		(key == "end" && pressedKeys[35] === true) ||
		(key == "home" && pressedKeys[36] === true) ||
		(key == "left" && pressedKeys[37] === true) ||
		(key == "up" && pressedKeys[38] === true) ||
		(key == "right" && pressedKeys[39] === true) ||
		(key == "down" && pressedKeys[40] === true) ||
		(key == "printscreen" && pressedKeys[44] === true) || /* most browsers only fires keyup */
		(key == "insert" && pressedKeys[45] === true) ||
		(key == "delete" && pressedKeys[46] === true) ||
		(key == "f1" && pressedKeys[112] === true) ||
		(key == "f2" && pressedKeys[113] === true) ||
		(key == "f3" && pressedKeys[114] === true) ||
		(key == "f4" && pressedKeys[115] === true) ||
		(key == "f5" && pressedKeys[116] === true) ||
		(key == "f6" && pressedKeys[117] === true) ||
		(key == "f7" && pressedKeys[118] === true) ||
		(key == "f8" && pressedKeys[119] === true) ||
		(key == "f9" && pressedKeys[120] === true) ||
		(key == "f10" && pressedKeys[121] === true) ||
		(key == "f11" && pressedKeys[122] === true) ||
		(key == "f12" && pressedKeys[123] === true) ||
		(key == "numlock" && pressedKeys[144] === true) ||
		(key == "scrolllock" && pressedKeys[145] === true));
}

/// <summary>Waits for the user to press a key. Returns the key they pressed as a String</summary>
function readKey() {
    return prompt("Enter a key.");
}

/////////////////////////////////////////////////
//         SUPPORT FUNCTIONS
/////////////////////////////////////////////////

var pressedKeys = [];

$(document).keydown(function (event) {
    pressedKeys[event.keyCode] = true;
    //printLine(event.keyCode);
});

$(document).keyup(function (event) {
    pressedKeys[event.keyCode] = false;
});

// used by NJS readKey implementation
var keyCodes = [
	['enter', 13],
	['space', 32],
	['!', 33],
	['"', 34],
	['#', 35],
	['$', 36],
	['%', 37],
	['&', 38],
	["'", 39],
	['(', 40],
	[')', 41],
	['*', 42],
	['+', 43],
	[',', 44],
	['-', 45],
	['.', 46],
	['/', 47],
	['0', 48],
	['1', 49],
	['2', 50],
	['3', 51],
	['4', 52],
	['5', 53],
	['6', 54],
	['7', 55],
	['8', 56],
	['9', 57],
	[':', 58],
	[';', 59],
	['<', 60],
	['=', 61],
	['>', 62],
	['?', 63],
	['@', 64],
	['A', 65],
	['B', 66],
	['C', 67],
	['D', 68],
	['E', 69],
	['F', 70],
	['G', 71],
	['H', 72],
	['I', 73],
	['J', 74],
	['K', 75],
	['L', 76],
	['M', 77],
	['N', 78],
	['O', 79],
	['P', 80],
	['Q', 81],
	['R', 82],
	['S', 83],
	['T', 84],
	['U', 85],
	['V', 86],
	['W', 87],
	['X', 88],
	['Y', 89],
	['Z', 90],
	['[', 91],
	['\\', 92],
	[']', 93],
	['^', 94],
	['_', 95],
	['`', 96],
	['a', 97],
	['b', 98],
	['c', 99],
	['d', 100],
	['e', 101],
	['f', 102],
	['g', 103],
	['h', 104],
	['i', 105],
	['j', 106],
	['k', 107],
	['l', 108],
	['m', 109],
	['n', 110],
	['o', 111],
	['p', 112],
	['q', 113],
	['r', 114],
	['s', 115],
	['t', 116],
	['u', 117],
	['v', 118],
	['w', 119],
	['x', 120],
	['y', 121],
	['z', 122],
	['{', 123],
	['|', 124],
	['}', 125],
	['~', 126],
];

function buildKeyCodeDict(keyIndex, valIndex) {
    var dict = [];
    for (var i = 0; i < keyCodes.length; i++) {
        dict[keyCodes[i][keyIndex]] = keyCodes[i][valIndex];
    }
    return dict;
}
var keyCodesStringToCodeDict = buildKeyCodeDict(0, 1);
function getKeyCodeFromKeyString(keyString) {
    return keyCodesStringToCodeDict[keyString.toLowerCase()];
}
var keyCodesCodeToStringDict = buildKeyCodeDict(1, 0);
function getKeyStringFromKeyCode(keyCode) {
    return keyCodesCodeToStringDict[keyCode];
}
