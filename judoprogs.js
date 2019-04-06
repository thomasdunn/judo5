/// <summary>takes a function as an argument and returns the contents
///   of the multiline comment that the function contains.
///   Hack because Javascript does not support multiline strings</summary>
function ml(func) {
  return func.toString().
	  replace(/^[^\/]+\/\*!?/, '').
	  replace(/\*\/[^\/]+$/, '');
}

var judoProgs = [
	{
		title : 'Choose a program or write a new one...',
		code : ml(function() {
/*function main() {

}*/
		})
	},
	{
		title : 'Hello World',
		code : ml(function() {
/*function main() {
  printLine("Hello, World!");
}*/
		})
	},
	{
		title : 'Bouncing Circles',
		code : ml(function() {
/*function main() {
  var x = 0;
  var y = 0;
  var r = 50;
  var dx = 3;
  var dy = 3;

  var x2 = 100;
  var y2 = 200;
  var r2 = 25;
  var dx2 = 5;
  var dy2 = 5;

  while (true) {
    if (y + 2*r > 400 || y < 0)
      dy *= -1;
    if (x + 2*r > 500 || x < 0)
      dx *= -1;

    if (y2 + 2*r2 > 400 || y2 < 0)
      dy2 *= -1;
    if (x2 + 2*r2 > 500 || x2 < 0)
      dx2 *= -1;

    clearDrawing();

    setColor(getColor(255,0,127));
    fillCircle(x, y, r);
    x += dx;
    y += dy;

    setColor(getColor(0,100,225));
    fillCircle(x2, y2, r2);
    x2 += dx2;
    y2 += dy2;

    delay(.01);

    // just logs # milliseconds since last tick
    //tick();
  }
}*/
		})
	},
	{
		title : 'Move Circle With Mouse',
		code : ml(function() {
/*function main() {
  var r = 50;
  
  setColor(getColor(255,128,0));
  
  while (true) {
    if (getMouseEvent()) {
      clearDrawing();
      fillCircle(getMouseX()-r, getMouseY()-r, r);
    }
    
    delay(.01);
  }
}*/
		})
	},
	{
		title: 'Is Key Pressed',
		code: ml(function () {
/*function main() {
	while (true) {
		if (getKeyState("x")) {
			printLine("pressing 'x'.");
		}
		delay(1);
	}
}*/
		})
	},
	{
		title: 'readKey debugging',
		code: ml(function () {
/*function main() {
	while(true) {
		printLine(readKey());
	}
}*/
		})
	},
	{
		title: 'Look Out! (manually converted)',
		code: ml(function () {
		    /*// Look Out
// Thomas Dunn / 2003-09-19
// catch the bombs with the paddle (I called it ship in code)
// every ballsPerLevel bombs, you go to a new level, if you
// have caught more than 50% of the bombs to that point
// See how far you can get!

var screenHeight;
var screenWidth;
var shipColor = blue;
var bombColor = red;
var numBallDrops = 0;
var hitCount;
var scoreColor;
var scoreX;
var scoreY;
var level;
var ballsPerLevel = 30;
var oldScore = "";
var backgroundColor = black;
var bombSpeed;
var firstGame = true;
var score;

function main() {
    var shipWidth = 60;
    var shipHeight = 15;
    screenHeight = getDrawingHeight();
    screenWidth = getDrawingWidth();
    var shipX = ((screenWidth / 2.0) - (shipWidth / 2.0));
    var shipY = screenHeight - shipHeight - 1;
    var shipSpeed = 8;
    var numBombs = 5;
    var bombSize = 10;
    var bombDelay = 400;

    numBallDrops = 0;
    hitCount = 0;
    level = 1;
    bombSpeed = 1;

    scoreX = screenWidth - 225;
    scoreY = 20;
    scoreColor = shipColor;

    var bombX = [];
    var bombY = [];

    // init ball locations
    for (var i = 0; i < numBombs; i++) {
        bombY[i] = ((screenHeight / numBombs) * i) - bombDelay;
        bombX[i] = randomInt(screenWidth - bombSize);
    }

    setBackgroundColor(backgroundColor);

    if (firstGame) {
        showDirections();
        firstGame = false;
    }

    setColor(shipColor);
    drawString("Level " + level, true, false, 18, scoreX, scoreY);

    while (true) {  // main graphics loop
        delay(.01);

        setColor(backgroundColor);
        fillRectangle(shipX, shipY, shipWidth, shipHeight);

        // move the ship
        if (getKeyState("left") && shipX > 0) {
            shipX -= shipSpeed;
        }
        else if (getKeyState("right") && shipX + shipWidth < screenWidth) {
            shipX += shipSpeed;
        }

        setColor(shipColor);
        fillRectangle(shipX, shipY, shipWidth, shipHeight);

        // update bomb positions
        for (var i = 0; i < numBombs; i++) {
            setColor(backgroundColor);
            fillRectangle(bombX[i], bombY[i], bombSize, bombSize);

            bombY[i] += bombSpeed;

            setColor(bombColor);
            fillRectangle(bombX[i], bombY[i], bombSize, bombSize);

            // bomb is at bottom of screen
            if (bombY[i] + bombSize >= screenHeight - shipHeight) {

                // blank out the bomb since hit bottom
                setColor(backgroundColor);
                fillRectangle(bombX[i], bombY[i], bombSize, bombSize);

                // check if ship caught the bomb
                if (bombX[i] <= shipX + shipWidth && bombX[i] + bombSize >= shipX) {

                    // score it as a hit
                    hitCount++;
                }

                if (updateScore()) {
                    var endMessage = "You made it to Level " + level;
                    setColor(bombColor);
                    if (level > 8) {
                        endMessage += "!";
                        setColor(shipColor);
                    }
                    clearDrawing();
                    drawString(endMessage, true, false, 40, 18, screenHeight / 2);
                    drawString(score, true, false, 18, scoreX, scoreY);

                    drawString("Press any key to play again", false, false, 20, 110, screenHeight - 40);
                    delay(1);
                    readKey();
                    main();
                }

                // send bomb to top of screen
                bombY[i] = -bombSize;
                bombX[i] = randomInt(screenWidth - bombSize);
            }
        }
    }
}

// returns true if game is over
function updateScore() {
    var scorePercent = 1;
    numBallDrops++;

    scorePercent = hitCount * 1.0 / numBallDrops;

    if (scorePercent <= 0.5) {
        scoreColor = bombColor;
    }
    else {
        scoreColor = shipColor;
    }

    if (numBallDrops % ballsPerLevel == 0) {
        bombSpeed++;
        if (scorePercent <= 0.5) {
            return true;
        }
        level++;
    }

    score = "Level " + level + "  " + (scorePercent * 100) + "%  (" + hitCount + " / " + numBallDrops + ")";

    setColor(backgroundColor);
    drawString(oldScore, true, false, 18, scoreX, scoreY);

    setColor(scoreColor);
    drawString(score, true, false, 18, scoreX, scoreY);

    oldScore = score;

    return false;
}

function showDirections() {
    setColor(shipColor);
    drawString("Look Out!", true, false, 40, 140, 50);
    drawString("by Thomas Dunn", false, true, 16, 170, 70);

    setColor(bombColor);

    drawString("Catch the falling balls!  Move the paddle with", false, false, 16, 70, 170);
    drawString("the left and right arrow keys.  You will only", false, false, 16, 80, 195);
    drawString("advance to the next level if you've caught", false, false, 16, 81, 220);
    drawString("50% or more.  See how far you can get!", false, false, 16, 84, 245);

    setColor(shipColor);
    drawString("Press any key to play", false, false, 20, 130, screenHeight - 40);
    readKey();
    clearDrawing();
}*/
		})
	},
	{
		title : 'Multiple Delays Bug',
		code : ml(function() {
/*function main() {
  printLine('');printLine('');printLine('');
  var keys = ['ctrl', 'alt'];//, 'pause', 'break', 'capslock'];
  for (var j = 0; j<keys.length; j++) {
    printLine(keys[j]);
	keyCheck(keys[j]);    
  }
}

function keyCheck(key) {
  for (var i = 3; i > 0; i--) {
    printLine(i);
    delay(.5);    
  }

  printLine(getKeyState(key));
}*/
		})
	},
	{
		title : 'Sunflower',
		code : ml(function() {
/*function main() {
  setBackgroundColor(mediumBlue);
  
  // how far around the circle the ball is, in radians
  var angle = 0;
  
  // how big the circle is
  var radius = 10;
  
  // the center of the canvas
  var centerX = getDrawingWidth() / 2;
  var centerY = getDrawingHeight() / 2;
  
  while(true) {
      // calculate coordinates of the ball using sin and cosine
      var x = sin(angle) * radius * 0.5;
      var y = cos(angle) * radius * 0.5;
      
      // since the circle is naturally centered at (0,0)
      // we must add centerX and centerY
    
      setColor(yellow);
      fillCircle(x+centerX, y+centerY, 15);
      setColor(black);
      drawCircle(x+centerX, y+centerY, 15);
    
      delay(.005);
    
      // move the ball forward
      angle = angle + 0.2;
      // make the circle bigger
      radius = radius + 0.4;
  }
}*/
		})
	},
	{
		title : 'getKeyState debugging',
		code : ml(function() {
/*function main() {
  printLine('');printLine('');printLine('');

  var input = '';
  while (input != 'exit') {
    keyCheck(input);
    input = prompt('Enter key name.');
  }

}

function keyCheck(key) {
  for (var i = 3; i > 0; i--) {
    printLine(i);
    delay(.5);    
  }

  printLine(getKeyState(key));
}*/
		})
	},
	{
		title : 'readColor setColor buggy',
		code : ml(function() {
/*function main() {
  setBackgroundColor(readColor());
  setColor(readColor());
  fillCircle(15, 15, 250);
}*/
		})
	},
	
]


