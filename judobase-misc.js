/////////////////////////////////////////////////
//         JUDO MISC API
/////////////////////////////////////////////////

/// <summary>Delays the running of your program by the given number of seconds (ex: 3 or .5)</summary>
/// <remarks>A default implementation with busy waiting.  The implementation using Narrative JavaScript from judobase-njs.js should override this one.</remarks>
function delay(seconds) {
    var millis = seconds * 1000;
    var startDate = new Date;
    var curDate = null;
    do { curDate = new Date; }
    while (curDate - startDate < millis);
}

/////////////////////////////////////////////////
//         SUPPORT FUNCTIONS
/////////////////////////////////////////////////

