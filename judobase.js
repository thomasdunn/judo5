/// <summary>Controls if users program code is Narrative JavaScript compiled.  Can turn off for debugging purposes.  Default to true.</summary>
var njsCompile = getParameterByName("compile") != "0";

/// <summary>Controls if users program code can use semantics from original Java version of JUDO.  i.e. void, int, String, etc.</summary>
var judoCompatibilityMode = true;

/////////////////////////////////////////////////
//         Code editor initialization
/////////////////////////////////////////////////

editor = CodeMirror.fromTextArea($('#code')[0], {
	lineNumbers: true,
	matchBrackets: true
});

/////////////////////////////////////////////////
//         Canvas initialization
/////////////////////////////////////////////////

var canvas = $('#canvas');
var canvasElem = canvas[0];
var context = canvasElem.getContext("2d");
context.lineWidth = 1;

/////////////////////////////////////////////////
//         Text I/O area initialization
/////////////////////////////////////////////////

var outputArea = $('#output');
var outputAreaElem = outputArea[0];

/////////////////////////////////////////////////
//         Program Execution
/////////////////////////////////////////////////

var runButton = $('#run');
var stopButton = $('#stop');
var saveButton = $('#save');
var deleteButton = $('#delete');
var uploadButton = $('#upload');
var programs = $("#programs");

runButton.click(function () {
	stop();
	run();
	stopButton.removeAttr("disabled");
});

stopButton.click(function () {
	stop();
	stopButton.attr("disabled", "disabled");
});

saveButton.click(function () {
	var programTitle = prompt("Program title:", currentProgramTitle);
	if (programTitle != null) {
		currentProgramTitle = programTitle;
		storeProgram(programTitle, getProgramCode());

		programKey = _progKey(programTitle);
		// select the program if already exists
		if (programs.val(programKey).find('option[value="' + programKey + '"]').length == 0) {
			// if not, append it to the dropdown
			addProgramToDropDown(programKey, programTitle);
			// and select it
			programs.val(programKey);
		}
	}
});

deleteButton.click(function () {
	var selectedProgramKey = programs.val();
	if (selectedProgramKey != null && selectedProgramKey != "" &&
		confirm("Are you sure you wish to delete '" + _progTitle(selectedProgramKey) + "'?")) {
		removeProgram(_progTitle(selectedProgramKey));
		programs.find('option[value="' + selectedProgramKey + '"]').remove();
		currentProgramTitle = '';
		setDefaultProgramCode();
	}
});

uploadButton.toggle(
	function () { $('#uploadPanel').show(500); },
	function () { $('#uploadPanel').hide(500); });

$('#compat').click(function () {
	judoCompatibilityMode = this.checked;
});

$('.help').toggle(
	function () { $('#helpContent').show(500); },
	function () { $('#helpContent').hide(500); });

/////////////////////////////////////////////////
//         Program Loading
/////////////////////////////////////////////////

var programTitlePrefix = "judo-program-";
var assetPrefix = "judo-asset-";
var currentProgramTitle = '';

programs.change(function () {
	currentProgramTitle = _progTitle(programs.val());
	if (currentProgramTitle != "") {
		setProgramCode(retrieveProgram(currentProgramTitle));
	}
	else {
		setDefaultProgramCode();
	}
});

initPrograms();

function getProgramCode() {
    return editor.getValue();
}

function setProgramCode(programCode) {
    editor.setValue(programCode);
}

function setDefaultProgramCode() {
	setProgramCode("function main() {\n  \n}");
}

function addProgramToDropDown(programKey, programTitle) {
	programs.append($("<option />").val(programKey).text(programTitle));
}

function initPrograms() {
	var progTitles = retrieveProgramTitles();

	addProgramToDropDown("", "Choose a program or write a new one...");
	for (var i = 0; i < progTitles.length; i++) {
		addProgramToDropDown(_progKey(progTitles[i]), progTitles[i]);
	}
	setDefaultProgramCode();
}

/////////////////////////////////////////////////
//         Program Storage
/////////////////////////////////////////////////


// Now create generic store/retrieve that can be used for assets (dataurls of DnD'ed images)


function storeProgram(title, code) {
	localStorage.setItem(_progKey(title), code);
}

function retrieveProgram(title) {
	return localStorage.getItem(_progKey(title));
}

function removeProgram(title) {
    localStorage.removeItem(_progKey(title));
}

function retrieveProgramTitles() {
    var progTitles = [];
    var progKey;

    for (var i = 0; i < localStorage.length; i++){
        progKey = localStorage.key(i);
        if (progKey.indexOf(programTitlePrefix) != -1) {
            progTitles.push(_progTitle(progKey));
        }
    }

    return progTitles;
}

function _keyAddPrefix(typePrefix, key) {
	return typePrefix + key;
}
function _keyRemovePrefix(typePrefix, key) {
	return key.replace(typePrefix, '');
}

function _progKey(title) {
	return _keyAddPrefix(programTitlePrefix, title);
}
function _progTitle(key) {
	return _keyRemovePrefix(programTitlePrefix, key);
}

/*
window.sessionStorage.setItem(‘myFirstKey’, ‘myFirstValue’);
alert(window.sessionStorage.getItem(‘myFirstKey’)); 
window.sessionStorage.myFirstKey = ‘myFirstValue’; 
alert(window.sessionStorage.myFirstKey);
 The removeItem(key) function does exactly as you might expect. If a value is
 currently in storage under the specified key
*/

