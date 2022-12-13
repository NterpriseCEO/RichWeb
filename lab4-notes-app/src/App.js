import './App.css';
import React from 'react';
// import ReactDOM from 'react-dom/client';

class Panel extends React.Component {
	notes = [];

	render() {
		return (
			<div className="panel">
				<textarea></textarea>
				<button onClick={() => this.addNote()}>Add note</button>
			</div>

		);
	}

	addNote() {
		this.notes.push("hello");
		console.log(this.notes);
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
