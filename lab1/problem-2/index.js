window.onload = function() {
	const noteInput = document.querySelector('#note-input');
	const selectNoteColour = document.querySelector('#select-note-colour');
	const createNoteButton = document.querySelector('#create-note-button');

	const template = document.querySelector("template");

	Rx.Observable.fromEvent(createNoteButton, 'click').subscribe(() => {
		if(noteInput.value) {
			const clone = template.content.cloneNode(true);
			const note = clone.querySelector('.note');
			const noteContents = clone.querySelector('.note-contents');
			const deleteNoteButton = clone.querySelector('.delete-note-button');
			const editNoteButton = clone.querySelector('.edit-note-button');
			const cancelNoteEditButton = clone.querySelector('.cancel-note-edit-button');

			note.style.backgroundColor = selectNoteColour.value;
			noteContents.innerHTML = noteInput.value;

			deleteNote(deleteNoteButton, note);
			editNote(editNoteButton, noteContents, cancelNoteEditButton);

			document.body.appendChild(clone);
			noteInput.value = '';
		}
	});

	function deleteNote(deleteNoteButton, note) {
		Rx.Observable.fromEvent(deleteNoteButton, 'click').subscribe(() => {
			note.remove();
		});
	}

	function editNote(editNoteButton, noteContents, cancelNoteEditButton) {
		const oldContents = noteContents.innerHTML;
		let isEditing = false;
		Rx.Observable.fromEvent(editNoteButton, 'click').subscribe(() => {
			isEditing = !isEditing;
			isEditing ? cancelNoteEditButton.classList.remove('hidden') : cancelNoteEditButton.classList.add('hidden');
			editNoteButton.innerHTML = isEditing ? 'Save' : 'Edit note';

			noteContents.contentEditable = isEditing;
			noteContents.focus();
		});

		Rx.Observable.fromEvent(cancelNoteEditButton, 'click').subscribe(() => {
			isEditing = false;
			noteContents.contentEditable = false;
			editNoteButton.innerHTML = 'Edit note';
			cancelNoteEditButton.classList.add('hidden');
			noteContents.innerHTML = oldContents;
		});
	}
}