/////////////////////////////////////////////////
//         UI Actions
/////////////////////////////////////////////////

function run() {
	// For error handling, this way works good, and can get a message, but cannot get line numbers or methods, etc inside of the eval'ed code
	// TODO : perhaps we can get line numbers if we invoke an external page that spits out the javascript
	//        and we reference that script with a script tag or the like (or perhaps jQuery.getScript)
	//        Also, using Google Caja for code security may also take care of this issue.
	try {
		var code = editor.getValue();
		runCode(code);
	}
	catch (err) {
		handleError(err, 'Runtime exception');
	}
}

function runCode(programCode) {
	var outputCode = '';

	programCode = makeLegacyCompatibilityModifications(programCode);
	outputCode = getCompiledCode(programCode);

	console.log("// outputCode:");
	console.log(outputCode);

	setUpProgram();
	execProgram(outputCode);
	//tearDownProgram();
}

function execProgram(outputCode) {
	// TODO : ? in future have flag that is set at beginning of user code execution and cleared at end (so can update UI, etc...)
	// TODO : Figure out how to update Narrative JavaScript so that it does not produce 'with()' statements
	//        which are disallowed in ES5 'use strict' mode.
	// https://developer.mozilla.org/en/JavaScript/Strict_mode
	var executeScript = "(function () { /*'use strict';*/ " + outputCode + " main(); } ());";        
    eval(executeScript);
}

function handleError(err, errorLabel) {
    alert(errorLabel + ': ' + err.message);
}

function stop() {
	clearTimeouts();
}

function setUpProgram() {
    clearDrawing();
    clearOutputArea();
}

// BUG: this causes an issue, probably due to NJS code reorganization.
// Causes graphics with delay (at least) to not run.
// Currently not in use.
function tearDownProgram() {
	clearTimeouts();
}

function clearTimeouts() {
	// stop previously executing threads
	var ms = +new Date;
	var x = setTimeout(ms);
	for (var i = 0; i < x; i++)
		clearTimeout(i);
}

function clearOutputArea() {
    outputArea.empty();
}

function getOutputAreaText() {
	return outputArea.text();
}

////////////////////////////////////////////////
//         Utility
/////////////////////////////////////////////////

var lasttime = +new Date;
var thistime = lasttime;

/// <summary>print milliseconds since last tick</summary>
function tick() {
	thistime = +new Date;
	printLine(thistime - lasttime);
	lasttime = thistime;
}

function getParameterByName(name) {
	name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
	var regexS = "[\\?&]" + name + "=([^&#]*)";
	var regex = new RegExp(regexS);
	var results = regex.exec(window.location.search);
	if (results == null)
		return "";
	else
		return decodeURIComponent(results[1].replace(/\+/g, " "));
}

function getCompiledCode(programCode, throwSyntaxError) {
    var compiledCode;

    if (njsCompile) {
        programCode = makeNjsModifications(programCode);
        var compiler = new NjsCompiler();

        if (throwSyntaxError) {
        	compiledCode = compiler.compile(programCode, 'judoapp.njs');
        }
        else {
        	try {
        		compiledCode = compiler.compile(programCode, 'judoapp.njs');
        	}
        	catch (err) {
        		handleError(err, 'Syntax error');
        		return;
        	}
        }
    }
    else {
    	compiledCode = programCode;
    }

    return compiledCode;
}

function makeNjsModifications(code) {
    code = code.replace('delay', 'delay->');
    code = code.replace('readKey', 'readKey->');

    return code;
}

function makeLegacyCompatibilityModifications(code) {
	if (judoCompatibilityMode) {
		code = code.replace(/^(\s*)void(\s+)/gm, '$1function$2');
		code = code.replace(/^(\s*)int(\s+)/gm, '$1var$2');
		code = code.replace(/^(\s*)Color(\s+)/gm, '$1var$2');
		code = code.replace(/^(\s*)String(\s+)/gm, '$1var$2');
		code = code.replace(/^(\s*)boolean(\s+)/gm, '$1var$2');
		code = code.replace(/^(\s*)double(\s+)/gm, '$1var$2');
	}

	return code;
}

/// <summary>use querystring '?loadjudoprogs=1' to load programs from judoprogs.js.  Default to false.</summary>
(function (doLoad) {
	if (doLoad) {
		for (var i = 0; i < judoProgs.length; i++) {
			addProgramToDropDown(_progKey(judoProgs[i].title), judoProgs[i].title);
			storeProgram(judoProgs[i].title, judoProgs[i].code);
		}
	}
})(getParameterByName("loadjudoprogs") == "1");

/////////////////////////////////////////////////
//         Notes
/////////////////////////////////////////////////
//
// BUG:  simple program, run button does not clear canvas: function main() {   drawLine(10, 10, 20, 20);   delay(3);   drawLine(30, 30, 40, 40); }
// BUG:  Firefox does not work, maybe it trips up in Narrative JS execution?
// NOTE: Delays under 10ms "delay(.01)" cannot keep up when there is drawing going on
//
//
//
//
//
//
//

//function main() {
//	delay(1);
//}

//==>

//function main() {
//	var njf1 = njen(this, arguments);
//	nj: while (1) {
//		switch (njf1.cp) {
//			case 0:
//				njf1.pc(1, null, delay, [1]);
//			case 1:
//				with (njf1)
//					if ((rv1 = f.apply(c, a)) == NJSUS) {
//						return fh;
//					}
//					break nj;
//		} 
//	} 
//}