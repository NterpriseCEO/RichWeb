window.onload = function() {
	let noteInput = document.getElementById("note-input"),
		addNoteButton = document.getElementById("add-note");

	Rx.Observable.fromEvent(addNoteButton, 'click').subscribe(() => {
		let noteValue = noteInput.value;

		if (noteValue) {
			let note = new Note(noteValue);
			note.addNote();
		}
	});
}

class Note {

	#note = "";

	#parent = null;

	constructor(note, parent) {
		this.#note = note;
	}

	addNote() {
		//reference the parent-note template
		let parentNoteTemplate = document.getElementById("parent-note"),
			clone = parentNoteTemplate.content.cloneNode(true),
			noteDiv = clone.querySelector(".note"),
			noteText = clone.querySelector(".note-text");

		noteText.innerHTML = this.#note;

		document.body.appendChild(noteDiv);
	}
}