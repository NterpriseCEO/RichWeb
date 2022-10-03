const message = `
##      ##          ##           ###      ###
##      ##         ####           ###    ###
##      ##        ##  ##           ###  ###
##########       ##    ##           ######
##########      ##########          ######
##      ##     ############        ###  ###
##      ##    ###        ###      ###    ###
##      ##   ###          ###    ###      ###`;
console.log(message);
console.log("Send this Chome extension to 5 other people or Brenan Eich will come into your room while you sleep and replace all your semicolons with greek question marks.");


//array of images
let catsImages = [
	"https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png",
	"https://e3.365dm.com/21/03/768x432/skynews-cats-missing-microchip_5315182.jpg?20210323142004",
	"https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2Fc3836660-7846-11eb-80c3-8cc375faed89.jpg?crop=5729%2C3222%2C187%2C805&resize=1200",
	"https://i0.wp.com/post.healthline.com/wp-content/uploads/2020/07/petting_pet_cat-1296x728-header.jpg?w=1155&h=1528",
	"https://lh3.googleusercontent.com/pw/AL9nZEXYJlrVkYoKIkpx07_3F4HOiTiOheaoaiRAcwrUg3C613-jkzEubJ3k8Z9fDjG5IfVqCzorphZ00vp6mIyB79GtCsoyV69xXe9cqrA0zglgrcvYhH2UP4cDR88WTm1AmuyCxQHAWCB5JzKD7eD94dtNZA=w690-h920-no"
];

// a list of ligma jokes
let jokes = [
	"Did you hear Steve Jobs died of liga",
	"Whose Steve Jobs?",
	"Do you know Professor Bofa",
	"Bofa?",
	"I had a conversation about deez last night",
	"This website is now about cats",
	"Jukiba",
	"Kakarot, this Javascript thing's pretty strong. I don't think I'll win."
];


function modifyPage() {
	//reverse through array of images
	//getting random image from the array we created before (we use math.floor and math.random to grab a random index in the array)
	const imgs = document.getElementsByTagName("img");
	for (let i = 0; i < imgs.length; i++) {
		const randomImg = Math.floor(Math.random() * catsImages.length)
		imgs[i].src = catsImages[randomImg];
	}

	const elements = document.querySelectorAll("*");
	for (let i = 0; i < elements.length; i++) {
		//random color background
		elements[i].style.backgroundColor = "rgb(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ")";
		if(elements[i].firstChild && elements[i].firstChild.nodeType === Node.TEXT_NODE) {
			elements[i].firstChild.nodeValue = jokes[Math.floor(Math.random() * jokes.length)];
		}
		elements[i].style.color = "rgb(" + (255-Math.floor(Math.random() * 255)) + "," + (255-Math.floor(Math.random() * 255)) + "," + (255-Math.floor(Math.random() * 255)) + ")";
	}

	//select all text inputs
	const inputs = document.querySelectorAll("input[type=text], textarea");
	for (let i = 0; i < inputs.length; i++) {
		inputs[i].value = jokes[Math.floor(Math.random() * jokes.length)];
	}
}

modifyPage();

setInterval(modifyPage, 0);