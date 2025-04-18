// JavaScript source code
//APi URl
const apiUrl = 'https://queue-times.com/parks/6/queue_times.json'; //14
console.log('Script geladen');

// Fetch data from the API and process it
try {
    // Fetch data from the API
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Probleem bij het ophalen van de data');
            }
            return response.json();
        })
        .then(data => {
            // collect data
            const rides = data.lands.flatMap(land => land.rides);
            // sort data
            const sortedRides = rides.sort((a, b) => b.wait_time - a.wait_time);
            // dyanimic add to html
            const container = document.getElementById('queue-times');
            sortedRides.forEach(ride => {
                const rideElement = document.createElement('div');
                rideElement.textContent = `${ride.name}: ${ride.wait_time} minuten`;
                container.appendChild(rideElement);
            });
        })
  catch (error) {
		console.error('Error fetching data:', error);
		const container = document.getElementById('queue-times');
		container.textContent = 'Er is een probleem opgetreden bij het ophalen van de wachttijden.';
}}