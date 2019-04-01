/////////////////////////////////////////////////
//         JUDO MOUSE API
/////////////////////////////////////////////////

/// <summary>Returns true if there was a mouse event (mouse button pressed, mouse button released, mouse moved, or mouse dragged)</summary>
function getMouseEvent() {
    var isEvent = newMouseEvent;
    newMouseEvent = false;
    return isEvent;
}

/// <summary>Returns the x location of the mouse (use after getMouseEvent() returns true)</summary>
function getMouseX() {
    return mousePos.x;
}

/// <summary>Returns the y location of the mouse (use after getMouseEvent() returns true)</summary>
function getMouseY() {
    return mousePos.y;
}

/////////////////////////////////////////////////
//         SUPPORT FUNCTIONS
/////////////////////////////////////////////////

var newMouseEvent = false;
var mousePos = null;

canvas.mousemove(function (evt) {
    mousePos = getMousePos(canvasElem, evt);
    newMouseEvent = true;
});

function getMousePos(canvas, evt) {
    // get canvas position
    var obj = canvas;
    var top = 0;
    var left = 0;
    while (obj && obj.tagName != 'BODY') {
        top += obj.offsetTop;
        left += obj.offsetLeft;
        obj = obj.offsetParent;
    }

    // return relative mouse position
    var mouseX = evt.clientX - left + window.pageXOffset;
    var mouseY = evt.clientY - top + window.pageYOffset;
    return {
        x: mouseX,
        y: mouseY
    };
}
