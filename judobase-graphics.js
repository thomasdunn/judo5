/////////////////////////////////////////////////
//         JUDO GRAPHICS API
/////////////////////////////////////////////////

/// <summary>Sets the foreground color for the drawing area. After setting the color, shapes you draw with functions like fillCircle(x, y, radius) will be in this color</summary>
function setColor(color) {
    context.strokeStyle = color;
    context.fillStyle = color;
}

/// <summary>Sets the background color of the drawing area</summary>
function setBackgroundColor(color) {
    canvas.css("background-color", color);
}

/// <summary>Draws a line from the given (x1, y1) location to the given (x2, y2) location</summary>
function drawLine(x1, y1, x2, y2) {
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
}

function _rectBase(x, y, width, height) {
    context.beginPath();
    context.rect(x, y, width, height);
}

/// <summary>Draws an unfilled rectangle at the given (x, y) location of its top-left corner, with the given width and height</summary>
function drawRectangle(x, y, width, height) {
    _rectBase(x, y, width, height);
    context.stroke();
}

/// <summary>Draws a filled rectangle at the given (x, y) location of its top-left corner, with the given width and height</summary>
function fillRectangle(x, y, width, height) {
    _rectBase(x, y, width, height);
    context.fill();
}

function _circBase(x, y, radius) {
    context.beginPath();
    context.arc(x + radius, y + radius, radius, 0, 2 * Math.PI, false);
}

/// <summary>Draws an unfilled circle at the given (x, y) location of its top-left corner, with the given radius</summary>
function drawCircle(x, y, radius) {
    _circBase(x, y, radius);
    context.stroke();
}

/// <summary>Draws a filled circle at the given (x, y) location of its top-left corner, with the given radius</summary>
function fillCircle(x, y, radius) {
    _circBase(x, y, radius);
    context.fill();
}

function _ellipseBase(context, x, y, w, h) {
	var kappa = .5522848;
	ox = (w / 2) * kappa, // control point offset horizontal
      oy = (h / 2) * kappa, // control point offset vertical
      xe = x + w,           // x-end
      ye = y + h,           // y-end
      xm = x + w / 2,       // x-middle
      ym = y + h / 2;       // y-middle

	context.beginPath();
	context.moveTo(x, ym);
	context.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
	context.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
	context.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
	context.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
	context.closePath();
}

/// <summary>Draws an unfilled oval at the given (x, y) location of its top-left corner, with the given width and height</summary>
function drawOval(x, y, width, height) {
	_ellipseBase(context, x, y, width, height);
	context.stroke();
}

/// <summary>Draws a filled oval at the given (x, y) location of its top-left corner, with the given width and height</summary>
function fillOval(x, y, width, height) {
	_ellipseBase(context, x, y, width, height);
	context.fill();
}

function _polygonBase(xPoints, yPoints) {
    if (! xPoints || ! yPoints) {
        return;
    }
    if (xPoints.length != yPoints.length) {
        throw new Error("Polygon arrays xPoints and yPoints should contain the same number of elements.");
    }

	context.beginPath();

	// start the polygon
	context.moveTo(xPoints[0], yPoints[0]);

	// rest of points
	for (var i = 1; i < xPoints.length; i++) {
		context.lineTo(xPoints[i], yPoints[i]);
	}

	context.closePath();
}

/// <summary>Draws a filled polygon with the x-coordinates specified in xPoints, the y-coordinates specified in yPoints, and the number of points in the polygon in numPoints</summary>
function fillPolygon(xPoints, yPoints) {
	_polygonBase(xPoints, yPoints);
	context.fill();
}

/// <summary>Draws an unfilled polygon with the x-coordinates specified in xPoints, the y-coordinates specified in yPoints, and the number of points in the polygon in numPoints</summary>
function drawPolygon(xPoints, yPoints) {
	_polygonBase(xPoints, yPoints);
	context.stroke();
}

/// <summary>Draws the given String at the given (x, y) location with the given size, and possibly in bold and/or italics</summary>
function drawString(str, size, x, y, bold, italic) {
    context.font = size + "pt sans-serif";
    if (bold) {
        context.font = "bold " + context.font;
    }
    if (italic) {
        context.font = "italic " + context.font;
    }
    context.textBaseline = "alphabetic";
    context.fillText(str, x, y);
}

/// <summary>Clears the drawing area</summary>
function clearDrawing() {
    clearRectangle(0, 0, 600, 400);
}

/// <summary>Clears a portion of the drawing area defined by the rectangle at the given (x, y) location of its top-left corner, with the given width and height</summary>
function clearRectangle(x, y, width, height) {
    context.clearRect(x, y, width, height);
}

/// <summary>Returns the height of the drawing area so you know where the drawing areas top (0) and bottom edges (the returned value) are</summary>
// Ex: screenHeight = getDrawingHeight(); // canvas.width, canvas.height
function getDrawingHeight() {
    return canvasElem.height;
}

/// <summary>Returns the width of the drawing area so you know where the drawing areas left (0) and right edges (the returned value) are</summary>
// Ex: screenWidth = getDrawingWidth();
function getDrawingWidth() {
    return canvasElem.width;
}

function drawImage(name, x, y) {
    var image = $('#' + name)[0];
    if (image != null) {
        context.drawImage(image, x, y);
    }
}

function screenshot() {
    var image = document.createElement('img');
	image.src = canvasElem.toDataURL('data/png');
	document.body.appendChild(image);
}

/////////////////////////////////////////////////
//         SUPPORT FUNCTIONS
/////////////////////////////////////////////////
