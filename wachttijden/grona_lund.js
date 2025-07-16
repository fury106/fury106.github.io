const parkId = '166'; // ID van Grona Lund
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

        const rides = data.rides || []; // Gebruik 'rides' direct als het beschikbaar is
        const container = document.getElementById('queue-times');

        if (rides.length === 0) {
            container.textContent = 'Er zijn momenteel geen wachttijden beschikbaar voor Bobbejaanland.';
        } else {
            rides.forEach(ride => {
                // Maak een nieuw element voor elke attractie
                const rideElement = document.createElement('div');
                const rideName = document.createElement('span');
                rideName.textContent = `${ride.name}: `;

                const statusElement = document.createElement('span');
                if (ride.is_open === false) {
                    statusElement.textContent = 'Gesloten';
                    statusElement.style.color = 'red'; // Alleen het woord "Gesloten" wordt rood
                    statusElement.style.fontWeight = 'bold'; // Maak het vetgedrukt
                } else {
                    statusElement.textContent = `${ride.wait_time} minuten`;
                }

                // Voeg beide delen toe aan de regel
                rideElement.appendChild(rideName);
                rideElement.appendChild(statusElement);
                container.appendChild(rideElement);
            });
        }
    })
    .catch(error => {
        console.error('Error fetching data:', error);
        const container = document.getElementById('queue-times');
        container.textContent = 'Er is een probleem opgetreden bij het ophalen van de wachttijden.';
    });