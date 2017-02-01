// Create a Listener form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);


//Save Bookmark
function saveBookmark(e){
	//Get from values
	var siteName = document.getElementById('siteName').value;
	var siteUrl = document.getElementById('siteUrl').value;

	if(!siteName || !siteUrl){
		alert('Please fill in the form');
		return false;
	}
	// Currently NOT WORKING. THIS SHOULD MAKE THE APP ALERT IF THE USER DOESN'T USE THE http://
	var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-z0-9@:%_\+.~#?&//=]*)?/gi;
	var regex = new RegExp(expression);

	if(!siteUrl.match(regex)){
		alert('Please use http:// before the site name');
		return false;
	}

	//Code above that isn't working end here. Go back and fix when you have more time.

	var bookmark = {
		name: siteName,
		url: siteUrl
	}



	/* 
	//Local Storage Test
	localStorage.setItem('test', 'Hello World');
	console.log(localStorage.getItem('test'));
	localStorage.removeItem('test');
	console.log(localStorage.getItem('test'));
	*/

	//Test if bookmarks is null
	if(localStorage.getItem('bookmarks') === null){
		//Init array
		var bookmarks = [];
		//Add to array
		bookmarks.push(bookmark);
		//Set to local storage
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	} else {
		//Get bookmarks from LocalStorage
		var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
		// Add a bookmark to array
		bookmarks.push(bookmark);	
		//Re-set back to Local Storage
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	}

	//Re-fetch bookmarks
	fetchBookmarks();

	//Prevent form from submitting
	e.preventDefault();
}

// Delete bookmark
function deleteBookmark(url){
	//Get bookmarks from Local Strorage
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	//Loop through bookmarks
	for(var i = 0; i < bookmarks.length;i++){
		if(bookmarks[i].url == url){
			//Remove from array
			bookmarks.splice(i, 1);
		}
	}
	//Re-set back to Local Storage
	localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

	//Re-fetch bookmarks
	fetchBookmarks();

}

//Fetch bookmarks
function fetchBookmarks(){
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

	//GET output id
	var bookmarksResults = document.getElementById('bookmarkresults');

	//Build Output
	bookmarksresults.innerHTML = '';
	for(i = 0; i < bookmarks.length;i++){
		var name = bookmarks[i].name;
		var url = bookmarks[i].url;

		bookmarksresults.innerHTML += '<div class="well">' + '<h3>' + name + 
		' <a class="btn btn-default" target="_blank" href="' + url +'"> Visit</a>' + 
		' <a onclick="deleteBookmark(\'' + url + '\')" class="btn btn-danger" href="#">Delete</a>' + 
		'</h3>' + '</div>';
	}
}

