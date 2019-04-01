$(document).ready(function () {

	// uncomment to skip tests:
	//return;

	//---------------------------------
	module("Program Storage Unit Tests");
	//---------------------------------

	test("store, retrieve, and remove program", function () {
		var programCode = ml(function () {
			/*function main() {
			printLine("Hello, World!");
			}*/
		});
		var progTitle = 'Hello, World! Program';

		storeProgram(progTitle, programCode);
		var retrievedProgramCode = retrieveProgram(progTitle);
		equal(retrievedProgramCode, programCode);

		removeProgram(progTitle);
		retrievedProgramCode = retrieveProgram(progTitle);
		equal(retrievedProgramCode, null);
	});

	test("retrieve program titles", function () {
		var programCode = ml(function () {
			/*function main() {
			printLine("Hello, World!");
			}*/
		});
		var initialProgCount = retrieveProgramTitles().length;
		var progCount = 20;
		var progTitlePrefix = 'UnitTestProgNum';

		for (var i = 0; i < progCount; i++) {
			storeProgram(progTitlePrefix + i, programCode);
		}

		var progTitles = retrieveProgramTitles();
		var retrievedProgramCount = 0;
		equal(progTitles.length, progCount + initialProgCount, 'Expected ' + progCount + ' program titles');
		for (var i = 0; i < progTitles.length; i++) {
			if (progTitles[i].substring(0, progTitlePrefix.length) == progTitlePrefix) {
				retrievedProgramCount++;
			}
		}
		equal(retrievedProgramCount, progCount, 'Expected ' + retrievedProgramCount + ' matched programs.');

		for (var i = 0; i < progTitles.length; i++) {
			if (progTitles[i].substring(0, progTitlePrefix.length) == progTitlePrefix) {
				removeProgram(progTitles[i]);
			}
		}

		equal(retrieveProgramTitles().length, initialProgCount, "Expect after cleaning up created tests that there is same number as when started: " + initialProgCount);
	});


	//---------------------------------
	module("Runtime Exception Unit Tests");
	//---------------------------------

	test("undefined variable - runtime exception thrown", function () {
		raises(function throwsException() {
			runCode(ml(function () {
				/*function main() {
				printLine('attempting to print an undefined variable');
				printLine(doesNotExist);
				}*/
			}));
		}, /doesNotExist/, 'Expect runtime exception thrown for undefined variable');
	});

	test("main undefined - runtime exception thrown", function () {
		raises(function throwsException() {
			runCode(ml(function () {
				/*function man() { }*/
			}));
		}, /(main is not defined|Can\'t find variable\: main)/, 'Expect runtime exception main function not being defined');
	});

	test("API function undefined - runtime exception thrown", function () {
		raises(function throwsException() {
			runCode(ml(function () {
				/*function main() {
				printline("L in line should be cap.");
				}*/
			}));
		}, /(printline is not defined|Can\'t find variable\: printline)/, 'Expect runtime exception printline function not being defined');
	});

	//---------------------------------
	module("Syntax Exception Unit Tests");
	//---------------------------------

	test("keyword 'while' typo - syntax exception thrown", function () {
		raises(function throwsException() {
			getCompiledCode(ml(function () {
				/*function main() {
				var i = 0;
				wile(i++ < 10) {
				printLine(i);
				}
				}*/
			}), true);
		}, /Missing \; before statement \{/, 'Expect syntax exception thrown for keyword typo "wile"');
	});

	test("keyword 'function' typo - syntax exception thrown", function () {
		raises(function throwsException() {
			getCompiledCode(ml(function () {
				/*fuction main() {}*/
			}), true);
		}, /Missing \; before statement IDENTIFIER/, 'Expect syntax exception thrown for keyword typo "fuction"');
	});

	test("unmatched curly brace - syntax exception thrown", function () {
		raises(function throwsException() {
			getCompiledCode(ml(function () {
				/*function main() {*/
			}), true);
		}, /Missing \}/, 'Expect syntax exception thrown for missing ending curly brace "}"');
	});

	test("unmatched quote string terminator - syntax exception thrown", function () {
		raises(function throwsException() {
			getCompiledCode(ml(function () {
				/*function main() {
				var str = 'asdf;
				}*/
			}), true);
		}, /Illegal token/, 'Expect syntax exception thrown for missing quote to terminate string');
	});

	//---------------------------------
	module("I/O Unit Tests");
	//---------------------------------

	test("printLine - 1 line", function () {
		runCode(ml(function () {
			/*function main() {
			printLine("Hello, World!");
			}*/
		}));

		equal(getOutputAreaText(), "Hello, World!");
	});

	test("printLine - 2 lines", function () {
		runCode(ml(function () {
			/*function main() {
			printLine("abc");
			printLine("xyz");
			}*/
		}));

		equal(getOutputAreaText(), "abcxyz");
	});

	test("print - 3 characters", function () {
		runCode(ml(function () {
			/*function main() {
			print("a");
			print("b");
			print("c");
			}*/
		}));

		equal(getOutputAreaText(), "abc");
	});

	// TODO : come up with a way to test readString, etc...
	// Maybe after switching to reading I/O from outputArea
	// instead of using prompt() it will become easier

	//---------------------------------
	module("Math Unit Tests");
	//---------------------------------

	test("floor - returns rounded down", function () {
		runCode(ml(function () {
			/*function main() {
			print(floor(3.3));
			print(',');
			print(floor(3.5));
			print(',');
			print(floor(3.6));
			}*/
		}));

		equal(getOutputAreaText(), "3,3,3");
	});

	test("ceiling - returns rounded up", function () {
		runCode(ml(function () {
			/*function main() {
			print(ceiling(3.3));
			print(',');
			print(ceiling(3.5));
			print(',');
			print(ceiling(3.6));
			}*/
		}));

		equal(getOutputAreaText(), "4,4,4");
	});

	test("round - rounds up or down appropriately", function () {
		runCode(ml(function () {
			/*function main() {
			print(round(3.3));
			print(',');
			print(round(3.5));
			print(',');
			print(round(3.6));
			}*/
		}));

		equal(getOutputAreaText(), "3,4,4");
	});

	test("absoluteValue", function () {
		runCode(ml(function () {
			/*function main() {
			print(absoluteValue(-3.3));
			print(',');
			print(absoluteValue(3.3));
			print(',');
			print(absoluteValue(-3000));
			print(',');
			print(absoluteValue(3000));
			}*/
		}));

		equal(getOutputAreaText(), "3.3,3.3,3000,3000");
	});

	test("squareRoot", function () {
		runCode(ml(function () {
			/*function main() {
			print(squareRoot(16));
			print(',');
			print(squareRoot(1000));
			print(',');
			print(squareRoot(-36));
			print(',');
			print(squareRoot(289));
			}*/
		}));

		equal(getOutputAreaText(), "4,31.622776601683793,NaN,17");
	});

	test("power", function () {
		runCode(ml(function () {
			/*function main() {
			print(power(2,2));
			print(',');
			print(power(3,3));
			print(',');
			print(power(3,-2));
			print(',');
			print(power(17,6));
			}*/
		}));

		equal(getOutputAreaText(), "4,27,0.1111111111111111,24137569");
	});

	test("log", function () {
		runCode(ml(function () {
			/*function main() {
			print(log(1));
			print(',');
			print(log(6));
			print(',');
			print(log(8));
			}*/
		}));

		var results = getOutputAreaText().split(',');
		equal(results[0], 0);
		ok(results[1] > 1.7 && results[1] < 1.8, 'around 1.791');
		ok(results[2] > 2.07 && results[2] < 2.08, 'around 2.079');
	});

	test("sin", function () {
		runCode(ml(function () {
			/*function main() {
			print(sin(Pi));
			}*/
		}));

		var results = getOutputAreaText().split(',');
		ok(results[0] > -0.000001 && results[0] < 0.000001, 'around 0');
	});

	test("isNotANumber - test number and not number cases", function () {
		runCode(ml(function () {
			/*
			function main() {
				print(isNotANumber(10) + ',');
				print(isNotANumber(E) + ',');
				print(isNotANumber(Pi) + ',');
				print(isNotANumber(MaxNum) + ',');
				print(isNotANumber(NegativeInfinity) + ',');

				print(isNotANumber(NotANumber) + ',');
				print(isNotANumber(NaN) + ',');
				print(isNotANumber(squareRoot(-100)) + ',');
				print(isNotANumber(0/0) + ',');
				print(isNotANumber('hello world') + ',');
				print(isNotANumber('ten'-9) + ',');
				print(isNotANumber(3/'hi') + ',');
			}
			*/
		}));

		var results = getOutputAreaText().split(',');
		var n = 0;

		equal(results[n++], 'false', '10 is a number');
		equal(results[n++], 'false', 'E is a number');
		equal(results[n++], 'false', 'Pi is a number');
		equal(results[n++], 'false', 'MaxNum is a number');
		equal(results[n++], 'false', 'NegativeInfinity is a number');

		equal(results[n++], 'true', 'NotANumber is not a number');
		equal(results[n++], 'true', 'NaN is not a number');
		equal(results[n++], 'true', 'square root of a negative number is not a number');
		equal(results[n++], 'true', '0/0 is not a number');
		equal(results[n++], 'true', '"hello world" is not a number');
		equal(results[n++], 'true', '"ten"-9 is not a number');
		equal(results[n++], 'true', '3/"hi" is not a number');
	});

	test("isNotANumber - outside of runCode() call! - test number and not number cases", function () {
		ok(!isNotANumber(10), '10 is a number');
		ok(!isNotANumber(E), 'E is a number');
		ok(!isNotANumber(Pi), 'Pi is a number');
		ok(!isNotANumber(MaxNum), 'MaxNum is a number');
		ok(!isNotANumber(NegativeInfinity), 'NegativeInfinity is a number');

		ok(isNotANumber(NotANumber), 'NotANumber is not a number');
		ok(isNotANumber(NaN), 'NaN is not a number');
		ok(isNotANumber(squareRoot(-100)), 'square root of a negative number is not a number');
		ok(isNotANumber(0 / 0), '0/0 is not a number');
		ok(isNotANumber('hello world'), '"hello world" is not a number');
		ok(isNotANumber('ten' - 9), '"ten"-9 is not a number');
		ok(isNotANumber(3 / 'hi'), '3/"hi" is not a number');
	});

	test("Pi - const set and correct", function () {
		runCode(ml(function () {
			/*function main() {
			print(Pi);
			}*/
		}));

		var outputPi = getOutputAreaText();
		equal(outputPi, Math.PI, 'Pi is set and correct');
		ok(outputPi > 3.14159 && outputPi < 3.15, 'approx PI');
	});

	test("E - const set and correct", function () {
		runCode(ml(function () {
			/*function main() {
			print(E);
			}*/
		}));

		var outputE = getOutputAreaText();
		equal(outputE, Math.E, 'E is set and correct');
		ok(outputE > 2.718 && outputE < 2.72, 'approx E');
	});


	//---------------------------------
	module("Math Unit Tests - Undocumented APIs");
	//---------------------------------

	test("MaxNum - const set and correct", function () {
		runCode(ml(function () {
			/*function main() {
			print(MaxNum);
			}*/
		}));

		var outputMaxNum = getOutputAreaText();
		equal(outputMaxNum, Number.MAX_VALUE, 'MaxNum is set and correct');
	});

	test("MinNum - const set and correct", function () {
		runCode(ml(function () {
			/*function main() {
			print(MinNum);
			}*/
		}));

		var outputMinNum = getOutputAreaText();
		equal(outputMinNum, Number.MIN_VALUE, 'MinNum is set and correct');
	});

	test("NotANumber - const set and correct", function () {
		runCode(ml(function () {
			/*function main() {
			print(NotANumber);
			}*/
		}));

		equal(getOutputAreaText(), 'NaN', 'NotANumber is set and correct');
		ok(isNaN(NotANumber), 'Works with isNaN');
		equal(typeof (NotANumber), 'number', 'NotANumber is a number :)');
		ok(!NotANumber, 'NotANumber is falsy');
	});

	test("PositiveInfinity - const set and correct", function () {
		runCode(ml(function () {
			/*function main() {
			print(PositiveInfinity);
			}*/
		}));

		var outputPositiveInfinity = getOutputAreaText();
		equal(outputPositiveInfinity, Number.POSITIVE_INFINITY, 'PositiveInfinity is set and correct');
	});

	test("NegativeInfinity - const set and correct", function () {
		runCode(ml(function () {
			/*function main() {
			print(NegativeInfinity);
			}*/
		}));

		var outputNegativeInfinity = getOutputAreaText();
		equal(outputNegativeInfinity, Number.NEGATIVE_INFINITY, 'NegativeInfinity is set and correct');
	});

	//---------------------------------
	module("Strings Unit Tests");
	//---------------------------------


	//---------------------------------
	module("Colors Unit Tests");
	//---------------------------------

	test("getColor - prints as rgb(r,g,b) string", function () {
		runCode(ml(function () {
			/*function main() {
			print(getColor(10,10,10));
			}*/
		}));

		ok(getOutputAreaText().match(/rgb\(\d+\,\d+\,\d+\)/));
	});

	test("getColor(255, 0, 0) - equal to 'red' variable", function () {
		runCode(ml(function () {
			/*function main() {
			print(getColor(255,0,0) == red);
			}*/
		}));

		equal(getOutputAreaText(), "true");
	});

	//---------------------------------
	module("Mouse Unit Tests");
	//---------------------------------


	//---------------------------------
	module("Keyboard Unit Tests");
	//---------------------------------


	//---------------------------------
	module("Time Unit Tests");
	//---------------------------------


	//---------------------------------
	module("Misc Unit Tests");
	//---------------------------------


	//---------------------------------
	module("Random Unit Tests");
	//---------------------------------



	//---------------------------------
	module("Graphics Unit Tests");
	//---------------------------------

	test("drawLine - check no exception", function () {
		runCode(ml(function () {
			/*function main() {
			var i;
			setColor(getColor(100, 100, 100));
			for (i = 10; i < 20; i++) {
			drawLine(10, i, 20, i);
			}
			}*/
		}));

		ok(true, "For now, just check no exception is thrown.");
	});

	// [Ignore('BUG: this test fails because of anti-aliasing on rectangle border')]
	IGNORE_test("drawRectangle - 1 rect", function () {
		runCode(ml(function () {
			/*function main() {
			setColor(red);
			drawRectangle(2, 2, 50, 50);
			}*/
		}));

		assertPixel(canvasElem, 2, 2, 255, 0, 0);
	});

	test("fillRectangle - 1 rect", function () {
		runCode(ml(function () {
			/*function main() {
			setColor(red);
			fillRectangle(5, 5, 50, 50);
			}*/
		}));

		assertPixel(canvasElem, 10, 10, 255, 0, 0);
	});

	test("fillRectangle - 2 rects", function () {
		runCode(ml(function () {
			/*function main() {
			setColor(red);
			fillRectangle(0, 0, 10, 10);
			setColor(blue);
			fillRectangle(10, 0, 10, 10);
			}*/
		}));

		assertPixel(canvasElem, 5, 5, 255, 0, 0);
		assertPixel(canvasElem, 15, 5, 0, 0, 255);
	});

	test("fillRectangle - 2 overlapping rects", function () {
		runCode(ml(function () {
			/*function main() {
			setColor(red);
			fillRectangle(0, 0, 100, 100);
			setColor(blue);
			fillRectangle(3, 3, 50, 94);
			}*/
		}));

		assertPixel(canvasElem, 5, 5, 0, 0, 255);
		assertPixel(canvasElem, 60, 50, 255, 0, 0);
	});

	test("drawRectangle - check no exception", function () {
		runCode(ml(function () {
			/*function main() {
			setColor(red);
			drawRectangle(5, 5, 50, 50);
			}*/
		}));

		ok(true, "For now, just check no exception is thrown.");
	});

	test("fillCircle - check inside circle", function () {
		runCode(ml(function () {
			/*function main() {
			setColor(red);
			fillCircle(0, 0, 20);
			}*/
		}));

		assertPixel(canvasElem, 10, 10, 255, 0, 0);
		assertPixel(canvasElem, 30, 30, 255, 0, 0);
	});

	test("drawCircle - check no exception", function () {
		runCode(ml(function () {
			/*function main() {
			setColor(red);
			drawCircle(0, 0, 20);
			}*/
		}));

		ok(true, "For now, just check no exception is thrown.");
	});

	test("fillOval - check inside oval", function () {
		runCode(ml(function () {
			/*function main() {
			setColor(getColor(200, 0, 200));
			fillOval(0, 0, 100, 30);
			}*/
		}));

		assertPixel(canvasElem, 10, 15, 200, 0, 200);
		assertPixel(canvasElem, 90, 15, 200, 0, 200);
	});

	test("drawOval - check no exception", function () {
		runCode(ml(function () {
			/*function main() {
			setColor(getColor(200, 0, 200));
			drawOval(0, 0, 100, 30);
			}*/
		}));

		ok(true, "For now, just check no exception is thrown.");
	});

	test("fillPolygon - check inside polygon", function () {
		runCode(ml(function () {
			/*function main() {
			setColor(blue);
			fillPolygon([10, 40, 10], [10, 10, 40]);
			}*/
		}));

		assertPixel(canvasElem, 15, 15, 0, 0, 255);
	});

	test("fillPolygon - mismatched number of points raises exception", function () {
		raises(function mismatchedPolyPointsEx() {
			runCode(ml(function () {
				/*function main() {
				setColor(blue);
				fillPolygon([10, 40, 10], [10, 40]);
				}*/
			}));
		}, /xPoints.*yPoints/, 'Expect runtime exception thrown for mismatched number of xPoints and yPoints');
	});

	test("drawPolygon - just check no exception", function () {
		runCode(ml(function () {
			/*function main() {
			setColor(blue);
			drawPolygon([10, 40, 10], [10, 10, 40]);
			}*/
		}));

		ok(true, "For now, just check no exception is thrown.");
	});

	test("drawString - Big X", function () {
		runCode(ml(function () {
			/*function main() {
			setColor(getColor(0, 255, 0));
			drawString("X", 100, 0, 100, true, false);
			}*/
		}));

		assertPixel(canvasElem, 45, 50, 0, 255, 0);
	});

	test("drawString - minimal overload (no bold or italic)", function () {
		runCode(ml(function () {
			/*function main() {
			setColor(getColor(100, 255, 0));
			drawString("X", 100, 0, 100);
			}*/
		}));

		assertPixel(canvasElem, 45, 50, 100, 255, 0);
	});

	test("clearDrawing - previous shape cleared", function () {
		runCode(ml(function () {
			/*function main() {
			setColor(getColor(0, 0, 255));
			fillCircle(20, 20, 100);
			clearDrawing();
			}*/
		}));

		assertPixel(canvasElem, 120, 120, 0, 0, 0, 0);
	});

	test("clearRectangle - previous shape cleared", function () {
		runCode(ml(function () {
			/*function main() {
			setColor(getColor(128, 128, 0));
			fillRectangle(20, 20, 200, 200);
			clearRectangle(120, 120, 10, 10);
			}*/
		}));

		assertPixel(canvasElem, 125, 125, 0, 0, 0, 0);
	});

	test("setBackgroundColor - sets canvas background-color css", function () {
		runCode(ml(function () {
			/*function main() {
			setBackgroundColor(getColor(128, 128, 0));
			}*/
		}));
		debugger;
		ok($(canvasElem).css('background-color').match(/rgb\(128\s*\,\s*128\s*\,\s*0\)/), 'Expect css set for canvas background color');
	});

	test("getDrawingWidth - check returns hardcoded value", function () {
		runCode(ml(function () {
			/*function main() {
			print(getDrawingWidth());
			}*/
		}));

		equal(getOutputAreaText(), 500);
	});

	test("getDrawingHeight - check returns hardcoded value", function () {
		runCode(ml(function () {
			/*function main() {
			print(getDrawingHeight());
			}*/
		}));

		equal(getOutputAreaText(), 400);
	});

});


/////////////////////////////////////////////////
//         SUPPORT FUNCTIONS
/////////////////////////////////////////////////

// Modified from:
//   http://philip.html5.org/tests/canvas/suite/tests/
//   http://philip.html5.org/tests/canvas/suite/tests.js
// Example:
//   ctx.beginPath();
//   ctx.rect(0, 0, 100, 50);
//   ctx.fillStyle = '#f00';
//   ctx.fillRect(0, 0, 16, 16);
//   ctx.fillStyle = '#0f0';
//   ctx.fill();
//   _assertPixel(canvas, 50, 25, 0, 255, 0, 255, "50,25", "0,255,0,255");

function getPixel(canvas, x, y) {
	try {
		var ctx = canvas.getContext('2d');
		var imgdata = ctx.getImageData(x, y, 1, 1);
		return [imgdata.data[0], imgdata.data[1], imgdata.data[2], imgdata.data[3]];
	} catch (e) {
		// probably a security exception caused by having drawn
		// data: URLs onto the canvas
		return undefined;
	}
}

function assertPixel(canvas, x, y, r, g, b, a) {
	// default alpha to 255
	a = typeof a !== 'undefined' ? a : 255;

	var c = getPixel(canvas, x, y);
	ok(c, 'Expected a color array [r,g,b,a]');

	var message = 'Got pixel [' + c + '] at (' + x + ',' + y + '), expected [' + r + ',' + g + ',' + b + ',' + a + ']';
	equal(c[0], r, 'Red component test - ' + message);
	equal(c[1], g, 'Green component test - ' + message);
	equal(c[2], b, 'Blue component test - ' + message);
	equal(c[3], a, 'Alpha component test - ' + message);
}

//function assertPixelApprox(canvas, x, y, r, g, b, a, tolerance) {
//	var c = getPixel(canvas, x, y);
//	if (c) {
//		var diff = Math.max(Math.abs(c[0] - r), Math.abs(c[1] - g), Math.abs(c[2] - b), Math.abs(c[3] - a));
//		if (diff > tolerance)
//			ok(false, 'Failed assertion: got pixel [' + c + '] at (' + x + ',' + y + '), expected [' + r + ',' + g + ',' + b + ',' + a + '] +/- ' + tolerance);
//	}
//}

function IGNORE_test(testName, testFunction) {
	console.log("Test '" + testName + "' IGNORED!");
}























/////////////////////////////////
// Attempt at delay() unit tests:


//	asyncTest("delay - 1/30 of second", function () {
//		
//		
//		runCode(ml(function () {
//			/*function main() {
//			//stop();
//			var lengthSeconds = 1/30;
//			// Made tolerance very very small
//			var tolerance = lengthSeconds * (1/1000);//(2/3);
//			var lengthMillis = lengthSeconds * 1000;
//			var startTime = +new Date;

//			delay(lengthSeconds);

//			var actualLength = (+new Date) - startTime;
//			var difference = Math.abs((actualLength/1000) - tolerance);
//            
//			console.log(difference < tolerance, 'Expected delay: ' + lengthSeconds + ' Actual delay: ' + (actualLength/1000) +
//			' Tolerance: ' + tolerance + ' Difference: ' + difference);

//			printLine(difference);

//            
//			if (difference < tolerance) {
//			printLine('Pass');
//			}
//			else {
//			printLine('Fail');
//			}

//			printLine('a ' + (+new Date));
//            
//			//start();
//			}*/
//		}));

//		//stop();

////		alert(getOutputAreaText());
//		printLine('b ' + (+new Date));
//		ok(false, getOutputAreaText());
//		start();


//		

//		//        var difference = getOutputAreaText();
//		//        var tolerance = (1/30) * (2/3);

//		//        ok(difference < tolerance, 'Actual delay difference of ' + difference + ' within the tolerance of ' + tolerance);

//		//start();
//	});

//	test('delay() it', function () {
//		//		var lengthSeconds = 5;
//		//		// Made tolerance very very small
//		//		var tolerance = lengthSeconds * (1 / 1000); //(2/3);
//		//		var lengthMillis = lengthSeconds * 1000;
//		//		var startTime = new Date;

//		//		delay(lengthSeconds);

//		//		var actualLength = (new Date) - startTime;
//		//		var difference = Math.abs((actualLength / 1000) - tolerance);

//		//		ok(difference < tolerance, 'Expected delay: ' + lengthSeconds + ' Actual delay: ' + (actualLength / 1000) +
//		//		' Tolerance: ' + tolerance + ' Difference: ' + difference);

////		stop();
////		//ok(true, 'before ' + (+new Date));
////		delay(2);
////		ok(true, 'after ' + (+new Date));
////		start();
//	});