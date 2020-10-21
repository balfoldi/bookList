
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import Books from './components/Books'


const App = () => {
	return (
	<div>
		<Books />
	</div>
	);
}
ReactDOM.render(<App />, document.getElementById("root"));
    