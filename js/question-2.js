// Question 2
// Make a call to the following API endpoint:

// https://api.rawg.io/api/games?dates=2019-01-01,2019-12-31&ordering=-rating
// Loop through the results and display the following properties in HTML, but only for the first 8 results:

// name
// rating
// number of tags (not the tag details, just the amount of tags)
// The styling for this assignment is not important, but some kind of loading indicator should be displayed while the API call is in progress.

// Be sure to handle any potential errors in the code.

// You can use either regular promise or async/await syntax to make the call.

// Be sure to arrange all file types appropriately, consult the repos from the lessons for examples.

const apiUrl =
	"https://api.rawg.io/api/games?dates=2019-01-01,2019-12-31&ordering=-rating";

const resultsContainer = document.querySelector(".results");

async function getGames() {
	resultsContainer.innerHTML = `<div class="loader"></div>`;

	try {
		const response = await fetch(apiUrl);
		const results = await response.json();
		const games = results.results;
		let gameListHTML = "";
		for (i = 0; i < games.length; i++) {
			let gameNameHTML = `<div class="game">Unknown game</div>`;
			let gameRatingHTML = `<div class="rating">Unknown rating</div>`;
			let gameTagsHTML = `<div class="tag">Unknown number of tags</div>`;
			if (i === 8) {
				break;
			}
			if (games[i].name) {
				gameNameHTML = `<div class="game">${games[i].name}</div>`;
			}
			if (games[i].rating) {
				gameRatingHTML = `<div class="rating">Rating: ${games[i].rating}</div>`;
			}
			if (games[i].tags.length) {
				gameTagsHTML = `<div class="tag">Nr. of tags: ${games[i].tags.length}</div>`;
			}
			gameListHTML += `<div class="gameContainer"> ${gameNameHTML} ${gameRatingHTML} ${gameTagsHTML} </div>`;
		}
		//Timeout added to make the loader display for some seconds
		setTimeout(() => {
			resultsContainer.className = "resultsDisplay";
			resultsContainer.innerHTML = gameListHTML;
		}, 3000);
	} catch (error) {
		resultsContainer.innerHTML = `<div class="error"><div>An error has occured!</div><div>${error}</div> </div>`;
	}
}

getGames();
