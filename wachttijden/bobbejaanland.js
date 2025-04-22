const parkId = '311'; // ID van Bobbejaanland
const apiUrl = `https://queue-times-api-server.onrender.com/api/wachttijden/${parkId}`;

fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Probleem bij het ophalen van de data');
        }
        return response.json();
    })
    .then(data => {
        console.log('Ontvangen data:', data);

        // Controleer of 'lands' leeg is en haal wachttijden direct uit de root
        const rides = data.rides || []; // Gebruik 'rides' direct als het beschikbaar is
        const container = document.getElementById('queue-times');

        if (rides.length === 0) {
            container.textContent = 'Er zijn momenteel geen wachttijden beschikbaar voor Bobbejaanland.';
        } else {
            rides.forEach(ride => {
                const rideElement = document.createElement('div');
                rideElement.textContent = `${ride.name}: ${ride.wait_time} minuten`;
                container.appendChild(rideElement);
            });
        }
    })
    .catch(error => {
        console.error('Error fetching data:', error);
        const container = document.getElementById('queue-times');
        container.textContent = 'Er is een probleem opgetreden bij het ophalen van de wachttijden.';
    });