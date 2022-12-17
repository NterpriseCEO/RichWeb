# Question 1
Props and state are both JavaScript objects in React that hold data that helps determine the behavior of a component.

Short for properties, props are values passed to React components from its parent component. They are used to configure a component and usually remain unchanged throughout the lifetime of a component. Below is an example of how props are passed to a component:

```
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

const element = <Welcome name="Paul" />;

ReactDOM.render(
  element,
  document.getElementById('root')
);
```

In the code above, the Welcome component is passed a prop called name with a value of "Paul". This prop is accessed within the component using props.name, and it is used to personalize the greeting: Hello, Paul.

State, on the other hand, is a component's local and mutable data. It can change throughout the lifetime of a component, and it is used to track user input, toggle UI elements, and handle other events in a React application. Here's an example of how state is used in a component:
```
class Date extends React.Component {
  constructor(props) {
	super(props);
	this.state = {date: new Date()};
  }

  render() {
	return (
	  <div>
		<h1>Hello!</h1>
		<h2>It is {this.state.date.toLocaleTimeString()}.</h2>
	  </div>
	);
  }
}
```

In the code above, the Date component has a state that holds the current date and time. This state is initialized in the component's constructor using the this.state property. The current time is then displayed by accessing this.state.date in the component's render method.

In summary, props are used to pass data from a parent component to a child component, while state is used to track and manage data within a component.

# Question 2
Functors are abstractions that allow programmers to iterate over arrays or objects and apply a function to each element in that array/object.

An example of a functor is the Array.prototype.map method. It takes a function as an argument and applies it to each item in the array.

```
const numbers = [1, 2, 3, 4, 5];
console.log(numbers.map(x => x * 2));
```

# Question 3
Callacks are easy to understand and allow their containing code to be synchronous. The disadvantage is that nested callbacks for "callback hell", in which there are many deep levels of code.

Promises are easy to read and allow for asynchronous code. They allow produce reltatively "flat" code with only one or two levels of indentation. One disadvantage is that they can be difficult to debug.

One advantage of using streams is that they provide a powerful and flexible way to handle large amounts of data, such as files or network connections. One disadvantage is that they can be more difficult to work with than other asynchronous mechanisms, as they require a deeper understanding of how data is processed and consumed.

# Question 4
The box model is a box that wraps around all elements on a page. From inside to outside is the content, padding, border and margins. It can be used to space elements using the margin property and padding.

Margin is the space between and element's border and all elements on four sides of the element. Below shows how margin can be used margin to space elements:
```css
article{
  margin: 20px;
}
```

Padding is the spacing between the content of an element and the border that surrounds it. Below shows how margin can be used padding to pad out elements:
```css
article{
  padding: 20px;
}
```

# Question 5
When somone enters a URL into the browser, it sends a request to the server at the other end of that URL. The server then sends back the HTML for the web page, which the browser begins to render.

As it renders the HTML, it will probably encounter additional resources that need to be loaded, such as css, js, images etc. The browser will then request these additional resources from the server before continuing to render the page.

Once all initial HTML is rendered and all additional resources have been loaded, the browser will execute the JS code for the web page. This code makes the page dynamic and interactive.

After the JavaScript has been executed, the webpage is considered fully "bootstrapped" and is ready for the user to interact with. As the user interact with the webpage, the JavaScript code will continue to run, updating the pages data / DOM where neccesary.