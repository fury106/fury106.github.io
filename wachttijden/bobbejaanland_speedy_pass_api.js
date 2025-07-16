const apiUrl = 'https://bjlcache.speedy-pass.com/api/api/guest/rides';
const container = document.getElementById('queue-times');
const sortSelect = document.getElementById('sort-select');

let rides = []; // Globale opslag van gefilterde attracties

// Functie om attracties weer te geven
function renderRides(sortBy) {
    container.innerHTML = ''; // Wis vorige inhoud

    let sortedRides = [...rides]; // Kopieer array

    if (sortBy === 'name') {
        sortedRides.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'wait') {
        sortedRides.sort((a, b) => {
            const aWait = Math.floor(a.queues?.[0]?.waitTimeMins ?? 0);
            const bWait = Math.floor(b.queues?.[0]?.waitTimeMins ?? 0);
            return bWait - aWait;
        });
    }

    sortedRides.forEach(ride => {
        const rideElement = document.createElement('div');
        const rideName = document.createElement('span');
        rideName.textContent = `${ride.name}: `;

        const statusElement = document.createElement('span');
        const queueData = ride.queues?.[0];

        const isClosed = ride.state === "closed_indefinitely" || queueData?.isOpen === false;

        if (isClosed) {
            statusElement.textContent = 'Gesloten';
            statusElement.style.color = 'red';
            statusElement.style.fontWeight = 'bold';
        } else {
            const waitTime = Math.floor(queueData?.waitTimeMins ?? 0);
            statusElement.textContent = `${waitTime} minuten`;
        }

        rideElement.appendChild(rideName);
        rideElement.appendChild(statusElement);
        container.appendChild(rideElement);
    });
}

// Haal data op
fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Probleem bij het ophalen van de data');
        }
        return response.json();
    })
    .then(data => {
        console.log('Ontvangen data:', data);

        // Filter attracties die operationeel zijn
        rides = data.filter(ride => ride.state !== "not_operational");

        if (rides.length === 0) {
            container.textContent = 'Er zijn momenteel geen wachttijden beschikbaar.';
        } else {
            renderRides(sortSelect.value); // Toon met standaard sortering
        }
    })
    .catch(error => {
        console.error('Error fetching data:', error);
        container.textContent = 'Er is een probleem opgetreden bij het ophalen van de wachttijden.';
    });

// Luister naar dropdownwijzigingen
sortSelect.addEventListener('change', () => {
    renderRides(sortSelect.value);
});