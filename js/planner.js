document.addEventListener('DOMContentLoaded', () => {
// Available destinations (mirroring attractions data)
const availableDestinations = [
{ id: 1, name: "Botanical Park" },
{ id: 2, name: "Alur Naga Waterfall" },
{ id: 3, name: "Padang Tok Sheikh" },
{ id: 4, name: "Telaga Tok Sheikh" },
{ id: 5, name: "Peak Viewpoint" }
];

let itinerary = JSON.parse(localStorage.getItem('jerai_itinerary')) || [];

const destinationSelect = document.getElementById('destination-select');
const addBtn = document.getElementById('add-destination-btn');
const itineraryList = document.getElementById('itinerary-list');
const clearBtn = document.getElementById('clear-itinerary-btn');

if (!destinationSelect) return; // Only run on planner page

// Populate dropdown
availableDestinations.forEach(dest => {
const option = document.createElement('option');
option.value = dest.id;
option.textContent = dest.name;
destinationSelect.appendChild(option);
});

function renderItinerary() {
itineraryList.innerHTML = '';

if (itinerary.length === 0) {
    itineraryList.innerHTML = `
    <div class="empty-state text-center" style="padding: 2rem; border: 1px dashed var(--border-color); border-radius: var(--border-radius);">
        <p style="margin:0;">Your itinerary is empty. Select a destination to start planning.</p>
    </div>
    `;
    return;
}

itinerary.forEach((item, index) => {
    const li = document.createElement('div');
    li.className = 'itinerary-item';
    li.innerHTML = `
    <span class="itinerary-name"><span style="color: var(--accent-color); margin-right: 10px;">${index + 1}.</span> ${item.name}</span>
    <button class="btn-icon remove-btn" data-index="${index}" title="Remove">❌</button>
    `;
    itineraryList.appendChild(li);
});

// Attach remove events
document.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
    const index = e.target.getAttribute('data-index');
    itinerary.splice(index, 1);
    saveAndRender();
    });
});
}

function saveAndRender() {
localStorage.setItem('jerai_itinerary', JSON.stringify(itinerary));
renderItinerary();
}

addBtn.addEventListener('click', () => {
const selectedId = parseInt(destinationSelect.value);
if (!selectedId) return;

const destination = availableDestinations.find(d => d.id === selectedId);

// Prevent duplicates for simplicity
if (!itinerary.find(i => i.id === selectedId)) {
    itinerary.push(destination);
    saveAndRender();
}
});

clearBtn.addEventListener('click', () => {
itinerary = [];
saveAndRender();
});

// Initial render
renderItinerary();
});