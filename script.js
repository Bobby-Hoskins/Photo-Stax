// API Key
const apiKey = config.Secret_API_Key;
// API Request
apiRequest = () => {
    document.querySelector(".grid").textContent = "";
    let url = 'https://api.unsplash.com/search/photos?query=' + search.value + '&per_page=15&client_id=' + apiKey;
    fetch(url)
        .then(response => {
            if (!response.ok) throw Error(response.statusText);
            return response.json();
        })
        .then(data => {
            loadImages(data);
        })
        .catch(error => console.log(error));
}


// Image Loader
loadImages = (data) => {
    for (let i = 0; i < data.results.length; i++) {
        let image = document.createElement("div");
        image.className = "img";
        image.style.backgroundImage = "url(" + data.results[i].urls.raw + "&w=1366&h=768" + ")";
        image.addEventListener("click", function () {
            window.open(data.results[i].links.download, '_blank');
        })
        document.querySelector(".grid").appendChild(image);

    }
}

// Fetch More Photos
getMoreImages = () => {
    let currentPage = 0;
    let nextPage = currentPage + 1;
    let addMorePhotos = 'https://api.unsplash.com/search/photos?query=' + search.value + '&per_page=15&page=' + nextPage.value + '&client_id=' + apiKey;
    fetch(addMorePhotos)
        .then(response => {
            if (!response.ok) throw Error(response.statusText);
            return response.json();
        })
        .then(data => {
            loadImages(data);
        })
        .catch(error => console.log(error));
}

// Event Listeners

document.querySelector(".btn").addEventListener("click", () => {
    getMoreImages();
});
document.querySelector("#search").addEventListener("keydown", (event) => {
    if (event.key == "Enter")
        apiRequest();
});


document.querySelector(".search").addEventListener("click", () => {
    apiRequest()
});