// var url =
// 	"https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=e66ca1aefa9dee7abb5fcbcd4cc1189c&text=flowers&content_type=1&media=photos&per_page=25&page=1&format=json&nojsoncallback=1";

const app = document.getElementById("root");

const container = document.createElement("div");
container.setAttribute("class", "container");
app.appendChild(container);

document.getElementById("search").addEventListener("click", function (event) {
	var userInput = document.getElementById("user-input").value;
	var url =
		"https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=e66ca1aefa9dee7abb5fcbcd4cc1189c&tags=" +
		userInput +
		"&content_type=1&media=photos&per_page=25&page=1&format=json&nojsoncallback=1";
	fetch(url)
		.then(function (response) {
			// this will trigger the catch method if error
			if (response.ok) {
				return response.json();
			} else {
				return Promise.reject(response);
			}
		})
		.then(function (image) {
			var images = image.photos.photo;
			console.log(images);
			for (var i = 0; i < image.photos.photo.length; i++) {
				var currentPhotoUrl =
					"https://farm" +
					images[i]["farm"] +
					".staticflickr.com/" +
					images[i]["server"] +
					"/" +
					images[i]["id"] +
					"_" +
					images[i]["secret"] +
					"_q.jpg";
				const img = document.createElement("img");
				container.append(img);
				img.src = currentPhotoUrl;
			}
		})

		.catch(function (err) {
			console.warn("something went wrong", err);
		});
});
