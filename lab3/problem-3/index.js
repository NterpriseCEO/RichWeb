window.onload = function() {
	let noteInput = document.getElementById("note-input"),
		addNoteButton = document.getElementById("add-note");

	Rx.Observable.fromEvent(addNoteButton, 'click').subscribe(() => {
		let noteValue = noteInput.value;

		noteInput.value = "";

		if (noteValue) {
			let note = new Note(noteValue);
			note.addNote();
		}
	});
}

class Note {

	#note = "";

	#parent = null;

	#parentNoteTemplate;
	#clone;

	constructor(note, parent) {
		this.#note = note;

		if(parent) {
			this.#parent = parent;
		}

		this.#parentNoteTemplate = document.getElementById((parent ? "child" : "parent") + "-note");
		this.#clone = this.#parentNoteTemplate.content.cloneNode(true);
	}

	addNote() {
		//reference the parent-note template
		let noteDiv = this.#clone.querySelector(".note"),
			noteText = this.#clone.querySelector(".note-text");

		noteText.innerHTML = this.#note;

		document.body.appendChild(noteDiv);

		this.listenForAddChildNote(noteDiv);
	}

	listenForAddChildNote(noteDiv) {
		//listen for the add child note button
		//create a new note
		//add the new note to the parent note
		let addChildNoteButton = noteDiv.querySelector(".add-child-note"),
			childNoteInput = noteDiv.querySelector(".child-note-input");
		Rx.Observable.fromEvent(addChildNoteButton, 'click').subscribe(() => {
			let childNoteValue = childNoteInput.value;
			
			childNoteInput.value = "";

			if(childNoteValue) {
				let childNote = new Note(childNoteValue, this);
				childNote.addNote();
			}
		});
	}
}