import './App.css';
import React from 'react';
import { useState } from 'react';

//notes class
function Note(props) {
	let [edit, setEdit] = useState(false);
	let [note, setNote] = useState(props.note);
	
	return (
		<div className="note flex space-between" style={{ backgroundColor: props.colour }}>
			<pre className = "note-contents">
				{note}
			</pre>
			<div>
				<button onClick={()=> {
					setEdit(!edit);
					if(edit) {
						props.edit(note);
					}
				}}>{edit ? "Save" : "Edit" }</button>
				<button onClick={props.onClick}>Delete</button>
			</div>
			{edit ? <textarea onChange={(event) => setNote(event.target.value)} value = {note}></textarea> : null}
		</div>
	);
}

class Panel extends React.Component {
	textInput = "";
	colourValue = "#ffffff";

	values = [];

	constructor(props) {
		super(props);

		this.state = {
			notes: [],
			displayNotes: []
		}
	}

	render() {
		return (
			<div>
				<textarea
					id = "note-input"
					rows = "10"
					onChange={this.changeValue}
					placeholder = "Type a note here"
				>
				</textarea>
				<div className="flex">
					Select note colour:
					<input type = "color" onChange={this.changeColour} defaultValue = "#ffffff"></input>&nbsp;
					<button onClick={() => this.addNote()}>Create note</button>
				</div>
				<div className="notes">
					{this.state.displayNotes}
				</div>
			</div>
		);
	}

	changeValue = event => {
		this.textInput = event.target.value;
	}

	changeColour = event => {
		this.colourValue = event.target.value;
	}

	addNote() {
		//Adds a note to the notes array if the textInput value is not empty
		if(this.textInput === "" || this.textInput === null) {
			return;
		}
		//Pushes the textInput value to the notes array
		this.state.notes.push({note: this.textInput, colour: this.colourValue});
		this.textInput = "";
		//Updates the displayNotes array with the contents of the notes array
		this.populateDisplayNotes();
	}

	removeNote(index) {
		this.state.notes.splice(index, 1);
		this.populateDisplayNotes();
	}

	populateDisplayNotes() {
		//Updates the displayNotes array with the contents of the notes array
		this.setState({
			displayNotes: this.state.notes.map((note, index) => {
				return <Note
					key = {index}
					note = {note.note}
					colour = {note.colour}
					onClick={() => this.removeNote(index)}
					edit = {newNoteText => {
						// Updates the contents of the note at the specified index
						this.updateNote(index, newNoteText);
					}}
				/>
			})
		});
	}

	updateNote(index, newNoteText) {
		// Updates the contents of the note at the specified index
		this.setState({
			notes: this.state.notes.map((note2, index2) => {
				if(index === index2) {
					note2.note = newNoteText;
				}
				return note2;
			})
		});
	}
}

function App() {
	return (
		<div>
			<Panel/>
		</div>
	);
}

export default App;
