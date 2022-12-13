import './App.css';
import React from 'react';

class Panel extends React.Component {
	textInput = "";
	
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
			<div className="panel">
				<textarea onChange={this.changeValue}></textarea>
				<button onClick={() => this.addNote()}>Add note</button>
				<div className="notes">
					{this.state.displayNotes}
				</div>
			</div>

		);
	}

	changeValue = event => {
		this.textInput = event.target.value;
	}

	addNote() {
		//Adds a note to the notes array if the textInput value is not empty
		if(this.textInput === "" || this.textInput === null) {
			return;
		}
		//Pushes the textInput value to the notes array
		this.state.notes.push(this.textInput);
		this.textInput = "";
		//Updates the displayNotes array with the contents of the notes array
		this.setState({
			displayNotes: this.state.notes.map((note, index) => {
				return <pre key={index}>{note}</pre>
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
