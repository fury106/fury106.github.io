const apiUrl = 'https://www.liseberg.se/sv/api/queue/all';
const container = document.getElementById('queue-times');
const sortSelect = document.getElementById('sort-select');

let rides = []; // Globale opslag van attracties

// Functie om attracties weer te geven
function renderRides(sortBy) {
    container.innerHTML = ''; // Wis vorige inhoud

    let sortedRides = [...rides];

    if (sortBy === 'name') {
        sortedRides.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'wait') {
        sortedRides.sort((a, b) => b.avgWait - a.avgWait);
    }

    sortedRides.forEach(ride => {
        const rideElement = document.createElement('div');
        const rideName = document.createElement('span');
        rideName.textContent = `${ride.name}: `;

        const statusElement = document.createElement('span');

        if (ride.open === false) {
            statusElement.textContent = 'Gesloten';
            statusElement.style.color = 'red';
            statusElement.style.fontWeight = 'bold';
        } else {
            statusElement.textContent = `${ride.avgWait} minuten`;
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

        // Filter attracties met wachttijdgegevens
        rides = data
            .filter(ride => ride.minWaitTime !== null && ride.maxWaitTime !== null)
            .map(ride => ({
                name: ride.name,
                open: ride.open,
                avgWait: Math.floor((ride.minWaitTime + ride.maxWaitTime) / 2)
            }));

        if (rides.length === 0) {
            container.textContent = 'Er zijn momenteel geen wachttijden beschikbaar voor Liseberg.';
        } else {
            renderRides(sortSelect.value);
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