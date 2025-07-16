const parkId = '14'; // ID van Walibi Belgium
const apiUrl = `https://queue-times-api-server.onrender.com/api/wachttijden/${parkId}`;
const container = document.getElementById('queue-times');
const sortSelect = document.getElementById('sort-select');

let rides = []; // Globale opslag van attracties

// Functie om de attracties weer te geven
function renderRides(sortBy) {
    container.innerHTML = ''; // Wis vorige inhoud

    let sortedRides = [...rides]; // Kopieer array om te sorteren

    if (sortBy === 'name') {
        sortedRides.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'wait') {
        sortedRides.sort((a, b) => b.wait_time - a.wait_time);
    }

    sortedRides.forEach(ride => {
        const rideElement = document.createElement('div');
        const rideName = document.createElement('span');
        rideName.textContent = `${ride.name}: `;

        const statusElement = document.createElement('span');
        if (ride.is_open === false) {
            statusElement.textContent = 'Gesloten';
            statusElement.style.color = 'red';
            statusElement.style.fontWeight = 'bold';
        } else {
            statusElement.textContent = `${Math.floor(ride.wait_time)} minuten`;
        }

        rideElement.appendChild(rideName);
        rideElement.appendChild(statusElement);
        container.appendChild(rideElement);
    });
}

// Haal de data op
fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Probleem bij het ophalen van de data');
        }
        return response.json();
    })
    .then(data => {
        console.log('Ontvangen data:', data);
        rides = data.lands.flatMap(land => land.rides);

        if (rides.length === 0) {
            container.textContent = 'Er zijn momenteel geen wachttijden beschikbaar voor Walibi Belgium.';
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