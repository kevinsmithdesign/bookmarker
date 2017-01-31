// Create a Listener form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);


//Save Bookmark
function saveBookmark(e){
	//Get from values
	var siteName = document.getElementById('siteName').value;
	var siteUrl = document.getElementById('siteUrl').value;

	var bookmark = {
		name: siteName,
		url: siteUrl
	}

	//Local Storage Test
	localStorage.setItem('test', 'Hello World');
	console.log(localStorage.getItem('test'));
	localStorage.removeItem('test');
	console.log(localStorage.getItem('test'));


	//Prevent form from submitting
	e.preventDefault();
}

