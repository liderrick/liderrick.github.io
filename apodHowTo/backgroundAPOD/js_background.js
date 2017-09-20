var apiKey = "Q04R5uu3AmDLtMki1TxSp3QhLzIAbSH2qnmf7rT7";

/* Set up background splash */
function setBackgroundSplash() {

	/* Get today's date */
	var dateObj = new Date();
	dateObj = new Date(dateObj.toDateString());
	var dateString = dateObj.toISOString().split("T")[0];

	var foundImage = false;

	while (!foundImage)
	{
		var req = new XMLHttpRequest();
		req.open("GET", "https://api.nasa.gov/planetary/apod?date=" + dateString + "&api_key=" + apiKey, false);

		req.addEventListener("load", function() {
			if(req.status >= 200 && req.status < 400)
			{
				var response = JSON.parse(req.responseText);

				if (response.media_type == "image")
				{
					if(response.hasOwnProperty("hdurl"))
					{
						document.getElementById("header").style.backgroundImage = "url('" + response.hdurl + "')";
					}
					else
					{
						document.getElementById("header").style.backgroundImage = "url('" + response.url + "')";
					}

					document.getElementById("date").textContent = dateObj.toLocaleDateString();
					foundImage = true;
				}
				else /* if(response.media_type == "video") */
				{
					/* Decrements the date by one */
					dateObj.setDate(dateObj.getDate() - 1);
					dateString = dateObj.toISOString().split("T")[0];
				}

			}
			else
			{
				console.log("Error in network request: " + req.statusText);
			}

		});

		req.send(null);

	}

}

document.addEventListener('DOMContentLoaded', function() {
	setBackgroundSplash();
});