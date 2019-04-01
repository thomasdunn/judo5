////////////////////////////////////////////////////
//         JUDO API requiring Narrative JavaScript
////////////////////////////////////////////////////

/////////////////////////////////////////////////
//         JUDO MISC API
/////////////////////////////////////////////////

/// <summary>Delays the running of your program by the given number of seconds (ex: 3 or .5)</summary>
/// <remarks>Implementation uses Narrative JavaScript: http://www.neilmix.com/narrativejs/doc/</remarks>
/// <url>http://www.neilmix.com/narrativejs/doc/</url>
function delay(seconds) {
	// use of Narrative Javascript yield operator and sleep function
	sleep->(seconds * 1000);
}

/////////////////////////////////////////////////
//         JUDO KEYBOARD API
/////////////////////////////////////////////////

/// <summary>Waits for the user to press a key. Returns the key they pressed as a String</summary>
function readKey() {
	keyPressNotifier.wait->();
	var keyEvent = getKeyPressEvent();
	return keyEvent != null ? getKeyStringFromKeyCode(keyEvent.which) : '';
}


/////////////////////////////////////////////////
//         SUPPORT FUNCTIONS
/////////////////////////////////////////////////

var keyCode = null;
var keyPressNotifier = new EventNotifier();

$(document).keypress(keyPressNotifier);

function getKeyPressEvent() {
	return keyPressNotifier.arguments.length > 0 ? keyPressNotifier.arguments[0] : null;
}
