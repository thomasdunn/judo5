$(document).ready(function () {
	var dropbox = $("#uploadPanel")[0];

	// init event handlers
	dropbox.addEventListener("dragenter", dragEnter, false);
	dropbox.addEventListener("dragexit", dragExit, false);
	dropbox.addEventListener("dragover", dragOver, false);
	dropbox.addEventListener("drop", drop, false);

	// init the widgets
	// See: http://www.thebuzzmedia.com/html5-drag-and-drop-and-file-api-tutorial/
	// $("#progressbar").progressbar();
});

function dragEnter(evt) {
	evt.stopPropagation();
	evt.preventDefault();
}

function dragExit(evt) {
	evt.stopPropagation();
	evt.preventDefault();
}

function dragOver(evt) {
	evt.stopPropagation();
	evt.preventDefault();
}

function drop(evt) {
	evt.stopPropagation();
	evt.preventDefault();

	var files = evt.dataTransfer.files;
	var count = files.length;

	// Only call the handler if 1 or more files was dropped.
	if (count > 0)
		handleFiles(files);
}


function handleFiles(files) {
	var file = files[0];

	$('#uploadPanelLabel').text("Processing " + file.name);

	var reader = new FileReader();

	// init the reader event handlers
	//reader.onprogress = handleReaderProgress;
	reader.onload = handleReaderLoadEnd;
	reader.onerror = function handleError(evt) {
		var message;
		
		// REF: http://www.w3.org/TR/FileAPI/#ErrorDescriptions
		switch(evt.target.error.code) {
			case 1:
				message = file.name + " not found.";
				break;
				
			case 2:
				message = file.name + " has changed on disk, please re-try.";
				break;
				
			case 3:
				messsage = "Upload cancelled.";
				break;
				
			case 4:
				message = "Cannot read " + file.name + ".";
				break;
				
			case 5:
				message = "File too large for browser to upload.";
				break;
		}
	}

	// begin the read operation
	reader.readAsDataURL(file);
}

/*function handleReaderProgress(evt) {
	if (evt.lengthComputable) {
		var loaded = (evt.loaded / evt.total);

		$("#progressbar").progressbar({ value: loaded * 100 });
	}
}
*/

function handleReaderLoadEnd(evt) {
	//$("#progressbar").progressbar({ value: 100 });

	var img = document.createElement('img');
	img.src = evt.target.result;

	$("#uploadPanel").append(img);
}