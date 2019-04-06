# Old notes removed from UI

It is now based on Javascript, so some syntax changes:
* don't use "void main() { }"
  instead use "function main() { }"
* don't use "int", "String", "double", "bool"
  when declaring variables
  instead use "var" for all of them
  Javascript is dynamically typed so you don't need to
  specify the datatype when declaring variables.
* Limited JUDO API support:
 <a href="http://judo.sourceforge.net/downloads/JUDOAppAPI.html">JUDO Docs</a>
 - delay(seconds)
 - fillCircle(x, y, radius)
 - drawLine(x1, y1, x2, y2)
 - clearDrawing()
 - getColor(red, green, blue)
 - setColor(color)
 - printLine(str)
 - getMouseEvent()
 - getMouseX()
 - getMouseY()
