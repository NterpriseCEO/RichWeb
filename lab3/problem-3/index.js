window.onload = function() {
	// References the note text input and the add-note button
	let noteInput = document.getElementById("note-input"),
		addNoteButton = document.getElementById("add-note");

	// The RXJS Observable that listens for click events on the add-note button
	Rx.Observable.fromEvent(addNoteButton, 'click').subscribe(() => {
		let noteValue = noteInput.value;

		noteInput.value = "";

		// If the note value is not empty, add it to the list
		if (noteValue) {
			let note = new Note(noteValue);
			note.addNote();
		}
	});
}

class Note {

	// The text of the note
	#note = "";

	// The note's parent
	#parent = null;

	// The parent-note template
	#noteTemplate;
	#clone;

	#noteDiv;

	constructor(note, parent) {
		this.#note = note;

		// Sets the parent of the note if it exists
		if(parent) {
			this.#parent = parent;
		}

		// Reference the correct note template
		this.#noteTemplate = document.getElementById((parent ? "child" : "parent") + "-note");
		this.#clone = this.#noteTemplate.content.cloneNode(true);
	}

	addNote() {
		//reference the parent-note template contents
		let noteDiv = this.#clone.querySelector(".note"),
			noteText = this.#clone.querySelector(".note-text");

		noteText.innerHTML = this.#note;

		// This div is appended to the DOM
		this.#noteDiv = noteDiv;

		document.body.appendChild(noteDiv);

		this.listenForAddChildNote(noteDiv);

		// Removes the note from the DOM when the remove button is clicked
		this.observeRemove().subscribe(() => {
			noteDiv.remove();
		});

		// Removes the note if the parent is removed
		if(this.#parent) {
			this.#parent.observeRemove().subscribe(() => {
				noteDiv.remove();
			});
		}
	}

	// Listens for events on the add-child-note button
	listenForAddChildNote(noteDiv) {
		// Reference the child-note button and input
		let addChildNoteButton = noteDiv.querySelector(".add-child-note"),
			childNoteInput = noteDiv.querySelector(".child-note-input");

		//The RXJS Observable that listens for click events on the add-child-note button
		Rx.Observable.fromEvent(addChildNoteButton, 'click').subscribe(() => {
			let childNoteValue = childNoteInput.value;

			childNoteInput.value = "";

			// If the note-input value is not empty, It gets added to the DOM as a child note
			if(childNoteValue) {
				// The this here refers to the parent note
				let childNote = new Note(childNoteValue, this);
				childNote.addNote();
			}
		});
	}

	// This RXJS Observable listens for click events on the remove button
	// This is passed to the child notes so that they can be removed when the parent is removed
	observeRemove() {
		let deleteButton = this.#noteDiv.querySelector(".remove-note");
		return Rx.Observable.fromEvent(deleteButton, 'click');
	}
}