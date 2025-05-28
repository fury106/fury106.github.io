const apiUrl = 'https://bjlcache.speedy-pass.com/api/api/guest/rides';

fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Probleem bij het ophalen van de data');
        }
        return response.json();
    })
    .then(data => {
        console.log('Ontvangen data:', data);

        // Filter attracties die niet de status "not_operational" hebben
        const rides = data.filter(ride => ride.status !== "not_operational");
        const container = document.getElementById('queue-times');

        if (rides.length === 0) {
            container.textContent = 'Er zijn momenteel geen wachttijden beschikbaar voor Bobbejaanland.';
        } else {
            rides.forEach(ride => {
                const rideElement = document.createElement('div');
                const rideName = document.createElement('span');
                rideName.textContent = `${ride.name}: `;

                const statusElement = document.createElement('span');
                
                // Controleer of de attractie gesloten is
                const queueData = ride.queues?.[0]; // Neem de eerste wachtrijgegevens als beschikbaar
                if (queueData?.isOpen === false) {
                    statusElement.textContent = 'Gesloten';
                    statusElement.style.color = 'red';
                    statusElement.style.fontWeight = 'bold'; // Alleen "Gesloten" wordt rood en vetgedrukt
                } else {
                    const waitTime = queueData?.waitTimeMins ?? 0; // Haal wachttijd op en rond naar beneden af
                    statusElement.textContent = `${Math.floor(waitTime)} minuten`;
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