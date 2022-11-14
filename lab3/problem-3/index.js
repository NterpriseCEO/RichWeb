window.onload = function() {
	let noteInput = document.getElementById("note-input"),
		addNoteButton = document.getElementById("add-note");

	Rx.Observable.fromEvent(addNoteButton, 'click').subscribe(() => {
		let noteValue = noteInput.value;

		if (noteValue) {
			let note = new Note(noteValue);
			note.printNote();
		}
	});
}

class Note {

	#note = "";

	#parent = null;

	constructor(note, parent) {
		this.#note = note;
	}

	printNote() {
		console.log("fuck you javascript")
		console.log(this.#note);
	}
}