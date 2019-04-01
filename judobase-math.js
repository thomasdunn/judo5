/////////////////////////////////////////////////
//         JUDO MATH API
/////////////////////////////////////////////////

/// <summary>Returns the floor of the given number (ex: floor of 17.81 = 17)</summary>
function floor(num) {
    return Math.floor(num);
}

/// <summary>Returns the ceiling of the given number (ex: ceiling of 3.45 = 4)</summary>
function ceiling(num) {
    return Math.ceil(num);
}

/// <summary>Returns the rounded number of the given number (ex: round of 3.45 = 3, round of 17.81 = 18)</summary>
function round(num) {
    return Math.round(num);
}

/// <summary>Returns the absolute value of the given number (ex: if you give it -1.4, it will return 1.4 and if you give it 1.4, it will return 1.4)</summary>
function absoluteValue(num) {
    return Math.abs(num);
}

/// <summary>Returns the square root of the given number</summary>
function squareRoot(num) {
    return Math.sqrt(num);
}

/// <summary>Returns of value of the first argument raised to the power of the second argument</summary>
function power(num1, num2) {
    return Math.pow(num1, num2);
}

/// <summary>Returns the natural logarithm (base e) of the given number</summary>
function log(num) {
	return Math.log(num);
}

/// <summary>Returns the sine of an angle specified in radians</summary>
function sin(angle) {
	return Math.sin(angle);
}

/// <summary>Returns the sine of an angle specified in radians</summary>
function cos(angle) {
	return Math.cos(angle);
}

/// <summary>Returns true if you attempt to take the squareRoot of a negative number or use arithmetic operators with non-numeric operands that cannot be converted to numbers (Ex: 3/'hello' or 'ten'-9)</summary>
function isNotANumber(num) {
	return isNaN(num);
}

/// <summary>The value of the ratio of the circumference of a circle to its diameter</summary>
var Pi = Math.PI;

/// <summary>The value of the base of natural logarithms</summary>
var E = Math.E;

/// <undocumentedApi />
/// <summary>The maximum numeric value</summary>
var MaxNum = Number.MAX_VALUE;

/// <undocumentedApi />
/// <summary>The minimum numeric value</summary>
var MinNum = Number.MIN_VALUE;

/// TODO : Just document or expose isNaN or create an isNotANumber instead!!!

/// <undocumentedApi />
/// <summary>The value you get if you attempt to divide infinity by infinity, take the squareRoot of a negative number, or use arithmetic operators with non-numeric operands that cannot be converted to numbers</summary>
var NotANumber = NaN;

/// <undocumentedApi />
/// <summary>A value representing positive infinity</summary>
var PositiveInfinity = Number.POSITIVE_INFINITY;

/// <undocumentedApi />
/// <summary>A value representing negative infinity</summary>
var NegativeInfinity = Number.NEGATIVE_INFINITY;

/*
TODO : JUDO compatibility, Not sticking exactly to old JUDO API
PI - The value of the ratio of the circumference of a circle to its diameter
E - The value of the base of natural logarithms
MIN_INT - The minimum integer value (readInt() and readDouble() return this if a valid number is not entered)
MAX_INT - The maximum integer value
*/

/////////////////////////////////////////////////
//         SUPPORT FUNCTIONS
/////////////////////////////////////////////////

