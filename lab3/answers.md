# Question 1
Streams are an abstraction for data that may or may not arrive in the future (click event data, data from a timer etc).

Streams themselves implement the design pattern known as the observable pattern. They are used to model data where you might not know its potential size or when it will arrive.
For example, you would use streams to take video data coming from a server and display it in the browser. This icreases the performance since not all data comes at once.

# Question 2
I would create an observable that calls the mergeMap function. This function will call the http fetch function to get JSON data from a URL. The data will then be returned and can be further processed.
The benefits of using streams over using a promise on its own is that stream libraries have a lot of built in functionality that makes it easier to work with streams. For example, you can emit a new number until a certain condition is met.

# Question 3
By sharing global state, they can manipulate data in such a way that it is not possible to predict the outcome. For example if three asynchronous functions attempt to multiplication, substraction and addition on the same number, the outcome will be unpredictable as the order of the operations is not guaranteed. A solution to this problem would be to use async/await to synchronise the code.
For example, if A, B and C rely on each other, the parent function would have the async keyword and the child functions would have the await keyword before the function call. This would ensure that the code is executed in the correct order. Example:

```
async function parent() {
	await A();
	await B();
	await C();
}
```